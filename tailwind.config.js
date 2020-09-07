module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.jsx", "./src/**/*.js"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      screens: {
        xs: { max: "400px" },
      },
    },
  },
};