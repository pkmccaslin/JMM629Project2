document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".budget-slider"); // Select all sliders
  const trackerText = document.querySelector(".tracker-text");
  const budgetBar = document.querySelector("#budget-bar");
  const totalBudget = 67; // Total allowed budget
  let totalBudgetUsed = 0;

  function updateTotal() {
    //iterates through all sliders and adds them up
    totalBudgetUsed = Array.from(sliders).reduce((sum, slider) => sum + parseFloat(slider.value), 0);
    trackerText.innerHTML = `You have used <br> <span class="dollars">$${totalBudgetUsed}B</span> out of <span class="dollars">$${totalBudget}B</span>`;
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
        valueDisplay.textContent = `$${event.target.value.replace(/\.0$/, "")}B`;
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

  const checkbox = document.getElementById("toggle-hints");
  checkbox.addEventListener("change", (event) => {
    if (event.target.checked) {
      document.querySelector("#education-budget")
        .style
        .background = `linear-gradient(to right,rgb(0, 103, 27) 0%, rgb(0, 103, 27) 36%, #D3E0F9 36%, #D3E0F9 100%)`;

        document.querySelector("#health-budget")
        .style
        .background = `linear-gradient(to right,rgb(0, 103, 27) 0%, rgb(0, 103, 27) 66%, #D3E0F9 66%, #D3E0F9 100%)`;

        document.querySelector("#safety-budget")
        .style
        .background = `linear-gradient(to right,rgb(0, 103, 27) 0%, rgb(0, 103, 27) 12%, #D3E0F9 12%, #D3E0F9 100%)`;

        document.querySelector("#higher-ed-budget")
        .style
        .background = `linear-gradient(to right,rgb(0, 103, 27) 0%, rgb(0, 103, 27) 28%, #D3E0F9 28%, #D3E0F9 100%)`;

        document.querySelector("#transportation-budget")
        .style
        .background = `linear-gradient(to right,rgb(0, 103, 27) 0%, rgb(0, 103, 27) 20%, #D3E0F9 20%, #D3E0F9 100%)`;

      } else {
      budgetSliders.forEach((slider) => {
        slider.style.background = ""; // Reset to default
      });
    }
  });
});