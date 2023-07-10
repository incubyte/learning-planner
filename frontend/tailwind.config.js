module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  plugins: [require("@tailwindcss/line-clamp")],
  theme: {
    extend: {
      backgroundImage: {
        "sign-in":
          "url('https://res.cloudinary.com/dxepcudkt/image/upload/v1684157784/login-image-md_ijdzl7.jpg')",
        "sign-in-sm":
          "url('https://res.cloudinary.com/dxepcudkt/image/upload/v1684156403/login-image-sm_ctkol5.jpg')",
      },
      boxShadow: {
        table:
          "0px 3.2px 7.2px 0px rgba(0, 0, 0, 0.13), 0px 0.6px 1.8px 0px rgba(0, 0, 0, 0.11)",
      },
      screens: {
        xsm: "200px",
        sm: "390px",
        smd: "530px",
        md: "640px",
        mdl: "900px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};