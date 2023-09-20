import React, { useState } from "react";
import classes from "./QuizPage.module.css";
import QuizLogo from "../../assets/earth.svg";
import { useSelector } from "react-redux";
import ChoicesButtons from "./ChoicesButtons";
import LoadingScreen from "../UI/LoadingScreen";

const FlagQuestion = (props) => {
  const [isFlagLoaded, setIsFlagLoaded] = useState(false); // State to track flag image loading
  const question = useSelector((state) => state.quiz.currentQuestion);

  const handleFlagLoad = () => {
    setIsFlagLoaded(true);
  };

  return (
    <section className={`${classes.card} ${classes.container}`}>
      <h1 className={classes["card-heading"]}>Country Quiz</h1>
      <img src={QuizLogo} className={classes["Quiz-Logo"]} />
      {!isFlagLoaded ? <LoadingScreen /> : ""}
      <img
        src={question.flag}
        alt={`Flag of ${question.name}`}
        className={classes["country-flag"]}
        width={100}
        onLoad={handleFlagLoad}
      />
      <h2 className={classes["question-heading"]}>
        Which country does this flag belong to?
      </h2>
      <div className={classes["choices"]}>
        <ChoicesButtons />
      </div>
    </section>
  );
};

export default FlagQuestion;
