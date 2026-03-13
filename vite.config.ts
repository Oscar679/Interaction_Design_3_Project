import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { resolve } from 'path'

export default defineConfig({
    base: './',
    plugins: [
        tailwindcss(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['icon-192x192.svg', 'icon-512x512.svg'],
            manifest: {
                name: 'Campus Weather',
                short_name: 'CampusWeather',
                description: 'Real sensor data from Campus Vaxjo compared against SMHI weather station data.',
                start_url: './index.html',
                scope: './',
                display: 'standalone',
                background_color: '#0a1116',
                theme_color: '#8fd0c6',
                icons: [
                    {
                        src: 'icon-192x192.svg',
                        sizes: '192x192',
                        type: 'image/svg+xml',
                    },
                    {
                        src: 'icon-512x512.svg',
                        sizes: '512x512',
                        type: 'image/svg+xml',
                    },
                ],
            },
            devOptions: {
                enabled: true
            }
        }),
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                dashboard: resolve(__dirname, 'dashBoard.html'),
                docs: resolve(__dirname, 'docs.html'),
            }
        }
    }
})
