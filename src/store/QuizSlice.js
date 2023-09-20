import { createSlice } from "@reduxjs/toolkit";

const initialQuizState = {
  countries: [],
  isQuestionFlag: false,
  currentQuestion: {},
  totalScore: -1,
  choosenAnswerIndex: 0,
  rightAnswerIndex: 0,
  isTheAnswerRight: null,
  answerChoosen: false,
  buttonsState: [],
  isTheQuizEnded: false,
};

const QuizSlice = createSlice({
  name: "quiz",
  initialState: initialQuizState,
  reducers: {
    setQuizData(state, action) {
      state.countries = action.payload;
    },
    setChoosenAnswerIndex(state, action) {
      state.choosenAnswerIndex = action.payload;
      state.isTheAnswerRight =
        state.rightAnswerIndex === state.choosenAnswerIndex;
    },

    startTheQuiz(state) {
      state.isTheQuizEnded = false;
      state.totalScore = -1;
    },
    endTheQuiz(state) {
      state.isTheQuizEnded = true;
    },
    toggleTheButtons(state, action) {
      state.buttonsState = new Array(4).fill(false);
      state.buttonsState[state.rightAnswerIndex] = true;
      state.buttonsState[state.choosenAnswerIndex] = true;
      state.answerChoosen = true;
    },
    toggleTheQuestions(state) {
      state.isQuestionFlag = !state.isQuestionFlag;
    },
    createQuestion(state) {
      const isQuestionFlag = state.isQuestionFlag;

      state.currentQuestion = {
        allAnswers: [], // Initialize the allAnswers property
      };
      state.choosenAnswerIndex = 0;
      state.rightAnswerIndex = 0;
      state.isTheAnswerRight = null;
      state.answerChoosen = false;
      state.buttonsState = [];
      state.totalScore++;

      // Check if a question can made
      if (state.countries.length < 4) {
        state.currentQuestion = {};
        return;
      }

      const getRandomIndex = (range) => Math.floor(Math.random() * range);
      let rightAnswerIndex = getRandomIndex(4);

      const getAllAnswers = (numOfAnswers, value) => {
        let previousIndexes = new Set();

        while (numOfAnswers--) {
          // check if the index is repeated or not
          do {
            randomIndex = getRandomIndex(state.countries.length - 1);
          } while (previousIndexes.has(randomIndex));

          // add the index so it won't repeat in the future
          previousIndexes.add(randomIndex);

          // Add the right answer in random index
          if (rightAnswerIndex == numOfAnswers - 1) {
            state.currentQuestion["allAnswers"].push(
              state.currentQuestion.rightAnswer
            );
          }

          // Add the all answers
          state.currentQuestion["allAnswers"].push(
            value == "name"
              ? state.countries[randomIndex].name
              : state.countries[randomIndex].capital
          );
        }
      };

      // Find a random Country
      let randomIndex = getRandomIndex(state.countries.length - 1);

      // Create a flag or Country question
      isQuestionFlag
        ? (state.currentQuestion = {
            flag: state.countries[randomIndex].flagImg,
            rightAnswer: state.countries[randomIndex].name,
            allAnswers: [],
          })
        : (state.currentQuestion = {
            capital: state.countries[randomIndex].capital,
            rightAnswer: state.countries[randomIndex].name,
            allAnswers: [],
          });

      // Remove the choosen country
      state.countries.splice(randomIndex, 1);

      // Get the worng answers
      getAllAnswers(3, isQuestionFlag ? "name" : "name");

      // Add the right Answer if it isn't added
      if (state.currentQuestion["allAnswers"].length == 3) {
        state.currentQuestion["allAnswers"].push(
          state.currentQuestion.rightAnswer
        );
      }

      state.rightAnswerIndex = state.currentQuestion["allAnswers"].indexOf(
        state.currentQuestion.rightAnswer
      );
    },
  },
});

export default QuizSlice;
