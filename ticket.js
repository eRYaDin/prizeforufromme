// ===== 7️⃣ TIKET PALSU → ASLI =====

function tiket() {
  // Tiket palsu kebakar dulu
  app.innerHTML = `
    <div class="fire">🔥</div>
    <h2>OH TIDAK!</h2>
    <p>Tiket kebakar...</p>
  `;
  
  // Setelah 1.5 detik, muncul tiket asli
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
