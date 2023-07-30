import React, { ChangeEvent, FC } from "react";
import cn from "classnames";
interface Itextarea {

  labelText?: string;
  labelClassName?: string;
  inputName?: string;
  inputValue?: string;
  inputPlaceHolder?: string;
  onChange?: (value: string) => void;
  id: string;
  rows?: string;
  class: string;
  isDisabled?: boolean
}
const Textarea: FC<Itextarea> = ({
  labelText,
  labelClassName,
  inputName,
  inputValue,
  inputPlaceHolder,
  onChange,
  id,
  isDisabled
}) => {
  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (onChange) {
      onChange(value);
    }
  };
  return (
    <>
      <label
        htmlFor={`${id}`}
        className={cn("form-label",
        `${labelClassName}`)}
      >
        {labelText}
      </label>
      <textarea
      id={`${id}`}
      name={`${inputName}`}
      value={`${inputValue}`}
      placeholder={`${inputPlaceHolder}`}
      onChange={handleTextareaChange}
      disabled={isDisabled}
        className={cn("form-control")}

      ></textarea>
    </>
  );
};

export default Textarea;
