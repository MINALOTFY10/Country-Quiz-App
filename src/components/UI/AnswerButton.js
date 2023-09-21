import { useSelector, useDispatch } from "react-redux";
import { quizActions } from "../../store";
import { sendHighScoreData } from "../../store/HttpActions";
import classes from "./AnswerButton.module.css";

const AnswerButton = (props) => {
  const dispatch = useDispatch();

  const isTheAnswerRight = useSelector((state) => state.quiz.isTheAnswerRight);
  const name = useSelector((state) => state.highscore.userName);
  const highScores = useSelector((state) => state.highscore.highScores);
  const score = useSelector((state) => state.quiz.totalScore);
  const countries = useSelector((state) => state.quiz.countries);

  const onClickHandler = (index) => {
    if (index == -1) {
      if (isTheAnswerRight) {
        dispatch(quizActions.toggleTheQuestions());
        if (countries.length <= 4) {
          dispatch(quizActions.endTheQuiz());
          dispatch(quizActions.endTheQuestions());
        } else {
          dispatch(quizActions.createQuestion());
        }
      } else {
        dispatch(quizActions.endTheQuiz());
        const newScore = {
          score: score,
          name: name,
        };

        let myHighScores = [...highScores, newScore];

        // Sort highScores in descending order based on score
        myHighScores.sort((a, b) => b.score - a.score);

        // Check if the length of highScores is greater than 5, and if so, remove the last element
        if (myHighScores.length > 5) {
          myHighScores.pop();
        }

        dispatch(sendHighScoreData(myHighScores));
      }
    } else {
      dispatch(quizActions.setChoosenAnswerIndex(index));
      dispatch(quizActions.toggleTheButtons());
    }
  };

  const buttonClasses = `${classes["button-64"]} ${
    props.className ? props.className : ""
  }`;

  return (
    <button
      className={buttonClasses}
      onClick={() => onClickHandler(props.index)}
    >
      <span>
        <p className={classes["Question-text"]}>{props.children}</p>
      </span>
    </button>
  );
};

export default AnswerButton;
