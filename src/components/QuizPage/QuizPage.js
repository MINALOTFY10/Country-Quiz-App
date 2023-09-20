import FlagQuestion from "./FlagQuestion";
import CapitalQuestion from "./CapitalQuestion";
import ResultPage from "../ResultPage/ResultPage";
import { Fragment } from "react";
import { useSelector } from "react-redux";

const QuizPage = (props) => {
  const isQuestionFlag = useSelector((state) => state.quiz.isQuestionFlag);
  const isTheQuizEnded = useSelector((state) => state.quiz.isTheQuizEnded);

  return (
    <Fragment>
      {!isTheQuizEnded == false ? (
        <ResultPage />
      ) : isQuestionFlag ? (
        <FlagQuestion />
      ) : ( 
        <CapitalQuestion />
      )}
    </Fragment>
  );
};

export default QuizPage;
