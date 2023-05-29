const controle = document.querySelectorAll('[data-controle]');
const estatisticas = document.querySelectorAll('[data-estatistica]');
const robo = document.querySelector('#robotron');
const caixaCores = document.querySelector('.caixaCores');
const coresRobo = document.querySelectorAll('[data-cor]');
const montador = document.querySelector('.montador-conteudo');
const setaMontador = document.querySelector('.setaScrollMontador');
const botaoProducao = document.querySelector('#producao');
const botaoFechar = document.querySelector('#botaoFechar');
let diminuiEstatisticas = false;

const pecas = {
    "bracos": {
        "forca": 29,
        "poder": 35,
        "energia": -21,
        "velocidade": -5
    },

    "blindagem": {
        "forca": 41,
        "poder": 20,
        "energia": 0,
        "velocidade": -20
    },
    "nucleos":{
        "forca": 0,
        "poder": 7,
        "energia": 48,
        "velocidade": -24
    },
    "pernas":{
        "forca": 27,
        "poder": 21,
        "energia": -32,
        "velocidade": 42
    },
    "foguetes":{
        "forca": 0,
        "poder": 28,
        "energia": 0,
        "velocidade": -2
    }
}

//dom events area//

controle.forEach( (elemento) => {
    console.log(elemento);
    elemento.addEventListener('click', (evento) => {
        manipulaDados(evento.target.dataset.controle, evento.target.parentNode);
        atualizaEstatisticas(evento.target.dataset.peca, evento.target.dataset.controle);
    });
})

robo.addEventListener('click', (event) => {
    selecionarCores();
})

coresRobo.forEach((elemento) => {
    elemento.addEventListener('click', (event) => {
        novaCor(event.target.dataset.cor);
    })
})

montador.addEventListener('mouseenter', (event) => {
    scrollMontador(event.target);
})

montador.addEventListener('scroll', (event) => {
    ocultarScrollMontador(event.target);
})

botaoProducao.addEventListener('click', (event) => {
    carregarResultado();
})

botaoFechar.addEventListener('click', (event) => {
    reiniciaProducao();
    produzirRobo();
})

//function area//

function atualizaEstatisticas(tipoPeca, operacao) {
    if (operacao === '-') {
        estatisticas.forEach( (elemento) => {
            if (diminuiEstatisticas === true) {
            elemento.textContent = Number(elemento.textContent) - pecas[tipoPeca][elemento.dataset.estatistica];
            }
        })
    } else {
        estatisticas.forEach( (elemento) => {
            elemento.textContent = Number(elemento.textContent) + pecas[tipoPeca][elemento.dataset.estatistica];
        })
    } 
}


function manipulaDados(operacao, controle) {
    const peca = controle.querySelector('[data-contador]');
    if (operacao === '-') {
        if (Number(peca.value > 0)) {
            if (Number(peca.value) < 11) {
                peca.value = `0${Number(peca.value) - 1}`;
            } else {
                peca.value = Number(peca.value) - 1;
            }
            diminuiEstatisticas = true;
        } else {
            diminuiEstatisticas = false;
            peca.classList.add('contadorInvalido');
            window.setTimeout((event) => {removeCorInvalida(peca)}, 200);
        }
    } else {
        if (Number(peca.value) < 9) {
            peca.value = `0${Number(peca.value) + 1}`;
        } else {
            peca.value = Number(peca.value) + 1;
        }
        teste = true;
    }
}

function selecionarCores() {
    caixaCores.classList.add('coresOn');
}

function novaCor(corEscolhida) {
   /* switch (corEscolhida) {
        case "Amarelo":
            robo.setAttribute('src', 'img/imagens-do-robotron/Robotron 2000 - Amarelo/Robotron 2000 - Amarelo.png')
            break;
        case "Azul": 
            robo.setAttribute('src', 'img/imagens-do-robotron/Robotron 2000 - Azul/Robotron 2000 - Azul.png')
            break;
        case "Branco":
            robo.setAttribute('src', 'img/imagens-do-robotron/Robotron 2000 - Branco/Robotron 2000 - Branco.png')
            break;
        case "Preto":
            robo.setAttribute('src', 'img/imagens-do-robotron/Robotron 2000 - Preto/Robotron 2000 - Preto.png')
            break;
        case "Rosa":
            robo.setAttribute('src', 'img/imagens-do-robotron/Robotron 2000 - Rosa/Robotron 2000 - Rosa.png')
            break;
        case "Vermelho":
            robo.setAttribute('src', 'img/imagens-do-robotron/Robotron 2000 - Vermelho/Robotron 2000 - Vermelho.png')
            break;
    } */

    robo.setAttribute('src', `img/imagens-do-robotron/Robotron 2000 - ${corEscolhida}/Robotron 2000 - ${corEscolhida}.png`);
    caixaCores.classList.remove('coresOn');
}

function removeCorInvalida(alvo) {
    alvo.classList.remove('contadorInvalido');
}

function scrollMontador(alvo) {
    if (alvo.clientHeight !== alvo.scrollHeight) {
        setaMontador.classList.remove('oculto');
    } else {
        setaMontador.classList.add('oculto');
    }
}

function ocultarScrollMontador(alvo) {
    if (alvo.scrollTop > 0) {
        setaMontador.classList.add('oculto');
    }
}

function produzirRobo() {
    const estatisticasRoboMontado = document.querySelectorAll('[data-estatisticamontado]');
    const resultado = document.querySelector('[data-resultado]');
    const roboMontado = document.querySelector('[data-robomontado]');

    roboMontado.src = robo.src;

    for (var contador = 0; contador < estatisticas.length; contador++) {
        estatisticasRoboMontado[contador].textContent = estatisticas[contador].textContent;
    }

    if (resultado.classList.contains('oculto')) {
        resultado.classList.remove('oculto');
        document.body.style.overflow = 'hidden';
    } else {
        resultado.classList.add('oculto');
        document.body.style.overflow = 'auto';
    }
}

function carregarResultado() {
    if (estatisticas[0].textContent !== '0' || estatisticas[1].textContent !== '0' || estatisticas[2].textContent !== '0' || estatisticas[3].textContent !== '0') {
        const loading = document.querySelector('.boxLoading');
        const loadScreen = document.querySelector('[data-loadscreen]');
        loadScreen.classList.remove('oculto');
        loading.classList.remove('oculto');
        window.setTimeout(function() {
            loadScreen.classList.add('oculto');
            loading.classList.add('oculto');
            produzirRobo();
        }, 2000);
    } else {
        alert('Você não pode produzir um robô sem peças. Por favor, adicione peças.')
    }
}

function reiniciaProducao() {
    for (var contador in estatisticas) {
        estatisticas[contador].textContent = '0';
    }

    const contadores = document.querySelectorAll('[data-contador]');

    for (var contador in contadores) {
        contadores[contador].value = '00';
    }

    robo.src = 'img/imagens-do-robotron/Robotron 2000 - Azul/Robotron 2000 - Azul.png';
}