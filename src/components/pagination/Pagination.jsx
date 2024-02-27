import { usePagination, DOTS } from '../../hooks/usePagination';

const Pagination = ({
  onPageChange,
  currentPage,
  siblingCount = 1,
  totalPageCount,
}) => {
  const paginationRange = usePagination({
    currentPage,
    siblingCount,
    totalPageCount,
  });

  // Case 1: Page.length === 1
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  // Case 2: Move to next page
  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  // Case 3: Move back to prev page
  const onPrev = () => {
    onPageChange(currentPage - 1);
  };

  // Case 4: last page
  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="   flex flex-col items-center px-5 py-5 xs:flex-row xs:justify-between">
      <div className="flex items-center">
        <button
          disabled={currentPage === 1}
          type="button"
          className="w-full p-5 text-base text-gray-600 bg-white border rounded-r-xl hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
          onClick={onPrev}
        >
          <svg
            width="10"
            fill="currentColor"
            height="10"
            className=""
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
          </svg>
        </button>
        {paginationRange.map((pageNumber, i) => {
          if (pageNumber === DOTS) {
            return (
              <button
                key={i}
                className=" cursor-default w-full px-5 py-4 text-[1.65rem] bg-white border"
              >
                &#8230;
              </button>
            );
          }

          return (
            <button
              key={`dots-${i}`}
              type="button"
              className={`w-full px-4 py-2 text-base border ${
                pageNumber === currentPage
                  ? 'page-btn text-white text-[1.65rem]'
                  : 'text-gray-600 bg-white hover:bg-gray-100 text-[1.65rem]'
              }`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          disabled={currentPage === lastPage}
          type="button"
          className="w-full p-5 text-[1.5rem] text-gray-600 bg-white border-t border-b border-l rounded-l-xl hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
          onClick={onNext}
        >
          <svg
            width="10"
            fill="currentColor"
            height="10"
            className=""
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
