import * as FiIcon from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import filter from "./asset/filter.png";
import exportIcon from "./asset/export.png";
import { userActions } from "../store/userSlice";
import "./css/Search.css";
import { Capitalize } from "../utils/helpers";

const Search = (props) => {
  const {
    onExport,
    onhandleFilterItemSelect,
    filterItem,
    onhandleIndexChange,
  } = props;
  const input = useSelector((state) => state.userDisplay.searchField);
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    const inputData = event.target.value.toLowerCase();
    onhandleIndexChange();
    // dispatch(userDisplayActions.searchItem(inputData));
  };

  return (
    <div className="search-container">
      <div className="searchbox">
        <form>
          <input
            type="text"
            placeholder="Search.."
            name="search"
            value={input}
            onChange={handleSearch}
          />
          <FiIcon.FiSearch className="searchicon" />
        </form>
      </div>

      <select className="filter-container" onChange={onhandleFilterItemSelect}>
        {filterItem ? (
          filterItem.map((item) => (
            <option key={item.id ? item.id : item.name}>
              {Capitalize(item.name)}
            </option>
          ))
        ) : (
          <option>No item</option>
        )}
      </select>

      <div className="filter-container" onClick={onExport}>
        <img src={exportIcon} className="filter" alt="filter Icon" />
        <span>Export</span>
      </div>
    </div>
  );
};

export default Search;
