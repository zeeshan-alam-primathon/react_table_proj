export const URl = "https://api.react-finland.fi/graphql";

export const SORT_TYPE = { ASC: "asc", DESC: "desc" };

export const VIEW_MODE = { TABLE: "table", BAR_CHART: "bar-chart" };

export const ITEMS_PER_PAGE = 7;

export const BAR_CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Number of Conferences per year",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      min: 0,
      max: 6,
      ticks: {
        stepSize: 1,
      },
    },

    x: {
      title: {
        display: true,
        text: "Year",
        color: "Green",
        fontSize: "24px",
      },
    },
  },
};

export const BAR_CHART_LABELS = [
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
];
