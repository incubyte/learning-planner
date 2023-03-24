import { useState } from "react";
import ShowPasswordButton from "./ShowPasswordButton";

interface InputProp {
  icon: any;
  dataTestId: string;
  Id: string;
  type?: string;
  placeholder: string;
  validation?: any;
  showPasswordButton: boolean;
}

const Input = (props: InputProp) => {
  const [passwordShow, setPasswordShow] = useState<boolean>(false);

  return (
    <div className="space-y-2 text-gray-700">
      <div className="relative  focus-within:text-gray-900 dark:focus-within:text-gray-800 ">
        <props.icon />
        <input
          className="SignUpFormInput"
          id={props.Id}
          data-testid={props.dataTestId}
          type={
            (props.showPasswordButton === true
              ? passwordShow
                ? "text"
                : "password"
              : props.type) || "text"
          }
          placeholder={props.placeholder}
          {...props.validation}
        />
        {props.showPasswordButton && (
          <ShowPasswordButton
            dataTestId={props.dataTestId + "Button"}
            passwordShow={passwordShow}
            setPasswordShow={setPasswordShow}
          />
        )}
      </div>
    </div>
  );
};

export default Input;
