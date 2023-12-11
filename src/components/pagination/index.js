import { memo } from "react";
import { Link } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";

import "./style.css";

import { DOTS, getPaginationRange } from "../../utils";

function Pagination({ currentPage, pageSize, totalItems, loadProducts }) {
  const pageRange = getPaginationRange({
    currentPage,
    pageSize,
    totalItems,
    siblingCount: 1,
  });

  const cn = bem("Pagination");

  return (
    <div className={cn()}>
      {pageRange.map((pageNumber, id) => {
        if (pageNumber === DOTS) {
          return <span key={`${DOTS}-${id}`}>&#8230;</span>;
        }

        return (
          <Link
            key={pageNumber}
            to={`/catalog/${pageNumber}`}
            // onClick={() =>
            //   loadProducts(pageSize, (pageNumber - 1) * pageSize, pageNumber)
            // }
            className={`${cn("item")} ${
              currentPage === pageNumber ? cn("item--active") : ""
            }`}
          >
            {pageNumber}
          </Link>
        );
      })}
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  loadProducts: PropTypes.func,
};

Pagination.defaultProps = {
  loadProducts: () => {},
};

export default memo(Pagination);
