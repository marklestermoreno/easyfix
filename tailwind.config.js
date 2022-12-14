module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: ({ colors }) => ({
      primary: "#2c2c2c",
      secondary: "#295bc9",
      white: "#fff",
      red: colors.red,
      green: colors.green
    }),
    extend: {},
  },
  plugins: [],
}