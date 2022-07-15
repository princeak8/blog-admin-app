import "./css/Table.css";

const Table = (props) => {
  let topMargin = "mt-5";
  if (props.styling === "reports") topMargin = null;

  return (
    <table
      className={`${props.styling} table table-borderless table-hover ${topMargin}`}
      hidden={props.hidden}
    >
      {props.children}
    </table>
  );
};

export default Table;
