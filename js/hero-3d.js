/* ==========================================================================
   ClassIQ 3D Interactive Avatar Engine
   Handles 3D spatial mouse parallax tilt, hover waving gestures, and touch interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const avatarCards = document.querySelectorAll('.hero-3d-card');

  avatarCards.forEach((card) => {
    const avatarImg = card.querySelector('.hero-avatar-img');

    // 1. Mouse Movement 3D Parallax Tilt
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cardWidth = rect.width;
      const cardHeight = rect.height;

      // Calculate normalized mouse coordinates from center (-1 to +1)
      const mouseX = (e.clientX - rect.left - cardWidth / 2) / (cardWidth / 2);
      const mouseY = (e.clientY - rect.top - cardHeight / 2) / (cardHeight / 2);

      // Max rotation angles (degrees)
      const maxRotateX = 18;
      const maxRotateY = 22;

      const rotateX = -mouseY * maxRotateX;
      const rotateY = mouseX * maxRotateY;

      // Apply 3D matrix transform to card container
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;

      // Parallax translate on the inner avatar image for realistic depth
      if (avatarImg) {
        avatarImg.style.transform = `translate3d(${mouseX * 12}px, ${mouseY * 12}px, 40px)`;
      }
    });

    // 2. Hover Waving Gesture Trigger
    card.addEventListener('mouseenter', () => {
      card.classList.add('waving-arm-active');
      card.style.transition = 'transform 0.1s ease-out';
    });

    // 3. Reset position on mouse leave
    card.addEventListener('mouseleave', () => {
      card.classList.remove('waving-arm-active');
      card.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';

      if (avatarImg) {
        avatarImg.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        avatarImg.style.transform = 'translate3d(0, 0, 30px)';
      }
    });

    // 4. Mobile Touch Drag Support
    card.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = card.getBoundingClientRect();
        const mouseX = Math.max(-1, Math.min(1, (touch.clientX - rect.left - rect.width / 2) / (rect.width / 2)));
        const mouseY = Math.max(-1, Math.min(1, (touch.clientY - rect.top - rect.height / 2) / (rect.height / 2)));

        card.style.transform = `rotateX(${-mouseY * 8}deg) rotateY(${mouseX * 10}deg) scale3d(1.02, 1.02, 1.02)`;
      }
    }, { passive: true });

    const resetTouch = () => {
      card.style.transition = 'transform 0.4s ease-out';
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    card.addEventListener('touchend', resetTouch);
    card.addEventListener('touchcancel', resetTouch);
  });
});
