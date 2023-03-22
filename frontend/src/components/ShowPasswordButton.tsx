import PasswordHideIcon from "./icons/PasswordHide";
import PasswordShowIcon from "./icons/PasswordShow";

interface ShowPasswordButtonProp {
  passwordShow?: boolean;
  setPasswordShow?: Function;
}

const ShowPasswordButton = (props: ShowPasswordButtonProp) => {
  return (
    <div className="absolute right-0 z-30 inset-y-1 flex items-center px-4 ">
      <button
        data-testid="signupPasswordButton"
        type="button"
        onClick={() => {
          props.setPasswordShow && props.setPasswordShow(!props.passwordShow);
        }}
        className="z-30 "
      >
        {props.passwordShow ? <PasswordShowIcon /> : <PasswordHideIcon />}
      </button>
    </div>
  );
};

export default ShowPasswordButton;
