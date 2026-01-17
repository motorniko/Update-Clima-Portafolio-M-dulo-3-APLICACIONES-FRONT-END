// ---------------- ESTADOS ----------------
const estados = ["☀️", "☁️", "🌧️", "⛈️", "❄️", "🌬️"];

// ---------------- CIUDADES ----------------
const ciudades = [
  { nombre: "Rocket-racoon", temp: 22, estado: "Soleado", icono: "☀️", clima: "sunny" },
  { nombre: "Xandar", temp: -2, estado: "Nevado", icono: "❄️", clima: "snowy" },
  { nombre: "knowhere", temp: 15, estado: "Ventoso", icono: "🌬️", clima: "windy" },
  { nombre: "Groot", temp: 7, estado: "Nublado", icono: "☁️", clima: "cloudy" },
  { nombre: "Ego", temp: 1, estado: "Despejado", icono: "🌕", clima: "sunny" },
  { nombre: "Floor", temp: 18, estado: "Soleado", icono: "☀️", clima: "sunny" },
  { nombre: "Lyla", temp: 25, estado: "Húmedo", icono: "💧", clima: "rainy" },
  { nombre: "teefs", temp: -20, estado: "Congelado", icono: "🧊", clima: "snowy" },
  { nombre: "89P13", temp: 12, estado: "Nublado", icono: "☁️", clima: "cloudy" },
  { nombre: "Nebula", temp: 28, estado: "Congelado", icono: "🧊", clima: "snowy" },
  { nombre: "Start-Lord", temp: 50, estado: "Soleado", icono: "☀️", clima: "sunny" },
  { nombre: "Motorniko-Galaxy", temp: 32, estado: "Nevado", icono: "❄️", clima: "snowy" }
];

// ---------------- FUNCIONES ----------------
function renderHome() {
  const container = document.getElementById("cards-container");
  if (!container) return;

  container.innerHTML = "";

  ciudades.forEach(c => {
    const col = document.createElement("div");
    col.className = "col";

    const card = document.createElement("div");
    card.className = `place-card place-card--${c.clima}`;
    card.addEventListener("click", () => verDetalle(c.nombre));

    card.innerHTML = `
      <div class="place-card__icon">${c.icono}</div>
      <div class="place-card__name">${c.nombre}</div>
      <div class="place-card__temp">${c.temp}°C</div>
      <div>${c.estado}</div>
    `;

    col.appendChild(card);
    container.appendChild(col);
  });
}

function verDetalle(nombre) {
  localStorage.setItem("ciudadSeleccionada", nombre);
  window.location.href = "detalle.html"; // <- coincide con el archivo real
}

function renderDetalle() {
  const nombre = localStorage.getItem("ciudadSeleccionada");
  if (!nombre) return;

  const ciudad = ciudades.find(c => c.nombre === nombre);
  if (!ciudad) return;

  document.getElementById("city-title").textContent = ciudad.nombre;

  const current = document.getElementById("current-weather");
  current.innerHTML = `
    <div style="font-size:2rem">${ciudad.icono}</div>
    <div style="font-weight:bold; font-size:1.5rem">${ciudad.temp}°C</div>
    <div>${ciudad.estado}</div>
    <div>Viento: ${Math.floor(Math.random() * 30)} km/h</div>
    <div>Humedad: ${Math.floor(Math.random() * 100)}%</div>
  `;

  const semana = ["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"];
  const forecastContainer = document.getElementById("week-forecast");
  forecastContainer.innerHTML = "";

  semana.forEach(dia => {
    const tempRandom = ciudad.temp + Math.floor(Math.random()*6-3);
    const iconoRandom = estados[Math.floor(Math.random()*estados.length)];

    const col = document.createElement("div");
    col.className = "col-6 col-md-4 col-lg-3 mb-3";

    const card = document.createElement("div");
    card.className = `place-card place-card--${ciudad.clima}`;
    card.innerHTML = `
      <div class="place-card__name">${dia}</div>
      <div class="place-card__icon">${iconoRandom}</div>
      <div class="place-card__temp">${tempRandom}°C</div>
    `;

    col.appendChild(card);
    forecastContainer.appendChild(col);
  });
}

// ---------------- INICIALIZACIÓN ----------------
if (document.getElementById("cards-container")) renderHome();
if (document.getElementById("city-title")) renderDetalle();
