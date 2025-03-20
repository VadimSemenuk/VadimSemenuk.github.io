if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("/serviceworker.js");
}

self.addEventListener('install', (event) => {
    // предотвращает завершение события до тех пор, пока не завершится асинхронная операция(используется, чтобы Service Worker не был деактивирован браузером)
    event.waitUntil((async () => {
        // берем объект кэша и добавляем туда наши файлы
        // const cache = await caches.open(CACHE_NAME);
        // await cache.add('fallback.html');

    })());

    self.registration.showNotification("ttitle", {
        body: "messageee",
        silent: false,
        tag: 'ABRDirect',
    });
});