import "./css/StatusStyle.css";

const StatusStyle = (props) => {
  const style = props.style;
  return <div className={style}>{props.children}</div>;
};

export default StatusStyle;
