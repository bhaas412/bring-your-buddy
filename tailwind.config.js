/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/css/input.css./node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
fontFamily:{

  oswald:"'Oswald'"
}

    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

