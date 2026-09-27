const CACHE_NAME = "compartilha-47-offline-v1";

const ARQUIVOS = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./offline.html"
];


// =========================================================
// INSTALAÇÃO
// =========================================================

self.addEventListener("install", function (evento) {

    evento.waitUntil(

        caches.open(CACHE_NAME)

            .then(function (cache) {

                return cache.addAll(ARQUIVOS);

            })

            .then(function () {

                return self.skipWaiting();

            })

    );

});


// =========================================================
// ATIVAÇÃO
// =========================================================

self.addEventListener("activate", function (evento) {

    evento.waitUntil(

        caches.keys()

            .then(function (nomesCaches) {

                return Promise.all(

                    nomesCaches.map(function (nomeCache) {

                        if (nomeCache !== CACHE_NAME) {

                            return caches.delete(nomeCache);

                        }

                    })

                );

            })

            .then(function () {

                return self.clients.claim();

            })

    );

});


// =========================================================
// FUNCIONAMENTO OFFLINE
// =========================================================

self.addEventListener("fetch", function (evento) {

    if (evento.request.method !== "GET") {

        return;

    }


    evento.respondWith(

        caches.match(evento.request)

            .then(function (respostaCache) {

                if (respostaCache) {

                    return respostaCache;

                }


                return fetch(evento.request)

                    .then(function (respostaRede) {

                        return respostaRede;

                    })

                    .catch(function () {

                        if (evento.request.mode === "navigate") {

                            return caches.match("./offline.html");

                        }

                    });

            })

    );

});
