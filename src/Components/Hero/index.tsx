import { useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import Spinner from "../Spinner";
import Styles from "./css/styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { getJokesByCategories } from "../../actions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
export type search = {
  query: string;
};

type Props = {
  getJokesByCategories: any;
  storecatogries: Category[];
  loading: boolean;
  setData: any;
  data: {
    category: string;
    background: string;
  };
};

type Category = {
  color: string;
  category: string;
};
const Index: React.FC<Props> = ({
  getJokesByCategories,
  storecatogries,
  loading,
  setData,
  data,
}) => {
  const navigate = useNavigate();
  const searchValidation = yup.object().shape({
    query: yup
      .string()
      .min(3, "query must be at least 3")
      .max(20, "Must not be greater than 20")
      .required("Category is required"),
  });
  const [disabled, setDisabled] = useState<boolean>(false);
  const [toggleColor, setToggleColor] = useState<boolean>(false);
  const [popup, setPopup] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<Category[]>([]);
  return (
    <div className={Styles.hero}>
      <div className={`my-container ${Styles.inner}`}>
        <h1>The Joke Bible</h1>
        <p>Daily Laughs for you and yours</p>
        <div className={Styles.box}>
          <Formik
            validationSchema={searchValidation}
            initialValues={{
              query: "",
            }}
            onSubmit={(values: search, actions: any) => {
              setDisabled(true);
              getJokesByCategories(
                `https://api.chucknorris.io/jokes/search?query=${values.query}`,
                values.query,
                (id: string) => {
                  if (id) navigate(`/${id}/0/${values.query}`);
                  setDisabled(false);
                  actions.resetForm();
                  setData({
                    ...data,
                    category: values.query,
                  });
                }
              );
            }}
          >
            {(props) => (
              <>
                {/* <span className={Styles.error}>
                  {props.touched.query && props.errors.query}
                </span> */}

                <form
                  onSubmit={props.handleSubmit}
                  onClick={() => {
                    setToggleColor(true);
                    setPopup(true);
                  }}
                  onMouseLeave={() => setToggleColor(false)}
                >
                  <input
                    className=""
                    type="text"
                    placeholder="How can we make you laugh today?"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      props.setFieldValue("query", e.target.value);
                      if (props.values.query !== "")
                        setSuggestions(
                          storecatogries.filter((item: Category) =>
                            item.category.includes(props.values.query)
                          )
                        );
                    }}
                    value={props.values.query}
                    onBlur={props.handleBlur("query")}
                  />

                  {disabled ? (
                    <Spinner toggle={false} />
                  ) : (
                    <button type="submit" disabled={disabled} className="">
                      <img
                        src={
                          toggleColor
                            ? "/assets_Homework_Front-End_02/search-copy@2x.png"
                            : "/assets_Homework_Front-End_01/search-copy@2x.png"
                        }
                        alt="Person Icon"
                      />
                    </button>
                  )}
                </form>
              </>
            )}
          </Formik>

          {popup && (
            <>
              <div className={Styles.suggestions}>
                {loading ? (
                  <Spinner toggle={false} />
                ) : (
                  <>
                    {suggestions && suggestions.length > 0 ? (
                      <>
                        {suggestions.map((item: any) => (
                          <li
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
                            style={{ color: "#aaa" }}
                          >
                            <FontAwesomeIcon
                              icon={faBolt}
                              style={{
                                color: item.color,
                              }}
                              className={Styles.pointer}
                            />{" "}
                            {item.category}
                          </li>
                        ))}
                      </>
                    ) : (
                      <div>
                        <h1 className={Styles.error}>
                          No suggestions to show :/
                        </h1>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div
                onClick={() => setPopup(false)}
                className={Styles.invincible}
              ></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  storecatogries: state.jokes.categories,
  loading: state.jokes.loading,
});

export default connect(mapStateToProps, {
  getJokesByCategories,
})(Index);
