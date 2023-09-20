import { Fragment } from "react";
import { useSelector,useDispatch } from "react-redux";
import Button from "../UI/Button";
import Card from "../UI/Card";
import cupImage from "../../assets/cup.svg";
import classes from "./ResultPage.module.css";
import { fetchQuizData } from "../../store/HttpActions";
import { quizActions } from "../../store";

const ResultPage = () => {
  const dispatch = useDispatch();
  const totalScore = useSelector((state) => state.quiz.totalScore);

  const startButtonHandler = () => {
    dispatch(fetchQuizData());
    dispatch(quizActions.startTheQuiz());
  };
 
  return (
    <Card className={classes["result-card"]}>
      <img src={cupImage} className={classes["result-img"]}/>
      <h1>Results</h1>
      <div className={classes["result-statement"]}>
        You got <p className={classes["total-score"]}>{totalScore}</p> correct
        answers
      </div>
      <Button
        className={classes["try-again-button"]}
        startButtonHandler={startButtonHandler}
      >
        Try Again
      </Button>
    </Card>
  );
};

export default ResultPage;
