
      document.addEventListener('DOMContentLoaded', () => {
        const welcomePage = document.getElementById('welcome-page');
        const mainContent = document.getElementById('main-content');
        const startButton = document.getElementById('start-button');

        startButton.addEventListener('click', () => {
            welcomePage.classList.add('hidden');
            mainContent.classList.remove('hidden');
            // Opcional: Iniciar música automaticamente aqui, se desejar
            // audioPlayer.play();
        });

        // --- Lógica do Carrossel ---
        const carouselImage = document.getElementById('carousel-image');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        // ------------------------------------------
        // !!! ADICIONE AS URLs DAS SUAS FOTOS AQUI !!!
        // ------------------------------------------
        const images = [
          './assets/images/1.jpeg',
          './assets/images/2.jpeg', 
          './assets/images/3.jpeg', 
          './assets/images/4.jpeg', 
          './assets/images/5.jpeg', 
  
        ];
        
        let currentIndex = 0;
        
        function showImage(index) {
          // Trata o "loop" da galeria
          if (index < 0) {
            currentIndex = images.length - 1;
          } else if (index >= images.length) {
            currentIndex = 0;
          }
          
          carouselImage.src = images[currentIndex];
        }
        
        nextBtn.addEventListener('click', () => {
          currentIndex++;
          showImage(currentIndex);
        });
        
        prevBtn.addEventListener('click', () => {
          currentIndex--;
          showImage(currentIndex);
        });
        
        // --- Lógica do Player de Música ---
        const audioPlayer = document.getElementById('audio-player');
        const playPauseBtn = document.getElementById('play-pause-btn');
        const playIcon = document.getElementById('play-icon');
        const pauseIcon = document.getElementById('pause-icon');
        const progressBar = document.getElementById('progress-bar');
        const currentTimeSpan = document.getElementById('current-time');
        const durationSpan = document.getElementById('duration');
        
        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
        }

        playPauseBtn.addEventListener('click', () => {
          if (audioPlayer.paused) {
            audioPlayer.play();
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
          } else {
            audioPlayer.pause();
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
          }
        });
        
        audioPlayer.addEventListener('timeupdate', () => {
            const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressBar.style.width = `${progress}%`;
            currentTimeSpan.textContent = formatTime(audioPlayer.currentTime);
        });

        audioPlayer.addEventListener('loadedmetadata', () => {
            durationSpan.textContent = formatTime(audioPlayer.duration);
        });

        // Reseta o ícone quando a música termina
        audioPlayer.addEventListener('ended', () => {
          playIcon.classList.remove('hidden');
          pauseIcon.classList.add('hidden');
          progressBar.style.width = '0%';
          currentTimeSpan.textContent = '0:00';
        });

        // --- Lógica do Contador de Tempo ---
        const timeSinceElement = document.getElementById('time-since');
        
        // ------------------------------------------
        // !!! DEFINA A DATA DE INÍCIO DO RELACIONAMENTO AQUI !!!
        // Formato: 'YYYY-MM-DDTHH:MM:SS' ou 'YYYY-MM-DD'
        // Exemplo: new Date('2021-08-15T10:30:00'); para 15 de agosto de 2021, às 10:30 da manhã
        // Ou new Date('2021-08-15'); para 15 de agosto de 2021, meia-noite
        // ------------------------------------------
        const startDate = new Date('2025-09-29T00:00:00'); // Mude esta data!

        function updateTimeSince() {
            const now = new Date();
            const diff = now.getTime() - startDate.getTime(); // Diferença em milissegundos

            const seconds = Math.floor(diff / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            const years = Math.floor(days / 365.25); // Considera anos bissextos

            const remainingDays = Math.floor(days % 365.25);
            const remainingHours = hours % 24;
            const remainingMinutes = minutes % 60;
            const remainingSeconds = seconds % 60;

            timeSinceElement.innerHTML = `
                ${years} ano${years !== 1 ? 's' : ''}, 
                ${remainingDays} dia${remainingDays !== 1 ? 's' : ''}, 
                ${remainingHours} hora${remainingHours !== 1 ? 's' : ''}, 
                ${remainingMinutes} minuto${remainingMinutes !== 1 ? 's' : ''} e 
                ${remainingSeconds} segundo${remainingSeconds !== 1 ? 's' : ''}
            `;
        }

        // Atualiza o contador a cada segundo
        setInterval(updateTimeSince, 1000);
        updateTimeSince(); // Chama uma vez para exibir imediatamente

        // Inicializa os ícones do Phosphor (garante que sejam renderizados)
        window.addEventListener('load', () => {
            if (typeof phosphor !== 'undefined' && phosphor.replace) {
                phosphor.replace();
            }
        });
      });