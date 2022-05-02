const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// DOM elements
const calendarMonthDisplay = document.getElementById("calendarMonthDisplay");
const previousMonth = document.getElementById("previousMonth");
const nextMonth = document.getElementById("nextMonth");
let currentYearDisplay = document.getElementById("currentYear");
let currentMonthDisplay = document.getElementById("currentMonth");


// Current date
const currentDate = new Date();
const currentDay = currentDate.getDate();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

showMonth();

previousMonth.addEventListener("click", getPreviousMonth);
nextMonth.addEventListener("click", getNextMonth);

// /////////////////////////////
// /////////////////////////////
// Functions

//
function isLeap() {
  return currentYear % 400 === 0
    ? true
    : currentYear % 100 === 0
    ? false
    : currentYear % 4 === 0;
}

function getPreviousMonth() {
  if (currentMonth !== 0) {
    currentMonth--;
  } else {
    currentMonth = 11;
    currentYear--;
  }
  showMonth();
}

function getNextMonth() {
  if (currentMonth !== 11) {
    currentMonth++;
  } else {
    currentMonth = 0;
    currentYear++;
  }
  showMonth();
}

function showMonth() {
  currentMonthDisplay.textContent = months[currentMonth];
  currentYearDisplay.textContent = currentYear;
}

function getFirstDay () {
    let first = new Date(currentYear, currentMonth, 1);
    return first.getDay();
}


// Function Works! Let's figure it out.
function getDaysInMonth () {
    // create date object, with year current, month + 1, day 0 (returns the previous date)
    let days = new Date(currentYear, currentMonth + 1, 0).getDate();  // 31
    return days;
}
// for () { }

function setDays () {
    for (let i = 1; i < getDaysInMonth(); i++) {
        const calendarDays = document.getElementById("calendarDays");
        const dateWrapper = document.createElement('div');
        dateWrapper.classList.add('calendar__dates--day');

        let headerDiv = document.createElement('div');
        headerDiv.classList.add('calendar__day--header');
        headerDiv.textContent += i;

        let contentDiv = document.createElement('div');
        contentDiv.classList.add('calendar__day--content')

        for (let j = 1; j <= 4; j++) {

            let eventDiv = document.createElement('div');
            eventDiv.classList.add('calendar__day--event');
            contentDiv.appendChild(eventDiv);
        }
        dateWrapper.appendChild(headerDiv);
        dateWrapper.appendChild(contentDiv);
        calendarDays.append(dateWrapper);
    }
}

setDays();



/* <div class="calendar__dates--day">
<div class="calendar__day--header">11</div>
<div class="calendar__day--content">
    <div class="calendar__day--event"></div>
    <div class="calendar__day--event"></div>
    <div class="calendar__day--event"></div>
    <div class="calendar__day--event"></div>
</div>
</div> */


