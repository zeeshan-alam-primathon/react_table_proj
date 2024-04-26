import { useQuery } from "@apollo/client";
import CloseIcon from "@mui/icons-material/Close";

import { GET_CONFERENCE } from "../../graphql/queries";

import "./index.css";

const Modal = ({ conferenceId, setModalOpen }) => {
  const { loading, error, data } = useQuery(GET_CONFERENCE, {
    variables: {
      id: conferenceId,
    },
    fetchPolicy: "cache-and-network",
  });

  const { name, locations, slogan, sponsors, organizer } =
    data?.conference || {};
  const {
    name: locationName,
    city,
    country,
  } = locations?.length ? locations[0] : {};

  return (
    <div className="main-container">
      <div className="container">
        <CloseIcon
          fontSize="large"
          className="close-icon"
          onClick={() => setModalOpen(false)}
        />

        <div className="content-wrapper">
          {loading ? (
            <div className="modal-loader-wrapper">
              <p>Loading....</p>
            </div>
          ) : (
            <>
              <h1>{name}</h1>
              <p className="slogan-text">{slogan}</p>
              {locations?.length ? (
                <p>
                  <b>Location:</b>{" "}
                  {locationName + " " + city + ", " + country.name}
                </p>
              ) : null}
              {sponsors?.length ? (
                <>
                  <p className="sponsers-text">Sponsers</p>
                  <div className="sponsers-wrapper">
                    {sponsors?.map((sponsor) => (
                      <div key={sponsor.name}>
                        <img
                          src={sponsor.image.url}
                          alt={sponsor.name}
                          width={100}
                          height={60}
                        />
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
              {organizer ? (
                organizer?.image?.url ? (
                  <>
                    <p className="sponsers-text">Organizer</p>
                    <div className="sponsers-wrapper">
                      <div>
                        <img
                          src={organizer.image.url}
                          alt={organizer.name}
                          width={100}
                          height={60}
                        />
                      </div>
                    </div>
                  </>
                ) : null
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
