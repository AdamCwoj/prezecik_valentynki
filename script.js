// script.js
document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.magic-button');
    const images = document.querySelectorAll('.banner > div:not(.slogan)');
    const music = document.getElementById('backgroundMusic');

    // Ukryj wszystkie obrazki na starcie
    images.forEach((img, index) => {
        img.style.opacity = '0';
        
        // Dla img_7 i img_8 (indeksy 6 i 7) ustaw rotate(90deg)
        if (index === 6 || index === 7) {
            img.style.transform = 'scale(0) rotate(90deg)';
        } else {
            img.style.transform = 'scale(0) rotate(0deg)';
        }
        
        img.style.transition = 'all 1s ease';
    });

    // Funkcja do tworzenia spadających serduszek
    function createHeart() {
        const heart = document.createElement('img');
        heart.src = 'images/heart.png';
        heart.className = 'falling-heart';
        
        // Losowa pozycja startowa na szerokości ekranu
        heart.style.left = Math.random() * 100 + '%';
        
        // Losowy rozmiar
        const size = Math.random() * 35 + 25; // 25-60px
        heart.style.width = size + 'px';
        
        // Losowy czas animacji
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's'; // 3-6s
        
        // Losowe opóźnienie startu
        heart.style.animationDelay = Math.random() * 0.5 + 's';
        
        document.body.appendChild(heart);
        
        // Usuń serduszko po zakończeniu animacji
        setTimeout(() => {
            heart.remove();
        }, 7000);
    }

    // Funkcja do tworzenia kolorowego konfetti
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'falling-confetti';
        
        // Losowe kolory pastelowe
        const colors = [
            '#FFB6C1', '#FFD1DC', '#FFA3B5', '#FF8FA3', 
            '#FFE4E1', '#FFC0CB', '#FF69B4', '#DB7093',
            '#FADADD', '#F0E68C', '#E0BBE4', '#C3B1E1'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.backgroundColor = randomColor;
        
        // Losowa pozycja
        confetti.style.left = Math.random() * 100 + '%';
        
        // Losowy kształt (okrągłe lub kwadratowe)
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        }
        
        // Losowy rozmiar
        const size = Math.random() * 8 + 6; // 6-14px
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        
        // Losowy czas animacji
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's'; // 2-5s
        
        document.body.appendChild(confetti);
        
        // Usuń konfetti po zakończeniu animacji
        setTimeout(() => {
            confetti.remove();
        }, 6000);
    }

    // Po kliknięciu przycisku
    button.addEventListener('click', () => {
        // Animuj wjazd obrazków z różnymi kierunkami
        images.forEach((img, index) => {
            setTimeout(() => {
                img.style.opacity = '1';
                
                // Dla img_7 i img_8 zachowaj rotate(90deg)
                if (index === 6 || index === 7) {
                    img.style.transform = 'scale(1) rotate(90deg)';
                } else {
                    // Dodaj lekką rotację dla większej dynamiki
                    const randomRotation = (Math.random() - 0.5) * 4; // -2 do 2 stopni
                    img.style.transform = `scale(1) rotate(${randomRotation}deg)`;
                }
            }, index * 150); // każdy obrazek po 150ms
        });
        
        // Uruchom muzykę w tle (jeśli plik istnieje)
        if (music) {
            music.volume = 0.3; // Delikatna głośność
            music.play().catch(err => {
                console.log('Muzyka nie może być odtworzona automatycznie - wymaga interakcji użytkownika');
            });
        }
        
        // Uruchom spadające serduszka (30 serduszek)
        let heartCount = 0;
        const heartInterval = setInterval(() => {
            createHeart();
            heartCount++;
            
            if (heartCount >= 30) {
                clearInterval(heartInterval);
            }
        }, 250); // nowe serduszko co 250ms
        
        // Uruchom spadające konfetti (50 konfetti)
        let confettiCount = 0;
        const confettiInterval = setInterval(() => {
            createConfetti();
            confettiCount++;
            
            if (confettiCount >= 50) {
                clearInterval(confettiInterval);
            }
        }, 150); // nowe konfetti co 150ms
        
        // Ukryj przycisk z elegancką animacją
        button.style.transform = 'translate(-50%, -50%) scale(0)';
        button.style.opacity = '0';
        setTimeout(() => {
            button.style.display = 'none';
        }, 400);
    });

    // Dodatkowy efekt: delikatne "unoszenie" obrazków już wyświetlonych
    setInterval(() => {
        images.forEach((img) => {
            if (img.style.opacity === '1') {
                const currentTransform = img.style.transform;
                
                // Sprawdź czy obrazek nie jest obrócony o 90 stopni (img_7 i img_8)
                if (currentTransform.includes('rotate(90deg)')) {
                    return; // Pomiń obrazki z rotacją 90 stopni
                }
                
                // Dodaj subtelną animację unoszenia
                const randomFloat = (Math.random() - 0.5) * 2; // -1 do 1 stopnia
                const newTransform = currentTransform.replace(/rotate\([^)]+\)/, `rotate(${randomFloat}deg)`);
                img.style.transform = newTransform;
            }
        });
    }, 3000); // Co 3 sekundy

    // Efekt kursora - serduszka podążające za myszką (opcjonalnie)
    let mouseTrailEnabled = false; // Zmień na true jeśli chcesz ten efekt

    if (mouseTrailEnabled) {
        let lastMouseMove = 0;
        document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            if (now - lastMouseMove > 100) { // Co 100ms
                lastMouseMove = now;
                
                const miniHeart = document.createElement('div');
                miniHeart.innerHTML = '💕';
                miniHeart.style.position = 'fixed';
                miniHeart.style.left = e.pageX + 'px';
                miniHeart.style.top = e.pageY + 'px';
                miniHeart.style.pointerEvents = 'none';
                miniHeart.style.fontSize = '20px';
                miniHeart.style.zIndex = '9999';
                miniHeart.style.animation = 'miniHeartFade 1s ease-out forwards';
                
                document.body.appendChild(miniHeart);
                
                setTimeout(() => miniHeart.remove(), 1000);
            }
        });
        
        // Dodaj animację dla mini serduszek
        const style = document.createElement('style');
        style.textContent = `
            @keyframes miniHeartFade {
                0% { 
                    opacity: 1; 
                    transform: translateY(0) scale(1);
                }
                100% { 
                    opacity: 0; 
                    transform: translateY(-30px) scale(0.5);
                }
            }
        `;
        document.head.appendChild(style);
    }
})//;ację dla mini serduszek
    const style = document.createElement('style');
    style.textContent = `
        @keyframes miniHeartFade {
            0% { 
                opacity: 1; 
                transform: translateY(0) scale(1);
            }
            100% { 
                opacity: 0; 
                transform: translateY(-30px) scale(0.5);
            }
        }
    `;
    document.head.appendChild(style);
