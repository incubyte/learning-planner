const EmailIcon = () => {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-y-0 flex items-center px-4 pointer-events-none"
    >
      <svg
        className="h-5 w-5 md:h-8 md:w-8 lg:h-5 lg:w-5 sm:h-5 sm:w-5 xsm:h-5 xsm:w-5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
      </svg>
    </div>
  );
};

export default EmailIcon;
