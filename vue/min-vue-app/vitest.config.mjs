import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig, configDefaults } from 'vitest/dist/config';
import vue from '@vitejs/plugin-vue';


export default mergeConfig(
    defineConfig({
        plugins: [vue()],
        test: {
            environment: 'happy-dom',
            globals: true,
            exclude: [...configDefaults.exclude, 'e2e/*'],
            root: fileURLToPath(new URL('./', import.meta.url))
        },
    }),

);