document.addEventListener('DOMContentLoaded', function() {
  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  const monthYearElement = document.getElementById('monthYear');
  const daysElement = document.getElementById('days');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');

  // Array of month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Function to render the calendar
  function renderCalendar() {
    // Get first day of month and total days in month
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    // Update month and year in header
    monthYearElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    
    // Clear previous days
    daysElement.innerHTML = '';

    // Create days of previous month
    for (let i = firstDay - 1; i >= 0; i--) {
      const dayElement = document.createElement('div');
      dayElement.className = 'day prev-month';
      dayElement.textContent = daysInPrevMonth - i;
      daysElement.appendChild(dayElement);
    }

    // Create days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayElement = document.createElement('div');
      dayElement.className = 'day';
      dayElement.textContent = i;
      
      // Highlight current day
      if (i === currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear()) {
        dayElement.classList.add('today');
      }
      
      daysElement.appendChild(dayElement);
    }

    // Calculate total days shown so far (prev month + current month)
    const totalDaysShown = firstDay + daysInMonth;
    // Calculate how many days from next month to show
    const daysFromNextMonth = 7 - (totalDaysShown % 7);
    
    // Only add days from next month if needed to complete the grid
    if (daysFromNextMonth < 7) {
      for (let i = 1; i <= daysFromNextMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day next-month';
        dayElement.textContent = i;
        daysElement.appendChild(dayElement);
      }
    }
  }

  // Event listener for month header click
  monthYearElement.addEventListener('click', function() {
    // You can customize what happens when clicking the month/year
    // For example, show a month/year picker or just alert the current month/year
    alert(`Current view: ${monthNames[currentMonth]} ${currentYear}`);
    
    // Alternatively, you could implement a month/year selector here
    // For a more advanced solution, you might want to create a modal or dropdown
    // that lets users jump to a specific month and year
  });

  // Event listeners for previous and next buttons
  prevButton.addEventListener('click', function() {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar();
  });

  nextButton.addEventListener('click', function() {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar();
  });

  // Initial render
  renderCalendar();
});
