let currentSlide = 0;
let startX = 0;
let isDragging = false;
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index, instant = false) {
    currentSlide = (index + slides.length) % slides.length;
    const slideWidth = slides[0].offsetWidth;
    carousel.style.transition = instant ? "none" : "transform 0.5s ease-in-out";
    carousel.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
    
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
}

dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i, true)));

function handleDragEnd(dx) {
    const slideWidth = slides[0].offsetWidth;
    if (dx > slideWidth / 2) currentSlide--;
    if (dx < -slideWidth / 2) currentSlide++;
    showSlide(currentSlide, currentSlide < 0 || currentSlide >= slides.length);
}

function handlePointerStart(e) {
    startX = e.pageX || e.touches[0].pageX;
    isDragging = true;
}

function handlePointerMove(e) {
    if (!isDragging) return;
    const dx = (e.pageX || e.touches[0].pageX) - startX;
    carousel.style.transition = "none";
    carousel.style.transform = `translateX(${-(currentSlide * slides[0].offsetWidth) + dx}px)`;
}

// Recalcula a posição do carrossel ao redimensionar a tela
window.addEventListener('resize', () => {
    showSlide(currentSlide, true);
});

function handlePointerEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    handleDragEnd((e.pageX || e.changedTouches[0].pageX) - startX);
}

['mousedown', 'touchstart'].forEach(evt => carousel.addEventListener(evt, handlePointerStart));
['mousemove', 'touchmove'].forEach(evt => carousel.addEventListener(evt, handlePointerMove));
['mouseup', 'mouseleave', 'touchend'].forEach(evt => carousel.addEventListener(evt, handlePointerEnd));

showSlide(currentSlide);
