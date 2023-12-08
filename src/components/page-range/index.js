import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";

import "./style.css";

import PaginationItem from "../pagination-item";

import usePagination, { DOTS } from "../../hooks/usePagination";

function PageRange({ currentPage, pageSize, totalItems, changePage }) {
  const pageRange = usePagination({
    currentPage,
    pageSize,
    totalItems,
    siblingCount: 1,
  });

  const cn = bem("PageRange");

  return (
    <div className={cn()}>
      {pageRange.map((pageNumber, id) => {
        if (pageNumber === DOTS) {
          return <span key={`${DOTS}-${id}`}>&#8230;</span>;
        }

        return (
          <div key={pageNumber}>
            <PaginationItem onChangePage={changePage} currentPage={currentPage}>
              {pageNumber}
            </PaginationItem>
          </div>
        );
      })}
    </div>
  );
}

PageRange.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  changePage: PropTypes.func,
};

PageRange.defaultProps = {
  changePage: () => {},
};

export default memo(PageRange);
