import React from "react";
import { Link } from "react-router-dom";
import "./notFound.scss";

export const NotFound = () => (
  <div className="wrapper">
    <div className="error-pg">
      <div className="error-number">
        <div className="number left-coffee">4</div>
        <div className="coffee-mug" />
        <div className="number right-coffee">4</div>
      </div>
      <div className="sm-screen">404</div>
      <div className="mean-msg">
        Nothing to see here, <Link to="/">go back home!</Link>
      </div>
    </div>
  </div>
);
