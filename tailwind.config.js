/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        headerBg: "#101739",
        mainBg: "#0C1121",
        main: "#6C74FC",
        inputBg: "#2A3254",
        "main-text-color": "#CCCEE3",
        "color-float": "#151D35",
        "label-text-color": "#CCCEE3",
        "chapter-border-color": "#222F5C",
      },
      width: {
        main: "1300px",
      },
      keyframes: {
        "login-animation": {
          "0%": {
            "-webkit-transform": "translateY(-50px);",
            transform: "translateY(-50px);",
          },
          "100%": {
            "-webkit-transform": "translateY(0);",
            transform: "translateY(0);",
          },
        },

        "slide-in-left": {
          "0%": {
            opacity: 0,
            transform: "translateX(100%)",
          },
          "100%": {
            opacity: 1,
            transform: "translateX(0)",
          },
        },
        "fade-out": {
          to: {
            opacity: 0,
            }
        }
      },
      animation: {
        "login-animation":
          "login-animation 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-in-left": "slide-in-left ease 0.5s, fade-out linear 3s 10000s forwards",//forwards: dừng lại ở điểm cuối animation
      },
      maxWidth: {
        main: "1300px",
      },
      minHeight: {
        'fs': '100vh'
      }
    },
  },
  plugins: [],
};
