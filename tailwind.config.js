/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",  // Add components folder
    "./utils/**/*.{js,jsx,ts,tsx}"        // Add utils folder
    
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: "#4a5759",
        grey: "#dedbd2",
        accent: "#b0c4b1",
        white: "#FFFFFF",
      },
      fontFamily: {
        title: ["Roboto_900Black"],
        'title-bold': ["Roboto_700Bold"],
        body: ["Poppins_400Regular"],
        'body-medium': ["Poppins_500Medium"],
        'body-semibold': ["Poppins_600SemiBold"],
        'body-bold': ["Poppins_700Bold"],
        display: ["Anton_400Regular"],
      }
    },
  },
  nativewind: {
    styledComponents: ['LinearGradient'],
  },
  plugins: [],
};

