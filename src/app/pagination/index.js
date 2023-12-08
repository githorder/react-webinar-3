import { memo, useCallback } from "react";

import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

import PageRange from "../../components/page-range";

function Pagination() {
  const store = useStore();
  const { currentPage, pageSize, totalItems } = useSelector((state) => ({
    currentPage: state.pagination.currentPage,
    pageSize: state.pagination.limit,
    totalItems: state.catalog.totalItems,
  }));

  const { changePage } = {
    changePage: useCallback(
      (page) => {
        store.actions.pagination.change(page);
        store.actions.catalog.load(pageSize, (page - 1) * pageSize);
      },
      [store]
    ),
  };

  return (
    <PageRange
      totalItems={totalItems}
      pageSize={pageSize}
      currentPage={currentPage}
      changePage={changePage}
    />
  );
}

export default memo(Pagination);
