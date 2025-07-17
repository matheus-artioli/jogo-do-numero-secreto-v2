let novoNumeroAleatorio = [];

let quantidadeAdvinhar = 200;

let secreto = parseInt(Math.random() * quantidadeAdvinhar + 1);

let tentativas = 0;

textos = (id, texto, falar = false) => {
  // Seleciona o elemento pelo seletor fornecido
  let elemento = document.querySelector(id);
  // Altera o conteúdo do elemento selecionado
  elemento.innerHTML = texto;
  if (falar) {
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", { rate: 1.2 });
  }
};

MensagemInicial = () => {
  console.log(secreto);
  textos("h1", "Jogo da Adivinhação");
  textos(
    "p",
    `Tente adivinhar o número secreto entre 1 á ${quantidadeAdvinhar}`
    // Não coloque true aqui!
  );
};

MensagemInicial();

verificarChute = () => {
  // Incrementa o número de tentativas
  tentativas++;

  // Obtém o valor digitado pelo usuário no campo de input
  let numeroDigitado = document.querySelector("input").value;

  // Exibe o número secreto no console para depuração
  //console.log(secreto);

  // Verifica se o usuário acertou o número secreto
  if (numeroDigitado == secreto) {
    // Limpa o campo de input
    limparcampo();
    // Exibe mensagem de sucesso no elemento h1
    textos("h1", "Você acertou!");
    // Exibe o número de tentativas no elemento p
    textos(
      "p",
      `Você conseguiu descobrir o numero secreto! com ${tentativas} ${
        tentativas === 1 ? "tentativa" : "tentativas"
      }.`,
      true // Fala o texto de sucesso
    );
    // Habilita o botão de reiniciar
    document.getElementById("reiniciar").disabled = false;
  } else {
    // Se o número digitado não for igual ao número secreto

    // Verifica se o número digitado é maior que o número secreto
    if (numeroDigitado > secreto) {
      // Exibe mensagem de erro e dica no elemento h1 e p
      textos("h1", "Você errou!");
      textos("p", "O número secreto é menor que " + numeroDigitado, true);
    } else {
      // Verifica se o número digitado é menor que o número secreto
      if (numeroDigitado < secreto) {
        // Exibe mensagem de erro e dica no elemento h1 e p
        textos("h1", "Você errou!");
        textos("p", "O número secreto é maior que " + numeroDigitado, true);
      } else {
        // Verifica se o campo está vazio
        if (numeroDigitado == "") {
          // Exibe mensagem de campo vazio
          textos("h1", "Você não digitou nada!");
          textos("p", "Por favor, digite um número entre 1 e 10.", true);
        }
        // Verifica se o número está fora do intervalo permitido (1 a 10)
        else if (numeroDigitado < 1 || numeroDigitado > 10) {
          // Exibe mensagem de número inválido
          textos("h1", "Número inválido!");
          textos("p", "Por favor, digite um número entre 1 e 10.", true);
        }
        // Caso o valor não seja um número válido
        else {
          // Exibe mensagem de erro genérica
          textos("h1", "Erro!");
          textos("p", "Por favor, digite um número válido.", true);
        }
      }
    }
  }
};

gerarNumeroAleatorio = () => {
  let gerarNumero = parseInt(Math.random() * quantidadeAdvinhar + 1);
  if (novoNumeroAleatorio.length === quantidadeAdvinhar) {
    novoNumeroAleatorio = [];
    console.log("Todos os números já foram gerados.");
  }
  if (novoNumeroAleatorio.includes(gerarNumero)) {
    return gerarNumeroAleatorio();
  } else {
    novoNumeroAleatorio.push(gerarNumero);
    console.log(novoNumeroAleatorio + " - Número gerado");
    return gerarNumero;
  }
};

keydown = () => {
  document.querySelector("input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      verificarChute();
    }
  });
};
keydown();

limparcampo = () => {
  // Seleciona novamente o campo de input
  input = document.querySelector("input");
  // Limpa o valor do campo de input
  input.value = "";
};

reiniciar = () => {
  secreto = gerarNumeroAleatorio();
  limparcampo();
  tentativas = 0;
  MensagemInicial();
  document.getElementById("reiniciar").disabled = true;
  // Exibe o número secreto no console para depuração
  //console.log(secreto);
};
