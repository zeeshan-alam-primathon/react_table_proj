import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import SwapVertOutlinedIcon from "@mui/icons-material/SwapVertOutlined";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import {
  SORT_TYPE,
  VIEW_MODE,
  BAR_CHART_LABELS,
  BAR_CHART_OPTIONS,
  ITEMS_PER_PAGE,
} from "../../utils/constant";
import { GET_USERS } from "../../graphql/queries";
import { useDebounce } from "../../customHooks/useDebounce";

import Pagination from "../Pagination/index";
import Search from "../Search/index";
import Modal from "../Modal/index";

import "./index.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState(SORT_TYPE.ASC);
  const [sortColumn, setSortColumn] = useState("");
  const [tableData, setTableData] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [conferenceId, setConferenceId] = useState("");
  const [viewMode, setViewMode] = useState(VIEW_MODE.TABLE);

  const [query, setQuery] = useState("");

  const { loading, data } = useQuery(GET_USERS, {
    fetchPolicy: "cache-and-network",
  });
  const { conferences } = data || {};

  // use debounce for searvh query
  const searchQuery = useDebounce(query, 500);

  // for sorting table data
  useEffect(() => {
    if (conferences) {
      if (sortColumn) {
        const sortedData = tableData
          ? [...tableData].sort((a, b) => {
              if (sortOrder === SORT_TYPE.ASC) {
                return a[sortColumn] > b[sortColumn] ? 1 : -1;
              } else {
                return a[sortColumn] < b[sortColumn] ? 1 : -1;
              }
            })
          : [];
        setTableData(sortedData);
      }
    }
  }, [sortColumn, sortOrder]);

  // for setting table data and also filtering table data as per search query
  useEffect(() => {
    if (conferences) {
      let data = conferences;
      let selectedPage = currentPage;
      let totalPages = conferences
        ? Math.ceil(conferences.length / ITEMS_PER_PAGE)
        : 1;
      if (searchQuery) {
        data = conferences?.filter((item) => {
          return Object.values(item).some((value) =>
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
          );
        });
        totalPages = data?.length ? Math.ceil(data.length / ITEMS_PER_PAGE) : 0;
        selectedPage = 1;
        setCurrentPage(selectedPage);
      }

      data = data?.slice(
        (selectedPage - 1) * ITEMS_PER_PAGE,
        selectedPage * ITEMS_PER_PAGE
      );
      setTotalPages(totalPages);
      setTableData(data);
    }
  }, [conferences, currentPage, searchQuery]);

  const getData = (label) => {
    const count = conferences?.filter(
      (conference) => conference.year === label
    )?.length;

    return count;
  };

  const barData = {
    labels: BAR_CHART_LABELS,
    datasets: [
      {
        label: "Number of Conference",
        data: BAR_CHART_LABELS?.map((label) => getData(label)),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const handlePageChange = (pageNo) => {
    setCurrentPage(pageNo);
  };

  const handleSort = (columnIndex) => {
    if (sortColumn === columnIndex) {
      setSortOrder(
        sortOrder === SORT_TYPE.ASC ? SORT_TYPE.DESC : SORT_TYPE.ASC
      );
    } else {
      setSortColumn(columnIndex);
      setSortOrder(SORT_TYPE.ASC);
    }
  };

  const handleUserClick = (tableRowData) => {
    setConferenceId(tableRowData.id);
    setModalOpen(true);
  };

  const handleToggleView = () => {
    console.log("toggleView called");
    setViewMode((prevMode) => {
      console.log({ prevMode }, "prevMode");
      return prevMode === VIEW_MODE.TABLE
        ? VIEW_MODE.BAR_CHART
        : VIEW_MODE.TABLE;
    });
  };

  if (loading) {
    return (
      <div className="loader-wrapper">
        <p>Loading....</p>
      </div>
    );
  }

  return (
    <>
      {modalOpen ? (
        <Modal setModalOpen={setModalOpen} conferenceId={conferenceId} />
      ) : null}
      <div className="table-main-container">
        <div className="upper-container">
          <button
            onClick={handleToggleView}
            style={{ width: "130px", backgroundColor: "lightgray" }}
          >
            {viewMode === VIEW_MODE.TABLE ? "Graph View" : "Table View"}
          </button>
          {viewMode === VIEW_MODE.TABLE ? (
            <Search query={query} setQuery={setQuery} />
          ) : null}
        </div>
        {viewMode === VIEW_MODE.BAR_CHART ? (
          <div className="bar-char-container">
            <Bar
              options={BAR_CHART_OPTIONS}
              data={barData}
              style={{ width: "100%" }}
            />
          </div>
        ) : !tableData?.length ? (
          <div className="no-result-wrapper">
            <p>No Search Results</p>
          </div>
        ) : (
          <>
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    {tableData &&
                      Object.keys(tableData[0])?.map((tableHead, index) => {
                        if (tableHead !== "__typename") {
                          return (
                            <th key={index}>
                              {tableHead[0].toUpperCase() + tableHead.slice(1)}
                              {tableHead === "year" ||
                              tableHead === "startDate" ||
                              tableHead === "endDate" ? (
                                <span
                                  className="sorting-icon-wrapper"
                                  onClick={() => handleSort(tableHead)}
                                >
                                  <SwapVertOutlinedIcon
                                    style={{
                                      color:
                                        sortColumn === tableHead
                                          ? "blue"
                                          : "black",
                                    }}
                                  />
                                </span>
                              ) : null}
                            </th>
                          );
                        }
                      })}
                    <th>Summary</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData?.map((tableRowData, index) => (
                    <tr key={index}>
                      {Object.entries(tableRowData)?.map(
                        ([key, value], index) => {
                          if (key !== "__typename") {
                            return <td key={index}>{value}</td>;
                          }
                        }
                      )}
                      <td>
                        <button onClick={() => handleUserClick(tableRowData)}>
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              totalPages={totalPages}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Table;
