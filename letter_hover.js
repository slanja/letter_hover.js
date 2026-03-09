/**
 * LetterHover.js
 * A lightweight utility to create interactive text hover effects.
 * * @param {string} selector - CSS selector for target elements.
 * @param {object} options - Configuration for colors and timing.
 */
export const initLetterHover = (selector = '.text-changing', options = {}) => {
  const elements = document.querySelectorAll(selector);

  const {
    hoverColor = '#4ade80',
    defaultColor = 'inherit',
    duration = 350,
    className = 'letter'
  } = options;

  elements.forEach((element) => {
    // Prevent text cursor and accidental selection
    element.style.cursor = 'default';
    element.style.userSelect = 'none';

    // Accessibility: preserve original text for screen readers
    const originalText = element.innerText;
    element.setAttribute('aria-label', originalText);

    // Split text into words to maintain proper line breaking
    const words = originalText.split(" ");
    
    element.innerHTML = words.map(word => {
      // Wrap each word in a non-breaking span
      const wordSpans = word.split("").map(letter => 
        `<span class="${className}" aria-hidden="true" style="display: inline-block; transition: color 0.25s ease;">${letter}</span>`
      ).join("");
      
      return `<span style="white-space: nowrap;">${wordSpans}</span>`;
    }).join(" ");

    // Efficient event handling via delegation
    element.addEventListener("mouseover", (event) => {
      const letter = event.target;

      if (letter.classList.contains(className)) {
        letter.style.color = hoverColor;

        // Revert to original color after duration
        setTimeout(() => {
          letter.style.color = defaultColor;
        }, duration);
      }
    });
  });
};