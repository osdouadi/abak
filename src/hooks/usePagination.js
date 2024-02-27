import { useMemo } from 'react';

// Create dots constant
export const DOTS = '...';

export const usePagination = ({
  siblingCount = 1,
  currentPage,
  totalPageCount,
}) => {
  const paginationRange = useMemo(() => {
    // Applying pagination logic
    const totalPageNumbers = siblingCount + 5;

    // State 1: if  number of pages is less than the page numbers
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    // Calculate the left && right sibling index
    // 1 => calculate the left sibling index
    const leftSibIndex = Math.max(currentPage - siblingCount, 1);

    // 2 => calculate the right sibling index
    const rightSibIndex = Math.min(currentPage + siblingCount, totalPageCount);

    // Calculation for showing dots from left or right or both
    let pagesToShow = range(leftSibIndex, rightSibIndex);

    // Check if we need dots on the left
    if (leftSibIndex > 2) {
      pagesToShow = [1, DOTS, ...pagesToShow];
    }
    // Check if we need dots on the right
    if (rightSibIndex < totalPageCount - 2) {
      pagesToShow = [...pagesToShow, DOTS, totalPageCount];
    }

    return pagesToShow;
  }, [siblingCount, currentPage, totalPageCount]);

  return paginationRange;
};

function range(startNum, endNum) {
  const length = endNum - startNum + 1;

  // return array with a range of undefined elements
  return Array.from({ length }, (value, index) => index + startNum);
}
