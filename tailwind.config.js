/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.input-box': {
          '@apply bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white':
            {},
        },
        '.label-text': {
          '@apply block mb-2 text-sm font-medium text-white dark:text-white':
            {},
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover', 'focus']);
    },
  ],
};
