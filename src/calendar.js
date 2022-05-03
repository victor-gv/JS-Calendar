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

// Global variables
let dateText;
let prevNext = false;

// Current date
const currentDate = new Date();
const currentDay = currentDate.getDate();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

currentMonthDisplay.textContent = months[currentMonth];
currentYearDisplay.textContent = currentYear;

previousMonth.addEventListener("click", getPreviousMonth);
nextMonth.addEventListener("click", getNextMonth);

// /////////////////////////////
// /////////////////////////////
// Functions

//
function isLeap() {
  return currentYear % 400 === 0 ?
    true :
    currentYear % 100 === 0 ?
    false :
    currentYear % 4 === 0;
}

function getPreviousMonth() {
  if (currentMonth !== 0) {
    currentMonth--;
  } else {
    currentMonth = 11;
    currentYear--;
  }
  showMonth();
  removeDays();
  setDays();
}

function getNextMonth() {
  if (currentMonth !== 11) {
    currentMonth++;
  } else {
    currentMonth = 0;
    currentYear++;
  }
  showMonth();
  removeDays();
  setDays();
}

function showMonth() {
  currentMonthDisplay.textContent = months[currentMonth];
  currentYearDisplay.textContent = currentYear;
}

function getFirstDay() {
  let first = new Date(currentYear, currentMonth, 1);
  if (first.getDay() == 0) {
    return 6;
  } else {
    return first.getDay() - 1;
  }
}

function getLastDay() {
  let last = new Date(currentYear, currentMonth + 1, 0);
  if (last.getDay() == 0) {
    return 6;
  } else {
    return last.getDay() - 1;
  }
}

// Function Works! Let's figure it out.
function getDaysInMonth() {
  // create date object, with year current, month + 1, day 0 (returns the previous date)
  let days = new Date(currentYear, currentMonth + 1, 0).getDate(); // 31
  return days;
}

function getDaysInPrevMonth() {
  let days = new Date(currentYear, currentMonth, 0).getDate(); // 31
  return days;
}

function addDayDivs() {
  const calendarDays = document.getElementById("calendarDays");
  const dateWrapper = document.createElement('div');
  dateWrapper.classList.add('calendar__dates--day');

  if (prevNext === true) {
    dateWrapper.classList.add('calendar__dates--day--prev');
  }

  let headerDiv = document.createElement('div');
  headerDiv.classList.add('calendar__day--header');

  headerDiv.textContent += dateText;

  let contentDiv = document.createElement('div');
  contentDiv.classList.add('calendar__day--content');

  for (let j = 1; j <= 4; j++) {
    let eventDiv = document.createElement('div');
    eventDiv.classList.add('calendar__day--event');
    contentDiv.appendChild(eventDiv);
  }
  dateWrapper.appendChild(headerDiv);
  dateWrapper.appendChild(contentDiv);
  calendarDays.append(dateWrapper);
}


function setDays() {
  // Loop to get end of previous month, e.g. JUNE 
  for (let i = getFirstDay() - 1; i >= 0; i--) { // 1    0
    dateText = getDaysInPrevMonth() - i; // 31 - 1 = 30,    31 - 0 = 30  
    prevNext = true;
    addDayDivs();
  }
  // Loop to get divs for this month
  for (let i = 1; i <= getDaysInMonth(); i++) {
    dateText = i;
    prevNext = false;
    addDayDivs();
  }
  // Loop to get beginning of next month
  for (let i = 1; i <= 6 - getLastDay(); i++) {
    dateText = i;
    prevNext = true;
    addDayDivs();
  }
}

function removeDays() {
  const calendarDays = document.getElementById("calendarDays");
  while (calendarDays.firstChild) {
    calendarDays.removeChild(calendarDays.firstChild);
  }
}

setDays();