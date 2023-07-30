import React, { ChangeEvent, FC } from "react";
import cn from "classnames";

interface IInputField {
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
  minLength?: number;
  maxLength?: number;
  id: string;
  isDisabled?: boolean;
  required?: boolean;
  Asterisk?:React.ReactNode;
  autocomplete?:string
}
const InputField: FC<IInputField> = ({
  className,
  labelText,
  labelClassName,
  inputType,
  inputName,
  inputValue,
  inputPlaceHolder,
  onChange,
  max,
  inputClassName,
  minLength,
  maxLength,
  id,
  isDisabled,
  required,
  Asterisk,
  autocomplete
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className={cn("mb-4", className && '')}>
      <label
        htmlFor={`${id}`}
        className={cn("form-label", labelClassName && '')}
      >
        {labelText }{Asterisk}
      </label>
      <input
        id={id ? `${id}` : id}
        type={inputType ? `${inputType}` : inputType}
        name={inputName ? `${inputName}` : ''}
        value={inputValue ? `${inputValue}` : ''}
        placeholder={inputPlaceHolder ? `${inputPlaceHolder}` : ''}
        max={max ? `${max}` : ''}
        onChange={handleInputChange}
        minLength={minLength}
        maxLength={maxLength}
        disabled={isDisabled}
        className={cn("form-control", inputClassName && '')}
        required={required}
        autoComplete={autocomplete}
      />
    </div>
  );
};

export default InputField;
