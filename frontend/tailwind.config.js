module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "sign-in":"url('https://res.cloudinary.com/dxepcudkt/image/upload/v1684157784/login-image-md_ijdzl7.jpg')",
        "sign-in-sm":"url('https://res.cloudinary.com/dxepcudkt/image/upload/v1684156403/login-image-sm_ctkol5.jpg')",
      },
      screens:{
      "xsm": "200px",
      "sm": "390px",
      "smd":"530px",
      "md": "640px",
      "mdl": "900px",
      "lg": "1024px",
      "xl": "1280px",
      "2xl": "1536px"
    },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};