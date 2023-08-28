module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "sign-in":
          "url('https://res.cloudinary.com/dxepcudkt/image/upload/v1684157784/login-image-md_ijdzl7.jpg')",
        "home-page":
          "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url('https://res.cloudinary.com/dxepcudkt/image/upload/v1691407906/HomePage_wecamc.jpg')",
        "course-page":
          "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url('https://res.cloudinary.com/dxepcudkt/image/upload/v1691411957/CoursePage_xgzpye.jpg')",
        "sign-in-sm":
          "url('https://res.cloudinary.com/dxepcudkt/image/upload/v1684156403/login-image-sm_ctkol5.jpg')",
      },
      boxShadow: {
        table:
          "2px 3.2px 7.2px 2px rgba(0, 0, 0, 0.13), 0px 0.6px 1.8px 0px rgba(0, 0, 0, 0.11)",
      },
      screens: {
        xsm: "200px",
        sm: "390px",
        smd: "530px",
        md: "640px",
        mdl: "900px",
        lg: "1154px",
        mlg: "1180px",
        xl: "1280px",
      },
      keyframes: {
        "skeleton-loading": {
          "0%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0 50%" },
        },
      },
      animation: {
        "skeleton-loading": "skeleton-loading 1.5s ease-in-out infinite",
      },
      backgroundColor: {
        "skeleton-loading":
          "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
      },
      backgroundSize: {
        "s-size": "200% 100%",
      },
      fontFamily: {
        inter: ["inter", "sans-serif"],
        nunito: ["nunito", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
