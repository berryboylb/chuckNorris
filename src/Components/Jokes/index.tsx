import React from "react";
import { getAllJokes } from "../../actions";
import { connect } from "react-redux";
import { GET_ALL_JOKES } from "../../types";
import PropTypes from "prop-types";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";
import Styles from "./css/styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
type Props = {
  jokes: any;
  loading: true;
  getAllJokes: any;
  data: {
    category: string;
    background: string;
  };
};
type Jokes = {
  categories: string[];
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
};
const Index: React.FC<Props> = ({
  jokes,
  loading,
  getAllJokes,
  data,
}) => {
  React.useEffect(() => {
    getAllJokes(
      "https://api.chucknorris.io/jokes/search?query=all",
      GET_ALL_JOKES
    );
  }, [getAllJokes]);
  const [count, setCount] = React.useState<number>(6);
  const [loader, setLoader] = React.useState<boolean>(false);
  return (
    <div className={Styles.jokes}>
      <div className="my-container">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <hr />
            <h3
              className={Styles.category}
              style={{ background: data.background }}
            >
              {data.category} jokes
            </h3>
            {jokes && jokes.length > 0 ? (
              <div className={Styles.grid}>
                {jokes.slice(0, count).map((item: Jokes, index: number) => (
                  <div key={item.id} className={Styles.joke}>
                    {item.categories && item.categories.length > 0 ? (
                      <>
                        {item.categories.map((category: string) => (
                          <h3 className={Styles.jokebox} key={category}>
                            {" "}
                            <FontAwesomeIcon
                              icon={faBolt}
                              className={Styles.pointer}
                            />
                            {category} joke
                          </h3>
                        ))}
                      </>
                    ) : (
                      <>
                        <h3 className={Styles.jokebox}>
                          {" "}
                          <FontAwesomeIcon
                            icon={faBolt}
                            className={Styles.pointer}
                          />
                          Uncategorized joke
                        </h3>
                      </>
                    )}
                    <p className={Styles.value}>{item.value}</p>
                    {item.categories && item.categories.length > 0 ? (
                      <>
                        {item.categories.map((category: string) => (
                          <Link
                            className={Styles.link}
                            to={`/${item.id}/${index}/${category}`}
                          >
                            see stats{" "}
                            <img
                              src={"./assets_Homework_Front-End_01/path@2x.png"}
                              alt="Person Icon"
                            />
                          </Link>
                        ))}
                      </>
                    ) : (
                      <>
                          <Link
                            key={item.id}
                          className={Styles.link}
                          to={`/${item.id}/${index}/Uncategorized`}
                        >
                          see stats{" "}
                          <img
                            src={"./assets_Homework_Front-End_01/path@2x.png"}
                            alt="Person Icon"
                          />
                        </Link>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <h1 className={Styles.error}>No Jokes for now :-(</h1>
              </div>
            )}
          </>
        )}
        {jokes.length !== jokes.slice(0, count).length && (
          <>
            {!loading && (
              <>
                <div className={Styles.views}>
                  {loader ? (
                    <Spinner toggle={false} />
                  ) : (
                    <button
                      className={Styles.viewMore}
                      onClick={() => {
                        setLoader(true);
                        setTimeout(() => {
                          setLoader(false);
                          setCount(count + count);
                        }, 1000);
                      }}
                    >
                      View More
                      <img
                        src={"./assets_Homework_Front-End_01/path@2x.png"}
                        alt="Person Icon"
                      />
                    </button>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

Index.propTypes = {
  getAllJokes: PropTypes.func.isRequired,
  jokes: PropTypes.array.isRequired,
};

const mapStateToProps = (state: any) => ({
  jokes: state.jokes.jokes,
  loading: state.jokes.loading,
});

export default connect(mapStateToProps, {
  getAllJokes,
})(Index);
