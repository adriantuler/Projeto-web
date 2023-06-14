function validaCPF() {  
    const cpfFormatado = document.getElementById('cpf').value;
    const cpf = limpaFormatacao(cpfFormatado);
    
    if (cpf.length !== 11) {
        mostraResultado('CPF deve conter 11 dígitos', 'red');
        return false;
    }
    if (verificaDigitosRepetidos(cpf)){
        mostraResultado('CPF deve conter apenas dígitos repetidos', 'red');
        return false;
    }
    
    const digito1 = calculaDigitoVerificador(cpf, 1);
    const digito2 = calculaDigitoVerificador(cpf, 2);
    
    if (digito1) {
        mostraResultado('CPF inválido', 'red');
        return false;
    }

    if (digito2) {
        mostraResultado('CPF inválido', 'red');
        return false;
    }
    
    mostraResultado('CPF válido', 'green');
}

function calculaDigitoVerificador(cpf, posicao){
    const sequencia = cpf.slice(0, 8 + posicao).split('');
    let soma = 0;
    let mutiplicador = 9 + posicao;
    
    for (let i = 0; i < sequencia.length; i++) {
        soma += parseInt(sequencia[i]) * mutiplicador;
        mutiplicador--;
    }
    
    const restDivisao = (soma * 10) % 11;
    const digito = cpf.slice(8 + posicao, 9 + posicao);
    
    return restDivisao === parseInt(digito); 
}

function limpaFormatacao(cpf) {
    cpf = cpf.replace(/\D/g, '');
    return cpf;
}

function mostraResultado(texto, cor) {
    const span = document.getElementById('resultado');
    span.innerHTML = texto;
    span.style.color = cor;
}

function verificaDigitosRepetidos(cpf) {
    return cpf.split("").every((d) => d === cpf[0]);
}
