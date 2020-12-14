module.exports = {
  theme: {
    fontFamily: {
      poppins: ["Poppins"],
      noto: ["Noto Sans"],
    },
    extend: {
      colors: {
        primary: "#2F80ED",
        secondary: "#828282",
      },
      backgroundImage: (theme) => ({
        banner: "url('/images/banner.jpg')",
        logo:"url('/images/logos/tweeter-small.svg')"
      }),
    },
  },
};
