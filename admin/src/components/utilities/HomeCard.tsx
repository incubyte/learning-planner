import SeeMore from "./icons/SeeMore";

interface HomeCardProp {
  count?: number;
  dataTestId: string;
  header: string;
  link?: string;
  linkText: string;
}
const HomeCard = (props: HomeCardProp) => {
  return (
    <>
      <div data-testid={props.dataTestId} className="HomeCardContainer">
        <h5 data-testid="cardHeader" className="HomeCardHeader">
          {props.header}
        </h5>
        <p data-testid="cardBody" className="HomeCardBody">
          {props.count}
        </p>
        <a data-testid="cardLink" href={props.link} className="HomeCardLink">
          {props.linkText}
          <SeeMore />
        </a>
      </div>
    </>
  );
};

export default HomeCard;
