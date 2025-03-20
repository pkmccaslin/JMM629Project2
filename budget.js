document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".budget-slider"); // Select all sliders
  const trackerText = document.querySelector(".tracker-text");
  const budgetBar = document.querySelector("#budget-bar");
  const totalBudget = 67; // Total allowed budget
  let totalBudgetUsed = 0;

  function updateTotal() {
    //iterates through all sliders and adds them up
    totalBudgetUsed = Array.from(sliders).reduce((sum, slider) => sum + parseFloat(slider.value), 0);
    trackerText.innerHTML = `You have used <br> $${totalBudgetUsed}B out of $${totalBudget}B`;
    budgetBar.value = totalBudgetUsed;
  }

  //   // Update each slider's max value dynamically
  //   sliders.forEach(slider => {
  //     // store slider's current value
  //     let currentValue = parseFloat(slider.value);
  //     // stores the value that is allowed to be used
  //     let remainingBudget = totalBudget - (totalBudgetUsed - currentValue);
  //     slider.max = Math.max(currentValue, remainingBudget); // Prevent setting max below current value
  //   });
  // }

  sliders.forEach(slider => {
    slider.addEventListener("input", function (event) {
      let newValue = parseFloat(event.target.value);
      // previous value is stored to calculate how much of a change is happening
      let previousValue = parseFloat(event.target.getAttribute("data-prev") || 0);

      // Check if the new value exceeds the allowed max
      let remainingBudget = totalBudget - (totalBudgetUsed - previousValue);
      if (newValue > remainingBudget) {
        event.target.value = remainingBudget; // Cap at the remaining budget
      }
      else {
        event.target.setAttribute("data-prev", newValue);
      }

      updateTotal(); // Update total and slider limits
      updateSliderColor(event.target);
      // Update the slider's value display
      let valueDisplay = event.target.parentElement.querySelector(".value-input");
      if (valueDisplay) {
        valueDisplay.textContent = event.target.value.replace(/\.0$/, ""); // Remove trailing .0
      }
    });

    function updateSliderColor(slider) {
      let percentage = (slider.value - slider.min) / (slider.max - slider.min) * 100;
      slider.style.background = `linear-gradient(to right, #34A853 0%, #34A853 ${percentage}%, #D3E0F9 ${percentage}%, #D3E0F9 100%)`;
    }

    slider.addEventListener("input", function () {
      updateSliderColor(slider);
    });

    updateSliderColor(slider);

    // Initialize the data-prev attribute
    slider.setAttribute("data-prev", slider.value);
  });

  // Initialize the total budget display and set limits
  updateTotal();

  const intro = document.querySelector('#simulation-intro');
  const rate = 0.3; // lower = faster fade

  document.addEventListener('scroll', () => {
    intro.style.opacity = 100 / window.scrollY * rate;
  });
});