import "../../css/utilities/Footer.css";

const Footer = () => {
  return (
    <>
      <footer data-testid="footer" role="footer">
        <div className="FooterContainer">
          <div className="FooterContent">
            <span className="FooterContentText">
              © 2023{" "}
              <a href="https://www.incubyte.co/" data-testid="footerLink">
                Incubyte
              </a>
              . All Rights Reserved.
            </span>
            <div className="FooterIconLinkSection">
              <a
                href="https://www.linkedin.com/company/incubyte"
                className="FooterLink"
              >
                <svg
                  className="FooterIcons"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 14 14"
                >
                  <path d="M12.812 0H1.187C.532 0 0 .53 0 1.187v11.625C0 13.47.53 14 1.187 14h11.625C13.47 14 14 13.47 14 12.812V1.187C14 .53 13.47 0 12.812 0zM4.937 11.375H2.25V5.875h2.688V11.375zM3.593 4.95c-.736 0-1.331-.596-1.331-1.33 0-.733.595-1.328 1.33-1.328s1.33.595 1.33 1.33c-.001.733-.598 1.328-1.33 1.328zM11.375 11.375h-2.688V8.5c0-.619-.012-1.414-.862-1.414-.862 0-.99.672-.99 1.366v2.923H4.937V5.875h2.333v.727c.312-.484 1.02-.99 2.1-.99 2.25 0 2.666 1.487 2.666 3.41v3.333z" />
                </svg>

                <span className="sr-only">LinkedIn page</span>
              </a>
              <a
                href="https://www.youtube.com/@incubyte_co"
                className="FooterLink"
              >
                <svg
                  className="FooterIcons"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.987 6.573a2.87 2.87 0 0 0-2.022-2.028C19.65 4.06 12 4.06 12 4.06s-7.65 0-9.965.485a2.87 2.87 0 0 0-2.022 2.028C-.006 8.994-.006 12-.006 12s0 3.006 .485 5.427a2.87 2.87 0 0 0 2.022 2.028C4.35 19.94 12 19.94 12 19.94s7.65 0 9.965-.485a2.87 2.87 0 0 0 2.022-2.028C24.006 15.006 24.006 12 24.006 12s0-3.006-.019-5.427ZM9.75 15.217V8.783L15.217 12Z" />
                </svg>
                <span className="sr-only">Youtube Page</span>
              </a>
              <a
                href="https://twitter.com/Incubyte_co?s=20"
                className="FooterLink"
              >
                <svg
                  className="FooterIcons"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 17"
                >
                  <path
                    fillRule="evenodd"
                    d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Twitter page</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
