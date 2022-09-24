import React, { useEffect, useState } from "react";
import { categories, getJokesByCategories } from "../../actions";
import { connect } from "react-redux";
import { GET_CATEGORIES } from "../../types";
import PropTypes from "prop-types";
import Spinner from "../Spinner";
import Styles from "./css/styles.module.css";
import { useNavigate } from "react-router-dom";

type Props = {
  storecatogries: any;
  categories: any;
  loading: true;
  getJokesByCategories: any;
  setData: any;
  data: {
    category: string;
    background: string;
  };
};

const Index: React.FC<Props> = ({
  storecatogries,
  categories,
  loading,
  getJokesByCategories,
  setData,
  data,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    categories("https://api.chucknorris.io/jokes/categories", GET_CATEGORIES);
  }, [categories]);
  const [count, setCount] = useState<number>(7);
  const [loader, setLoader] = React.useState<boolean>(false);
  return (
    <div className={Styles.categories}>
      <div className="my-container">
        {loading ? (
          <Spinner toggle={false} />
        ) : (
          <>
            {storecatogries && storecatogries.length > 0 ? (
              <div className={Styles.grid}>
                {storecatogries
                  .slice(0, count)
                  .map(
                    (
                      item: { category: string; color: string },
                      index: number
                    ) => (
                      <button
                        key={index}
                        style={{ background: item.color }}
                        onClick={() => {
                          getJokesByCategories(
                            `https://api.chucknorris.io/jokes/search?query=${item.category}`,
                            item.category,
                            (id: string) => {
                              if (id) navigate(`/${id}/0/${item.category}`);
                            }
                          );
                          setData({
                            ...data,
                            category: item.category,
                            background: item.color,
                          });
                        }}
                      >
                        {item.category}
                      </button>
                    )
                  )}
                {storecatogries.length !==
                  storecatogries.slice(0, count).length && (
                  <>
                    {loader ? (
                      <Spinner toggle={false} />
                    ) : (
                      <button
                        onClick={() => {
                          setLoader(true);
                          setTimeout(() => {
                            setLoader(false);
                            setCount(count + count);
                          }, 1000);
                        }}
                        className={Styles.viewMore}
                      >
                        View More
                        <img
                          src={"./assets_Homework_Front-End_01/path@2x.png"}
                          alt="Person Icon"
                        />
                      </button>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div>
                <h1 className={Styles.error}>No categories for now :-(</h1>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

Index.propTypes = {
  categories: PropTypes.func.isRequired,
  storecatogries: PropTypes.array.isRequired,
  getJokesByCategories: PropTypes.func.isRequired,
};

const mapStateToProps = (state: any) => ({
  storecatogries: state.jokes.categories,
  loading: state.jokes.loading,
});

export default connect(mapStateToProps, {
  categories,
  getJokesByCategories,
})(Index);
