import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      type={props.type}
      className={`${classes["button-pushable"]} ${
        props.className ? props.className : ""
      }`}
      role="button"
      onClick={props.startButtonHandler}
    >
      <span className={classes["button-shadow"]}></span>
      <span className={classes["button-edge"]}></span>
      <span className={classes["button-front"]}>{props.children}</span>
    </button>
  );
};

export default Button;
