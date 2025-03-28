const daysElement = document.getElementById('days');
const monthYearElement = document.getElementById('monthYear');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

function renderCalendar(month, year) {
    daysElement.style.opacity = '0';
    setTimeout(() => {
        daysElement.innerHTML = '';
        
        monthYearElement.innerHTML = `
            <select id="monthSelect">
                ${months.map((m, index) => 
                    `<option value="${index}" ${index === month ? 'selected' : ''}>${m}</option>`
                ).join('')}
            </select>
            <select id="yearSelect">
                ${Array.from({length: 2101 - 1970}, (_, i) => 1970 + i).map(y => 
                    `<option value="${y}" ${y === year ? 'selected' : ''}>${y}</option>`
                ).join('')}
            </select>
        `;

        document.getElementById('monthSelect').addEventListener('change', (e) => {
            currentMonth = parseInt(e.target.value);
            renderCalendar(currentMonth, currentYear);
        });

        document.getElementById('yearSelect').addEventListener('change', (e) => {
            currentYear = parseInt(e.target.value);
            renderCalendar(currentMonth, currentYear);
        });

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('empty');
            daysElement.appendChild(emptyDay);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = i;
            dayElement.style.animation = `fadeIn 0.5s ease ${i * 0.05}s forwards`;
            dayElement.style.opacity = '0';
            
            if (i === currentDate.getDate() && 
                month === currentDate.getMonth() && 
                year === currentDate.getFullYear()) {
                dayElement.classList.add('current-day');
            }
            
            daysElement.appendChild(dayElement);
        }

        daysElement.style.opacity = '1';
    }, 300);
}

prevButton.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
});

nextButton.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
});

// Add this to your CSS file or in a <style> tag
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1); }
    }
`;
document.head.appendChild(style);

renderCalendar(currentMonth, currentYear);
