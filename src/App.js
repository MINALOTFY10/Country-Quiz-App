import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import QuizPage from "./components/QuizPage/QuizPage";
import { fetchQuizData, fetchHighScoreData } from "./store/HttpActions";

function App() {
  const dispatch = useDispatch();
  const [isStarted, setIsStarted] = useState(false);
  const countriesData = useSelector((state) => state.quiz.countries);

  useEffect(() => {
    dispatch(fetchQuizData());
    dispatch(fetchHighScoreData());
  }, [dispatch]);

  const startQuiz = () => {
    setIsStarted(true);
  };

  return (
    <div>
      {!isStarted ? (
        <>
          <WelcomePage onClickStartHandler={startQuiz} />
        </>
      ) : (
        <QuizPage countriesData={countriesData} />
      )}
    </div>
  );
}

export default App;
