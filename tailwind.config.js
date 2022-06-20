module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        celeste: '#3ba1da',
      },
      fontSize: {
        xxs: '.7rem'
      },
      animation: {
        'bg-luna': 'backLuna 50s linear infinite',
        'bg-luna-md': 'backLunaMD 50s linear infinite',
        'bg-estrella-fugaz': 'backEstrellaFugaz 10s linear infinite',
        'bg-fondo-espacio': 'backEspacio 900s linear infinite',
        'bg-nave-espacial': 'backNaveEspacial 40s linear infinite',
        'bg-nave-espacial-xs': 'backNaveEspacialXS 40s linear infinite',
        'enter-card': 'enterCard 1s ',
        'exit-card': 'exitCard 1s ',
        'rigth-to-left': 'enterFromLeft 0.5s linear',
        'top-to-down': 'enterFromTop 0.4s linear',
        'left-to-right': 'enterFromRight 0.5s linear',
        'left-to-right_1s': 'enterFromRight 0.3s linear',
        'left-to-right_1.5s': 'enterFromRight 0.8s linear',
        'back-to-left': 'backToLeft 0.5s linear',
        'back-to-right': 'backToRight 0.5s linear',
        'left-to-right-competences': 'enterFromRightCompetences 5s linear',
        'right50': 'moveRight50 0.5s linear',
        'text-banner': 'enterFromSmall 10s linear',
        'bg-color': 'enterColor 0.5s linear',
      },
      keyframes: {
        enterColor: {
          '0%': { transform: "opacity-25" },
          '100%': { transform: "opacity-100" },
        },
        backLuna: {
          '0%': { transform: "translate(400%,250%)" },
          '100%': { transform: "translate(-200%,-200%)" },
        },
        backLunaMD: {
          '0%': { transform: "translate(400%,550%)" },
          '100%': { transform: "translate(-200%,-200%)" },
        },
        backEstrellaFugaz: {
          '0%': { 'background-position': '3300px 1600px' },
          '100%': { 'background-position': '-1000px -800px' },
        },
        backEspacio: {
          '0%': { 'background-position': '0px 0px' },
          '100%': { 'background-position': '-10000px -8000px' },
        },
        backNaveEspacial: {
          '0%': { transform: "translate(4000px,2000px)" },
          '100%': { transform: "translate(-200px,-100px)" },
        },
        backNaveEspacialXS: {
          '0%': { transform: "translate(4000px,5000px)" },
          '100%': { transform: "translate(-200%,-200%)" },
        },
        enterCard: {
          '0%': { transform: "scale(0.5)" },
          '100%': { transform: "scale(1)" },
        },
        exitCard: {
          '0%': { transform: "scale(1)" },
          '100%': { transform: "scale(0.5)" },
        },
        enterFromLeft: {
          '0%': { transform: "translate(100%,0%)" },
          '100%': { transform: "translate(0%,0%)" },
        },
        enterFromRight: {
          '0%': { transform: "translate(-100%,0%)" },
          '100%': { transform: "translate(0%,0%)" },
        },
        enterFromTop: {
          '0%': { transform: "translate(0%,-250%)" },
          '100%': { transform: "translate(0%,0%)" },
        },
        enterFromRightCompetences: {
          '0%': { transform: "translate(-100%,0%)" },
          '100%': { transform: "translate(0%,0%)" },
        },
        backToLeft: {
          '0%': { transform: "translate(0%,0%)" },
          '100%': { transform: "translate(-100%,0%)" },
        },
        backToRight: {
          '0%': { transform: "translate(0%,0%)" },
          '100%': { transform: "translate(100%,0%)" },
        },
        moveRight50: {
          '0%': { transform: "translate(0%,0%)" },
          '100%': { transform: "translate(500%,0%)" },
        },
        enterFromSmall: {
          '0%': { transform: "scale(5,5)" },
          '100%': { transform: "scale(1,1)" },
        },
      }
    },
  },
  plugins: [],
};
