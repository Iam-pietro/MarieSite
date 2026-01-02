// Criar fundo estrelado SUPER animado
function createStars() {
    const starsContainer = document.getElementById('stars');
    
    // Remover estrelas existentes
    starsContainer.innerHTML = '';
    
    // Criar nebulosas
    const nebulaColors = ['purple', 'pink', 'blue'];
    nebulaColors.forEach(color => {
        const nebula = document.createElement('div');
        nebula.classList.add('nebula', color);
        starsContainer.appendChild(nebula);
    });
    
    // Criar estrelas
    const starCount = 400; // Mais estrelas!
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        
        // Definir tipo de estrela (probabilidades diferentes)
        const starType = Math.random();
        if (starType < 0.6) {
            star.classList.add('star', 'small');
        } else if (starType < 0.85) {
            star.classList.add('star', 'medium');
        } else if (starType < 0.95) {
            star.classList.add('star', 'large');
        } else {
            star.classList.add('star', 'colorful');
        }
        
        // Posição aleatória
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Atraso de animação aleatório
        const delay = Math.random() * 5;
        star.style.animationDelay = `${delay}s`;
        
        // Duração aleatória para variar ainda mais
        const duration = 2 + Math.random() * 4;
        star.style.animationDuration = `${duration}s`;
        
        starsContainer.appendChild(star);
    }
    
    // Criar estrelas cadentes periódicas
    function createShootingStar() {
        const shootingStar = document.createElement('div');
        shootingStar.classList.add('shooting-star');
        
        // Posição inicial aleatória
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        shootingStar.style.left = `${startX}%`;
        shootingStar.style.top = `${startY}%`;
        
        // Velocidade aleatória
        const duration = 1.5 + Math.random() * 2;
        shootingStar.style.animationDuration = `${duration}s`;
        
        // Atraso aleatório
        const delay = Math.random() * 15;
        shootingStar.style.animationDelay = `${delay}s`;
        
        starsContainer.appendChild(shootingStar);
        
        // Remover após animação
        setTimeout(() => {
            if (shootingStar.parentNode) {
                shootingStar.parentNode.removeChild(shootingStar);
            }
        }, (duration + delay) * 1000);
    }
    
    // Criar várias estrelas cadentes
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createShootingStar();
        }, i * 3000);
    }
    
    // Continuar criando estrelas cadentes periodicamente
    setInterval(() => {
        createShootingStar();
    }, 8000);
    
    // Adicionar brilho dinâmico
    const glow = document.createElement('div');
    glow.style.position = 'absolute';
    glow.style.top = '0';
    glow.style.left = '0';
    glow.style.width = '100%';
    glow.style.height = '100%';
    glow.style.background = 'radial-gradient(circle at 30% 30%, rgba(157, 78, 221, 0.1), transparent 50%)';
    glow.style.pointerEvents = 'none';
    starsContainer.appendChild(glow);
}

// Navegação entre seções
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Mostrar seção inicial
    document.getElementById('home').classList.add('active');
    
    // Adicionar evento de clique aos itens do menu
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.getAttribute('data-section');
            
            // Remover classe active de todos os itens e seções
            navItems.forEach(i => i.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Adicionar classe active ao item clicado e sua seção correspondente
            item.classList.add('active');
            document.getElementById(sectionId).classList.add('active');
            
            // Fechar menu mobile se estiver aberto
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
            
            // Scroll para o topo da seção
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
    
    // Menu toggle para mobile
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }
}

// Player de música
function setupMusicPlayer() {
    const playBtn = document.getElementById('playBtn');
    const loveSong = document.getElementById('loveSong');
    const volumeSlider = document.getElementById('volumeSlider');
    
    if (playBtn && loveSong && volumeSlider) {
        let isPlaying = false;
        
        playBtn.addEventListener('click', () => {
            if (isPlaying) {
                loveSong.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            } else {
                loveSong.play();
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }
            isPlaying = !isPlaying;
        });
        
        // Controle de volume
        volumeSlider.addEventListener('input', () => {
            loveSong.volume = volumeSlider.value / 100;
        });
        
        // Quando a música terminar, voltar ao estado de play
        loveSong.addEventListener('ended', () => {
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            isPlaying = false;
        });
    }
}

// Galeria de fotos
function setupGallery() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const photoItems = document.querySelectorAll('.photo-item');
    const photoCount = document.querySelector('.photo-count');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            let visibleCount = 0;
            
            // Filtrar as fotos
            photoItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Atualizar contador
            if (photoCount) {
                const total = photoItems.length;
                photoCount.innerHTML = `<i class="fas fa-camera"></i> Mostrando ${visibleCount} de ${total} fotos`;
            }
        });
    });
}

// Contador de tempo desde 03/12/2025 11:30
function setupTimeCounter() {
    // Data em que pediu em namoro: 03 de Dezembro de 2025 às 11:30
    const startDate = new Date('December 03, 2025 11:30:00');
    
    function updateTimeCounter() {
        const now = new Date();
        const timeDiff = now - startDate;
        
        // Calcular dias, horas, minutos, segundos
        const totalSeconds = Math.floor(timeDiff / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24);
        
        const days = totalDays;
        const hours = totalHours % 24;
        const minutes = totalMinutes % 60;
        const seconds = totalSeconds % 60;
        
        // Atualizar display
        document.getElementById('days').textContent = days.toString().padStart(3, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // Atualizar detalhes
        document.getElementById('total-days').textContent = totalDays;
        
        // Calcular estimativas divertidas
        const heartbeats = Math.floor(totalSeconds * 1.2); // ~72 bpm
        document.getElementById('heartbeats').textContent = heartbeats.toLocaleString();
        
        const smiles = Math.floor(totalHours * 3); // ~3 sorrisos por hora pensando nela
        document.getElementById('smiles').textContent = smiles.toLocaleString();
        
        // Calcular próximas conquistas
        const hundredDays = new Date(startDate);
        hundredDays.setDate(startDate.getDate() + 100);
        const oneYear = new Date(startDate);
        oneYear.setFullYear(startDate.getFullYear() + 1);
        
        const today = new Date();
        const daysTo100 = Math.max(0, 100 - totalDays);
        const daysTo1Year = Math.ceil((oneYear - today) / (1000 * 60 * 60 * 24));
        
        document.getElementById('milestone-100').textContent = 
            daysTo100 === 0 ? "✅ Conquistado!" : `${daysTo100} dias restantes`;
        
        document.getElementById('milestone-1year').textContent = 
            daysTo1Year > 0 ? `${daysTo1Year} dias restantes` : "✅ Conquistado!";
    }
    
    // Atualizar imediatamente e a cada segundo
    updateTimeCounter();
    setInterval(updateTimeCounter, 1000);
}

// Surpresa - Chuva de corações
function setupSurprise() {
    const surpriseBtn = document.getElementById('surpriseBtn');
    const surpriseCanvas = document.getElementById('surpriseCanvas');
    const loveCount = document.getElementById('loveCount');
    
    if (surpriseBtn && surpriseCanvas && loveCount) {
        let heartCounter = 0;
        const loveMessages = [
            "Eu te amo! ❤️",
            "I love you! 💖",
            "Je t'aime! 💕",
            "Te amo! 😍",
            "Ti amo! 💘",
            "Ich liebe dich! 🌹",
            "愛してる! 💝",
            "사랑해! 💞",
            "Σ'αγαπώ! ✨",
            "Я тебя люблю! 🌟",
            "Você é tudo! 💗",
            "Minha vida! 💓",
            "Para sempre! 💕",
            "Meu amor! 💘",
            "Só você! 💖",
            "Minha Marie! 💝",
            "Meu tudo! 💞",
            "Eternamente! 💗",
            "Meu coração! 💘",
            "Minha alegria! 💖"
        ];
        
        surpriseBtn.addEventListener('click', () => {
            // Criar múltiplos corações
            for (let i = 0; i < 30; i++) {
                setTimeout(() => {
                    createHeart();
                }, i * 100);
            }
            
            // Incrementar contador
            heartCounter += 30;
            loveCount.textContent = heartCounter;
            
            // Adicionar efeito ao contador
            loveCount.style.transform = 'scale(1.2)';
            setTimeout(() => {
                loveCount.style.transform = 'scale(1)';
            }, 300);
        });
        
        function createHeart() {
            const heart = document.createElement('div');
            heart.classList.add('heart-element');
            
            // Mensagem aleatória
            const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
            heart.innerHTML = randomMessage;
            
            // Posição horizontal aleatória
            const left = Math.random() * 90 + 5;
            heart.style.left = `${left}%`;
            
            // Tamanho aleatório
            const size = Math.random() * 1.5 + 1;
            heart.style.fontSize = `${size}rem`;
            
            // Cor levemente variada
            const hue = 330 + Math.random() * 30;
            heart.style.color = `hsl(${hue}, 100%, 70%)`;
            
            // Duração de animação aleatória
            const duration = 3 + Math.random() * 4;
            heart.style.animationDuration = `${duration}s`;
            
            // Atraso de animação aleatório
            const delay = Math.random() * 2;
            heart.style.animationDelay = `${delay}s`;
            
            // Adicionar evento de clique
            heart.addEventListener('click', () => {
                heart.classList.add('clicked');
                heartCounter++;
                loveCount.textContent = heartCounter;
                
                // Efeito visual no contador
                loveCount.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    loveCount.style.transform = 'scale(1)';
                }, 300);
                
                // Remover após animação
                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.parentNode.removeChild(heart);
                    }
                }, 500);
            });
            
            // Remover após animação
            setTimeout(() => {
                if (heart.parentNode && !heart.classList.contains('clicked')) {
                    heart.parentNode.removeChild(heart);
                }
            }, (duration + delay) * 1000);
            
            surpriseCanvas.appendChild(heart);
        }
    }
}

// Inicializar tudo quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    setupNavigation();
    setupMusicPlayer();
    setupGallery();
    setupTimeCounter();
    setupSurprise();
    
    // Animação de entrada para elementos da carta
    const letterParagraphs = document.querySelectorAll('.letter-content p');
    letterParagraphs.forEach((p, index) => {
        p.style.opacity = '0';
        p.style.transform = 'translateY(20px)';
        p.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';
        }, 500 + index * 200);
    });
});