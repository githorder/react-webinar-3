import { useMemo } from "react";

export const DOTS = "...";

function range(start, end) {
  const length = end - start + 1;

  return Array.from({ length }, (_, idx) => start + idx);
}

function usePagination({ currentPage, pageSize, totalItems, siblingCount }) {
  const paginationRange = useMemo(() => {
    const pageCount = Math.ceil(totalItems / pageSize);

    const pageNumbers = siblingCount + 5;
    const firstPageIndex = 1;
    const lastPageIndex = pageCount;

    if (pageNumbers >= pageCount) {
      return range(firstPageIndex, lastPageIndex);
    }

    const leftSiblingPageIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingPageIndex = Math.min(
      currentPage + siblingCount,
      pageCount
    );

    const shouldShowLeftDots = leftSiblingPageIndex > 2;
    const shouldShowRightDots = rightSiblingPageIndex < pageCount - 2;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + siblingCount * 2;
      const leftRange = range(firstPageIndex, leftItemCount);
      return [...leftRange, DOTS, lastPageIndex];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + siblingCount * 2;
      const rightRange = range(pageCount - rightItemCount + 1, pageCount);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingPageIndex, rightSiblingPageIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [currentPage, pageSize, totalItems, siblingCount]);

  return paginationRange;
}

export default usePagination;
