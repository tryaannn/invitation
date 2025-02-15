// script.js
document.getElementById("open-invitation").addEventListener("click", function () {
  // Tambahkan class untuk memicu animasi slide up
  document.getElementById("opening-screen").classList.add("slide-up");

  // Setelah animasi selesai, sembunyikan tampilan awal dan tampilkan section
  setTimeout(function () {
      document.getElementById("opening-screen").style.display = "none";

      // Tampilkan semua section
      const sections = document.querySelectorAll("section");
      sections.forEach(section => {
          section.style.display = "block";
      });
  }, 1000); // Sesuaikan waktu dengan durasi animasi (1 detik)
});