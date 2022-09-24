import React from "react";
import Styles from "./css/styles.module.css";
const index = () => {
  return (
    <footer className={Styles.footer}>
      <div className="my-container">
        <h1>
          Got jokes? get paid <br /> for submitting!
        </h1>
        <button>
          submit jokes{" "}
          <img
            src="/assets_Homework_Front-End_01/path-copy@2x.png"
            alt="arrow"
          />
        </button>
      </div>
    </footer>
  );
};

export default index;
