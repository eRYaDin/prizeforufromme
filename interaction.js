// ===== 1️⃣ IDENTITAS — SALAH 3X =====
let attempt = 0;

function identitas() {
  app.innerHTML = `
    <h2>🎁 Siapa Namamu?</h2>
    <input type="text" id="nama" placeholder="Tulis namamu...">
    <button onclick="cekNama()">Lanjut</button>
    <p class="msg" id="msg"></p>
  `;
}

function cekNama() {
  attempt++;
  document.getElementById("msg").innerText =
    attempt < 3 ? "Salah 😏" : (next(), "");
}

// ===== 2️⃣ KLIK HARI HIDUP — BOHONG =====
let klik = 0;

function klikHari() {
  app.innerHTML = `
    <h2>💫 Kamu sudah hidup</h2>
    <p style="font-size: 32px; font-weight: bold;">6.532 hari</p>
    <p>Klik tombol ini sebanyak hari hidupmu!</p>
    <button onclick="klikTambah()">KLIK (${klik})</button>
  `;
}

function klikTambah() {
  klik++;
  if (klik === 10) {
    next();
  } else {
    klikHari();
  }
}

// ===== 3️⃣ PUZZLE MUSTAHIL (FAKE) =====
let gerak = 0;

function puzzle() {
  app.innerHTML = `
    <h2>🧩 Susun Puzzle</h2>
    <p>Susun angka 1-8 dengan benar!</p>
    <div class="puzzle">
      <div class="puzzle-piece">8</div>
      <div class="puzzle-piece">3</div>
      <div class="puzzle-piece">1</div>
      <div class="puzzle-piece">7</div>
      <div class="puzzle-piece">5</div>
      <div class="puzzle-piece">2</div>
      <div class="puzzle-piece">4</div>
      <div class="puzzle-piece">6</div>
      <div class="puzzle-piece" style="background: white;"></div>
    </div>
    <button onclick="geserPuzzle()">Geser</button>
    <p class="msg">Gerakan: ${gerak}</p>
  `;
}

function geserPuzzle() {
  gerak++;
  if (gerak === 3) {
    next();
  } else {
    puzzle();
  }
}

// ===== 4️⃣ PINTU — SALAH 3X =====
let doorTry = 0;

function pintu() {
  app.innerHTML = `
    <h2>🚪 Pilih Pintu yang Benar</h2>
    <p>Ada 3 pintu. Pilih salah satu!</p>
    <button class="door" onclick="pilihPintu()">🚪</button>
    <button class="door" onclick="pilihPintu()">🚪</button>
    <button class="door" onclick="pilihPintu()">🚪</button>
    <p class="msg" id="d"></p>
  `;
}

function pilihPintu() {
  doorTry++;
  document.getElementById("d").innerText =
    doorTry < 3 ? "Salah 💥" : (next(), "");
}

// ===== 5️⃣ TOMBOL BERANAK =====
let ya = 1;

function tombolYa() {
  let btn = "";
  for (let i = 0; i < ya; i++) {
    btn += `<button onclick="tombolBeranak()">YA</button>`;
  }
  
  app.innerHTML = `
    <h2>✨ Mau hadiah?</h2>
    <p>Klik tombol YA!</p>
    ${btn}
  `;
  
  ya++;
  if (ya === 8) next();
}

function tombolBeranak() {
  tombolYa();
}

// ===== 6️⃣ YAKIN LOOP =====
let yakin = 0;
const tanya = ["Yakin?", "Beneran?", "Masih mau?", "Gak ragu?", "Siap?"];

function yakinLoop() {
  app.innerHTML = `
    <h2>🤔 ${tanya[yakin]}</h2>
    <p>Klik YA untuk lanjut!</p>
    <button onclick="yakinNext()">YA</button>
  `;
}

function yakinNext() {
  yakin++;
  if (yakin === 5) {
    next();
  } else {
    yakinLoop();
  }
}
