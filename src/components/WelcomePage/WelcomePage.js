import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { highScoreActions } from "../../store";
import Button from "../UI/Button";
import HighScoreTable from "./HighScoreTable";
import myLogo from "../../assets/myLogo.webp";
import QuizLogo from "../../assets/earth.svg";
import classes from "../QuizPage/QuizPage.module.css";
import welcomeClasses from "./WelcomePage.module.css";

const WelcomePage = (props) => {
  const dispatch = useDispatch();
  const [enteredValue, setEnteredValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  const goalInputChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (enteredValue.trim().length === 0) {
      setIsValid(false);
      return;
    }
    dispatch(highScoreActions.setUserName(enteredValue));
    props.onClickStartHandler();
    setEnteredValue(" ");
  };

  return (
    <Fragment>
      <section
        className={`${classes.card} ${welcomeClasses["container"]} ${welcomeClasses["welcome-card"]}`}
      >
        <h1 className={welcomeClasses["card-heading"]}>GlobeQuiz Hub</h1>
        <img src={QuizLogo} className={welcomeClasses["Quiz-Logo"]} />
        <img
          src={myLogo}
          alt="Quiz Logo"
          width={400}
          className={welcomeClasses["Logo"]}
        />

        <form onSubmit={formSubmitHandler} className={welcomeClasses["form"]}>
          <div
            className={`${welcomeClasses["form-control"]} ${
              !isValid && welcomeClasses.invalid
            }`}
          >
            <input
              type="text"
              onChange={goalInputChangeHandler}
              value={enteredValue}
              placeholder="Your Name...."
            />
          </div>

          <Button type="submit" className={welcomeClasses["start-button"]}>
            Start Quiz
          </Button>
        </form>
        <HighScoreTable />
      </section>
    </Fragment>
  );
};

export default WelcomePage;
