const CACHE_NAME =
    "compartilha-47-offline-v1";


const ARQUIVOS = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./offline.html"
];


self.addEventListener(
    "install",
    function (evento) {

        evento.waitUntil(

            caches.open(
                CACHE_NAME
            )
            .then(
                function (cache) {

                    return cache.addAll(
                        ARQUIVOS
                    );

                }
            )
            .then(
                function () {

                    return self.skipWaiting();

                }
            )

        );

    }
);


self.addEventListener(
    "activate",
    function (evento) {

        evento.waitUntil(

            caches.keys()
                .then(
                    function (nomes) {

                        return Promise.all(

                            nomes.map(
                                function (nome) {

                                    if (
                                        nome !==
                                        CACHE_NAME
                                    ) {

                                        return caches.delete(
                                            nome
                                        );

                                    }

                                    return null;

                                }
                            )

                        );

                    }
                )
                .then(
                    function () {

                        return self.clients.claim();

                    }
                )

        );

    }
);


self.addEventListener(
    "fetch",
    function (evento) {

        if (
            evento.request.method !==
            "GET"
        ) {

            return;

        }


        evento.respondWith(

            caches.match(
                evento.request,
                {
                    ignoreSearch: true
                }
            )
            .then(
                function (respostaCache) {

                    if (respostaCache) {

                        return respostaCache;

                    }


                    return fetch(
                        evento.request
                    )
                    .catch(
                        function () {

                            if (
                                evento.request.mode ===
                                "navigate"
                            ) {

                                return caches.match(
                                    "./index.html"
                                );

                            }


                            return new Response(
                                "",
                                {
                                    status: 503,
                                    statusText:
                                        "Offline"
                                }
                            );

                        }
                    );

                }
            )

        );

    }
);
