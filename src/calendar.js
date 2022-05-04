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
let title = document.getElementById("eventTitle");
let initialDate = document.getElementById("initialDate");
let eventHour = document.getElementById("eventHour");
let category = document.getElementById("category");
let currentYearDisplay = document.getElementById("currentYear");
let currentMonthDisplay = document.getElementById("currentMonth");

// Global variables
let dateText;
let prevNext = false;
let events;
let errorForm = false;

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
title.addEventListener("blur", validateTitle);
initialDate.addEventListener("blur", validateDate);
eventHour.addEventListener("blur", validateHour);
createBtn.addEventListener('click', validateTitle);
createBtn.addEventListener('click', validateDate);
createBtn.addEventListener('click', validateHour);
cancelBtn.addEventListener("click", cancelNewEvent);

function showNewEvent() {
  newEventDialog.showModal();
  title.classList.remove("invalid");
  title.classList.add("input");
  initialDate.classList.remove("invalid");
  initialDate.classList.add("input");
  eventHour.classList.remove("invalid");
  eventHour.classList.add("input");
}

function closeNewEvent() {
  title.classList.remove("invalid");
  newEventDialog.close();
  newEventForm.reset();
}

function storageEvent() {
  validateTitle();
  validateDate();
  validateHour();

  if (!title.value || title.value.length > 60 || !initialDate.value || !eventHour.value) {
    errorForm = true;
  }
  

  if (!errorForm) {
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

    newEventDialog.close();
    newEventForm.reset();
  } 
}

function cancelNewEvent() {
  title.classList.remove("invalid");
  newEventDialog.close();
  newEventForm.reset();
}


//Form validation
function validateTitle() {
  if (!title.value) {
    title.classList.remove("input");
    title.classList.add("invalid");
    title.placeholder = "Required";
    errorForm = true;
  } else if (title.value.length > 60) {
    title.value = "";
    title.placeholder = "Max 60 characters";
    errorForm = true;
  } else {
    title.classList.remove("invalid");
    title.classList.add("input");
    errorForm = false;
  }
}

function validateDate() {
  if (!initialDate.value) {
    initialDate.classList.remove("input");
    initialDate.classList.add("invalid");
    initialDate.placeholder = "Required";
    errorForm = true;
  } else {
    initialDate.classList.remove("invalid");
    initialDate.classList.add("input");
    errorForm = false;
  }
}

function validateHour() {
  if (!eventHour.value) {
    eventHour.classList.remove("input");
    eventHour.classList.add("invalid");
    eventHour.placeholder = "Required";
    errorForm = true;
  } else {
    eventHour.classList.remove("invalid");
    eventHour.classList.add("input");
    errorForm = false;
  }
}



class EventObject {
  constructor(name, date, time, category) {
    (this.name = name),
    (this.date = date),
    (this.time = time),
    (this.category = category);
  }
}