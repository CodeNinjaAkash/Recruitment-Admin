import React, { FC } from "react";
import cn from "classnames";
import { toast } from "react-toastify";
interface IMInputField {
  className?: string;
  labelText?: string;
  labelClassName?: string;
  inputType: string;
  inputName?: string;
  inputValue?: unknown;
  inputPlaceHolder?: string;
  onChange?: (value: string) => void;
  max?: number;
  inputClassName?: string;
  id: string;
  isDisabled?: boolean;
  required?: boolean;
  Asterisk?: React.ReactNode;
  pattern?: string;
}

const MInputField: FC<IMInputField> = ({
  className,
  labelText,
  labelClassName,
  inputType,
  inputName,
  inputValue,
  inputPlaceHolder,
  onChange = () => {},
  inputClassName,
  id,
  pattern,
}) => {
  return (
    <div className={cn("mb-4", className && "")}>
      <label
        htmlFor={`${id}`}
        className={cn("form-label", labelClassName && "")}
      >
        {labelText}
      </label>
      <input
        id={id ? `${id}` : id}
        type={inputType ? `${inputType}` : inputType}
        name={inputName ? `${inputName}` : ""}
        value={inputValue ? `${inputValue}` : ""}
        placeholder={inputPlaceHolder ? `${inputPlaceHolder}` : ""}
        onChange={(e) => {
          const re = /^[0-9\b]+$/;

          if (e.target.value === "" || re.test(e.target.value)) {
            onChange(e.target.value);
          } else {
            toast.error("Please enter numbers only.");
          }
        }}
        minLength={10}
        maxLength={10}
        className={cn("form-control", inputClassName && "")}
        pattern={pattern}
      />
    </div>
  );
};

export default MInputField;
