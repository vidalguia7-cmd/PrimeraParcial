const formulario = document.getElementById("formReserva");
const inputNombre = document.getElementById("nombre");
const inputFecha = document.getElementById("fecha");
const inputPersonas = document.getElementById("personas");
const resumen = document.getElementById("resumen");

// Fecha de hoy en formato AAAA-MM-DD (hora local)
const hoy = new Date();
const hoyTexto = hoy.getFullYear() + "-" +
  String(hoy.getMonth() + 1).padStart(2, "0") + "-" +
  String(hoy.getDate()).padStart(2, "0");
inputFecha.min = hoyTexto;

// Muestra el error (o lo limpia) y marca el campo en rojo/verde
function marcar(input, errorId, mensaje) {
  document.getElementById(errorId).textContent = mensaje;
  input.classList.toggle("invalido", mensaje !== "");
  input.classList.toggle("valido", mensaje === "");
  return mensaje === "";
}

function validarNombre() {
  const valor = inputNombre.value.trim();
  let msg = "";
  if (valor === "") msg = "El nombre es obligatorio.";
  else if (valor.length < 3) msg = "El nombre debe tener al menos 3 caracteres.";
  return marcar(inputNombre, "errorNombre", msg);
}

function validarFecha() {
  const valor = inputFecha.value;
  let msg = "";
  if (valor === "") msg = "Selecciona una fecha.";
  else if (valor < hoyTexto) msg = "La fecha no puede ser anterior a hoy.";
  return marcar(inputFecha, "errorFecha", msg);
}

function validarPersonas() {
  const valor = inputPersonas.value;
  const n = Number(valor);
  let msg = "";
  if (valor === "") msg = "Indica la cantidad de personas.";
  else if (!Number.isInteger(n)) msg = "Debe ser un número entero.";
  else if (n < 1 || n > 20) msg = "Debe estar entre 1 y 20 personas.";
  return marcar(inputPersonas, "errorPersonas", msg);
}

// Eventos: validación en tiempo real
inputNombre.addEventListener("input", validarNombre);
inputFecha.addEventListener("change", validarFecha);
inputPersonas.addEventListener("input", validarPersonas);

// Evento submit: valida todo y muestra el resumen sin recargar la página
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const okNombre = validarNombre();
  const okFecha = validarFecha();
  const okPersonas = validarPersonas();

  if (!(okNombre && okFecha && okPersonas)) {
    resumen.classList.add("oculto");
    return;
  }

  const [anio, mes, dia] = inputFecha.value.split("-");
  const fechaBonita = new Date(anio, mes - 1, dia).toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const n = Number(inputPersonas.value);

  document.getElementById("resNombre").textContent = inputNombre.value.trim();
  document.getElementById("resFecha").textContent = fechaBonita;
  document.getElementById("resPersonas").textContent =
    n + (n === 1 ? " persona" : " personas");

  resumen.classList.remove("oculto");
});