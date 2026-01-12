// PENGATUR ALUR & PERPINDAHAN
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
  if (step === 5) yakinLoop();
  if (step === 6) tiket();
}

// Jalankan pertama kali
render();
