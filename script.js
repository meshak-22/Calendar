const daysContainer = document.getElementById("days")
const monthYearDisplay = document.getElementById("monthYear")
const prevButton = document.getElementById("prev")
const nextButton = document.getElementById("next")

let currentDate = new Date()

function renderCalendar(){
  const month = currentDate.getMonth()
  const year = currentDate.getFullYear()
  currentDate.setDate(1)
  const firstDayIndex = currentDate.getDay()
  const lastDate = new Date(year, month + 1, 0).getDate()
  const prevLastDate = new Date(year, month, 0).getDate()
  const lastDayIndex = new Date(year, month + 1, 0).getDay()
  const nextDays = 6 - lastDayIndex
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  monthYearDisplay.textContent = `${months[month]} ${year}`

  let daysHTML = ""
  for(let x = firstDayIndex; x > 0; x--){
    daysHTML += `<div class="prev-date">${prevLastDate - x + 1}</div>`
  }

  for(let i = 1; i <= lastDate; i++){
    if(i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()){
      daysHTML += `<div class="today">${i}</div>`
    }else{
      daysHTML += `<div>${i}</div>`
    }
  }

  for (let j = 1; j <= nextDays; j++){
    daysHTML += `<div class="next-date">${j}</div>`
  }
  daysContainer.innerHTML = daysHTML
}

prevButton.addEventListener("click", () =>{
  currentDate.setMonth(currentDate.getMonth() - 1)
  renderCalendar()
})

nextButton.addEventListener("click", () =>{
  currentDate.setMonth(currentDate.getMonth() + 1)
  renderCalendar()
})
renderCalendar()
