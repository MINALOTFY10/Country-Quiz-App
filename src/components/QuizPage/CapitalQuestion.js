import { useSelector } from "react-redux";
import QuizLogo from "../../assets/earth.svg";
import ChoicesButtons from "./ChoicesButtons";
import classes from "./QuizPage.module.css";

const CapitalQuestion = () => {
  const question = useSelector((state) => state.quiz.currentQuestion);


  return (  
    <section className={`${classes.card} ${classes.container}`}>  
      <h1 className={classes["card-heading"]}>Country Quiz</h1>
      <img src={QuizLogo} className={classes["Quiz-Logo"]} />
      <h2 className={classes["question-heading"]}>
      🌎 What's the capital of {question.countryName}:
      </h2>
      <div className={classes["choices"]}>
        <ChoicesButtons />
      </div>
    </section>
  );
};

export default CapitalQuestion;
