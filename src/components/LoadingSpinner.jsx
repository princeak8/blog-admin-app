import classes from "./css/LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={classes.backdrop}>
      <div className={classes.spinner}></div>;
    </div>
  );
};

export default LoadingSpinner;
