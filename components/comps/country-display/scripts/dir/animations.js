angular.module('ng').run(['$timeout', ($timeout) => {
  $timeout(() => {
    // We use a MutationObserver to catch the cards as they are rendered by AngularJS ng-repeat/iterate
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          // If the node itself is a card
          if (node.nodeType === 1 && node.classList.contains('country-card')) {
            // Apply a random stagger delay so they pop in beautifully
            const delay = (Math.random() * 0.4).toFixed(2);
            node.style.animationDelay = `${delay}s`;
          } 
          // If the node is a container that might contain cards
          else if (node.nodeType === 1) {
            const cards = node.querySelectorAll('.country-card');
            cards.forEach((card, index) => {
              // Staggered delay based on index for a wave effect
              const delay = (index * 0.05).toFixed(2);
              card.style.animationDelay = `${delay}s`;
            });
          }
        });
      });
    });

    // Start observing the whole document since components might be routed in later
    observer.observe(document.body, { childList: true, subtree: true });

    // Add event delegation for click interactions for the bold pulse effect
    document.addEventListener('click', (e) => {
      const card = e.target.closest('country-display .country-card');
      if (card) {
        // Remove the class if it exists to allow re-triggering the animation
        card.classList.remove('clicked');
        
        // Force reflow
        void card.offsetWidth;
        
        // Add the clicked class for the boldPulseClick animation
        card.classList.add('clicked');
        
        // Clean up the class after animation completes
        setTimeout(() => {
          if (card) card.classList.remove('clicked');
        }, 600);
      }
    });
  }, 100);
}]);