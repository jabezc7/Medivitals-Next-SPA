import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import commonjs from '@rollup/plugin-commonjs'
import { visualizer } from 'rollup-plugin-visualizer'
import path from 'path'

export default defineConfig({
    plugins: [
        vue(),
        commonjs({
            include: ['tailwind.config.js', 'axios']
        }),
        visualizer(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            'tailwind.config.js': path.resolve(__dirname, 'tailwind.config.js'),
        }
    },
    server: {
        port: 8080,
        watch: {
            ignored: ['!**/node_modules/@niftee-group/niftee-core/**'],
            usePolling: true
        }
    },
    optimizeDeps: {
        include: [
            '@ckeditor/ckeditor5-vue',
            '@ckeditor/ckeditor5-build-classic',
            'lodash/get',
            'lodash/debounce',
            'lodash/has',
            'lodash/mapValues',
            'lodash/camelCase',
            'lodash/mapKeys',
            'lodash/snakeCase',
            'jsoneditor/dist/jsoneditor-minimalist.js',
            'algoliasearch/lite',
            'highcharts',
            'vue-scrollto',
            'tailwind.config.js',
            'property-expr',
            'toposort'
        ]
    },
    build: {
        commonjsOptions: {
            transformMixedEsModules: true,
        }
    }
})
