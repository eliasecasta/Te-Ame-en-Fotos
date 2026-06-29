/* ===========================
   NUESTRA HISTORIA · 2014 — ∞
   JavaScript para animaciones y interactividad
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

    // ===========================
    // PLAYLIST DE MÚSICA
    // ===========================
    // Las canciones se reproducen en loop con crossfade de 5 segundos.

    const playlist = [
        { file: 'Paradise - Coldplay.mp3', title: 'Paradise', artist: 'Coldplay' },
        { file: 'Ojos Verdes - Julion Alvarez.mp3', title: 'Ojos Verdes', artist: 'Julión Álvarez' },
        { file: 'Despacito - Luis Fonsi & Daddy Yankee.mp3', title: 'Despacito', artist: 'Luis Fonsi & Daddy Yankee' },
        { file: 'Pesao - Cartel de Santa.mp3', title: 'Pesao', artist: 'Cartel de Santa' },
        { file: 'Un Café Con Dios - Corridos de Fe para Jesus.mp3', title: 'Un Café Con Dios', artist: 'Corridos de Fe para Jesús' },
        { file: 'Leave a light on - Tom Walker.mp3', title: 'Leave a Light On', artist: 'Tom Walker' },
        { file: 'Cancion para Regresar - Sebastina Yatra.mp3', title: 'Canción para Regresar', artist: 'Sebastián Yatra' },
    ];

    // ===========================
    // PRELOADER
    // ===========================
    const preloader = document.getElementById('preloader');

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
            // Try to autoplay music after preloader hides
            attemptMusicAutoplay();
        }, 1800);
    });

    // Fallback si load ya pasó
    setTimeout(() => {
        if (!preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
        }
    }, 3500);

    // ===========================
    // HERO PARTICLES
    // ===========================
    const particlesContainer = document.getElementById('particles');
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${8 + Math.random() * 12}s`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.width = `${1 + Math.random() * 2}px`;
        particle.style.height = particle.style.width;

        // Algunos son dorados, otros rosados, otros blancos
        const colors = ['#c9a961', '#e8d5a0', '#c4868c', '#e8e4d8'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        particlesContainer.appendChild(particle);
    }

    // ===========================
    // SCROLL REVEAL
    // ===========================
    const revealElements = document.querySelectorAll('.reveal-up');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ===========================
    // FLOATING NAV
    // ===========================
    const floatingNav = document.getElementById('floatingNav');
    const navProgress = document.getElementById('navProgress');
    const navDots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('section[id]');

    // Mostrar nav después del hero
    const heroSection = document.getElementById('inicio');

    window.addEventListener('scroll', () => {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

        if (window.scrollY > heroBottom - 200) {
            floatingNav.classList.add('visible');
        } else {
            floatingNav.classList.remove('visible');
        }

        // Progress bar
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        navProgress.style.height = `${progress}%`;

        // Active section
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });

        navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.dataset.section === currentSection) {
                dot.classList.add('active');
            }
        });
    }, { passive: true });

    // Smooth scroll para los dots
    navDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = dot.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ===========================
    // PARALLAX SUTIL EN HERO
    // ===========================
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', () => {
        if (window.scrollY < window.innerHeight) {
            const offset = window.scrollY * 0.3;
            heroContent.style.transform = `translateY(${offset}px)`;
            heroContent.style.opacity = 1 - (window.scrollY / window.innerHeight) * 1.5;
        }
    }, { passive: true });

    // ===========================
    // EFECTO CURSOR LUMINOSO
    // ===========================
    const cursorGlow = document.createElement('div');
    cursorGlow.style.cssText = `
        position: fixed;
        width: 400px;
        height: 400px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(201, 169, 97, 0.04) 0%, transparent 70%);
        pointer-events: none;
        z-index: 0;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s;
    `;
    document.body.appendChild(cursorGlow);

    let glowX = 0, glowY = 0;
    let targetX = 0, targetY = 0;

    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    function animateGlow() {
        glowX += (targetX - glowX) * 0.08;
        glowY += (targetY - glowY) * 0.08;
        cursorGlow.style.left = `${glowX}px`;
        cursorGlow.style.top = `${glowY}px`;
        requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // ===========================
    // LAZY LOADING PARA IMÁGENES
    // ===========================
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                imageObserver.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '100px'
    });

    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 1s var(--ease-out), filter 0.8s var(--ease-out), transform 0.8s var(--ease-out)';
        imageObserver.observe(img);
    });

    // ===========================
    // MUSIC PLAYER CON CROSSFADE
    // ===========================
    const CROSSFADE_DURATION = 5; // segundos de fade in/out

    const audioPlayer1 = document.getElementById('audioPlayer1');
    const audioPlayer2 = document.getElementById('audioPlayer2');
    const musicPlayer = document.getElementById('musicPlayer');
    const musicPlayerToggle = document.getElementById('musicPlayerToggle');
    const musicPlayerExpanded = document.getElementById('musicPlayerExpanded');
    const musicPlayerCollapse = document.getElementById('musicPlayerCollapse');
    const musicPlayBtn = document.getElementById('musicPlay');
    const musicPrevBtn = document.getElementById('musicPrev');
    const musicNextBtn = document.getElementById('musicNext');
    const musicVolumeSlider = document.getElementById('musicVolume');
    const musicTitle = document.getElementById('musicTitle');
    const musicArtist = document.getElementById('musicArtist');

    let currentTrackIndex = 0;
    let activePlayer = audioPlayer1;
    let inactivePlayer = audioPlayer2;
    let isPlaying = false;
    let crossfadeTimer = null;
    let isFading = false;
    let baseVolume = 0.4;
    let musicAutoplayAttempted = false;

    // Aplicar volumen inicial
    audioPlayer1.volume = 0;
    audioPlayer2.volume = 0;

    // Toggle expandir/colapsar
    musicPlayerToggle.addEventListener('click', () => {
        const isOpen = musicPlayerExpanded.classList.toggle('open');
        if (isOpen) {
            musicPlayerToggle.style.display = 'none';
            // Si no está reproduciendo, intentar reproducir al abrir
            if (!isPlaying && playlist.length > 0) {
                play();
            }
        }
    });

    musicPlayerCollapse.addEventListener('click', () => {
        musicPlayerExpanded.classList.remove('open');
        musicPlayerToggle.style.display = 'flex';
    });

    // Close music player when clicking outside
    document.addEventListener('click', (e) => {
        if (musicPlayerExpanded.classList.contains('open')) {
            if (!musicPlayer.contains(e.target)) {
                musicPlayerExpanded.classList.remove('open');
                musicPlayerToggle.style.display = 'flex';
            }
        }
    });

    // Si no hay canciones en la playlist, ocultar el reproductor
    if (playlist.length === 0) {
        musicPlayer.style.display = 'none';
    } else {
        // Inicializar primera canción
        loadTrack(currentTrackIndex, activePlayer);
        updateNowPlaying();
    }

    function loadTrack(index, player) {
        const track = playlist[index];
        player.src = `../assets/music/${track.file}`;
        player.load();
    }

    function updateNowPlaying() {
        if (playlist.length === 0) return;
        const track = playlist[currentTrackIndex];
        
        // Create marquee effect if title is too long
        const titleElement = musicTitle;
        titleElement.classList.remove('marquee');
        titleElement.textContent = track.title;
        
        // Check if text overflows
        setTimeout(() => {
            if (titleElement.scrollWidth > titleElement.clientWidth) {
                titleElement.innerHTML = `${track.title} &nbsp;&nbsp;&nbsp; ${track.title}`;
                titleElement.classList.add('marquee');
            }
        }, 100);
        
        musicArtist.textContent = track.artist;
    }

    function play() {
        if (playlist.length === 0) return;
        const playPromise = activePlayer.play();
        if (playPromise) {
            playPromise.then(() => {
                fadeAudio(activePlayer, baseVolume, 1000);
                isPlaying = true;
                musicPlayBtn.textContent = '⏸';
                musicPlayerToggle.classList.add('playing');
                startCrossfadeMonitor();
            }).catch(err => {
                console.log('Autoplay bloqueado por el navegador:', err.message);
                // El navegador bloqueó el autoplay, esperar interacción
            });
        }
    }

    function pause() {
        fadeAudio(activePlayer, 0, 500, () => {
            activePlayer.pause();
        });
        isPlaying = false;
        musicPlayBtn.textContent = '▶';
        musicPlayerToggle.classList.remove('playing');
        stopCrossfadeMonitor();
    }

    function fadeAudio(player, targetVolume, duration, callback) {
        const startVolume = player.volume;
        const diff = targetVolume - startVolume;
        const steps = 30;
        const stepTime = duration / steps;
        let step = 0;

        const interval = setInterval(() => {
            step++;
            player.volume = Math.max(0, Math.min(1, startVolume + (diff * (step / steps))));
            if (step >= steps) {
                clearInterval(interval);
                player.volume = Math.max(0, Math.min(1, targetVolume));
                if (callback) callback();
            }
        }, stepTime);
    }

    function nextTrack() {
        if (playlist.length === 0) return;
        if (isFading) return;
        isFading = true;

        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        loadTrack(currentTrackIndex, inactivePlayer);
        updateNowPlaying();

        // Crossfade
        inactivePlayer.volume = 0;
        inactivePlayer.play().catch(() => {});
        fadeAudio(inactivePlayer, baseVolume, CROSSFADE_DURATION * 1000);
        fadeAudio(activePlayer, 0, CROSSFADE_DURATION * 1000, () => {
            activePlayer.pause();
            // Swap players
            const temp = activePlayer;
            activePlayer = inactivePlayer;
            inactivePlayer = temp;
            isFading = false;
            startCrossfadeMonitor();
        });
    }

    function prevTrack() {
        if (playlist.length === 0) return;
        if (isFading) return;

        // Si la canción lleva más de 3 segundos, reiniciar. Si no, ir a la anterior.
        if (activePlayer.currentTime > 3) {
            activePlayer.currentTime = 0;
            return;
        }

        isFading = true;

        currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        loadTrack(currentTrackIndex, inactivePlayer);
        updateNowPlaying();

        inactivePlayer.volume = 0;
        inactivePlayer.play().catch(() => {});
        fadeAudio(inactivePlayer, baseVolume, CROSSFADE_DURATION * 1000);
        fadeAudio(activePlayer, 0, CROSSFADE_DURATION * 1000, () => {
            activePlayer.pause();
            const temp = activePlayer;
            activePlayer = inactivePlayer;
            inactivePlayer = temp;
            isFading = false;
            startCrossfadeMonitor();
        });
    }

    function startCrossfadeMonitor() {
        stopCrossfadeMonitor();
        crossfadeTimer = setInterval(() => {
            if (!isPlaying || isFading) return;
            if (activePlayer.duration && !isNaN(activePlayer.duration)) {
                const timeLeft = activePlayer.duration - activePlayer.currentTime;
                if (timeLeft <= CROSSFADE_DURATION) {
                    nextTrack();
                }
            }
        }, 500);
    }

    function stopCrossfadeMonitor() {
        if (crossfadeTimer) {
            clearInterval(crossfadeTimer);
            crossfadeTimer = null;
        }
    }

    // Intentar autoplay de música al cargar la página
    function attemptMusicAutoplay() {
        if (playlist.length === 0 || musicAutoplayAttempted) return;
        musicAutoplayAttempted = true;

        // Intentar reproducir directamente
        const playPromise = activePlayer.play();
        if (playPromise) {
            playPromise.then(() => {
                fadeAudio(activePlayer, baseVolume, 2000);
                isPlaying = true;
                musicPlayBtn.textContent = '⏸';
                musicPlayerToggle.classList.add('playing');
                startCrossfadeMonitor();
            }).catch(() => {
                // Autoplay bloqueado, esperar primera interacción del usuario
                const enableAutoplay = () => {
                    play();
                    document.removeEventListener('click', enableAutoplay);
                    document.removeEventListener('touchstart', enableAutoplay);
                    document.removeEventListener('keydown', enableAutoplay);
                    document.removeEventListener('scroll', enableAutoplay);
                };
                document.addEventListener('click', enableAutoplay, { once: true });
                document.addEventListener('touchstart', enableAutoplay, { once: true });
                document.addEventListener('keydown', enableAutoplay, { once: true });
                document.addEventListener('scroll', enableAutoplay, { once: true });
            });
        }
    }

    // Eventos de los botones
    musicPlayBtn.addEventListener('click', () => {
        if (isPlaying) pause(); else play();
    });

    musicPrevBtn.addEventListener('click', prevTrack);
    musicNextBtn.addEventListener('click', nextTrack);

    musicVolumeSlider.addEventListener('input', (e) => {
        baseVolume = e.target.value / 100;
        if (isPlaying && !isFading) {
            activePlayer.volume = baseVolume;
        }
    });

    // Manejar cuando el audio termina (por si no detectó el crossfade)
    audioPlayer1.addEventListener('ended', () => {
        if (activePlayer === audioPlayer1 && isPlaying && !isFading) {
            nextTrack();
        }
    });

    audioPlayer2.addEventListener('ended', () => {
        if (activePlayer === audioPlayer2 && isPlaying && !isFading) {
            nextTrack();
        }
    });

    // ===========================
    // VIDEO AUTOPLAY ON SCROLL (Intersection Observer)
    // ===========================
    const featureVideo = document.getElementById('featureVideo');
    const videoUnmuteBtn = document.getElementById('videoUnmuteBtn');

    if (featureVideo) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                    // Intentar reproducir
                    featureVideo.play().catch(() => {
                        // Autoplay bloqueado, pero el video está en muted así que debería funcionar
                    });
                } else {
                    featureVideo.pause();
                }
            });
        }, {
            threshold: [0, 0.5, 1.0]
        });
        videoObserver.observe(featureVideo);

        // Video unmute button
        if (videoUnmuteBtn) {
            videoUnmuteBtn.addEventListener('click', () => {
                if (featureVideo.muted) {
                    featureVideo.muted = false;
                    featureVideo.volume = 0.7;
                    videoUnmuteBtn.classList.add('unmuted');
                    videoUnmuteBtn.querySelector('.unmute-icon').textContent = '🔊';
                    videoUnmuteBtn.querySelector('.unmute-text').textContent = 'Sonido activado';
                    // Ocultar botón después de 2 segundos
                    setTimeout(() => {
                        videoUnmuteBtn.classList.add('hidden');
                    }, 2000);
                } else {
                    featureVideo.muted = true;
                    videoUnmuteBtn.classList.remove('unmuted', 'hidden');
                    videoUnmuteBtn.querySelector('.unmute-icon').textContent = '🔇';
                    videoUnmuteBtn.querySelector('.unmute-text').textContent = 'Activar sonido';
                }
            });
        }
    }

    // ===========================
    // EASTER EGG: Escribir "charrito"
    // ===========================
    let easterEggBuffer = '';
    const secretWord = 'charrito';

    document.addEventListener('keydown', (e) => {
        if (e.key.length === 1) {
            easterEggBuffer += e.key.toLowerCase();
            // Mantener solo los últimos N caracteres
            if (easterEggBuffer.length > secretWord.length) {
                easterEggBuffer = easterEggBuffer.slice(-secretWord.length);
            }
            if (easterEggBuffer === secretWord) {
                easterEggBuffer = '';
                createHeartRain();
            }
        }
    });
});

// ===========================
// FUNCIONES GLOBALES
// ===========================

function openLetter(e) {
    if (e) e.preventDefault();
    document.getElementById('letterOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLetter() {
    document.getElementById('letterOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

// Cerrar carta con Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLetter();
});

// Cerrar carta haciendo click fuera
document.addEventListener('click', (e) => {
    const overlay = document.getElementById('letterOverlay');
    if (e.target === overlay) closeLetter();
});

// Easter egg: lluvia de corazones
function createHeartRain() {
    const hearts = ['♡', '♥', '❤', '💛', '🤍'];
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: fixed;
                top: -50px;
                left: ${Math.random() * 100}vw;
                font-size: ${1 + Math.random() * 2}rem;
                color: #c9a961;
                pointer-events: none;
                z-index: 9999;
                animation: heartFall ${3 + Math.random() * 3}s linear forwards;
            `;
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 6000);
        }, i * 80);
    }
}

// Inyectar animación de corazones
const style = document.createElement('style');
style.textContent = `
    @keyframes heartFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
