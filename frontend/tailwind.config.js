/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#05070a',
        panel: '#0c1117',
        panelSoft: '#121923',
        line: '#20303d',
        mist: '#aab7c4',
        auralis: '#19e6c1'
      },
      boxShadow: {
        glow: '0 0 32px rgba(25, 230, 193, 0.16)'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif']
      }
    }
  },
  plugins: []
};
