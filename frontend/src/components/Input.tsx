import ShowPasswordButton from "./ShowPasswordButton";

interface InputProp {
  icon: any;
  dataTestId: string;
  Id: string;
  type: string;
  placeholder: string;
  validation?: any;
  showPasswordButton?: boolean;
  passwordShow?: boolean;
  setPasswordShow?: Function;
}

const Input = (props: InputProp) => {
  return (
    <div className="space-y-2 text-gray-700">
      <div className="relative  focus-within:text-gray-900 dark:focus-within:text-gray-800 ">
        <props.icon />
        <input
          className="SignUpFormInput"
          id={props.Id}
          data-testid={props.dataTestId}
          type={props.type}
          placeholder={props.placeholder}
          {...props.validation}
        />
        {props.showPasswordButton && (
          <ShowPasswordButton
            dataTestId={props.dataTestId + "Button"}
            passwordShow={props.passwordShow}
            setPasswordShow={props.setPasswordShow}
          />
        )}
      </div>
    </div>
  );
};

export default Input;
