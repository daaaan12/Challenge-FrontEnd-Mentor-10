//

const btnCalcular = document.querySelector('.btn-calcular');
const spansResultado = document.querySelectorAll('.super-traco');

btnCalcular.addEventListener('click', () => {
  const inputDia = parseInt(document.querySelector('input[placeholder="DD"]').value);
  const inputMes = parseInt(document.querySelector('input[placeholder="MM"]').value);
  const inputAno = parseInt(document.querySelector('input[placeholder="YYYY"]').value);

  if (!inputDia || !inputMes || !inputAno) {
    alert('Preencha todos os campos corretamente');
    return;
  }

  if (inputMes < 1 || inputMes > 12) {
    alert('Insira um mês válido');
    return;
  }

  const dataNascimento = new Date(inputAno, inputMes - 1, inputDia);
  const dataAtual = new Date();

  if (dataNascimento > dataAtual) {
    alert('Insira uma data de nascimento válida');
    return;
  }

  const diferencaEmMilissegundos = dataAtual.getTime() - dataNascimento.getTime();
  const diferencaEmAnos = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24 * 365));
  const diferencaEmMeses = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24 * 30.44));
  const diferencaEmDias = Math.floor(diferencaEmMilissegundos / (1000 * 60 *60 * 24));

  spansResultado[0].textContent = diferencaEmAnos;
  spansResultado[1].textContent = diferencaEmMeses;
  spansResultado[2].textContent = diferencaEmDias;

  // Animar o resultado
  animateValue(spansResultado[0], 0, diferencaEmAnos, 1000);
  animateValue(spansResultado[1], 0, diferencaEmMeses, 1000);
  animateValue(spansResultado[2], 0, diferencaEmDias, 1000);
});

function animateValue(element, start, end, duration) {
    let range = end - start;
    let current = start;
    let increment = end > start ? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));
    let timer = setInterval(function() {
      current += increment;
      if (increment === 1 && current >= end || increment === -1 && current <= end) {
        clearInterval(timer);
      } else if (current < 0) {
        element.textContent = 0;
        clearInterval(timer);
      } else {
        element.textContent = current;
      }
    }, stepTime);
  }


// ERROR MSG

const inputDia = document.querySelector('input[placeholder="DD"]');
const inputMes = document.querySelector('input[placeholder="MM"]');
const inputAno = document.querySelector('input[placeholder="YYYY"]');
const errorMessageDia = inputDia.nextElementSibling;
const errorMessageMes = inputMes.nextElementSibling;
const errorMessageAno = inputAno.nextElementSibling;

inputDia.addEventListener('blur', () => {
  const dia = parseInt(inputDia.value);
  if (!inputDia.value) {
    errorMessageDia.textContent = 'This field is required.';
  } else if (isNaN(dia) || dia < 1 || dia > 31) {
    errorMessageDia.textContent = 'Must be a valid day.';
  } else {
    errorMessageDia.textContent = '';
  }
});

inputMes.addEventListener('blur', () => {
  const mes = parseInt(inputMes.value);
  if (!inputMes.value) {
    errorMessageMes.textContent = 'This field is required.';
  } else if (isNaN(mes) || mes < 1 || mes > 12) {
    errorMessageMes.textContent = 'Must be a valid month.';
  } else {
    errorMessageMes.textContent = '';
  }
});

inputAno.addEventListener('blur', () => {
  const ano = parseInt(inputAno.value);
  const dataNascimento = new Date(ano, inputMes.value - 1, inputDia.value);
  const dataAtual = new Date();
  if (!inputAno.value) {
    errorMessageAno.textContent = 'This field is required.';
  } else if (isNaN(ano) || dataNascimento > dataAtual) {
    errorMessageAno.textContent = 'Must be in the past.';
  } else {
    errorMessageAno.textContent = '';
  }
});
