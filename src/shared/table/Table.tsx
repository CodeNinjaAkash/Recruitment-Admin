import { useState, useMemo, useEffect } from "react";
import { sortRows, filterRows, paginateRows } from "./helpers";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "react-js-pagination";
import { pagenum } from "../../redux/features/counter/CounterSlice";
import { toast } from "react-toastify";
import { IColumn } from "../../interfaces/comman";
export const Table = ({
  columns,
  rows,
  actions,
  onClickName,
  onClickAction,
  rowsPerPage,
  heading,
  btnText,
  btnTexts,
  onClickBtn,
  onClickBtns,
  linking,
  exportdata,
  dataSize,
  joinlink,
  filter,
}: {
  columns: IColumn[];
  rows: object[];
  actions?: { name: string }[];
  onClickName?: (id: string) => void;
  onClickAction?: (id: string, name: string) => void;
  rowsPerPage: number;
  heading?: string;
  btnText?: string;
  btnTexts?: string;
  onClickBtn?: () => void;
  onClickBtns?: () => void;
  linking?: string;
  exportdata?: boolean;
  dataSize: number|null;
  joinlink?: string;
  filter?: React.ReactNode;
}) => {
  const optiontypeObj: {
    Single: string;
    Multiple: string;
    Query: string;
  } = {
    Single: "Radio Button",
    Multiple: "Checkbox",
    Query: "Text Box",
  };
  const [Show, setShow] = useState(false);
  const page = useSelector(
    (state: { counter: { page: number } }) => state.counter.page
  );

  const [activePage, setActivePage] = useState<number>(1);
  const [filters] = useState({});
  const [sort] = useState({ order: "desc", orderBy: "registerDate" });
  const filteredRows = useMemo(
    () => filterRows(rows, filters),
    [rows, filters]
  );
  const sortedRows = useMemo(
    () => sortRows(filteredRows, sort),
    [filteredRows, sort]
  );
  const calculatedRows: {
    _id?: string;
    link?: string;
    resultPercentage?: string;
    optionType?: string;
  }[] = useMemo(() => {
    return paginateRows(sortedRows, activePage, rowsPerPage);
  }, [sortedRows, activePage, rowsPerPage]);

  const count = filteredRows.length;
  const dispatch = useDispatch();
  

  const handlePageChange = (pageNumber: number) => {
    setActivePage(pageNumber);

    dispatch(pagenum(pageNumber));
  };
  useEffect(() => {
    setActivePage(page);
  }, [page]);

  return (
    <>
      <div className="card">
        <div className="card-header bg-white space-y-2 p-4 sm:px-8 sm:py-4 lg:p-4 xl:px-4 xl:py-4 border-2 border-white border-b-gray-300">
          <div className=" text-center flex">
            <h2 className="font-semibold text-slate-900 text-lg mr-4">
              {heading}
            </h2>
            {btnTexts && (
              <span
                onClick={onClickBtns}
                className="hover:bg-neutral-600 group flex  rounded-md bg-neutral-900 text-white text-center text-sm font-medium ml-auto pl-2 pr-2 py-2 shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-left-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                </svg>
              </span>
            )}

            {linking && (
              <span className="hover:bg-blue-600 group flex rounded-md bg-blue-700 text-center text-white text-sm font-medium mr-1 pl-2 pr-2 py-2 shadow-sm">
                {linking}
              </span>
            )}
            {exportdata && (
              <span
                onClick={() => setShow(!Show)}
                className="hover:text-neutral-600 group flex cursor-pointer text-center text-sm font-medium mr-1 py-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-funnel-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z" />
                </svg>
              </span>
            )}

            {btnText && (
              <button
                className="hover:bg-blue-600 group flex rounded-md bg-blue-700 text-center text-white text-sm font-medium ml-auto pl-2 pr-2 py-2 shadow-sm"
                onClick={onClickBtn}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-plus-circle-fill mr-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                </svg>{" "}
                {btnText}
              </button>
            )}

            {/* {btnTexts && (
              <button
                className="hover:bg-blue-600 group flex rounded-md bg-blue-700 text-center text-white text-sm font-medium mr-1 pl-2 pr-2 py-2 shadow-sm"
                onClick={onClickBtn}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-plus-circle-fill mr-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                </svg>{" "}
                {btnTexts}
              </button>
            )} */}
          </div>
          {Show && filter}
        </div>
        <div className="card-body">
          <div className="table-scrollable">
            <table className="table">
              <thead>
                <tr>
                  {columns.map((column: IColumn) => {
                    return (
                      <th key={`${column.accessor}-sort`}>{column.label}</th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                {calculatedRows?.map(
                  (
                    row: {
                      _id?: string;
                      link?: string;
                      resultPercentage?: string;
                      optionType?: string;
                    },
                    index: number
                  ) => {
                    return (
                      <tr key={`${index}-row`}>
                        {columns.map((column: IColumn, index: number) => {
                          return (
                            <td
                              onClick={() =>
                                index === 5 || index === 6
                                  ? null
                                  :onClickName&& onClickName(row?._id||'')
                              }
                              key={column.accessor}
                            >
                              {column.accessor !== "isCorrect" ? (
                                <span>
                                  {column.accessor === "optionType" ? (
                                    <span>
                                      {
                                        optiontypeObj[
                                          row.optionType as keyof typeof optiontypeObj
                                        ]
                                      }
                                    </span>
                                  ) : (
                                    <>
                                      {row["link"] ===
                                        row[
                                          column.accessor as keyof typeof row
                                        ] && row["link"] != null ? (
                                        <button
                                          onClick={() => {
                                            const textToCopy =
                                              row[
                                                column.accessor as keyof typeof row
                                              ] || "";

                                            if (navigator?.clipboard) {
                                              navigator.clipboard
                                                .writeText(textToCopy)
                                                .then(() => {
                                                  toast.success(
                                                    "Link copied to clipboard"
                                                  );
                                                })
                                                .catch((err) => {
                                                  toast.error(
                                                    "Failed to copy link"
                                                  );
                                                });
                                            } else {
                                              const tempTextArea =
                                                document.createElement(
                                                  "textarea"
                                                );
                                              tempTextArea.value =
                                                textToCopy as string;

                                              document.body.appendChild(
                                                tempTextArea
                                              );
                                              tempTextArea.select();
                                              document.execCommand("copy");
                                              document.body.removeChild(
                                                tempTextArea
                                              );
                                              toast.success(
                                                "Link copied to clipboard"
                                              );
                                            }
                                          }}
                                        >
                                          Copy link
                                        </button>
                                      ) : null}
                                      {actions &&
                                        actions?.map(
                                          (
                                            action: { name: string },
                                            indexe: number
                                          ) => (
                                            <span
                                              className={`flex cursor-pointer text-blue-500 items-center`}
                                              key={`${indexe}-Resume`}
                                              onClick={() =>onClickAction&&
                                                onClickAction(
                                                  row?._id||"",
                                                  action?.name
                                                )
                                              }
                                            >
                                              {index === 5 &&
                                              action.name === "Result" &&
                                              row["resultPercentage"]
                                                ? row[
                                                    column.accessor as keyof typeof row
                                                  ]
                                                : null}

                                              {row["link"] ===
                                                row[
                                                  column.accessor as keyof typeof row
                                                ] &&
                                              index === 6 &&
                                              action.name === "Rejoin Link"
                                                ? action.name
                                                : null}
                                            </span>
                                          )
                                        )}
                                      <span>
                                        {row["link"] ===
                                          row[
                                            column.accessor as keyof typeof row
                                          ] && row["link"] != null
                                          ? null
                                          : index !== 5
                                          ? row[
                                              column.accessor as keyof typeof row
                                            ]
                                          : null}
                                      </span>
                                    </>
                                  )}
                                </span>
                              ) : (
                                <span>
                                  {row[column.accessor as keyof typeof row] ===
                                  "true" ? (
                                    <span className="text-green-500 flex">
                                      <span className="pr-1">
                                        <svg
                                          fill="currentColor"
                                          xmlns="http://www.w3.org/2000/svg"
                                          height="20"
                                          width="20"
                                        >
                                          <path d="m8.938 13 4.958-4.938L12.833 7l-3.895 3.875-1.771-1.75-1.063 1.063ZM10 18q-1.646 0-3.104-.625-1.458-.625-2.552-1.719t-1.719-2.552Q2 11.646 2 10q0-1.667.625-3.115.625-1.447 1.719-2.541Q5.438 3.25 6.896 2.625T10 2q1.667 0 3.115.625 1.447.625 2.541 1.719 1.094 1.094 1.719 2.541Q18 8.333 18 10q0 1.646-.625 3.104-.625 1.458-1.719 2.552t-2.541 1.719Q11.667 18 10 18Zm0-1.5q2.708 0 4.604-1.896T16.5 10q0-2.708-1.896-4.604T10 3.5q-2.708 0-4.604 1.896T3.5 10q0 2.708 1.896 4.604T10 16.5Zm0-6.5Z" />
                                        </svg>
                                      </span>
                                    </span>
                                  ) : row[
                                      column.accessor as keyof typeof row
                                    ] === "false" ? (
                                    <span className="text-red-500 flex">
                                      <span className="pr-1">
                                        <svg
                                          fill="currentColor"
                                          xmlns="http://www.w3.org/2000/svg"
                                          height="20"
                                          width="20"
                                        >
                                          <path d="M7.062 14 10 11.062 12.938 14 14 12.938 11.062 10 14 7.062 12.938 6 10 8.938 7.062 6 6 7.062 8.938 10 6 12.938ZM10 18q-1.646 0-3.104-.625-1.458-.625-2.552-1.719t-1.719-2.552Q2 11.646 2 10q0-1.667.625-3.115.625-1.447 1.719-2.541Q5.438 3.25 6.896 2.625T10 2q1.667 0 3.115.625 1.447.625 2.541 1.719 1.094 1.094 1.719 2.541Q18 8.333 18 10q0 1.646-.625 3.104-.625 1.458-1.719 2.552t-2.541 1.719Q11.667 18 10 18Zm0-1.5q2.708 0 4.604-1.896T16.5 10q0-2.708-1.896-4.604T10 3.5q-2.708 0-4.604 1.896T3.5 10q0 2.708 1.896 4.604T10 16.5Zm0-6.5Z" />
                                        </svg>
                                      </span>
                                    </span>
                                  ) : (
                                    <span>Query</span>
                                  )}
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer flex items-center">
          {dataSize !== null ? (
            count > 0 ? (
              <Pagination
                activePage={activePage}
                itemsCountPerPage={rowsPerPage}
                totalItemsCount={dataSize}
                pageRangeDisplayed={10}
                onChange={(e) => handlePageChange(e)}
              />
            ) : (
              <p>No data found</p>
            )
          ) : null}
        </div>
      </div>
    </>
  );
};
