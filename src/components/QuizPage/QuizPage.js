import FlagQuestion from "./FlagQuestion";
import CapitalQuestion from "./CapitalQuestion";
import ResultPage from "../ResultPage/ResultPage";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import ContinentQuestion from "./ContinentQuestion";

const QuizPage = (props) => {
  const questionType = useSelector((state) => state.quiz.questionType);
  const isTheQuizEnded = useSelector((state) => state.quiz.isTheQuizEnded);

  return (
    <Fragment>
      {!isTheQuizEnded == false ? (
        <ResultPage />
      ) : questionType === 0 ? (
        <FlagQuestion />
      ) : questionType === 1 ? (
        <CapitalQuestion />
      ) : (
        <ContinentQuestion />
      )}
    </Fragment>
  );
};

export default QuizPage;
