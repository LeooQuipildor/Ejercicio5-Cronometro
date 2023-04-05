let comenzarTiempo;
let pausarTiempo;
let enPausa = false;
let diferenciaTiempo = 0;

let btnStart = document.getElementById("btnStart");
btnStart.addEventListener("click", iniciarCronometro);

function iniciarCronometro() {
  if (comenzarTiempo) {
    resetearCronometro();
    btnStart.innerHTML = `INICIAR`;
    return;
  }
  btnPausar.disabled = false;
  btnStart.disabled = true;
  comenzarTiempo = new Date().getTime() - diferenciaTiempo;
  pausarTiempo = setInterval(actualizarCronometro, 1);
  btnStart.innerHTML = `RESETEAR`;
}

function actualizarCronometro() {
  if (!comenzarTiempo) {
    return;
  }

  let tiempoTranscurrido = new Date().getTime() - comenzarTiempo;
  let milesimas = Math.floor(tiempoTranscurrido / 10);
  let segundos = Math.floor(tiempoTranscurrido / 1000);
  let minutos = Math.floor(segundos / 60);
  let horas = Math.floor(minutos / 60);

  milesimas %= 99;
  segundos %= 60;
  minutos %= 60;

  let pMiliseconds = document.getElementById("pMiliseconds");
  pMiliseconds.innerHTML = `${milesimas.toString().padStart(2, "0")}`;

  let pHourAndMinutes = document.getElementById("pHourAndMinutes");
  pHourAndMinutes.innerHTML = `${horas.toString().padStart(2, "0")}:${minutos
    .toString()
    .padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
}

let btnPausar = document.getElementById("btnPausar");
btnPausar.addEventListener("click", pausarCronometro);
btnPausar.style.backgroundColor = "red"
btnPausar.style.color = "white"

function pausarCronometro() {
  if (enPausa) {
    pausarTiempo = setInterval(actualizarCronometro, 1);
    btnPausar.innerHTML = `PAUSAR`;
    enPausa = false;
    comenzarTiempo = new Date().getTime() - diferenciaTiempo;
    btnStart.disabled = true;
    btnPausar.style.backgroundColor = "red"
  btnPausar.style.color = "white"
  } else {
    btnPausar.style.backgroundColor = "green"
    btnPausar.style.color = "white"
    btnStart.disabled = false;
    clearInterval(pausarTiempo);
    btnPausar.innerHTML = `RESUMIR`;
    enPausa = true;
    diferenciaTiempo = new Date().getTime() - comenzarTiempo;
  }
}

function resetearCronometro() {
  comenzarTiempo = null;
  clearInterval(pausarTiempo);
  diferenciaTiempo = 0;

  let pMiliseconds = document.getElementById("pMiliseconds");
  let pHourAndMinutes = document.getElementById("pHourAndMinutes");

  pMiliseconds.innerHTML = "00";
  pHourAndMinutes.innerHTML = "00:00:00";
  enPausa = false;
  btnPausar.disabled = true;
  btnPausar.innerHTML = `PAUSAR`;
  btnPausar.style.backgroundColor = "red"
  btnPausar.style.color = "white"
}
