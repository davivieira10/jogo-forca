// Música
let myMusic = document.getElementById("music");

// Tema da página
const chk = document.getElementById("chk");

chk.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});

// Arrow functions
const play = () => {
  myMusic.play();
};

const pause = () => {
  myMusic.pause();
};

const stop = () => {
  myMusic.pause();
  myMusic.currentTime = 0;
};

const init = () => {
  const paginas = document.querySelectorAll(".pagina");
  const botaoPlay = document.querySelector(".botao-play");
  const botaoAdicionar = document.querySelector(".botao-adicionar");
  const botaoSalvar = document.querySelector(".botao-salvar");
  const botaoCancelar = document.querySelector(".botao-cancelar");
  const botaoNovoJogo = document.querySelector(".botao-novo-jogo");
  const botaoDesistir = document.querySelector(".botao-desistir");

  //Array palavras
  const listaDePalavras = [
    "programar",
    "python",
    "ruby",
    "java",
    "javascript",
    "golang",
    "php",
    "desafio",
    "alura",
    "oracle",
    "swift",
    "kotlin",
  ];

  //Eventos Botões
  botaoPlay.addEventListener("click", () => {
    paginas[0].classList.add("hidden");
    paginas[2].classList.remove("hidden");
    sortear(0, listaDePalavras.length);
  });

  botaoAdicionar.addEventListener("click", () => {
    paginas[0].classList.add("hidden");
    paginas[1].classList.remove("hidden");
  });

  botaoCancelar.addEventListener("click", () => {
    paginas[1].classList.add("hidden");
    paginas[0].classList.remove("hidden");
  });

  botaoNovoJogo.addEventListener("click", () => document.location.reload());

  botaoDesistir.addEventListener("click", () => {
    document.location.reload();
  });

  botaoSalvar.addEventListener("click", () => {
    const texto = document
      .querySelector(".adicionar-texto")
      .value.replace(/[^a-zA-Z]/g, "");
    if (texto === "") {
      return alert("Digite alguma coisa e somente letras.");
    }
    paginas[1].classList.add("hidden");
    paginas[2].classList.remove("hidden");
    listaDePalavras.push(texto);
    sortear(0, listaDePalavras.length);
  });

  // Jogo
  let memoriaDeLetras = [];
  let contador = 0;
  let contadorDeLetras = 0;

  const sortear = (min, max) => {
    const i = Math.trunc(Math.random() * (max - min) + min);
    const palavraSecreta = listaDePalavras[i];
    const xPosi = desenharTracos(palavraSecreta.length);
    verificarTecla(palavraSecreta, xPosi);
  };

  const verificarLetraCerta = (letra, palavraSecreta, xPosi) => {
    memoriaDeLetras.push(letra);
    let regex = new RegExp(letra, "gi");
    if (regex.test(palavraSecreta) && contador < 7) {
      for (let i = 0; i < palavraSecreta.length; i++) {
        if (palavraSecreta[i] === letra) {
          desenharLetrasCertas(letra, i, xPosi);
          contadorDeLetras++;
        }
        contadorDeLetras === palavraSecreta.length ? desenharVitoria() : "null";
      }
    } else {
      desenharLetrasErradas(letra, posiErradas[0]);
      posiErradas.shift();
      desenhar();
      contador++;
      contador === 7 ? desenharDerrota() : "";
    }
  };

  const verificarRepeticaoDeTecla = (letra, palavraSecreta, xPosi) => {
    memoriaDeLetras.includes(letra)
      ? alert("Essa letra já foi digitada, tente outra.")
      : verificarLetraCerta(letra, palavraSecreta, xPosi);
  };

  const verificarTecla = (palavraSecreta, xPosi) => {
    document.addEventListener("keydown", (event) => {
      let letra = event.code;
      const regex = /Key/;

      if (regex.test(letra)) {
        letra = event.key;
        verificarRepeticaoDeTecla(letra, palavraSecreta, xPosi);
      }
    });
  };

  // Desenho forca canvas
  const canvas = document.querySelector(".jogo");
  const ctx = canvas.getContext("2d");
  const root = document.querySelector(":root");
  const corAzul = getComputedStyle(root).getPropertyValue("--blue-color");
  const corVermelha = "#cf0707";
  canvas.width = "1200";
  canvas.height = "800";
  ctx.lineWidth = 5;

  const desenhar = () => {
    switch (contador) {
      case 0:
        desenharForca();
        break;
      case 1:
        desenharCabeca();
        break;
      case 2:
        desenharTronco();
        break;
      case 3:
        desenharBracoEsquerdo();
        break;
      case 4:
        desenharBracoDireito();
        break;
      case 5:
        desenharPernaEsquerda();
        break;
      case 6:
        desenharPernaDireita();
        break;
      default:
        break;
    }
  };

  const desenharForca = () => {
    ctx.fillStyle = corAzul;
    ctx.fillRect(400, 88, 177.5, 4.5);
    ctx.fillRect(400, 88, 4.5, 360);
    ctx.fillRect(575.5, 88, 4.5, 49.5);
    ctx.fillRect(330, 445, 294, 5);
  };

  const desenharCabeca = () => {
    ctx.strokeStyle = corAzul;
    ctx.beginPath();
    ctx.arc(577.5, 170, 31.5, 0, Math.PI * 2);
    ctx.stroke();
  };

  const desenharTronco = () => {
    ctx.fillStyle = corAzul;
    ctx.fillRect(575.5, 201, 4.5, 135);
  };

  const desenharBracoEsquerdo = () => {
    ctx.strokeStyle = corAzul;
    ctx.beginPath();
    ctx.moveTo(577.5, 201);
    ctx.lineTo(547.5, 273);
    ctx.stroke();
  };

  const desenharBracoDireito = () => {
    ctx.strokeStyle = corAzul;
    ctx.beginPath();
    ctx.moveTo(577.5, 201);
    ctx.lineTo(607.5, 273);
    ctx.stroke();
  };

  const desenharPernaEsquerda = () => {
    ctx.strokeStyle = corAzul;
    ctx.beginPath();
    ctx.moveTo(577.5, 336);
    ctx.lineTo(547.5, 408);
    ctx.stroke();
  };

  const desenharPernaDireita = () => {
    ctx.strokeStyle = corAzul;
    ctx.beginPath();
    ctx.moveTo(577.5, 336);
    ctx.lineTo(607.5, 408);
    ctx.stroke();
  };

  const desenharTracos = (count) => {
    ctx.fillStyle = corAzul;
    let a = 245;
    let b = 80;
    ctx.fillRect(a, 658, b, 4);

    let arr = [a];

    let i = 1;
    for (i; i <= count - 1; i++) {
      c = a + b;
      ctx.fillRect(c + 16, 658, b, 4);

      a = c + 16;
      arr.push(a);
    }
    return arr;
  };

  const desenharLetrasCertas = (letra, indice, xPos) => {
    ctx.fillStyle = corAzul;
    const l = letra.toUpperCase();
    ctx.font = "48px inter";
    ctx.fillText(`${l}`, xPos[indice] + 48 / 2, 658 - 32);
  };

  let posiErradas = [405];
  for (let i = 0; i < 6; i++) {
    a = posiErradas[i];
    b = a + 48;
    posiErradas.push(b);
  }

  const desenharLetrasErradas = (letra, xPos) => {
    const l = letra.toUpperCase();
    ctx.fillStyle = corVermelha;
    ctx.font = "24px inter";
    ctx.fillText(`${l}`, xPos, 706);
  };

  const desenharDerrota = () => {
    ctx.fillStyle = "red";
    ctx.font = "24px inter";
    ctx.fillText("VOCÊ PERDEU! 😓 TENTE OUTRA VEZ!", 650, 250);
  };

  const desenharVitoria = () => {
    contador = 7;
    posiErradas = [];
    ctx.fillStyle = "green";
    ctx.font = "24px inter";
    ctx.fillText("VOCÊ VENCEU! 😁 PARABÉNS! 👏", 650, 250);
  };
};

init();
