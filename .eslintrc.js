module.exports = {
    env: {
        node: true,
        es2021: true,
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
    ],
    rules: {
        'indent': ['warn', 4],
        'vue/max-attributes-per-line': ['warn', {
            'singleline': {
                'max': 3
            },
            'multiline': {
                'max': 1
            }
        }],
        'semi': [
            'error',
            'never',
        ],
        'vue/first-attribute-linebreak': ['error', {
            'singleline': 'ignore',
            'multiline': 'beside'
        }],
        'vue/multi-word-component-names': 'off',
        'vue/html-indent': [
            'error',
            4,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: false,
                ignores: ['pre', 'textarea']
            }
        ],
        'vue/no-v-html': 'off'
    },
}
