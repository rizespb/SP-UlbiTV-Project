// Замечание: Ulbi специально не устанавливал, но у него вместе @vitejs/plugin-react и vite-plugin-svgr установился vite@3.1.0
// В этом проекте vite как отдельная библиотека не установлена.
// Видимо, vite установилась как транзитивная зависимость (версия vite@3.2.7)
// Без усатновки vite@3.1.0 работает норм. Если установить, то возникает ошибка с "target": "es5"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// Сборщик приложений, альтернатива webpack
// Это файл с конфигами
// Также создали в корне проекта отдельный index.html со специальной структурой (подключение через script entry-point-а проекта)
// И написали отдельные скрипты (start:vite и start:app:vite) для возможности запустить dev-сборку проекта с использованием vite (без webpack)
export default defineConfig({
    plugins: [
        // Плагин для обработки SVG
        svgr({ exportAsDefault: true }),
        // Плагин для Реакта
        react(),
    ],
    // Настраиваем алиасы, например, "@shared"
    resolve: {
        alias: [{ find: '@', replacement: '/src' }],
    },
    // Настраиваем глобальные переемнные
    define: {
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify('http://localhost:8000'),
        __PROJECT__: JSON.stringify('frontend'),
    },
})
