import React, { useState } from "react";
import classes from "./QuizPage.module.css";
import QuizLogo from "../../assets/earth.svg";
import { useSelector } from "react-redux";
import ChoicesButtons from "./ChoicesButtons";
import LoadingScreen from "../UI/LoadingScreen";

const ContinentQuestion = (props) => {
  const question = useSelector((state) => state.quiz.currentQuestion);


  return (
    <section className={`${classes.card} ${classes.container}`}>
      <h1 className={classes["card-heading"]}>Country Quiz</h1>
      <img src={QuizLogo} className={classes["Quiz-Logo"]} />
      <h2 className={classes["question-heading"]}>
      🌎 In which continent can you find the country of {question.countryName}?
      </h2>
      <div className={classes["choices"]}>
        <ChoicesButtons />
      </div>
    </section>
  );
};

export default ContinentQuestion;
