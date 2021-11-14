module.exports = {
  mode: "jit",
  purge: ["./app/**/*.tsx"],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
