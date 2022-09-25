import React, { useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getData, toggleJoke, getSuggestions } from "../../actions";
import Spinner from "../Spinner";
import Styles from "./css/styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { GET_SINGLE_JOKE, GET_SUGESSTIONS } from "../../types";
type Jokes = {
  categories: string[];
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
};

type Props = {
  singleJoke: Jokes;
  loading: boolean;
  suggestions: Jokes[];
  getData: any;
  toggleJoke: any;
  getSuggestions: any;
  ourCategories: Category[];
};

type Category = {
  color: string;
  category: string;
};

type Counter = {
  likes: number;
  unlikes: number;
};

const Index: React.FC<Props> = ({
  singleJoke,
  loading,
  suggestions,
  getData,
  getSuggestions,
  ourCategories,
}) => {
  const { id, index, category } = useParams();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = React.useState<number>(-1);
  const [backGroundColor, setBackgroundColor] = React.useState<string>("");
  const [counter, setCounter] = React.useState<Counter>({
    likes: 0,
    unlikes: 0,
  });
  React.useEffect(() => {
    if (category === "Uncategorized" || category === "explicit") {
      getSuggestions(
        `https://api.chucknorris.io/jokes/search?query=all`,
        GET_SUGESSTIONS
      );

      setBackgroundColor("#ff5b5b");
    } else {
      const currentColor = ourCategories.find(
        (item: Category) => item.category === category
      );
      setBackgroundColor(currentColor ? currentColor.color : "#ff5b5b");
      getSuggestions(
        `https://api.chucknorris.io/jokes/search?query=${category}`,
        GET_SUGESSTIONS
      );
    }
    getData(`https://api.chucknorris.io/jokes/${id}`, GET_SINGLE_JOKE);
    setCurrentIndex(Number(index));
  }, [getData, id, index, getSuggestions, category, ourCategories]);

  const captialize = useCallback((str: string) => {
    let strArry: string[] = str.split(/(\s+)/);
    let newStr = strArry[0] + " " + strArry[2];
    return newStr;
  }, []);

  const suggestTitle = useCallback((str: string) => {
    let strArry: string[] = str.split(/(\s+)/);
    let newStr = strArry[0] + " " + strArry[2] + " " + strArry[4];
    return newStr;
  }, []);

  return (
    <div className={Styles.singlePage}>
      <div className="my-container">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className={Styles.back}>
              <button onClick={() => navigate("/")}>
                {" "}
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className={Styles.pointer}
                />
              </button>
            </div>
            {singleJoke && Object.keys(singleJoke).length > 0 ? (
              <div className={Styles.main}>
                <div className={Styles.jokeBox}>
                  <div className={Styles.joke}>
                    <div className={Styles.top}>
                      <div>
                        {singleJoke.categories &&
                        singleJoke.categories.length > 0 ? (
                          <>
                            {singleJoke.categories.map((category: string) => (
                              <h3
                                style={{ background: backGroundColor }}
                                className={Styles.category}
                                key={category}
                              >
                                <span>·</span>
                                {category} jokes
                              </h3>
                            ))}
                          </>
                        ) : (
                          <>
                            <h3
                              style={{ background: backGroundColor }}
                              className={Styles.category}
                            >
                              {" "}
                              <span>·</span>
                              Uncategorized jokes
                            </h3>
                          </>
                        )}
                      </div>
                      <h3 className={Styles.trend}>· Trending</h3>
                    </div>

                    <div className={Styles.titleCon}>
                      <h3 className={Styles.title}>
                        {captialize(singleJoke.value) + " joke"}
                      </h3>
                      <hr />
                      <h5>No #{index && Number(index) + 1}</h5>
                    </div>

                    <p className={Styles.value}>{singleJoke.value}</p>
                  </div>

                  <div className={Styles.action}>
                    <div className={Styles.actionType}>
                      <div className={Styles.like}>
                        <button
                          onClick={() => {
                            setCounter({
                              ...counter,
                              likes: counter.likes + 1,
                            });
                          }}
                        >
                          <img
                            src="/assets_Homework_Front-End_02/hand@2x.png"
                            alt="thumb"
                          />
                        </button>
                        <h3>{counter.likes}</h3>
                      </div>

                      <div className={Styles.unLike}>
                        <button
                          onClick={() => {
                            setCounter({
                              ...counter,
                              unlikes: counter.unlikes + 1,
                            });
                          }}
                        >
                          <img
                            src="/assets_Homework_Front-End_02/hand@2x.png"
                            alt="thumb"
                          />
                        </button>
                        <h3>{counter.unlikes}</h3>
                      </div>
                    </div>

                    {suggestions && suggestions.length > 0 && (
                      <div className={Styles.change}>
                        {currentIndex > 0 && (
                          <button
                            onClick={() => {
                              navigate(
                                `/${
                                  suggestions[Math.max(0, currentIndex - 1)].id
                                }/${currentIndex - 1}/${
                                  suggestions[Math.max(0, currentIndex - 1)]
                                    .categories.length
                                    ? suggestions[Math.max(0, currentIndex - 1)]
                                        .categories[0]
                                    : "all"
                                }`
                              );
                              setCurrentIndex(currentIndex - 1);
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faChevronLeft}
                              className={Styles.pointer}
                            />
                            Prev Joke
                          </button>
                        )}

                        {suggestions.length > currentIndex && (
                          <button
                            onClick={() => {
                              navigate(
                                `/${suggestions[currentIndex + 1].id}/${
                                  currentIndex + 1
                                }/${
                                  suggestions[currentIndex + 1].categories
                                    .length
                                    ? suggestions[currentIndex + 1]
                                        .categories[0]
                                    : "all"
                                }`
                              );
                              setCurrentIndex(currentIndex + 1);
                            }}
                            className={Styles.nxt}
                          >
                            Next Joke
                            <FontAwesomeIcon
                              icon={faChevronRight}
                              className={Styles.pointer}
                            />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className={Styles.suggestions}>
                  {suggestions && suggestions.length > 0 ? (
                    <div>
                      <h3>top 10 jokes this week</h3>
                      {suggestions
                        .slice(0, 10)
                        .map((item: Jokes, index: number) => (
                          <>
                            {item.categories.length > 0 ? (
                              <>
                                {item.categories.map((category: string) => (
                                  <Link
                                    key={category}
                                    onClick={() =>
                                      getData(
                                        `https://api.chucknorris.io/jokes/${item.id}`,
                                        GET_SINGLE_JOKE
                                      )
                                    }
                                    to={`/${item.id}/${index}/${category}`}
                                  >
                                    {suggestTitle(item.value) + "..."}
                                  </Link>
                                ))}
                              </>
                            ) : (
                              <Link
                                key={item.id}
                                onClick={() =>
                                  getData(
                                    `https://api.chucknorris.io/jokes/${item.id}`,
                                    GET_SINGLE_JOKE
                                  )
                                }
                                to={`/${item.id}/${index}/all`}
                              >
                                {suggestTitle(item.value) + "..."}
                              </Link>
                            )}
                          </>
                        ))}
                    </div>
                  ) : (
                    <div>
                      <h1 className={Styles.error}> No suggestions :/</h1>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <h1 className={Styles.error}> Cannot get Joke :/</h1>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  singleJoke: state.jokes.singleJoke,
  loading: state.jokes.loading,
  suggestions: state.jokes.suggestions,
  ourCategories: state.jokes.categories,
});

export default connect(mapStateToProps, {
  getData,
  toggleJoke,
  getSuggestions,
})(Index);
