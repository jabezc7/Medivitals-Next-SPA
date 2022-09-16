const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        './index.html',
        './src/**/*.{js,vue}',
        './node_modules/@niftee-group/niftee-core/src/**/*.{js,vue}'
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Titillium Web', 'Roboto', 'Source Sans Pro', 'Open Sans', ...defaultTheme.fontFamily.sans]
            },
            colors: {
                gray: {
                    50: '#fbfbfb',
                    100: '#f9f9f9',
                    200: '#f6f6f6',
                    300: '#f1f5f8',
                    400: '#dae1e7',
                    500: '#b8c2cc',
                    600: '#8795a1',
                    700: '#606f7b',
                    800: '#3d4852',
                    900: '#3d4852'
                },
                charcoal: {
                    100: '#D8D8D8',
                    200: '#B1B1B1',
                    300: '#8B8B8B',
                    400: '#646464',
                    500: '#3d3d3d',
                    600: '#353535',
                    700: '#2E2E2E',
                    800: '#262626',
                    900: '#1F1F1F'
                },
                default: {
                    100: '#94B2C0',
                    200: '#799EB0',
                    300: '#5F8BA1',
                    400: '#447791',
                    500: '#296481',
                    600: '#235872',
                    700: '#1C4C63',
                    800: '#174054',
                    900: '#113344'
                },
                nifteeBlue: {
                    100: '#91bfe3',
                    200: '#7eb5df',
                    300: '#6caada',
                    400: '#59a0d6',
                    500: '#4795d1',
                    600: '#4086bc',
                    700: '#3977a7',
                    800: '#326892',
                    900: '#2b597d'
                }
            },
            minWidth: {
                32: '8rem',
                48: '12rem',
                56: '14rem',
                64: '16rem',
            },
            minHeight: {
                12: '3rem',
                13: '3.25rem',
                200: '200px',
                300: '300px',
                400: '400px',
                500: '500px',
            },
            maxWidth: {
                '1/2': '50%',
                '1/3': '33%',
                '1/4': '25%',
            },
            zIndex: {
                100: '100',
                999: '999',
                9999: '9999',
                99999: '99999',
                999999: '999999',
            },
            spacing: {
                26: '6.5rem',
                110: '28rem',
                119: '30rem',
                128: '32rem',
                192: '48rem',
            },
            borderWidth: {
                3: '3px',
            },
            opacity: {
                15: '0.15',
            },
            rotate: {
                '-180': '-180deg',
                '-90': '-90deg',
                '-45': '-45deg',
            },
            skew: {
                '-12': '-12deg',
                '-6': '-6deg',
                '-3': '-3deg',
            }
        }
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
    safelist: [
        {
            pattern: /bg-(default)-(100|200|300|400|500|600|700|800|900)/,
        },
        {
            pattern: /text-white/,
            variants: ['hover'],
        }
    ]
}
