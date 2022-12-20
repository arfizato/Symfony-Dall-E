/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./assets/**/*.js",
    "./templates/**/*.html.twig",
  ],
  theme: {
    extend: {
      fontFamily:{
        modern:["Oswald","Roboto condensed"]
      },
      animation:{
        "invalidField" : "shakeBot 0.8s both",
      },
      keyframes:{
        shakeBot: {
          "0%, 100%":{
            transform: "rotate(0deg)"
            // transform-origin: 50% 100%;
          },
          "10%": {
            transform: "rotate(1deg)"
          },
          "20%, 40%, 60%": {
            transform: "rotate(-2deg)"
          },
          "30%, 50%, 70%": {
            transform: "rotate(2deg)"
          },
          "80%": {
            transform: "rotate(-1deg)"
          },
          "90%": {
            transform: "rotate(1deg)"
          }
        }
      }
    },
  },
  plugins: [],
}
