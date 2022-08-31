/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
    purge: [
      './html/**.{html,js}'
    ],
  theme: {
    colors: {
      'transparent' : 'transparent',
      'current' : 'currentColor',
      'olive' : '#859a6a',
      'olive-light' : '#b7b881',
      'olive-white' : '#e3e7db',
      'white' : '#ffffff',
      'byb-orange-light' : '#ff9966',
      'byb-orange' : '#cc6600',
      'black' : '#000000',

    },
    extend: {
      fontFamily: {
        'open-sans': ["Open Sans", "sans-serif"],

        'oswald': ["Oswald","sans-serif"],
      },
    },
  },
}

