// --- Mascotas / Frases Interactivas ---
const frasesPincelin = [
  "¡El arte nos permite comunicar lo que las palabras no pueden!",
  "¿Sabías que mezclar amarillo y azul crea el verde de la naturaleza?",
  "¡Equivocarse en el arte es solo descubrir una nueva forma de crear!",
  "El ODS 4 busca que todas las personas tengan derecho a aprender felizmente.",
  "¡El dibujo ayuda a ejercitar tu mente y tu concentración todos los días!"
];
function hablarMascota() {
  const bubble = document.getElementById("charBubble");
  const randomMsg = frasesPincelin[Math.floor(Math.random() * frasesPincelin.length)];
  bubble.textContent = randomMsg;
}

function toggleCard(card){ card.classList.toggle("active"); }

// --- Algoritmo de Mezcla de Color ---
function calcularMezcla(){
  const cA = document.getElementById("colorA").value;
  const cB = document.getElementById("colorB").value;
  const mixBox = document.getElementById("mixBox");
  const mixName = document.getElementById("mixName");
  const mixInfo = document.getElementById("mixInfo");
  const pigmentColors = {
    amarillo: "#FFD166",
    azul: "#4A90E2",
    rojo: "#F15BB5",
    blanco: "#FFFFFF"
  };

  const mezclas = {
    "amarillo-azul": { n: "Verde Botella", rgb: "#06D6A0", inf: "Sustracción primaria: el amarillo absorbe azul y el azul absorbe rojo." },
    "azul-amarillo": { n: "Verde Botella", rgb: "#06D6A0", inf: "Sustracción primaria: el amarillo absorbe azul y el azul absorbe rojo." },
    "amarillo-rojo": { n: "Naranja Cadmio", rgb: "#FF9F1C", inf: "Mezcla de primarios cálidos con alta vibración visual." },
    "rojo-amarillo": { n: "Naranja Cadmio", rgb: "#FF9F1C", inf: "Mezcla de primarios cálidos con alta vibración visual." },
    "azul-rojo": { n: "Violeta Profundo", rgb: "#9B5DE5", inf: "Combinación de primarios creando valores tonales oscuros." },
    "rojo-azul": { n: "Violeta Profundo", rgb: "#9B5DE5", inf: "Combinación de primarios creando valores tonales oscuros." },
    "amarillo-blanco": { n: "Amarillo Pastel", rgb: "#FFE49e", inf: "Aumento de valor lumínico y desaturación del tono." },
    "blanco-amarillo": { n: "Amarillo Pastel", rgb: "#FFE49e", inf: "Aumento de valor lumínico y desaturación del tono." },
    "azul-blanco": { n: "Azul Celeste", rgb: "#A8CBF3", inf: "Desaturación de azul primario hacia tonos luminosos fríos." },
    "blanco-azul": { n: "Azul Celeste", rgb: "#A8CBF3", inf: "Desaturación de azul primario hacia tonos luminosos fríos." },
    "rojo-blanco": { n: "Rosa Pastel", rgb: "#F6A9C7", inf: "Tono pastel obtenido por alta reflectancia de luz." },
    "blanco-rojo": { n: "Rosa Pastel", rgb: "#F6A9C7", inf: "Tono pastel obtenido por alta reflectancia de luz." }
  };

  const key = `${cA}-${cB}`;
  if(cA === cB) {
    mixName.textContent = "Mismo Pigmento";
    mixBox.style.background = pigmentColors[cA];
    mixInfo.textContent = "Sin alteración cromática sustancial.";
  } else if(mezclas[key]) {
    const res = mezclas[key];
    mixName.textContent = res.n;
    mixBox.style.background = res.rgb;
    mixInfo.textContent = res.inf;
  }
}

// --- Generador Aleatorio ---
function generarIdeaAleatoria(){
  const tecnicas = ["Pintura Acrílica", "Grabado en Linóleo", "Escultura en Arcilla", "Dibujo a Tinta", "Collage de Papel Reciclado"];
  const temas = ["la inclusión escolar", "el derecho a la educación", "la diversidad cultural", "la creatividad en la comunidad"];
  const paletas = ["Colores Primarios Puros", "Tonos Pasteles", "Contraste Complementario", "Monocromía Cálida"];

  const t = tecnicas[Math.floor(Math.random() * tecnicas.length)];
  const tm = temas[Math.floor(Math.random() * temas.length)];
  const p = paletas[Math.floor(Math.random() * paletas.length)];

  document.getElementById("promptOutput").innerHTML = `🎨 <strong>Propuesta:</strong> Realizar una obra en <u>${t}</u> enfocada en <u>${tm}</u> utilizando una paleta de <u>${p}</u>.`;
}

// --- Memorama ---
const symbols = ["🎨","🖌️","✏️","🪵","🗿","📚","🌱","💡"];
let cards = [], first = null, second = null, lock = false, moves = 0, pairs = 0;

function startGame(){
  const board = document.getElementById("memory");
  const win = document.getElementById("win");
  board.innerHTML = ""; win.classList.remove("show");
  first = null; second = null; lock = false; moves = 0; pairs = 0;
  document.getElementById("moves").textContent = moves;
  document.getElementById("pairs").textContent = pairs;
  cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
  cards.forEach((symbol) => {
    const b = document.createElement("button");
    b.className = "tile"; b.dataset.symbol = symbol;
    b.textContent = "?";
    b.onclick = () => flip(b);
    board.appendChild(b);
  });
}

function flip(card){
  if(lock || card.classList.contains("open") || card.classList.contains("matched")) return;
  card.classList.add("open"); card.textContent = card.dataset.symbol;
  if(!first){ first = card; return; }
  second = card; moves++; document.getElementById("moves").textContent = moves;
  if(first.dataset.symbol === second.dataset.symbol){
    first.classList.add("matched"); second.classList.add("matched");
    pairs++; document.getElementById("pairs").textContent = pairs;
    first = null; second = null;
    if(pairs === symbols.length) setTimeout(() => document.getElementById("win").classList.add("show"), 300);
  } else {
    lock = true;
    setTimeout(() => {
      first.classList.remove("open"); second.classList.remove("open");
      first.textContent = "?"; first = null; second = null; lock = false;
    }, 800);
  }
}
startGame();

// --- Canvas / Lienzo ---
const canvas = document.getElementById('dibujoCanvas');
const ctx = canvas.getContext('2d');
let painting = false;
let currentColor = '#8d4264';

const colors = ['#8d4264', '#4A90E2', '#06D6A0', '#FFD166', '#FF9F1C', '#9B5DE5', '#2c3e50'];
const picker = document.getElementById('colorPicker');
colors.forEach(color => {
  const btn = document.createElement('div');
  btn.className = 'color-btn';
  btn.style.background = color;
  if(color === currentColor) btn.classList.add('active');
  btn.onclick = () => {
    document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentColor = color;
  };
  picker.appendChild(btn);
});

function startPosition(e) { painting = true; draw(e); }
function endPosition() { painting = false; ctx.beginPath(); }
function draw(e) {
  if (!painting) return;
  e.preventDefault();
  const rect = canvas.getBoundingClientRect();
  const clientX = typeof e.clientX === "number" ? e.clientX : e.touches && e.touches[0].clientX;
  const clientY = typeof e.clientY === "number" ? e.clientY : e.touches && e.touches[0].clientY;
  if(clientX == null || clientY == null) return;
  const x = (clientX - rect.left) * (canvas.width / rect.width);
  const y = (clientY - rect.top) * (canvas.height / rect.height);

  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.strokeStyle = currentColor;
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchstart', startPosition, {passive: false});
canvas.addEventListener('touchend', endPosition);
canvas.addEventListener('touchmove', draw, {passive: false});

function clearCanvas() { ctx.clearRect(0, 0, canvas.width, canvas.height); }
calcularMezcla();
