import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import "./style.css";

import useSelector from "../../store/use-selector";

import PaginationItem from "../pagination-item";

function Pagination({ totalItems, itemsPerPage }) {
  const select = useSelector((state) => ({
    currentPage: state.pagination.currentPage,
  }));

  const cn = bem("Pagination");
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className={cn()}>
      {[...Array(totalPages)].map((_, id) => {
        const page = id + 1;

        if (1 === select.currentPage && page === 2) {
          return (
            <div key={page}>
              <PaginationItem currentPage={select.currentPage}>
                {page}
              </PaginationItem>
            </div>
          );
        }

        if (1 === select.currentPage && page === 3) {
          return (
            <div key={page}>
              <PaginationItem currentPage={select.currentPage}>
                {page}
              </PaginationItem>
              <span>...</span>
            </div>
          );
        }

        if (totalPages === select.currentPage && page === totalPages - 1) {
          return (
            <div key={page}>
              <PaginationItem currentPage={select.currentPage}>
                {page}
              </PaginationItem>
            </div>
          );
        }

        if (totalPages === select.currentPage && page === totalPages - 2) {
          return (
            <div key={page}>
              <span>...</span>
              <PaginationItem currentPage={select.currentPage}>
                {page}
              </PaginationItem>
            </div>
          );
        }

        if (page === select.currentPage - 1) {
          return (
            <div key={page}>
              <span>...</span>
              <PaginationItem currentPage={select.currentPage}>
                {page}
              </PaginationItem>
            </div>
          );
        }

        if (page === select.currentPage + 1) {
          return (
            <div key={page}>
              <PaginationItem currentPage={select.currentPage}>
                {page}
              </PaginationItem>
              <span>...</span>
            </div>
          );
        }

        if (page === 1 || page === totalPages) {
          return (
            <div key={page}>
              <PaginationItem currentPage={select.currentPage}>
                {page}
              </PaginationItem>
            </div>
          );
        }
      })}
    </div>
  );
}

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
};

export default memo(Pagination);
