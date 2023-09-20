import React from "react";
import AnswerButton from "../UI/AnswerButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "font-awesome/css/font-awesome.min.css";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import classes from "./ChoicesButtons.module.css";

const ChoicesButtons = () => {
  const question = useSelector((state) => state.quiz.currentQuestion);
  const rightAnswerIndex = useSelector((state) => state.quiz.rightAnswerIndex);
  const buttonsState = useSelector((state) => state.quiz.buttonsState);
  const answerChoosen = useSelector((state) => state.quiz.answerChoosen);

  
  const array = [0, 1, 2, 3];
  return (
    <Fragment>
      {array.map((index) => (
        <AnswerButton
          key ={index}
          index={index}
          className={
            answerChoosen
              ? classes["deactivated-asnwer"] && buttonsState[index]
                ? rightAnswerIndex === index
                  ? classes["right-asnwer"]
                  : classes["wrong-asnwer"]
                :  classes["deactivated-asnwer"]
              : buttonsState[index]
              ? rightAnswerIndex === index
                ? classes["right-asnwer"]
                : classes["wrong-asnwer"]
              : ""
          }
        >
          {question["allAnswers"][index]}{" "}
          {buttonsState[index] ? (
            rightAnswerIndex == index ? (
              <FontAwesomeIcon icon={faCircleCheck} />
            ) : (
              <FontAwesomeIcon icon={faCircleXmark} />
            )
          ) : (
            ""
          )}
        </AnswerButton>
      ))}
      {answerChoosen ? (
        <AnswerButton index={-1} className={classes["next-button"]}>
          Next
        </AnswerButton>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default ChoicesButtons;
