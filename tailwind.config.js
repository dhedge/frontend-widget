module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: "#0c0d0d",
          dark: "#191a1a",
          medium: "#232424",
          light: "#313232",
        },
        grey: { DEFAULT: "#aab0b2" },
        blue: { DEFAULT: "#00a0d0", light: "#7ae0ff" },
        white: { DEFAULT: "#fdfdfd" },
        red: { DEFAULT: "#dd0a3d" },
        green: { DEFAULT: "#00c75b" },
      },
    },
  },
  variants: {
    extend: {},
    opacity: ({ after }) => after(["disabled"]),
  },
  plugins: [],
};
