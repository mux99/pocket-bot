import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['tests/unit/spec/*spec.js'],
		deps: { inline: ['@sveltejs/kit'] },
		globals: true,
		coverage: {
			provider: 'v8'
		}
	},
	server: {
		host: true,
		port: 8000,
		watch: {
			usePolling: true
		}
	},
	build: {
		rollupOptions: {
			external: ['argon2']
		}
	}
});
