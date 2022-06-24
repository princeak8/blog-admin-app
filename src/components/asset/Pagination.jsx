import _ from "lodash";
import PropTypes from "prop-types";
import "./css/Pagination.css";

const Pagination = (props) => {
  const {
    itemsCount,
    pageSize,
    currentPage,
    onPageChange,
    onGotoFirstPage,
    onGotoLastPage,
  } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);

  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  let start_index = 0;
  if (currentPage > 1) start_index = currentPage - 2;

  return (
    <nav>
      <ul className="pagination">
        <span className="first" onClick={onGotoFirstPage}>
          {currentPage > 2 && "<<First"}
        </span>
        {pages
          .map((page) => (
            <li
              key={page}
              className={
                page === currentPage
                  ? "page-item pointer active"
                  : "page-item pointer"
              }
            >
              <a className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </a>
            </li>
          ))
          .slice(start_index, currentPage + 4)}{" "}
        <span className="first" onClick={() => onGotoLastPage(pagesCount)}>
          {currentPage !== pagesCount && "Last>>"}
        </span>
        <span className="total-pages">{`Page ${currentPage} out of ${pagesCount}`}</span>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
export default Pagination;
