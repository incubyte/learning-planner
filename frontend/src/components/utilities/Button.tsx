import "../../css/utilities/Button.css";
 
interface buttonProps {
  title: string;
}
const Button = ({ title }: buttonProps) => {
  return (
    <>
      <button className="buttonContainer" data-testid="courseCardButton">
        {title}
      </button>
    </>
  );
};
 
export default Button;