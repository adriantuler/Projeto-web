function validaCPF() {
    const cpfFormatado = document.getElementById('cpf').value;
    const cpf = limpaFormatacao(cpfFormatado);

    if (cpf.length !== 11) {
        mostraResultado('O CPF deve ter exatamente 11 caracteres', 'red');
        piscarFundo('red');
        return;
    }

    if (verificaDigitosRepetidos(cpf)) {
        mostraResultado('CPF não pode conter dígitos repetidos', 'red');
        piscarFundo('red');
        return;
    }

    const digito1 = calcularDigitoVerificador(cpf, 1);

    if (!digito1) {
        mostraResultado(`CPF Inválido - ${cpfFormatado}`, 'red');
        piscarFundo('red');
        return;
    }

    const digito2 = calcularDigitoVerificador(cpf, 2);

    if (!digito2) {
        mostraResultado(`CPF Inválido - ${cpfFormatado}`, 'red');
        piscarFundo('red');
        return;
    }

    mostraResultado(`CPF Válido - ${cpfFormatado}`, 'green');
    piscarFundo('green');
}

function calcularDigitoVerificador(cpf, posicao) {
    const sequencia = cpf.slice(0, 8 + posicao).split('');
    let soma = 0;
    let multiplicador = 9 + posicao;

    for (const numero of sequencia) {
        soma += multiplicador * Number(numero);
        multiplicador--;
    }

    const restoDivisao = (soma * 10) % 11;
    const digito = cpf.slice(8 + posicao, 9 + posicao);

    return restoDivisao == digito;
}

function limpaFormatacao(cpf) {
    cpf = cpf.replace(/\D/g, '');
    return cpf;
}

function mostraResultado(texto, cor) {
    const span = document.getElementById('resultado');

    $(span).stop(true, true).fadeOut(200, function() {
        span.innerHTML = texto;
        span.style.color = cor;
        $(span).fadeIn(200);
    });
}

function piscarFundo(cor) {
    const body = document.querySelector('body');

    body.style.backgroundColor = cor;
    body.classList.add('piscar');

    setTimeout(function() {
        body.classList.remove('piscar');
        body.style.backgroundColor = '';
    }, 1000);
}

// Obtém referências aos elementos HTML
const btValidar = document.getElementById('btValidar');
const cpfInput = document.getElementById('cpf');
const resultadoSpan = document.getElementById('resultado');

// Adiciona evento de clique ao botão
btValidar.addEventListener('click', validaCPF);

function verificaDigitosRepetidos(cpf) {
    return  cpf.split('').every((d) => d === cpf[0]);
}
