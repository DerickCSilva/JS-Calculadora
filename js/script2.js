// Tratativa que formata a data adicionando um 0
const addZero = (i) => {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// Pegando a data atual
let data = new Date();
let horas = addZero(data.getHours());
let minutos = addZero(data.getMinutes());

//Colocando o horario na tag html
let campoHorario = document.getElementById("horario");
campoHorario.innerHTML = horas + ":" + minutos;

//Função que mostra os valores que o usuário digitar
const agruparValor = (valor) => {
	let resultado = document.getElementById('resultado');
	let resFinal = resultado.value;
	resFinal = resFinal.indexOf('.');

	//Tratativas de erros + mostrar valores que usuário digitar
	if (Number.isInteger(parseInt(document.getElementById('calculo').innerText.slice(-1)))) {
 		alert('Digite uma operação antes do valor!');
 		resultado.value = '';
	} else if (resultado.value == '' && valor == '.') {
		resultado.value = '0'.concat(valor);

	} else if (resFinal != -1 && valor == '.') {
		try {
			resultado.value.slice(-1) = null;
		} catch(e) {
			console.log(e);
			alert('ERRO: Não pode digitar dois "pontos" em um único valor!');
			alert('Nessa aplicação o "ponto" é usado apenas para separar casas decimais e não centenas.');
		}
	} else if (resultado.value.slice(-1) == '.' && valor == '.') {
		//Famoso "apenas deixa como esta"
		resultado.value;

	} else if (resultado.value.length < 10){
		resultado.value += valor;

	} else if (resultado.value.length >= 10 && resultado.value.length < 15) {
		resultado.style.fontSize = '35px';
		resultado.value += valor;

	} else if (resultado.value.length >= 15 && resultado.value.length < 21) {
		resultado.style.fontSize = '25px';
		resultado.value += valor;		
	} 

	//Para não poder digitar vários zeros
	if (resultado.value.slice(0,2) == '0') {
		resultado.value = null;
	}
}

//Função que faz a maioria das coisas
const conferirOperacao = (operacao, conta) => {
	//Pegando o valor que tem dentro da tag html
	let calculo = document.getElementById('calculo');
	let calculoCompleto = calculo.innerText;

	if (operacao === '=' && calculoCompleto != '') {
		
		//Esse primeiro IF esta conferindo se o ultimo caractere que tiver na tag html é um número
		if (Number.isInteger(parseInt(document.getElementById('calculo').innerText.slice(-1)))) {
			alert('Digite uma operação antes do valor!');
			document.getElementById('resultado').value =  '';

		} else {
			//Se não for número, suba o valor que o usuário digitou + a operação clicada
			let result = (document.getElementById('calculo').innerText += ' ' + document.getElementById('resultado').value);
			let resultFinal = result.replace(/ /g, ''); //Regex para tirar os espaços
			resultFinal = resultFinal.replace(/x/g, '*'); //Regex para colocar sinal de multiplicação

			//Conferindo se o Regex foi feito
			//console.log(eval(resultFinal));

			//Aplicando os resultados visualmente (mexendo com o objeto document)
			let resultado = document.getElementById('resultado');
			resultado.value = '';
			document.getElementById('calculoCompleto').innerText = document.getElementById('calculo').innerText;
			document.getElementById('calculo').innerText = eval(resultFinal);
			document.getElementById('resultado').placeholder =  eval(resultFinal);

			if (resultado.placeholder.length < 10){
				console.log('aqui1');
				resultado.style.fontSize = '50px';

			} else if (resultado.placeholder.length >= 10 && resultado.placeholder.length < 15) {
				console.log('aqui2');
				resultado.style.fontSize = '35px';

			} else if (resultado.placeholder.length >= 15 && resultado.placeholder.length < 21) {
				console.log('aqui3');
				resultado.style.fontSize = '25px';
			} else {
				console.log('aqui4');
				resultado.style.fontSize = '20px';				
			}
		}

	} else if (operacao == '%' && document.getElementById('resultado').value != '') {
		document.getElementById('resultado').value /= 100;

	} else if ((calculoCompleto == '' || calculoCompleto != '') && operacao != '=') {

		//Tratativa erro: Não deixar entrar o '.' caso ele seja a ultima coisa digitada
		if (document.getElementById('resultado').value.slice(-1) == '.') {
			let tirarPonto = document.getElementById('resultado').value;
			calculo = tirarPonto.replace('.', '');
			document.getElementById('calculo').innerText += ' ' + calculo + ' ' + operacao;

		} else if (document.getElementById('resultado').value == '' && (calculoCompleto.slice(-1) == '/' || calculoCompleto.slice(-1) == 'x' ||
			//Tratar erro: entrar com vários sinal de operação
			calculoCompleto.slice(-1) == '-' || calculoCompleto.slice(-1) == '+')) {
			calculo = document.getElementById('calculo').innerText;
		} else {
			calculo = (calculo.innerText += ' ' + conta + ' ' + operacao);
		}

		//Tratativa de erro: Não deixar colocar operação se não tiver nada na calculadora
		//console.log(calculo.slice(-1))
		//console.log(calculo.slice(0, 2))
		if (calculo.slice(-1) == operacao && calculo.slice(0, 2) == '  ') {
			document.getElementById('calculo').innerText = '';
		}

		document.getElementById('resultado').value = '';
		document.getElementById('resultado').placeholder = '0';
	}

}

//Função que formata os campos para o formato original
const apagar = (valor) => {
	if (valor === 'C') {
		document.getElementById('resultado').value = '';
		document.getElementById('calculo').innerText = '';
		document.getElementById('calculoCompleto').innerText = '';
		document.getElementById('resultado').placeholder =  '0';
		resultado.style.fontSize = '50px';

	} else if (valor === 'CE') {
		document.getElementById('resultado').value = '';
		document.getElementById('resultado').placeholder = '0';
		resultado.style.fontSize = '50px';

	}
}