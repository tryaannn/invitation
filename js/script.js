// ===================== ANIMASI SCROLL MANUAL =====================
const initScrollAnimations = () => {
  const elements = document.querySelectorAll('.animate-slide');
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const element = entry.target;
      
      if(entry.isIntersecting) {
        // Animasi Masuk
        element.classList.add('animate-in');
        element.classList.remove('animate-out');
      } else {
        // Animasi Keluar
        if(element.classList.contains('animate-in')) {
          element.classList.add('animate-out');
          element.classList.remove('animate-in');
          
          // Reset state setelah animasi keluar selesai
          element.addEventListener('transitionend', () => {
            element.classList.remove('animate-out');
          }, {once: true});
        }
      }
    });
  }, observerOptions);

  elements.forEach(element => {
    observer.observe(element);
  });
};

//dropdown
function toggleDropdown() {
  const dropdown = document.getElementById('dropdown');
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function copyAccount(number) {
  navigator.clipboard.writeText(number)
      .then(() => alert('Nomor rekening berhasil disalin!'))
      .catch(err => console.error('Gagal menyalin:', err));
}

//toggle gift 
function toggleDropdown() {
  const dropdown = document.querySelector('.dropdown-content');
  const arrow = document.querySelector('.arrow');
  dropdown.classList.toggle('active');
  arrow.style.transform = dropdown.classList.contains('active') 
    ? 'rotate(180deg)' 
    : 'rotate(0deg)';
}

// Fungsi untuk copy nomor rekening
function copyAccount(buttonElement, accountNumber) {
  navigator.clipboard.writeText(accountNumber)
    .then(() => {
      // Simpan teks asli tombol
      const originalText = buttonElement.innerHTML;

      // Update tampilan tombol
      buttonElement.innerHTML = '<i class="bi bi-check2"></i> Tersalin!';
      buttonElement.classList.add('copied');

      // Reset tombol setelah 2 detik
      setTimeout(() => {
        buttonElement.innerHTML = originalText;
        buttonElement.classList.remove('copied');
      }, 2000);
    })
    .catch(err => {
      console.error('Gagal menyalin:', err);
      alert('Gagal menyalin ke clipboard');
    });
}

// Tutup dropdown saat klik di luar area
document.addEventListener('click', (e) => {
  const dropdown = document.querySelector('.dropdown-content');
  const button = document.querySelector('.toggle-btn');

  if (!button.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.remove('active');
    document.querySelector('.arrow').style.transform = 'rotate(0deg)';
  }
});

// ===================== FUNGSI AUDIO =====================
const audioController = (() => {
  const audioIconWrapper = document.querySelector('.audio-icon-wrapper');
  const audioIcon = document.querySelector('.audio-icon-wrapper i');
  const song = document.querySelector('#song');
  let isPlaying = false;

  const play = () => {
    try {
      song.volume = 0.3;
      audioIconWrapper.style.display = "flex";
      song.play();
      isPlaying = true;
      audioIcon.classList.add('bi-disc');
      audioIcon.classList.remove('bi-pause-circle');
    } catch (err) {
      console.log("Gagal memutar audio:", err);
    }
  };

  const toggle = () => {
    if (isPlaying) {
      song.pause();
      audioIcon.classList.remove('bi-disc');
      audioIcon.classList.add('bi-pause-circle');
    } else {
      song.play();
      audioIcon.classList.add('bi-disc');
      audioIcon.classList.remove('bi-pause-circle');
    }
    isPlaying = !isPlaying;
  };

  return { play, toggle };
})();

// hitung mundur
simplyCountdown(".simply-countdown", {
  year: 2025, // required
  month: 4, // required
  day: 7, // required
  hours: 8, // Default is 0 [0-23] integer
  minutes: 0, // Default is 0 [0-59] integer
  seconds: 0, // Default is 0 [0-59] integer
  words: {
    //words displayed into the countdown
    days: { singular: "Hari", plural: "Hari" },
    hours: { singular: "Jam", plural: "Jam" },
    minutes: { singular: "Menit", plural: "Menit" },
    seconds: { singular: "Detik", plural: "Detik" },
  },
  plural: true, //use plurals
  inline: false, //set to true to get an inline basic countdown like : 24 days, 4 hours, 2 minutes, 5 seconds
  inlineClass: "simply-countdown-inline", //inline css span class in case of inline = true
  // in case of inline set to false
  enableUtc: false,
  onEnd: function () {
    // your code
    return;
  },
  refresh: 1000, //default refresh every 1s
  sectionClass: "simply-section", //section css class
  amountClass: "simply-amount", // amount css class
  wordClass: "simply-word", // word css class
  zeroPad: false,
  countUp: false, // enable count up if set to true
});

// ===================== FUNGSI UTAMA =====================
document.addEventListener("DOMContentLoaded", () => {
  // Event Buka Undangan
  document.getElementById("open-invitation").addEventListener("click", function() {
    // Trigger animasi slide up
    document.getElementById("opening-screen").classList.add("slide-up");

    setTimeout(() => {
      // Sembunyikan tampilan awal
      document.getElementById("opening-screen").style.display = "none";
      
      // Tampilkan semua section
      document.querySelectorAll('section').forEach(section => {
        section.style.display = "flex";
      });

      // Inisialisasi animasi scroll
      initScrollAnimations();
      
      // Refresh animasi setiap 200ms selama 1 detik
      let refreshCount = 0;
      const refreshInterval = setInterval(() => {
        initScrollAnimations();
        if (++refreshCount >= 5) clearInterval(refreshInterval);
      }, 200);

      // Mulai musik
      audioController.play();
      
      // Aktifkan scroll
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    }, 1000);
  });

  // Event klik icon audio
  document.querySelector('.audio-icon-wrapper').addEventListener('click', audioController.toggle);
});
