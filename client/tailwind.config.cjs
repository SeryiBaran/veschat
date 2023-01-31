/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#2563eb',
          secondary: '#4f46e5',
          accent: '#4b5563',
          neutral: '#191D24',
          'base-100': '#2A303C',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
    ],
  },
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
};
