

export function isEmpty(obj = {}) {
    return Object.keys(obj).length === 0
  }

  export function isString(value: unknown) {
    return typeof value === 'string' || value instanceof String
  }

  export function isNumber(value: number) {
    return typeof value == 'number' && !isNaN(value)
  }

  export function isBoolean(value: boolean) {
    return value === true || value === false
  }

  export function isNil(value: null) {
    return typeof value === 'undefined' || value === null
  }

  export function isDateString(value: string) {
    if (!isString(value)) return false

    return value.match(/^\d{2}-\d{2}-\d{4}$/)
  }

  export function convertDateString(value: string) {
    return value.substr(6, 4) + value.substr(3, 2) + value.substr(0, 2)
  }

  export function toLower(value: string) {
    if (isString(value)) {
      return value.toLowerCase()
    }
    return value
  }

  export function convertType(value: string) {
    if (typeof value === 'string' && isDateString(value)) {
      return convertDateString(value);
  }

  if (typeof value === 'boolean') {
      return value ? '1' : '-1';
  }

  return value;

  }

  export function filterRows(rows: object[], filters: { [key: string]: string }) {
    if (isEmpty(filters)) return rows;

    return rows.filter((row) => {
      return Object.keys(filters).every((accessor) => {
        const value = (row as { [key: string]: string })[accessor];
        const searchValue = filters[accessor];

        if (typeof value === 'string') {
          return toLower(value).includes(toLower(searchValue));
        }

        if (typeof value === 'boolean') {
          return (searchValue === 'true' && value) || (searchValue === 'false' && !value);
        }

        if (typeof value === 'number') {
          return value === Number(searchValue);
        }

        return false;
      });
    });
  }


  export function sortRows(rows: object[], sort: { order: string; orderBy: string }) {
    return rows.sort()
  }

  export  function paginateRows(sortedRows: object[], activePage: number, rowsPerPage: number) {
    return [...sortedRows];
  }
