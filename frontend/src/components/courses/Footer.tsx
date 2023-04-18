import "../../css/courses/Footer.css";

const Footer = () => {
  return (
    <>
      <footer
        className="coursePageFooterContainer"
        data-testid="footer"
        role="footer"
      >
        <div className="coursePageFooterContent">
          <span className="coursePageFooterContentText">
            © 2021{" "}
            <a
              href="https://www.incubyte.co/"
              className="coursePageFooterLink"
              data-testid="footerLink"
            >
              Incubyte
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
