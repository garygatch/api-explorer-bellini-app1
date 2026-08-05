angular.module('ng').run(['$timeout', ($timeout) => {
  $timeout(() => {
    // Create toast element for notifications
    const toast = document.createElement('div');
    toast.className = 'country-copy-toast';
    document.body.appendChild(toast);
    
    let toastTimeout;
    
    function showToast(message) {
      toast.textContent = message;
      toast.classList.add('show');
      
      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
      }, 2500);
    }

    // Use event delegation to handle clicks on dynamically generated country cards
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.country-card');
      if (card && document.body.contains(card)) { // ensure it's still part of the DOM
        const codeElement = card.querySelector('.country-code');
        if (codeElement) {
          const code = codeElement.textContent.trim();
          
          // Copy country code to clipboard
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(code).then(() => {
              showToast(`Copied ${code} to clipboard!`);
            }).catch(err => {
              console.error('Could not copy text: ', err);
            });
          } else {
            // Fallback if clipboard API is not available
            showToast(`Clicked: ${code}`);
          }
        }
      }
    });
  });
}]);