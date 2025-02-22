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

// ===================== FUNGSI AUDIO =====================
const audioController = (() => {
  const audioIconWrapper = document.querySelector('.audio-icon-wrapper');
  const audioIcon = document.querySelector('.audio-icon-wrapper i');
  const song = document.querySelector('#song');
  let isPlaying = false;

  const play = () => {
    try {
      song.volume = 0.1;
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
        section.style.display = "block";
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