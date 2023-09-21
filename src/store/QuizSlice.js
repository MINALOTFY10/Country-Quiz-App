import { createSlice } from "@reduxjs/toolkit";

const initialQuizState = {
  countries: [],
  questionType: 0,
  currentQuestion: {},
  totalScore: -1,
  countryIndex: 0,
  choosenAnswerIndex: 0,
  rightAnswerIndex: 0,
  isTheAnswerRight: null,
  answerChoosen: false,
  buttonsState: [],
  isTheQuizEnded: false,
  theQuestionsFinished: false,
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
    endTheQuestions(state) {
      state.endTheQuestions = true;
    },
    toggleTheButtons(state, action) {
      state.buttonsState = new Array(4).fill(false);
      state.buttonsState[state.rightAnswerIndex] = true;
      state.buttonsState[state.choosenAnswerIndex] = true;
      state.answerChoosen = true;
    },
    toggleTheQuestions(state) {
      state.questionType === 2
        ? (state.questionType = 0)
        : state.questionType++;
    },
    resetQuestionsType(state) {
      state.questionType = 0;
    },
    createQuestion(state) {
      state.currentQuestion = {
        allAnswers: [], // Initialize the allAnswers property
      };
      state.choosenAnswerIndex = 0;
      state.rightAnswerIndex = 0;
      state.isTheAnswerRight = null;
      state.answerChoosen = false;
      state.buttonsState = [];
      state.totalScore++;
      let randomIndex;

      const getRandomIndex = (range) => Math.floor(Math.random() * range);
      state.rightAnswerIndex = getRandomIndex(4); // Moved this line outside the functions

      const getAllAnswers = (numOfAnswers, value) => {
        let previousIndexes = new Set();

        while (numOfAnswers--) {
          // check if the index is repeated or not
          do {
            randomIndex = getRandomIndex(state.countries.length - 1);
          } while (previousIndexes.has(randomIndex) || randomIndex == state.countryIndex);

          // add the index so it won't repeat in the future
          previousIndexes.add(randomIndex);

          // Add the right answer in random index
          if (state.rightAnswerIndex === numOfAnswers) {
            // Fixed this condition
            state.currentQuestion["allAnswers"].push(
              state.currentQuestion.rightAnswer
            );
            previousIndexes.add(state.countryIndex)
          }

          // Add the all answers
          state.currentQuestion["allAnswers"].push(
            value === "names"
              ? state.countries[randomIndex].name
              : state.countries[randomIndex].capital
          );
        }
      };

      const getAllContinentAnswers = (numOfAnswers) => {
        let myContinents = [
          "North America",
          "Oceania",
          "Africa",
          "Europe",
          "South America",
          "Asia",
          "Antarctica",
        ];

        const updatedContinents = myContinents.filter(
          (continent) => continent !== state.currentQuestion.rightAnswer
        );

        let previousIndexes = new Set();

        while (numOfAnswers--) {
          // check if the index is repeated or not
          do {
            randomIndex = getRandomIndex(updatedContinents.length - 1);
          } while (previousIndexes.has(randomIndex));

          // add the index so it won't repeat in the future
          previousIndexes.add(randomIndex);

          // Add the right answer in random index
          if (state.rightAnswerIndex === numOfAnswers) {
            // Fixed this condition
            state.currentQuestion["allAnswers"].push(
              state.currentQuestion.rightAnswer
            );
          }

          // Add the all answers
          state.currentQuestion["allAnswers"].push(
            updatedContinents[randomIndex]
          );
        }
      };

      if (state.questionType == 0) {
        // Remove the previous chosen country
        state.countries.splice(state.countryIndex, 1);
        // Find a random Country
        state.countryIndex = getRandomIndex(state.countries.length - 1);
      }

      // Create a flag or Country question
      state.questionType == 0
        ? (state.currentQuestion = {
            flag: state.countries[state.countryIndex].flagImg,
            rightAnswer: state.countries[state.countryIndex].name,
            allAnswers: [],
          })
        : state.questionType == 1
        ? (state.currentQuestion = {
            countryName: state.countries[state.countryIndex].name,
            rightAnswer: state.countries[state.countryIndex].capital,
            allAnswers: [],
          })
        : (state.currentQuestion = {
            countryName: state.countries[state.countryIndex].name,
            rightAnswer: state.countries[state.countryIndex].continent,
            allAnswers: [],
          });

      console.log(state.countries.length);

      // Get the wrong answers
      state.questionType == 0
        ? getAllAnswers(3, "names")
        : state.questionType == 1
        ? getAllAnswers(3, "capitals")
        : getAllContinentAnswers(3);

      // Add the right Answer if it isn't added
      if (state.currentQuestion["allAnswers"].length === 3) {
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
