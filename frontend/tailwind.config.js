module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "sign-in":"url('https://wallpapercave.com/wp/wp6480749.jpg')",
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
    }
  },
  plugins: [require("tailwind-scrollbar-hide")],
};