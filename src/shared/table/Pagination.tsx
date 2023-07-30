interface IPagination {
  activePage: number;
  count: number;
  rowsPerPage: number;
  totalPages: number;
  setActivePage: (page: number) => void;
}
export const Pagination = ({
  activePage,
  count,
  rowsPerPage,
  totalPages,
  setActivePage,
}: IPagination) => {
  const beginning = activePage === 1 ? 1 : rowsPerPage * (activePage - 1) + 1;
  const end = activePage === totalPages ? count : beginning + rowsPerPage - 1;

  return (
    <>
      <p>
        Rows: {beginning === end ? end : `${beginning} - ${end}`} of {count}
      </p>
      <p className="mx-auto">
        Page {activePage} of {totalPages}
      </p>
      <div className="pagination flex">
        <button
          className="ml-2 cursor-pointer text-gray-500 hover:text-black w-[35px] border border-gray-300 inline-flex items-center justify-center h-[30px]"
          disabled={activePage === 1}
          onClick={() => setActivePage(1)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
            <path
              fill="currentColor"
              d="m21.5 18-9-6 9-6Zm-10 0-9-6 9-6Zm-2-6Zm10 0Zm-10 2.25v-4.5L6.1 12Zm10 0v-4.5L16.1 12Z"
            ></path>
          </svg>
        </button>
        <button
          className="ml-2 cursor-pointer text-gray-500 hover:text-black w-[35px] border border-gray-300 inline-flex items-center justify-center h-[30px]"
          disabled={activePage === 1}
          onClick={() => setActivePage(activePage - 1)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
            <path
              fill="currentColor"
              d="m14 18-6-6 6-6 1.4 1.4-4.6 4.6 4.6 4.6Z"
            ></path>
          </svg>
        </button>
        <button
          className="ml-2 cursor-pointer text-gray-500 hover:text-black w-[35px] border border-gray-300 inline-flex items-center justify-center h-[30px]"
          disabled={activePage === totalPages}
          onClick={() => setActivePage(activePage + 1)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
            <path
              fill="currentColor"
              d="M9.4 18 8 16.6l4.6-4.6L8 7.4 9.4 6l6 6Z"
            ></path>
          </svg>
        </button>
        <button
          className="ml-2 cursor-pointer text-gray-500 hover:text-black w-[35px] border border-gray-300 inline-flex items-center justify-center h-[30px]"
          disabled={activePage === totalPages}
          onClick={() => setActivePage(totalPages)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
            <path
              fill="currentColor"
              d="M2.5 18V6l9 6Zm10 0V6l9 6Zm-8-6Zm10 0Zm-10 2.25L7.9 12 4.5 9.75Zm10 0L17.9 12l-3.4-2.25Z"
            ></path>
          </svg>
        </button>
      </div>
    </>
  );
};
