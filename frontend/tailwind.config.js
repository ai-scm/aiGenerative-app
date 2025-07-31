/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      body: ['Open Sans', 'sans-serif'],
    },
    extend: {
      transitionProperty: {
        width: 'width',
        height: 'height',
      },
      animation: {
        fastPulse: 'pulse 0.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      colors: {
        'aws-squid-ink': {
          light: 'var(--aws-font-color)', //! Importante: Color de bordes,
          dark: '#171717',
        },
        'aws-sea-blue': {
          light: 'var(--aws-sea-blue)', //! Importante: Color principal de botones
          dark: '#757575',
        },
        'aws-sea-blue-hover': {
          light: 'var(--aws-sea-blue-hover)', //TODO: Crear con funcion para obtener el hover con transparencia
          dark: '#5b5b5b',
        },
        'aws-aqua': 'var(--aws-sea-blue-hover)', //TODO: Crear con funcion para obtener el hover con transparencia
        'aws-lab': '#38ef7d',
        'aws-mist': '#9ffcea',
        'aws-font-color': {
          light: 'var(--aws-font-color)', //! Importante: Color de fuente principal
          dark: '#cacaca',
          gray: '#909193',
          blue: '#276cc6',
        },
        'aws-font-color-white': {
          light: '#ffffff',
          dark:'#ececec',
        },
        'aws-ui-color': {
          dark: '#151515',
        },
        'aws-paper': {
          light: '#f1f3f3',
          dark: '#212121',
        },
        red: '#dc2626',
        'light-red': '#fee2e2',
        yellow: '#f59e0b',
        'light-yellow': '#fef9c3',
        'dark-gray': '#6b7280',
        gray: '#9ca3af',
        'light-gray': '#e5e7eb',
        'light-gray': '#e5e7eb',
        'houndoc-primary': 'var(--aws-sea-blue)', //! Importante: Color principal de botones
        'houndoc-primary-hover': 'var(--aws-sea-blue-hover)', //TODO: Crear con funcion para obtener el hover con transparencia
        'houndoc-primary-dark': 'var(--houndoc-primary-dark)', //TODO: Crear con funcion para obtener el hover con transparencia
        'houndoc-gray': '#f9f9f9',
        'houndoc-font-color': 'var(--aws-font-color)', //! Importante: Color de fuente principal
        'houndoc-font-color-white': '#ffffff',
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('@tailwindcss/typography'), require('tailwind-scrollbar')],
};
