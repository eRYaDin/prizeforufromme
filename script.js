// ===== CORE - PENGATUR ALUR =====
let step = 0;
const app = document.getElementById("app");

function next() {
  step++;
  render();
}

function render() {
  if (step === 0) identitas();
  if (step === 1) klikHari();
  if (step === 2) puzzle();
  if (step === 3) pintu();
  if (step === 4) tombolYa();
  if (step === 5) ticTacToe();
  if (step === 6) yakinLoop();
  if (step === 7) tiket();
}

// ===== STAGE 1: IDENTITAS → UCAPAN ULTAH =====
let attempt = 0;
let userName = "";
let birthDate = "";

function identitas() {
  app.innerHTML = `
    <h2>🎂 Sebelum mulai...</h2>
    <input id="nama" type="text" placeholder="Nama lengkap">
    <input id="tgl" type="date">
    <button onclick="cekIdentitas()">Lanjut</button>
    <p class="msg" id="msg"></p>
  `;
}

function cekIdentitas() {
  attempt++;
  userName = document.getElementById("nama").value;
  birthDate = document.getElementById("tgl").value;

  if (!userName || !birthDate) {
    document.getElementById("msg").innerText = "Isi dulu dong 😊";
    return;
  }

  if (attempt < 3) {
    document.getElementById("msg").innerText = "Hmm… kayaknya salah 😏";
  } else {
    ucapanUltah();
  }
}

function ucapanUltah() {
  app.innerHTML = `
    <div class="birthday">
      <h2>🎉 SELAMAT ULANG TAHUN 🎉</h2>
      <p style="font-size:28px; font-weight:bold; color:#ff6b6b;">${userName} 🥳</p>
      <p>Hari ini kamu resmi masuk ke permainan hadiah spesial!</p>
      <p style="font-size:40px; margin:20px 0;">🎁✨🎈</p>
      <button onclick="next()">Mulai Permainan 🎮</button>
    </div>
  `;
}

// ===== STAGE 2: KLIK HARI HIDUP (REAL + KLIK DIMANA AJA) =====
let klik = 0;
let targetKlik = 12;

function hitungHariHidup() {
  const lahir = new Date(birthDate);
  const hariIni = new Date();
  return Math.floor((hariIni - lahir) / (1000 * 60 * 60 * 24));
}

function klikHari() {
  const hari = hitungHariHidup();

  app.innerHTML = `
    <h2>⏳ Kamu sudah hidup</h2>
    <p style="font-size:36px; font-weight:bold; color:#ff6b6b;">${hari} hari</p>
    <div class="click-area">
      <p>Klik layar ini sebanyak hari hidupmu!</p>
      <p style="font-size:28px; margin-top:30px;">👆</p>
      <p style="font-size:24px; font-weight:bold;">Klik: ${klik}</p>
    </div>
  `;

  app.onclick = () => {
    klik++;
    if (klik === targetKlik) {
      app.onclick = null;
      next();
    } else {
      klikHari();
    }
  };
}

// ===== STAGE 3: PUZZLE DRAG & DROP =====
let moveCount = 0;
let retryCount = 0; // Tambahan untuk retry
let board = [8, 3, 1, 7, 5, 2, 4, 6, ""];
let draggedIndex = null;

function puzzle() {
  app.innerHTML = `
    <h2>🧩 Susun Puzzle</h2>
    <p>Susun angka 1-8 dengan benar!</p>
    <div class="puzzle" id="puzzle"></div>
    <p class="msg">Gerakan: ${moveCount}/5 | Retry: ${retryCount}/3</p>
  `;

  const puzzleDiv = document.getElementById("puzzle");
  
  board.forEach((val, i) => {
    const piece = document.createElement("div");
    piece.className = val === "" ? "puzzle-piece empty" : "puzzle-piece";
    piece.innerText = val;
    piece.draggable = val !== "";
    piece.dataset.index = i;

    if (val !== "") {
      piece.ondragstart = (e) => {
        draggedIndex = i;
      };
    }

    piece.ondragover = (e) => e.preventDefault();
    
    piece.ondrop = (e) => {
      e.preventDefault();
      if (draggedIndex !== null && val === "") {
        [board[draggedIndex], board[i]] = [board[i], board[draggedIndex]];
        moveCount++;
        
        if (moveCount >= 5) {
          retryCount++;
          moveCount = 0;
          board = [8, 3, 1, 7, 5, 2, 4, 6, ""]; // Reset board
          
          if (retryCount === 3) {
            next();
          } else {
            setTimeout(() => puzzle(), 500);
          }
        } else {
          puzzle();
        }
      }
    };

    puzzleDiv.appendChild(piece);
  });
}

// ===== STAGE 4: PINTU ACAK + CURANG =====
let doorTry = 0;
let correctDoor = 0;

function pintu() {
  if (doorTry === 0) {
    tunjukPintu();
    setTimeout(acakPintu, 1500); // Auto lanjut tanpa tombol
  } else {
    showDoors();
  }
}

function tunjukPintu() {
  correctDoor = Math.floor(Math.random() * 6);
  
  app.innerHTML = `
    <h2>🚪 Pilih Pintu yang Benar</h2>
    <p>Ingat baik-baik pintu ini...</p>
    <button class="door" style="font-size:60px;">🚪 ← INI</button>
  `; // Hapus tombol lanjut
}

function acakPintu() {
  app.innerHTML = `
    <h2>🌀 Pintu sedang diacak...</h2>
    <p style="font-size:50px;">🌪️</p>
  `;
  
  setTimeout(() => {
    showDoors();
  }, 1500);
}

function showDoors() {
  app.innerHTML = `
    <h2>🚪 Pilih Pintunya!</h2>
    <p class="msg" id="doorMsg">Percobaan: ${doorTry}/3</p>
    <div class="door-container" id="doorContainer"></div>
  `;

  const container = document.getElementById("doorContainer");
  
  for (let i = 0; i < 6; i++) {
    const btn = document.createElement("button");
    btn.className = "door";
    btn.innerText = "🚪";
    btn.style.left = (i % 3) * 100 + Math.random() * 30 + "px";
    btn.style.top = Math.floor(i / 3) * 100 + Math.random() * 30 + "px";
    btn.onclick = () => pilihPintu(i);
    container.appendChild(btn);
  }
}

function pilihPintu(index) {
  if (index === correctDoor) {
    // Jika benar, langsung lanjut
    next();
    return;
  }
  
  doorTry++;
  
  if (doorTry < 3) {
    document.getElementById("doorMsg").innerText = "Salah 💥 Coba lagi!";
    setTimeout(() => showDoors(), 800); // Langsung showDoors lagi
  } else {
    // Setelah 3 kali salah, lanjut juga (curang)
    next();
  }
}

// ===== STAGE 5: TOMBOL YA RANDOM + HARUS HABIS =====
let yaPhase = 0; // 0 = nambah, 1 = habisin
let yaCount = 1;

function tombolYa() {
  app.innerHTML = `<h2>✨ Mau hadiah?</h2>`;

  if (yaPhase === 0) {
    // PHASE 1: YA MAKIN BANYAK
    app.innerHTML += `<p>Klik YA...</p>`;
    for (let i = 0; i < yaCount; i++) {
      const btn = document.createElement("button");
      btn.innerText = "YA";
      btn.onclick = () => {
        yaCount++;
        if (yaCount === 18) { // Ubah ke 18
          yaPhase = 1;
        }
        tombolYa();
      };
      app.appendChild(btn);
    }
  } else {
    // PHASE 2: YA HARUS HABIS (pakai yaCount yang sudah 18)
    app.innerHTML += `<p>Oke, sekarang habisin semua YA 😈</p>`;
    for (let i = 0; i < yaCount; i++) {
      const btn = document.createElement("button");
      btn.className = "random-btn";
      btn.innerText = "YA";
      btn.onclick = () => {
        btn.remove();
        yaCount--;
        if (yaCount === 0) {
          yaPhase = 0;
          next();
        }
      };
      app.appendChild(btn);
    }
  }
}

// ===== STAGE 6: TIC TAC TOE CURANG =====
let tttBoard = Array(10).fill(""); // Index 9 untuk luar grid
let winCount = 0;
let gameActive = true;
let winLine = null; // Tambahan untuk garis kemenangan

function ticTacToe() {
  gameActive = true;
  
  app.innerHTML = `
    <h2>❌ Tic Tac Toe ⭕</h2>
    <p>Main melawan bot!</p>
    <div id="grid"></div>
    <p class="msg">Bot menang: ${winCount}/3</p>
  `;

  const grid = document.getElementById("grid");
  
  // Hanya render 0-8, index 9 tidak ditampilkan
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    if (tttBoard[i]) cell.classList.add("filled");
    if (winLine && winLine.includes(i)) cell.classList.add("win"); // Tambah class win
    cell.innerText = tttBoard[i];
    cell.onclick = () => playerMove(i);
    grid.appendChild(cell);
  }
}

function playerMove(i) {
  if (!gameActive || tttBoard[i] !== "") return;
  
  tttBoard[i] = "❌";
  
  if (checkWin("❌")) {
    endGame("Kamu menang!");
    return;
  }
  
  if (tttBoard.slice(0, 9).every(c => c !== "")) {
    endGame("Seri!");
    return;
  }
  
  setTimeout(() => {
    botMove();
    ticTacToe();
  }, 500);
}

function botMove() {
  const empty = tttBoard.slice(0, 9).filter(c => c === "").length;
  
  if (empty <= 2) {
    // Curang saat hampir seri
    winCount++;
    gameActive = false;
    
    const cheatType = winCount % 2 === 0 ? "override" : "outside";
    if (cheatType === "override") {
      botOverride();
    } else {
      botCheatOutside();
    }
    
    app.innerHTML = `
      <h2>⭕ BOT MENANG</h2>
      <p>Ini harusnya seri...</p>
      <p>(${winCount}/3)</p>
    `;
    
    setTimeout(() => {
      tttBoard = Array(10).fill("");
      winLine = null; // Reset winLine
      if (winCount === 3) {
        next();
      } else {
        ticTacToe();
      }
    }, 2000);
    return;
  }
  
  // Normal bot move
  const emptyCells = tttBoard.slice(0, 9).map((v, i) => v === "" ? i : null).filter(v => v !== null);
  const pick = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  tttBoard[pick] = "⭕";
  
  if (checkWin("⭕")) {
    botCheat();
  }
}

function botCheatOutside() {
  tttBoard[9] = "⭕"; // Naro di luar grid
  // Paksa garis menang palsu (diagonal tengah)
  tttBoard[0] = "⭕";
  tttBoard[4] = "⭕";
  tttBoard[8] = "⭕";
  winLine = [0, 4, 8];
  app.innerHTML += `<p>⭕ muncul DI LUAR PAPAN 😨</p>`;
}

function botOverride() {
  const userCells = tttBoard.map((v, i) => v === "❌" ? i : null).filter(v => v !== null && v < 9);
  const target = userCells[Math.floor(Math.random() * userCells.length)];
  tttBoard[target] = "⭕"; // Nimpa user
  // Paksa garis menang palsu (vertikal kanan)
  tttBoard[2] = "⭕";
  tttBoard[5] = "⭕";
  tttBoard[8] = "⭕";
  winLine = [2, 5, 8];
  app.innerHTML += `<p>Eh? Kok X kamu ketimpa? 😐</p>`;
}

function checkWin(player) {
  const wins = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  
  return wins.some(combo => 
    combo.every(i => tttBoard[i] === player)
  );
}

function botCheat() {
  gameActive = false;
  winCount++;
  
  app.innerHTML = `
    <h2>⭕ BOT MENANG!</h2>
    <p>Tunggu... kok di luar papan? 🤨</p>
    <div class="bot-cheat">⭕</div>
    <p style="font-size:20px; font-weight:bold;">(${winCount}/3)</p>
  `;
  
  setTimeout(() => {
    tttBoard = Array(10).fill("");
    winLine = null; // Reset winLine
    if (winCount === 3) {
      next();
    } else {
      ticTacToe();
    }
  }, 2000);
}

function endGame(msg) {
  gameActive = false;
  setTimeout(() => {
    tttBoard = Array(10).fill("");
    winLine = null; // Reset winLine
    ticTacToe();
  }, 1500);
}

// ===== STAGE 7: YAKIN LOOP =====
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

// ===== STAGE 8: TIKET PALSU → ASLI =====
function tiket() {
  app.innerHTML = `
    <div class="fire">🔥</div>
    <h2>OH TIDAK!</h2>
    <p>Tiket kebakar...</p>
  `;
  
  setTimeout(() => {
    tiketAsli();
  }, 1500);
}

function tiketAsli() {
  app.innerHTML = `
    <h2>🎫 TIKET BANTUAN SPESIAL RAFIF</h2>
    <div class="tiket-box">
      <p style="font-size: 20px; font-weight: bold;">✨ SCREENSHOT TIKET INI ✨</p>
      <p>Tiket ini memberi <strong>satu kali kesempatan</strong> untuk meminta bantuan spesial dari Rafif.</p>
    </div>
    
    <div class="ketentuan">
      <h3>🌟 Apa yang dimaksud "bantuan spesial"?</h3>
      <p>Bantuan spesial ialah bantuan yang:</p>
      <ul>
        <li>Membutuhkan waktu dan usaha lebih dari biasanya</li>
        <li>Tidak dilakukan setiap hari</li>
        <li>Diberikan secara sadar dan ikhlas</li>
        <li>Dilakukan sekali untuk satu keperluan tertentu</li>
      </ul>
      
      <h3>🟢 Contoh bantuan yang BOLEH</h3>
      <ul>
        <li>Ditemani jalan ke tempat tertentu yang bermakna</li>
        <li>Ditemani melakukan sesuatu sampai selesai (bareng, bukan digantikan)</li>
        <li>Meluangkan waktu khusus di hari yang disepakati</li>
        <li>Dibantu memikirkan keputusan penting (diskusi, bukan menentukan)</li>
        <li>Dibantu menyiapkan sesuatu yang penting untuk kamu</li>
      </ul>
      
      <h3>🔴 Contoh bantuan yang TIDAK BOLEH</h3>
      <ul>
        <li>Uang atau sesuatu yang bernilai uang</li>
        <li>Permintaan berbahaya, ilegal, atau melanggar etika</li>
        <li>Contekan penuh, kecurangan akademik, atau menggantikan tanggung jawab</li>
        <li>Permintaan tanpa batas waktu atau bisa diulang-ulang</li>
        <li>Permintaan yang membuat salah satu pihak tidak nyaman</li>
      </ul>
      
      <h3>🚶 Tentang jalan-jalan</h3>
      <p>Jika bantuan berupa jalan-jalan:</p>
      <ul>
        <li>Rafif bersedia menemani</li>
        <li>Waktu dan tempat dibicarakan bersama</li>
        <li>Biaya tidak otomatis ditanggung Rafif</li>
      </ul>
      
      <h3>⚠️ Batasan penting</h3>
      <ul>
        <li>Tiket ini hanya berlaku <strong>satu kali</strong></li>
        <li>Tidak dapat ditukar, dipindahtangankan, atau diulang</li>
        <li>Rafif berhak menolak atau menyesuaikan permintaan agar tetap wajar dan aman</li>
        <li>Bantuan dilakukan berdasarkan kesepakatan kedua pihak</li>
      </ul>
    </div>
    
    <p style="margin-top: 20px; font-size: 16px; color: #ff6b6b;">
      💝 Selamat! Gunakan dengan bijak ya~
    </p>
  `;
}

// ===== JALANKAN GAME =====
render();
