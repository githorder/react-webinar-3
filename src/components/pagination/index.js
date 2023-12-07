import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import "./style.css";

import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

import PaginationItem from "../pagination-item";

function Pagination({ totalItems, itemsPerPage }) {
  const store = useStore();

  const callbacks = {
    changePage: useCallback(
      (page) => {
        store.actions.pagination.change(page);
        store.actions.catalog.load(10, (page - 1) * 10);
      },
      [store]
    ),
  };

  const select = useSelector((state) => ({
    currentPage: state.pagination.currentPage,
  }));

  const cn = bem("Pagination");
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className={cn()}>
      {[...Array(totalPages)].map((_, id) => {
        const page = id + 1;

        if (page === select.currentPage) {
          return (
            <div key={page}>
              <PaginationItem
                onChangePage={callbacks.changePage}
                currentPage={select.currentPage}
              >
                {page}
              </PaginationItem>
            </div>
          );
        }

        if (1 === select.currentPage && page === 2) {
          return (
            <div key={page}>
              <PaginationItem
                onChangePage={callbacks.changePage}
                currentPage={select.currentPage}
              >
                {page}
              </PaginationItem>
            </div>
          );
        }

        if (1 === select.currentPage && page === 3) {
          return (
            <div key={page}>
              <PaginationItem
                onChangePage={callbacks.changePage}
                currentPage={select.currentPage}
              >
                {page}
              </PaginationItem>
              <span>...</span>
            </div>
          );
        }

        if (totalPages === select.currentPage && page === totalPages - 1) {
          return (
            <div key={page}>
              <PaginationItem
                onChangePage={callbacks.changePage}
                currentPage={select.currentPage}
              >
                {page}
              </PaginationItem>
            </div>
          );
        }

        if (totalPages === select.currentPage && page === totalPages - 2) {
          return (
            <div key={page}>
              <span>...</span>
              <PaginationItem
                onChangePage={callbacks.changePage}
                currentPage={select.currentPage}
              >
                {page}
              </PaginationItem>
            </div>
          );
        }

        if (page === select.currentPage - 1 && page !== 1) {
          return (
            <div key={page}>
              <span>...</span>
              <PaginationItem
                onChangePage={callbacks.changePage}
                currentPage={select.currentPage}
              >
                {page}
              </PaginationItem>
            </div>
          );
        }

        if (page === select.currentPage + 1 && page !== totalPages) {
          return (
            <div key={page}>
              <PaginationItem
                onChangePage={callbacks.changePage}
                currentPage={select.currentPage}
              >
                {page}
              </PaginationItem>
              <span>...</span>
            </div>
          );
        }

        if (page === 1 || page === totalPages) {
          return (
            <div key={page}>
              <PaginationItem
                onChangePage={callbacks.changePage}
                currentPage={select.currentPage}
              >
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
