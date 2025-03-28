const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
let selectedMonth = currentDate.getMonth();
let selectedYear = currentYear;

// Populate months
const monthSelect = document.getElementById('month');
months.forEach((month, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.text = month;
    monthSelect.appendChild(option);
});

// Populate years (current year - 10 to current year + 10)
const yearSelect = document.getElementById('year');
for (let i = currentYear - 10; i <= currentYear + 10; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.text = i;
    yearSelect.appendChild(option);
}

// Set current month and year as default
monthSelect.value = selectedMonth;
yearSelect.value = selectedYear;

function generateCalendar(month, year) {
    const calendarBody = document.getElementById('calendar');
    calendarBody.innerHTML = '';

    // Add day names
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'day-name';
        dayElement.textContent = day;
        calendarBody.appendChild(dayElement);
    });

    // Get first day and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Add empty days before first day
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'empty-day';
        calendarBody.appendChild(emptyDay);
    }

    // Add days
    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.textContent = i;

        // Highlight current day
        if (year === currentYear && 
            month === currentDate.getMonth() && 
            i === currentDate.getDate()) {
            dayElement.className += ' today';
        }

        calendarBody.appendChild(dayElement);
    }
}

// Initial calendar generation
generateCalendar(selectedMonth, selectedYear);

// Update calendar when selection changes
monthSelect.addEventListener('change', () => {
    selectedMonth = parseInt(monthSelect.value);
    generateCalendar(selectedMonth, parseInt(yearSelect.value));
});

yearSelect.addEventListener('change', () => {
    selectedYear = parseInt(yearSelect.value);
    generateCalendar(parseInt(monthSelect.value), selectedYear);
});

// Navigation buttons
document.getElementById('prev-month').addEventListener('click', () => {
    selectedMonth--;
    if (selectedMonth < 0) {
        selectedMonth = 11;
        selectedYear--;
    }
    monthSelect.value = selectedMonth;
    yearSelect.value = selectedYear;
    generateCalendar(selectedMonth, selectedYear);
});

document.getElementById('next-month').addEventListener('click', () => {
    selectedMonth++;
    if (selectedMonth > 11) {
        selectedMonth = 0;
        selectedYear++;
    }
    monthSelect.value = selectedMonth;
    yearSelect.value = selectedYear;
    generateCalendar(selectedMonth, selectedYear);
});
