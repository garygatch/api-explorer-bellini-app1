angular.module('ng').run(['$timeout', ($timeout) => {
  $timeout(() => {
    // Create the bold toast element
    const toast = document.createElement('div');
    toast.className = 'pet-toast-notification';
    document.body.appendChild(toast);
    
    let toastTimeout;
    
    function showPetToast(message) {
      toast.innerHTML = `<span style="font-size: 1.5em; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2))">🎉</span> ${message}`;
      toast.classList.add('show');
      
      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
      }, 3500);
    }

    // Function to create a burst of floating emojis when clicking
    function createPawParticles(x, y) {
      const emojis = ['🐾', '🦴', '❤️', '✨', '🐶'];
      for(let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'paw-particle';
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Randomize the start position slightly around the cursor
        const offsetX = (Math.random() - 0.5) * 80;
        const offsetY = (Math.random() - 0.5) * 80;
        
        particle.style.left = (x + offsetX) + 'px';
        particle.style.top = (y + offsetY) + 'px';
        
        // Randomize animation duration to make it look organic
        particle.style.animationDuration = (0.8 + Math.random() * 0.7) + 's';
        
        document.body.appendChild(particle);
        
        // Cleanup particle from DOM after animation completes
        setTimeout(() => {
          if (document.body.contains(particle)) {
            document.body.removeChild(particle);
          }
        }, 1500);
      }
    }

    // Global click listener delegated to the available status cells
    document.addEventListener('click', (e) => {
      // Ensure we are inside the pets page before acting
      if (!document.querySelector('.pets-page-container')) return;

      const cell = e.target.closest('.pet-status-available');
      if (cell) {
        // Trigger the bold particle effect at the mouse click coordinates
        createPawParticles(e.clientX, e.clientY);
        
        // Extract pet name and trigger the toast
        const row = cell.closest('tr');
        if (row) {
          const nameCell = row.cells[1];
          const petName = nameCell ? nameCell.textContent.trim() : 'THIS PET';
          showPetToast(`Adopted ${petName.toUpperCase()}!`);
        } else {
          showPetToast('ADOPTED!');
        }
      }
    });
  });
}]);