const PasswordIcon = () => {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-y-0 flex items-center px-4 pointer-events-none"
    >
      <svg
        aria-hidden="true"
        className="w-5 h-5 md:h-8 md:w-8 lg:h-5 lg:w-5 sm:h-5 sm:w-5 xsm:h-5 xsm:w-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        ></path>
      </svg>
    </div>
  );
};

export default PasswordIcon;
