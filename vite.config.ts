import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const path = require('path')

// https://vitejs.dev/config/
/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
	base: process.env.ELECTRON == 'true' ? './' : '/',
	plugins: [ react() ],
	build: {
		outDir: 'app/dist',
	},
	resolve: {
		extensions: [ '.js', '.ts', '.jsx', '.tsx' ],
	},
})
