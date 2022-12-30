/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
    content: ['./index.html', './src/**/*.{vue,ts}'],
    theme: {
        extend: {},
    },
    plugins: [
        plugin(function ({ addComponents }) {
            addComponents({
                '.centerized': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                '.ease-transition': {
                    transition: 'all 0.3s ease-in-out',
                },
            });
        }),
    ],
};
