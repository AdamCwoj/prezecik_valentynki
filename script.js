// script.js
const button = document.querySelector('.magic-button');
const images = document.querySelectorAll('.banner > div:not(.slogan)');

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
    heart.src = 'images/heart.png'; // ← TUTAJ ŚCIEŻKA DO TWOJEGO SERDUSZKA
    heart.className = 'falling-heart';
    
    // Losowa pozycja startowa na szerokości ekranu
    heart.style.left = Math.random() * 100 + '%';
    
    // Losowy rozmiar
    const size = Math.random() * 30 + 20; // 20-50px
    heart.style.width = size + 'px';
    
    // Losowy czas animacji
    heart.style.animationDuration = (Math.random() * 3 + 3) + 's'; // 3-6s
    
    document.body.appendChild(heart);
    
    // Usuń serduszko po zakończeniu animacji
    setTimeout(() => {
        heart.remove();
    }, 6000);
}

// Po kliknięciu przycisku
button.addEventListener('click', () => {
    // Animuj wjazd obrazków
    images.forEach((img, index) => {
        setTimeout(() => {
            img.style.opacity = '1';
            
            // Dla img_7 i img_8 zachowaj rotate(90deg)
            if (index === 6 || index === 7) {
                img.style.transform = 'scale(1) rotate(90deg)';
            } else {
                img.style.transform = 'scale(1) rotate(0deg)';
            }
        }, index * 200); // każdy obrazek po 200ms
    });
    
    // Uruchom spadające serduszka
    let heartCount = 0;
    const heartInterval = setInterval(() => {
        createHeart();
        heartCount++;
        
        // Zatrzymaj po 20 serduszkach
        if (heartCount >= 20) {
            clearInterval(heartInterval);
        }
    }, 300); // nowe serduszko co 300ms
    
    // Ukryj przycisk po kliknięciu (opcjonalnie)
    button.style.opacity = '0';
    button.style.pointerEvents = 'none';
});