

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
let events;
let dateTime = null;

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
  const dateWrapper = document.createElement("div");
  dateWrapper.classList.add("calendar__dates--day");

  if (prevNext === true) {
    dateWrapper.classList.add("calendar__dates--day--prev");
  }

  let headerDiv = document.createElement("div");
  headerDiv.classList.add("calendar__day--header");

  headerDiv.textContent += dateText;

  let contentDiv = document.createElement("div");
  contentDiv.classList.add("calendar__day--content");
  contentDiv.setAttribute('data-time', `${dateTime}`);

  for (let j = 1; j <= 4; j++) {
    let eventDiv = document.createElement("div");
    eventDiv.classList.add("calendar__day--event");
    contentDiv.appendChild(eventDiv);
  }
  dateWrapper.appendChild(headerDiv);
  dateWrapper.appendChild(contentDiv);
  calendarDays.append(dateWrapper);
}

function setDays() {
  // Loop to get end of previous month, e.g. JUNE
  for (let i = getFirstDay() - 1; i >= 0; i--) {
    // 1    0
    dateText = getDaysInPrevMonth() - i; // 31 - 1 = 30,    31 - 0 = 30
    prevNext = true;
    addDayDivs();
  }
  // Loop to get divs for this month
  for (let i = 1; i <= getDaysInMonth(); i++) {
    dateText = i;
    dateTime = new Date(currentYear, currentMonth, i).getTime();
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
    calendarDays.removeChild(calendarDays.lastChild);
  }
}

setDays();

// ////////////////////////////////
// ////////////////////////////////
// ////////////////////////////////
// ////////////////////////////////
// ////////////////////////////////
// ////////////////////////////////
// ////////////////////////////////
// ////////////////////////////////
// ////////////////////////////////
// MODALS

// Open and close dialog windows
const addEvent = document.getElementById("addEvent");
const newEventDialog = document.getElementById("newEventDialog");

const createBtn = document.getElementById("createBtn");
const cancelBtn = document.getElementById("cancelBtn");
const closeBtnEvent = document.getElementById("closeBtnEvent");

const newEventForm = document.getElementById("newEventForm");

addEvent.addEventListener("click", showNewEvent);
closeBtnEvent.addEventListener("click", closeNewEvent);
createBtn.addEventListener("click", storageEvent);
cancelBtn.addEventListener("click", cancelNewEvent);

function showNewEvent() {
  newEventDialog.showModal();
}

function closeNewEvent() {
  newEventDialog.close();
}

function storageEvent() {
  let name = document.getElementById("eventTitle").value;
  let date = document.getElementById("initialDate").value;
  let time = document.getElementById("eventHour").value;
  let category = document.getElementById("category").value;

  if (localStorage.length > 0) {
    // sort() to order the array
    events = JSON.parse(localStorage.getItem("newEvent"));
  } else {
    events = [];
  }

  let newEvent = new EventObject(name, date, time, category);
  events.push(newEvent);
  localStorage.setItem("newEvent", JSON.stringify(events));
  clearInputs();
  newEventDialog.close();
}

function cancelNewEvent() {
  newEventDialog.close();
  newEventForm.reset();
}

class EventObject {
  constructor(name, date, time, category) {
    (this.name = name),
      (this.date = date),
      (this.time = time),
      (this.category = category);
  }
}

function clearInputs () {
  document.getElementById('initialDate').value = '';
  document.getElementById('eventHour').value = '';
  document.getElementById('eventTitle').value = '';
  document.getElementById('category').value = '';
}

//  Add event to calendar
function clearLocalStorage () {
  localStorage.clear();
}

function findEventDates () {
  let events = JSON.parse(localStorage.getItem('newEvent'));
  events.forEach((event) => {
    let eventDate = new Date(event.date) - 1000 * 60 * 60 * 2;    
    let calDate = document.querySelectorAll(`[data-time="${eventDate}"]`)[0];

    if (calDate) {
      setCalEvents(calDate.firstChild, event);
    }
  });
};

function setCalEvents (eventBlock, storedEvent) {
  if (storedEvent.category === 'work') {
    eventBlock.classList.add('work');
    console.log(eventBlock)
  } else {
    eventBlock.classList.add('personal');
    console.log(eventBlock)
  }
}

