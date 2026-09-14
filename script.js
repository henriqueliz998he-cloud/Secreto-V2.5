const CHAVE_ANOTACOES =
    "compartilha_47_anotacoes";

const CHAVE_LIXEIRA =
    "compartilha_47_lixeira";

const CHAVE_TEMA =
    "compartilha_47_tema";

const CHAVE_MODO_VISUALIZACAO =
    "compartilha_47_visualizacao";

const CHAVE_ACESSO =
    "compartilha_47_acesso";


const SENHA = "Hg99";

const TEMPO_INATIVIDADE =
    5 * 60 * 1000;


let anotacoes =
    JSON.parse(
        localStorage.getItem(
            CHAVE_ANOTACOES
        )
    ) || [];


let lixeira =
    JSON.parse(
        localStorage.getItem(
            CHAVE_LIXEIRA
        )
    ) || [];


let indiceAnotacaoAtual = null;

let temporizadorBloqueio = null;


const telaSenha =
    document.getElementById(
        "telaSenha"
    );

const telaPrincipal =
    document.getElementById(
        "telaPrincipal"
    );

const telaEditor =
    document.getElementById(
        "telaEditor"
    );

const telaAnotacao =
    document.getElementById(
        "telaAnotacao"
    );

const telaLixeira =
    document.getElementById(
        "telaLixeira"
    );


const campoSenha =
    document.getElementById(
        "campoSenha"
    );

const mensagemSenha =
    document.getElementById(
        "mensagemSenha"
    );


const listaAnotacoes =
    document.getElementById(
        "listaAnotacoes"
    );

const listaLixeira =
    document.getElementById(
        "listaLixeira"
    );


const campoTitulo =
    document.getElementById(
        "campoTitulo"
    );

const campoConteudo =
    document.getElementById(
        "campoConteudo"
    );


const tituloAnotacao =
    document.getElementById(
        "tituloAnotacao"
    );

const conteudoAnotacao =
    document.getElementById(
        "conteudoAnotacao"
    );

const dataAnotacao =
    document.getElementById(
        "dataAnotacao"
    );


const campoBusca =
    document.getElementById(
        "campoBusca"
    );


const contadorAnotacoes =
    document.getElementById(
        "contadorAnotacoes"
    );


const botaoAdicionar =
    document.getElementById(
        "botaoAdicionar"
    );

const botaoSalvar =
    document.getElementById(
        "botaoSalvar"
    );

const botaoCancelar =
    document.getElementById(
        "botaoCancelar"
    );


const botaoEditar =
    document.getElementById(
        "botaoEditar"
    );

const botaoExcluir =
    document.getElementById(
        "botaoExcluir"
    );

const botaoFixar =
    document.getElementById(
        "botaoFixar"
    );


const botaoCompartilhar =
    document.getElementById(
        "botaoCompartilhar"
    );


const botaoVoltarAnotacao =
    document.getElementById(
        "botaoVoltarAnotacao"
    );

const botaoVoltarLixeira =
    document.getElementById(
        "botaoVoltarLixeira"
    );


const botaoLixeira =
    document.getElementById(
        "botaoLixeira"
    );

const botaoBloquear =
    document.getElementById(
        "botaoBloquear"
    );


const botaoTema =
    document.getElementById(
        "botaoTema"
    );

const botaoModoVisualizacao =
    document.getElementById(
        "botaoModoVisualizacao"
    );

const botaoSairVisualizacao =
    document.getElementById(
        "botaoSairVisualizacao"
    );


const filtros =
    document.querySelectorAll(
        ".filtro"
    );


function salvarAnotacoes() {

    localStorage.setItem(
        CHAVE_ANOTACOES,
        JSON.stringify(anotacoes)
    );

}


function salvarLixeira() {

    localStorage.setItem(
        CHAVE_LIXEIRA,
        JSON.stringify(lixeira)
    );

}


function salvarTema() {

    localStorage.setItem(
        CHAVE_TEMA,
        document.body.classList.contains(
            "tema-claro"
        )
            ? "claro"
            : "escuro"
    );

}


function salvarModoVisualizacao() {

    localStorage.setItem(
        CHAVE_MODO_VISUALIZACAO,
        document.body.classList.contains(
            "modo-visualizacao"
        )
            ? "sim"
            : "nao"
    );

}


function carregarTema() {

    const tema =
        localStorage.getItem(
            CHAVE_TEMA
        );


    if (tema === "claro") {

        document.body.classList.add(
            "tema-claro"
        );

    } else {

        document.body.classList.remove(
            "tema-claro"
        );

    }

}


function carregarModoVisualizacao() {

    const modo =
        localStorage.getItem(
            CHAVE_MODO_VISUALIZACAO
        );


    if (modo === "sim") {

        document.body.classList.add(
            "modo-visualizacao"
        );

    } else {

        document.body.classList.remove(
            "modo-visualizacao"
        );

    }


    atualizarModoVisualizacao();

}


function atualizarModoVisualizacao() {

    const modoAtivo =
        document.body.classList.contains(
            "modo-visualizacao"
        );


    const telaBloqueada =
        document.body.classList.contains(
            "tela-bloqueada"
        );


    if (botaoModoVisualizacao) {

        botaoModoVisualizacao.textContent =
            modoAtivo
                ? "🔓 Sair do modo visualização"
                : "👁️ Modo visualização";

    }


    if (botaoSairVisualizacao) {

        if (
            modoAtivo &&
            !telaBloqueada
        ) {

            botaoSairVisualizacao.style.display =
                "block";

        } else {

            botaoSairVisualizacao.style.display =
                "none";

        }

    }

}


function atividadeUsuario() {

    if (
        telaSenha &&
        telaSenha.style.display !==
            "none"
    ) {

        return;

    }


    iniciarTemporizadorBloqueio();

}


function iniciarTemporizadorBloqueio() {

    clearTimeout(
        temporizadorBloqueio
    );


    temporizadorBloqueio =
        setTimeout(
            function () {

                bloquearTela();

            },
            TEMPO_INATIVIDADE
        );

}


function bloquearTela() {

    clearTimeout(
        temporizadorBloqueio
    );


    localStorage.removeItem(
        CHAVE_ACESSO
    );


    document
        .querySelectorAll(".tela")
        .forEach(
            function (tela) {

                tela.style.display =
                    "none";

            }
        );


    document.body.classList.add(
        "tela-bloqueada"
    );


    telaSenha.style.display =
        "flex";


    campoSenha.value = "";

    mensagemSenha.textContent =
        "";


    atualizarModoVisualizacao();


    setTimeout(
        function () {

            campoSenha.focus();

        },
        100
    );

}


function verificarAcesso() {

    if (
        localStorage.getItem(
            CHAVE_ACESSO
        ) === "sim"
    ) {

        telaSenha.style.display =
            "none";


        document.body.classList.remove(
            "tela-bloqueada"
        );


        mostrarTelaPrincipal();


        iniciarTemporizadorBloqueio();

    } else {

        bloquearTela();

    }

}


function entrar() {

    if (
        campoSenha.value ===
        SENHA
    ) {

        localStorage.setItem(
            CHAVE_ACESSO,
            "sim"
        );


        mensagemSenha.textContent =
            "";


        telaSenha.style.display =
            "none";


        document.body.classList.remove(
            "tela-bloqueada"
        );


        mostrarTelaPrincipal();


        iniciarTemporizadorBloqueio();

    } else {

        mensagemSenha.textContent =
            "Senha incorreta.";


        campoSenha.value = "";


        campoSenha.focus();

    }

}


function mostrarTelaPrincipal() {

    esconderTodasAsTelas();


    telaPrincipal.style.display =
        "block";


    renderizarAnotacoes();


    atualizarModoVisualizacao();


    atividadeUsuario();

}


function esconderTodasAsTelas() {

    document
        .querySelectorAll(".tela")
        .forEach(
            function (tela) {

                tela.style.display =
                    "none";

            }
        );

}


function mostrarEditorNova() {

    if (
        document.body.classList.contains(
            "modo-visualizacao"
        )
    ) {

        return;

    }


    esconderTodasAsTelas();


    telaEditor.style.display =
        "block";


    campoTitulo.value = "";

    campoConteudo.value = "";


    botaoSalvar.textContent =
        "Salvar";


    botaoSalvar.onclick =
        salvarNovaAnotacao;


    campoTitulo.focus();


    atividadeUsuario();

}


function cancelarEditor() {

    mostrarTelaPrincipal();

}


function salvarNovaAnotacao() {

    if (
        document.body.classList.contains(
            "modo-visualizacao"
        )
    ) {

        return;

    }


    const titulo =
        campoTitulo.value.trim();


    const conteudo =
        campoConteudo.value.trim();


    if (!titulo) {

        alert(
            "Digite um título."
        );


        campoTitulo.focus();


        return;

    }


    const novaAnotacao = {

        id: Date.now(),

        titulo: titulo,

        conteudo: conteudo,

        data:
            new Date().toLocaleString(
                "pt-BR"
            ),

        fixada: false

    };


    anotacoes.unshift(
        novaAnotacao
    );


    salvarAnotacoes();


    mostrarTelaPrincipal();

}


function abrirAnotacao(id) {

    const anotacao =
        anotacoes.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!anotacao) {

        return;

    }


    indiceAnotacaoAtual =
        id;


    esconderTodasAsTelas();


    telaAnotacao.style.display =
        "block";


    tituloAnotacao.textContent =
        anotacao.titulo;


    conteudoAnotacao.textContent =
        anotacao.conteudo ||
        "Sem conteúdo.";


    dataAnotacao.textContent =
        "Criada em: " +
        anotacao.data;


    atualizarBotoesAnotacao(
        anotacao
    );


    atividadeUsuario();

}


function atualizarBotoesAnotacao(
    anotacao
) {

    const modoVisualizacao =
        document.body.classList.contains(
            "modo-visualizacao"
        );


    if (botaoEditar) {

        botaoEditar.style.display =
            modoVisualizacao
                ? "none"
                : "inline-block";

    }


    if (botaoExcluir) {

        botaoExcluir.style.display =
            modoVisualizacao
                ? "none"
                : "inline-block";

    }


    if (botaoFixar) {

        botaoFixar.style.display =
            modoVisualizacao
                ? "none"
                : "inline-block";


        botaoFixar.textContent =
            anotacao.fixada
                ? "📌 Desfixar"
                : "📌 Fixar";

    }


    if (botaoCompartilhar) {

        botaoCompartilhar.style.display =
            "inline-block";

    }

}


/* =========================================================
   COMPARTILHAR
   ========================================================= */


async function compartilharAnotacao() {

    const anotacao =
        anotacoes.find(
            function (item) {

                return item.id ===
                    indiceAnotacaoAtual;

            }
        );


    if (!anotacao) {

        return;

    }


    if (
        !navigator.share
    ) {

        alert(
            "Seu navegador não oferece o compartilhamento nativo."
        );

        return;

    }


    const texto =
        anotacao.conteudo &&
        anotacao.conteudo.trim()
            ? anotacao.conteudo
            : "Sem conteúdo.";


    const dadosCompartilhamento = {

        title: anotacao.titulo,

        text:
            anotacao.titulo +
            "\n\n" +
            texto,

        url:
            window.location.href

    };


    try {

        await navigator.share(
            dadosCompartilhamento
        );

    } catch (erro) {

        if (
            erro &&
            erro.name ===
                "AbortError"
        ) {

            return;

        }

        console.error(
            "Erro ao compartilhar:",
            erro
        );

    }


    atividadeUsuario();

}


function editarAnotacao() {

    if (
        document.body.classList.contains(
            "modo-visualizacao"
        )
    ) {

        return;

    }


    const anotacao =
        anotacoes.find(
            function (item) {

                return item.id ===
                    indiceAnotacaoAtual;

            }
        );


    if (!anotacao) {

        return;

    }


    esconderTodasAsTelas();


    telaEditor.style.display =
        "block";


    campoTitulo.value =
        anotacao.titulo;


    campoConteudo.value =
        anotacao.conteudo;


    botaoSalvar.textContent =
        "Salvar alterações";


    botaoSalvar.onclick =
        salvarEdicaoAnotacao;


    atividadeUsuario();

}


function salvarEdicaoAnotacao() {

    if (
        document.body.classList.contains(
            "modo-visualizacao"
        )
    ) {

        return;

    }


    const anotacao =
        anotacoes.find(
            function (item) {

                return item.id ===
                    indiceAnotacaoAtual;

            }
        );


    if (!anotacao) {

        return;

    }


    const titulo =
        campoTitulo.value.trim();


    const conteudo =
        campoConteudo.value.trim();


    if (!titulo) {

        alert(
            "Digite um título."
        );


        campoTitulo.focus();


        return;

    }


    anotacao.titulo =
        titulo;


    anotacao.conteudo =
        conteudo;


    salvarAnotacoes();


    botaoSalvar.textContent =
        "Salvar";


    botaoSalvar.onclick =
        salvarNovaAnotacao;


    abrirAnotacao(
        anotacao.id
    );

}


function excluirAnotacaoAtual() {

    if (
        document.body.classList.contains(
            "modo-visualizacao"
        )
    ) {

        return;

    }


    const indice =
        anotacoes.findIndex(
            function (item) {

                return item.id ===
                    indiceAnotacaoAtual;

            }
        );


    if (indice === -1) {

        return;

    }


    const anotacao =
        anotacoes[indice];


    lixeira.unshift(
        anotacao
    );


    anotacoes.splice(
        indice,
        1
    );


    salvarAnotacoes();

    salvarLixeira();


    mostrarTelaPrincipal();

}


function fixarAnotacaoAtual() {

    if (
        document.body.classList.contains(
            "modo-visualizacao"
        )
    ) {

        return;

    }


    const anotacao =
        anotacoes.find(
            function (item) {

                return item.id ===
                    indiceAnotacaoAtual;

            }
        );


    if (!anotacao) {

        return;

    }


    anotacao.fixada =
        !anotacao.fixada;


    salvarAnotacoes();


    abrirAnotacao(
        anotacao.id
    );

}


function renderizarAnotacoes() {

    const busca =
        campoBusca
            ? campoBusca.value
                .trim()
                .toLowerCase()
            : "";


    let lista =
        anotacoes.slice();


    const filtroAtivo =
        document.querySelector(
            ".filtro.ativo"
        );


    if (filtroAtivo) {

        const tipo =
            filtroAtivo.dataset.filtro;


        if (
            tipo ===
            "fixadas"
        ) {

            lista =
                lista.filter(
                    function (item) {

                        return item.fixada;

                    }
                );

        }


        if (
            tipo ===
            "recentes"
        ) {

            lista.sort(
                function (a, b) {

                    return b.id - a.id;

                }
            );

        }

    }


    if (busca) {

        lista =
            lista.filter(
                function (item) {

                    return item.titulo
                        .toLowerCase()
                        .includes(
                            busca
                        );

                }
            );

    }


    lista.sort(
        function (a, b) {

            if (
                a.fixada &&
                !b.fixada
            ) {

                return -1;

            }


            if (
                !a.fixada &&
                b.fixada
            ) {

                return 1;

            }


            return b.id - a.id;

        }
    );


    listaAnotacoes.innerHTML =
        "";


    if (
        lista.length === 0
    ) {

        const vazio =
            document.createElement(
                "div"
            );


        vazio.className =
            "lista-vazia";


        vazio.textContent =
            busca
                ? "Nenhuma anotação encontrada."
                : "Nenhuma anotação ainda.";


        listaAnotacoes.appendChild(
            vazio
        );

    }


    lista.forEach(
        function (anotacao) {

            const item =
                document.createElement(
                    "button"
                );


            item.className =
                "item-anotacao";


            item.type =
                "button";


            item.onclick =
                function () {

                    abrirAnotacao(
                        anotacao.id
                    );

                };


            const informacoes =
                document.createElement(
                    "div"
                );


            informacoes.className =
                "item-anotacao-info";


            const titulo =
                document.createElement(
                    "span"
                );


            titulo.textContent =
                anotacao.titulo;


            informacoes.appendChild(
                titulo
            );


            if (
                anotacao.fixada
            ) {

                const fixada =
                    document.createElement(
                        "span"
                    );


                fixada.className =
                    "indicador-fixada";


                fixada.textContent =
                    "📌";


                informacoes.appendChild(
                    fixada
                );

            }


            item.appendChild(
                informacoes
            );


            listaAnotacoes.appendChild(
                item
            );

        }
    );


    if (contadorAnotacoes) {

        contadorAnotacoes.textContent =
            anotacoes.length +
            (
                anotacoes.length === 1
                    ? " anotação"
                    : " anotações"
            );

    }

}


function buscarAnotacoes() {

    renderizarAnotacoes();

    atividadeUsuario();

}


function mostrarLixeira() {

    if (
        document.body.classList.contains(
            "modo-visualizacao"
        )
    ) {

        return;

    }


    esconderTodasAsTelas();


    telaLixeira.style.display =
        "block";


    renderizarLixeira();


    atividadeUsuario();

}


function renderizarLixeira() {

    listaLixeira.innerHTML =
        "";


    if (
        lixeira.length === 0
    ) {

        const vazio =
            document.createElement(
                "div"
            );


        vazio.className =
            "lista-vazia";


        vazio.textContent =
            "A lixeira está vazia.";


        listaLixeira.appendChild(
            vazio
        );


        return;

    }


    lixeira.forEach(
        function (anotacao) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "item-lixeira";


            const titulo =
                document.createElement(
                    "strong"
                );


            titulo.textContent =
                anotacao.titulo;


            const botoes =
                document.createElement(
                    "div"
                );


            botoes.className =
                "botoes-lixeira";


            const botaoRestaurar =
                document.createElement(
                    "button"
                );


            botaoRestaurar.type =
                "button";


            botaoRestaurar.textContent =
                "Restaurar";


            botaoRestaurar.onclick =
                function () {

                    restaurarAnotacao(
                        anotacao.id
                    );

                };


            const botaoApagar =
                document.createElement(
                    "button"
                );


            botaoApagar.type =
                "button";


            botaoApagar.textContent =
                "Excluir";


            botaoApagar.onclick =
                function () {

                    excluirPermanentemente(
                        anotacao.id
                    );

                };


            botoes.appendChild(
                botaoRestaurar
            );


            botoes.appendChild(
                botaoApagar
            );


            item.appendChild(
                titulo
            );


            item.appendChild(
                botoes
            );


            listaLixeira.appendChild(
                item
            );

        }
    );

}


function restaurarAnotacao(id) {

    const indice =
        lixeira.findIndex(
            function (item) {

                return item.id === id;

            }
        );


    if (indice === -1) {

        return;

    }


    const anotacao =
        lixeira[indice];


    lixeira.splice(
        indice,
        1
    );


    anotacoes.unshift(
        anotacao
    );


    salvarLixeira();

    salvarAnotacoes();


    renderizarLixeira();


    atividadeUsuario();

}


function excluirPermanentemente(id) {

    const indice =
        lixeira.findIndex(
            function (item) {

                return item.id === id;

            }
        );


    if (indice === -1) {

        return;

    }


    lixeira.splice(
        indice,
        1
    );


    salvarLixeira();


    renderizarLixeira();


    atividadeUsuario();

}


function voltarDaAnotacao() {

    mostrarTelaPrincipal();

}


function voltarDaLixeira() {

    mostrarTelaPrincipal();

}


function alternarTema() {

    document.body.classList.toggle(
        "tema-claro"
    );


    salvarTema();


    atividadeUsuario();

}


function alternarModoVisualizacao() {

    const ativo =
        document.body.classList.toggle(
            "modo-visualizacao"
        );


    salvarModoVisualizacao();


    atualizarModoVisualizacao();


    if (
        telaAnotacao.style.display !==
        "none"
    ) {

        const anotacao =
            anotacoes.find(
                function (item) {

                    return item.id ===
                        indiceAnotacaoAtual;

                }
            );


        if (anotacao) {

            atualizarBotoesAnotacao(
                anotacao
            );

        }

    }


    if (
        ativo &&
        telaLixeira.style.display !==
            "none"
    ) {

        mostrarTelaPrincipal();

    }


    atividadeUsuario();

}


function sairModoVisualizacao() {

    document.body.classList.remove(
        "modo-visualizacao"
    );


    salvarModoVisualizacao();


    atualizarModoVisualizacao();


    atividadeUsuario();

}


document.addEventListener(
    "click",
    function () {

        atividadeUsuario();

    }
);


if (botaoAdicionar) {

    botaoAdicionar.addEventListener(
        "click",
        function () {

            mostrarEditorNova();

        }
    );

}


if (botaoCancelar) {

    botaoCancelar.addEventListener(
        "click",
        function () {

            cancelarEditor();

        }
    );

}


if (botaoEditar) {

    botaoEditar.addEventListener(
        "click",
        function () {

            editarAnotacao();

        }
    );

}


if (botaoExcluir) {

    botaoExcluir.addEventListener(
        "click",
        function () {

            excluirAnotacaoAtual();

        }
    );

}


if (botaoFixar) {

    botaoFixar.addEventListener(
        "click",
        function () {

            fixarAnotacaoAtual();

        }
    );

}


/* =========================================================
   BOTÃO COMPARTILHAR
   ========================================================= */


if (botaoCompartilhar) {

    botaoCompartilhar.addEventListener(
        "click",
        function () {

            compartilharAnotacao();

        }
    );

}


if (botaoVoltarAnotacao) {

    botaoVoltarAnotacao.addEventListener(
        "click",
        function () {

            voltarDaAnotacao();

        }
    );

}


if (botaoVoltarLixeira) {

    botaoVoltarLixeira.addEventListener(
        "click",
        function () {

            voltarDaLixeira();

        }
    );

}


if (botaoLixeira) {

    botaoLixeira.addEventListener(
        "click",
        function () {

            mostrarLixeira();

        }
    );

}


if (botaoBloquear) {

    botaoBloquear.addEventListener(
        "click",
        function () {

            bloquearTela();

        }
    );

}


if (botaoTema) {

    botaoTema.addEventListener(
        "click",
        function () {

            alternarTema();

        }
    );

}


if (botaoModoVisualizacao) {

    botaoModoVisualizacao.addEventListener(
        "click",
        function () {

            alternarModoVisualizacao();

        }
    );

}


if (botaoSairVisualizacao) {

    botaoSairVisualizacao.addEventListener(
        "click",
        function () {

            sairModoVisualizacao();

        }
    );

}


if (campoBusca) {

    campoBusca.addEventListener(
        "input",
        function () {

            buscarAnotacoes();

        }
    );

}


if (campoSenha) {

    campoSenha.addEventListener(
        "keydown",
        function (evento) {

            if (
                evento.key ===
                "Enter"
            ) {

                entrar();

            }

        }
    );

}


filtros.forEach(
    function (filtro) {

        filtro.addEventListener(
            "click",
            function () {

                filtros.forEach(
                    function (item) {

                        item.classList.remove(
                            "ativo"
                        );

                    }
                );


                filtro.classList.add(
                    "ativo"
                );


                renderizarAnotacoes();


                atividadeUsuario();

            }
        );

    }
);


carregarTema();

carregarModoVisualizacao();

verificarAcesso();
