import React, { ChangeEvent, FC } from "react";
import cn from "classnames";
interface Idropdawn {
  className?: string;
  labelText?: string;
  labelClassName?: string;
  id: string;
  name: string;
  dropdownArr: { name: string; value?: string }[];
  Select: string;
  selectedValue?: string;
  isDisabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  handleOnClickAddOptions?: (index: number) => void;
  setselectAns?: () => void;
}

const Dropdawn: FC<Idropdawn> = ({
  className,
  labelText,
  labelClassName,
  selectedValue,
  id,
  name,
  dropdownArr,
  Select,
  isDisabled,
  onChange,
  required,
  handleOnClickAddOptions,
  setselectAns,
}) => {
  return (
    <>
      <div className={cn("mb-4", className && "")}>
        <label
          htmlFor={`${id}`}
          className={cn("form-label", labelClassName && "")}
        >
          {labelText}
        </label>

        <div
          className={cn("form-group-inner", className && "")}
          style={{ height: "51px" }}
        >
         <select
            name={name}
            id={id}
            className={cn("form-control", className && "")}
            value={selectedValue}
            onChange={onChange}
            disabled={isDisabled}
            required={required}
            onClick={(e) => {
              setselectAns && setselectAns();
              handleOnClickAddOptions && handleOnClickAddOptions(0);
            }}
          >
            <option value=""> {`${Select}`}</option>
            {dropdownArr.map((obj, index) => (
              <option key={index} value={obj.value || obj.name}>
                {obj.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default Dropdawn;
