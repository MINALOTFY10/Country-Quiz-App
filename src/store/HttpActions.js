import { quizActions } from ".";
import { highScoreActions } from ".";

const gtCountryID = (obj1, obj2) => {
  return `${obj1}${
    obj2 == "undefined" ? Math.floor(Math.random() * 999) + 1 : obj2
  }`;
};

export const fetchQuizData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");

      if (!response.ok) {
        throw new Error("Could not fetch countries data!");
      }

      const data = await response.json();
      return data;
    };

    try {
      const countriesData = await fetchData();
      const myCountries = [];

      for (const countryObj of countriesData) {
        if (countryObj.hasOwnProperty("capital") && countryObj["independent"]) {
          myCountries.push({
            itemID: gtCountryID(countryObj.cca2, countryObj.ccn3),
            name: countryObj.name.common,
            capital: countryObj.capital[0],
            region: countryObj.region,
            flagImg: countryObj.flags.png,
          });
        }
      }

      dispatch(quizActions.setQuizData(myCountries));
      dispatch(quizActions.createQuestion());
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchHighScoreData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://country-quiz-app-7af0b-default-rtdb.firebaseio.com/highScore.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch countries data!");
      }

      const data = await response.json();
      return data;
    };

    try {
      const highScoreData = await fetchData();
      const highScore = [];

      for (const scoreKey in highScoreData) {
        highScore.push({
          score: highScoreData[scoreKey].score,
          name: highScoreData[scoreKey].name,
        });
      }

      dispatch(highScoreActions.setHighScoreData(highScore));
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendHighScoreData = (highScore) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://country-quiz-app-7af0b-default-rtdb.firebaseio.com/highScore.json",
        {
          method: "PUT",
          body: JSON.stringify(
            highScore
          ),
        }
      );

      if (!response.ok) {
        throw new Error("Sending highScore data failed.");
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log(error);
    }
  };
};
