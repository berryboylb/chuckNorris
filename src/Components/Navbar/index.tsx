import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Styles from "./css/styles.module.css";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

const Index = () => {
  const [mobileNav, setmobileNav] = useState<boolean>(false);
  const [popup, setPopup] = useState<boolean>(false);

  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  const handleMobileNav = () => {
    if (isMobile) {
      setmobileNav(!mobileNav);
    }
  };

  // const activeStyle: {
  //   background: string;
  // } = {
  //   background: "#d0ba93",
  // };
  // const emptyStyle: { background: string } = { background: "#5e5e5e" };
  return (
    <nav className={Styles.nav}>
      <div className={`my-container ${Styles.inner}`}>
        <ul className={mobileNav ? Styles.navActive : Styles.navLinks}>
          <li className={Styles.list}>
            <NavLink
              // style={({ isActive }) => (isActive ? activeStyle : emptyStyle)}
              to="/fdhfdh"
            >
              So funcktioniert's
            </NavLink>
          </li>
          <li className={Styles.list}>
            <NavLink
              // style={({ isActive }) => (isActive ? activeStyle : emptyStyle)}
              to="/fdhfdh"
            >
              Sonderangebote
            </NavLink>
          </li>
          <li className={Styles.listEnd} onClick={() => setPopup(!popup)}>
            <img
              className={Styles.persona}
              src="/assets_Homework_Front-End_02/shape@2x.png"
              alt="Person Icon"
            />
            mein bereich
            <img
              className={Styles.arrow}
              src="/assets_Homework_Front-End_02/path@2x.png"
              alt="Person Icon"
            />
            {popup && (
              <>
                <div className={Styles.links}>
                  <FontAwesomeIcon
                    icon={faChevronUp}
                    style={{
                      color: "#fff",
                      fontSize: 15,
                      position: "absolute",
                      top: "-.5rem",
                      right: "1.2rem",
                    }}
                    className={Styles.pointer}
                  />
                  <NavLink onClick={() => setPopup(!false)} to="">
                    My Pulished Jokes
                  </NavLink>
                  <NavLink onClick={() => setPopup(!false)} to="">
                    My Saved Jokes
                  </NavLink>
                  <NavLink onClick={() => setPopup(!false)} to="">
                    Account Information
                  </NavLink>
                  <NavLink onClick={() => setPopup(!false)} to="">
                    Publish New Joke
                  </NavLink>
                </div>
                <div
                  onClick={() => setPopup(!false)}
                  className={Styles.invincible}
                ></div>
              </>
            )}
          </li>
        </ul>
        <div
          className={mobileNav ? Styles.bro : Styles.burger}
          onClick={handleMobileNav}
        >
          <div className={Styles.line0}></div>
          <div className={Styles.line1}></div>
          <div className={Styles.line2}></div>
        </div>
      </div>
    </nav>
  );
};

export default Index;
