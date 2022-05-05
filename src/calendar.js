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
const mainCalendar = document.getElementById("main");

// Global variables
let dateText;
let prevNext = false;
let events;
let errorForm = false;
let dateTime = null;
let headerDiv;
let headerChildNumber;
let headerChildMainIcon;
let headerChildCircle;
let headerChildSecondIcon;
let contentDiv;

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

//Function for adding emojis in May
let dayInMayObject = {};

function getDayinMay() {
  for (let i = 1; i <= 31; i++) {
    let daysInMay = new Date(2022, 4, i).getTime();
    dayInMayObject[i] = daysInMay;
  }
}
getDayinMay();

//
// function isLeap() {
//   return currentYear % 400 === 0 ?
//     true :
//     currentYear % 100 === 0 ?
//     false :
//     currentYear % 4 === 0;
// }

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

  headerDiv = document.createElement("div");
  headerChildNumber = document.createElement("div");
  headerChildMainIcon = document.createElement("div");
  headerChildCircle = document.createElement("div");
  headerChildSecondIcon = document.createElement("div");

  headerDiv.classList.add("calendar__day--header");
  headerChildNumber.classList.add("calendar__day--header--number");
  headerChildMainIcon.classList.add("calendar__day--header--mainIcon");
  headerChildCircle.classList.add("calendar__day--header--circle");
  headerChildSecondIcon.classList.add("calendar__day--header--secondIcon");

  //Default Emoji
  headerChildNumber.textContent += dateText;
  headerChildMainIcon.textContent += "\u00A0";
  headerChildSecondIcon.textContent += "\u00A0";
  headerDiv.addEventListener("click", showNewEvent);
  //
  

  if (
    dateText === currentDay &&
    currentMonth === currentDate.getMonth() &&
    currentYear === currentDate.getFullYear()
  ) {
    headerDiv.classList.add("calendar_day--today");
  }

  contentDiv = document.createElement("div");
  contentDiv.classList.add("calendar__day--content");
  contentDiv.setAttribute("data-time", `${dateTime}`);

  for (let j = 1; j <= 4; j++) {
    let eventDiv = document.createElement("div");
    eventDiv.classList.add("calendar__day--event");
    contentDiv.appendChild(eventDiv);
  }
  dateWrapper.appendChild(headerDiv);
  headerDiv.appendChild(headerChildNumber);
  headerDiv.appendChild(headerChildMainIcon);
  headerDiv.appendChild(headerChildCircle);
  headerDiv.appendChild(headerChildSecondIcon);
  dateWrapper.appendChild(contentDiv);
  calendarDays.appendChild(dateWrapper);
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

    //When the user hovers the mouse over the header, the icon on the day target will change to a smiley face
    headerChildSecondIcon.addEventListener("mouseover", addSignPlus);

    headerChildSecondIcon.addEventListener("mouseout", removeSignPlus);

    contentDiv.addEventListener("mouseover", addCursor);

    function addCursor(e) {
      e.target.style.cursor = "pointer";
    }

    //Add emojis for May
    if (dayInMayObject[1] == dateTime) {
      headerChildMainIcon.textContent = "😂";
      headerChildSecondIcon.textContent = "😃";
      headerChildSecondIcon.addEventListener("mouseout", function (e) {
        e.target.textContent = "😃";
      });
    } else if (dayInMayObject[2] == dateTime) {
      headerChildMainIcon.textContent = "⌨️";
      headerChildSecondIcon.textContent = "🖱️";
      headerChildSecondIcon.addEventListener("mouseout", function (e) {
        e.target.textContent = "🖱️";
      });
    } else if (dayInMayObject[3] == dateTime) {
      headerChildMainIcon.textContent = "👽";
      headerChildSecondIcon.textContent = "👾";
      headerChildSecondIcon.addEventListener("mouseout", function (e) {
        e.target.textContent = "👾";
      });
    } else if (dayInMayObject[4] == dateTime) {
      headerChildMainIcon.textContent = "🛸";
      headerChildSecondIcon.textContent = "🌌";
      headerChildSecondIcon.addEventListener("mouseout", function (e) {
        e.target.textContent = "🌌";
      });
    } else if (dayInMayObject[5] == dateTime) {
      headerChildMainIcon.textContent = "😴";
      headerChildSecondIcon.textContent = "🛌";
      headerChildSecondIcon.addEventListener("mouseout", function (e) {
        e.target.textContent = "🛌";
      });
    } else if (dayInMayObject[6] == dateTime) {
      headerChildMainIcon.textContent = "🌱";
      headerChildSecondIcon.textContent = "🔞";
      headerChildSecondIcon.addEventListener("mouseout", function (e) {
        e.target.textContent = "🔞";
      });
    } else if (dayInMayObject[7] == dateTime) {
      headerChildMainIcon.textContent = "🚕";
      headerChildSecondIcon.textContent = "📅";
      headerChildSecondIcon.addEventListener("mouseout", function (e) {
        e.target.textContent = "📅";
      });
    } else if (dayInMayObject[8] == dateTime) {
      headerChildMainIcon.textContent = "🇨🇺";
      headerChildSecondIcon.textContent = "🪘";
      headerChildSecondIcon.addEventListener("mouseout", function (e) {
        e.target.textContent = "🪘";
      });
    } else if (dayInMayObject[9] == dateTime) {
      headerChildMainIcon.textContent = "🚆";
      headerChildSecondIcon.textContent = "💺";
      headerChildSecondIcon.addEventListener("mouseout", function (e) {
        e.target.textContent = "💺";
      });
    } else if (dayInMayObject[10] == dateTime) {
      headerChildMainIcon.textContent = "📰";
      headerChildSecondIcon.textContent = "✍🏻";
      headerChildSecondIcon.addEventListener("mouseout", function (e) {
        e.target.textContent = "✍🏻";
      });
    } else if (dayInMayObject[11] == dateTime) {
      headerChildMainIcon.textContent = "‍🎓";
      headerChildSecondIcon.textContent = "📚";
      headerChildSecondIcon.addEventListener("mouseout", function (e) {
        e.target.textContent = "📚";
      });
    } else if (dayInMayObject[12] == dateTime) {
      headerChildMainIcon.textContent = "🌆";
      headerChildSecondIcon.textContent = "🏙️";
      headerChildSecondIcon.addEventListener("mouseout", function (e) {
        e.target.textContent = "🏙️";
      });
    } else if (dayInMayObject[13] == dateTime) {
      headerChildMainIcon.textContent = "🐸";
      headerChildSecondIcon.textContent = "🦘";
      headerChildSecondIcon.addEventListener("mouseout", function (e) {
        e.target.textContent = "🦘";
      });
    } else if (dayInMayObject[14] == dateTime) {
      headerChildMainIcon.textContent = "💅";
      headerChildSecondIcon.textContent = "🖌️";
      headerChildSecondIcon.addEventListener("mouseout", function (e) {
        e.target.textContent = "🖌️";
      });
    } else if (dayInMayObject[15] == dateTime) {
      headerChildMainIcon.textContent = "👪";
      headerChildSecondIcon.textContent = "🐕";
      headerChildSecondIcon.addEventListener("mouseout", function (e) {
        e.target.textContent = "🐕";
      });
    } else if (dayInMayObject[16] == dateTime) {
      headerChildMainIcon.textContent = "🎸";
      headerChildSecondIcon.textContent = "🤘";
      headerChildSecondIcon.addEventListener("mouseout", function (e) {
        e.target.textContent = "🤘";
      });
    } else if (dayInMayObject[17] == dateTime) {
      headerChildMainIcon.textContent = "♻️";
      headerChildSecondIcon.textContent = "🚯";
      headerChildSecondIcon.addEventListener("mouseout", function (e) {
        e.target.textContent = "🚯";
      });
    } else if (dayInMayObject[18] == dateTime) {
      headerChildMainIcon.textContent = "🌿";
      headerChildSecondIcon.textContent = "🚰";
      headerChildSecondIcon.addEventListener("mouseout", function (e) {
        e.target.textContent = "🚰";
      });
    } else if (dayInMayObject[19] == dateTime) {
      headerChildMainIcon.textContent = "🦊";
      headerChildSecondIcon.textContent = "🐿️";
      headerChildSecondIcon.addEventListener("mouseout", function (e) {
        e.target.textContent = "🐿️";
      });
    } else if (dayInMayObject[20] == dateTime) {
      headerChildMainIcon.textContent = "💶";
      headerChildSecondIcon.textContent = "💰";
      headerChildSecondIcon.addEventListener("mouseout", function (e) {
        e.target.textContent = "💰";
      });
    } else if (dayInMayObject[21] == dateTime) {
      headerChildMainIcon.textContent = "👞";
      headerChildSecondIcon.textContent = "🚫";
      headerChildSecondIcon.addEventListener("mouseout", function (e) {
        e.target.textContent = "🚫";
      });
    } else if (dayInMayObject[22] == dateTime) {
      headerChildMainIcon.textContent = "🎹";
      headerChildSecondIcon.textContent = "💶";
      headerChildSecondIcon.addEventListener("mouseout", function (e) {
        e.target.textContent = "💶";
      });
    } else if (dayInMayObject[23] == dateTime) {
      headerChildMainIcon.textContent = "💋";
      headerChildSecondIcon.textContent = "📅";
      headerChildSecondIcon.addEventListener("mouseout", function (e) {
        e.target.textContent = "📅";
      });
    } else if (dayInMayObject[24] == dateTime) {
      headerChildMainIcon.textContent = "🐌";
      headerChildSecondIcon.textContent = "🎉";
      headerChildSecondIcon.addEventListener("mouseout", function (e) {
        e.target.textContent = "🎉";
      });
    } else if (dayInMayObject[25] == dateTime) {
      headerChildMainIcon.textContent = "🤓";
      headerChildSecondIcon.textContent = "🎈";
      headerChildSecondIcon.addEventListener("mouseout", function (e) {
        e.target.textContent = "🎈";
      });
    } else if (dayInMayObject[26] == dateTime) {
      headerChildMainIcon.textContent = "🥡";
      headerChildSecondIcon.textContent = "🛵";
      headerChildSecondIcon.addEventListener("mouseout", function (e) {
        e.target.textContent = "🛵";
      });
    } else if (dayInMayObject[27] == dateTime) {
      headerChildMainIcon.textContent = "📣";
      headerChildSecondIcon.textContent = "📈";
      headerChildSecondIcon.addEventListener("mouseout", function (e) {
        e.target.textContent = "📈";
      });
    } else if (dayInMayObject[28] == dateTime) {
      headerChildMainIcon.textContent = "🍔";
      headerChildSecondIcon.textContent = "😋";
      headerChildSecondIcon.addEventListener("mouseout", function (e) {
        e.target.textContent = "😋";
      });
    } else if (dayInMayObject[29] == dateTime) {
      headerChildMainIcon.textContent = "🏰";
      headerChildSecondIcon.textContent = "🔞";
      headerChildSecondIcon.addEventListener("mouseout", function (e) {
        e.target.textContent = "🔞";
      });
    } else if (dayInMayObject[30] == dateTime) {
      headerChildMainIcon.textContent = "🏩";
      headerChildSecondIcon.textContent = "🚫";
      headerChildSecondIcon.addEventListener("mouseout", function (e) {
        e.target.textContent = "🚫";
      });
    } else if (dayInMayObject[31] == dateTime) {
      headerChildMainIcon.textContent = "⚽";
      headerChildSecondIcon.textContent = "↪️";
      headerChildSecondIcon.addEventListener("mouseout", function (e) {
        e.target.textContent = "↪️";
      });
    }
  }
  // Loop to get beginning of next month
  for (let i = 1; i <= 6 - getLastDay(); i++) {
    dateText = i;
    prevNext = true;
    addDayDivs();
  }
  findEventDates();
}

function removeDays() {
  const calendarDays = document.getElementById("calendarDays");
  while (calendarDays.firstChild) {
    calendarDays.removeChild(calendarDays.lastChild);
  }
}

setDays();

function addSignPlus(e) {
  e.target.textContent = "Add Event 📌";
  e.target.style.cursor = "pointer";
}

function removeSignPlus(e) {
  e.target.textContent = "\u00A0";
}

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
createBtn.addEventListener("click", validateTitle);
createBtn.addEventListener("click", validateDate);
createBtn.addEventListener("click", validateHour);
cancelBtn.addEventListener("click", cancelNewEvent);


function showNewEvent() {
  newEventDialog.showModal();
  title.classList.remove("invalid");
  title.classList.add("input");
  initialDate.classList.remove("invalid");
  initialDate.classList.add("input");
  eventHour.classList.remove("invalid");
  eventHour.classList.add("input");

  if (newEventDialog.open) {
    const mainCalendar = document.getElementById("main");
    mainCalendar.classList.add("blur");
  }
}

function closeNewEvent() {
  title.classList.remove("invalid");
  newEventDialog.close();
  newEventForm.reset();

  if (newEventDialog.close) {
    mainCalendar.classList.remove("blur");
  }
}

function populateEventsVar() {
  if (localStorage.length > 0) {
    // Sort() to order the array
    events = JSON.parse(localStorage.getItem("newEvent"));
  } else {
    events = [];
  }
}

// MODAL for event details

const eventDetailsDialog = document.getElementById("eventDetailsDialog");
// const calDayEvent = document.getElementById('calendar__day--event');
const closeEventDetailsBtn = document.getElementById("event-details-closeBtn");

closeEventDetailsBtn.addEventListener("click", function (e) {
  
  eventDetailsDialog.close();
  finishEventDetails();
  if (eventDetailsDialog.close) {
    mainCalendar.classList.remove("blur");
    let deleteBtn = document.getElementById("eventDetailsDeleteBtn");
    deleteBtn.removeEventListener("click", deleteEvent);
  }
  // e.stopPropogation();
});

// Store events in local storage
function storageEvent() {
  validateTitle();
  validateDate();
  validateHour();

  populateEventsVar();

  if (
    !title.value ||
    title.value.length > 60 ||
    !initialDate.value ||
    !eventHour.value
  ) {
    errorForm = true;
  }

  if (!errorForm) {
    let name = document.getElementById("eventTitle").value;
    let date = document.getElementById("initialDate").value;
    let time = document.getElementById("eventHour").value;
    let category = document.getElementById("category").value;
    let storagePosition = events.length;

    let newEvent = new EventObject(name, date, time, category, storagePosition);
    events.push(newEvent);
    localStorage.setItem("newEvent", JSON.stringify(events));
    newEventDialog.close();
    newEventForm.reset();
    findEventDates();
    if (newEventDialog.close) {
      mainCalendar.classList.remove("blur");
    }
  }
}

function cancelNewEvent() {
  title.classList.remove("invalid");
  newEventDialog.close();
  newEventForm.reset();

  if (newEventDialog.close) {
    console.log("close");
    mainCalendar.classList.remove("blur");
  }
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
  constructor(name, date, time, category, position) {
    (this.name = name),
      (this.date = date),
      (this.time = time),
      (this.category = category);
    this.position = position;
  }
}

//  Add event to calendar
function clearLocalStorage() {
  localStorage.clear();
}

// Set variables for events from local storage and compare
function findEventDates() {
  // Sets events variable as empty array if local storage is empty, or as contents of local storage.
  populateEventsVar();

  events.forEach((event) => {
    let eventDate = new Date(event.date) - 1000 * 60 * 60 * 2;
    let calDate = document.querySelectorAll(`[data-time="${eventDate}"]`)[0];

    if (calDate) {
      let eventBoxes = calDate.children;
      for (let i = 0; i < 4; i++) {
        // Validate wheher the info for both is the same. In that case, don't add.
        let calEventPos = eventBoxes[i].getAttribute("data-event-position");
        if (calEventPos == event.position) {
          break;
        }
        if (hasEvent(eventBoxes[i])) {
          if (i < 3) {
            continue;
          } else {
            eventBoxes[i].textContent = "...";
            // Add class for more than 5 events.
          }
        } else {
          setCalEvents(eventBoxes[i], event);
          return;
        }
      }
    }
  });
}

// Returns true if an event box is already occupied by another event.
function hasEvent(element) {
  return (
    element.classList.contains("work") || element.classList.contains("personal")
  );
}

// Set classes for work and personal events.
function setCalEvents(eventBlock, storedEvent) {
  if (storedEvent.category === "work") {
    eventBlock.classList.add("work");
  } else {
    eventBlock.classList.add('personal')
  }
  eventBlock.setAttribute("data-event-position", `${storedEvent.position}`);
  eventBlock.addEventListener("click", function (e) {
    eventDetailsDialog.showModal();
    showDetails(e);

    if (eventDetailsDialog.open) {
      const mainCalendar = document.getElementById("main");
      mainCalendar.classList.add("blur");
    }
  });
}

// /////////////////////////////////
// /////////////////////////////////
// /////////////////////////////////
// /////////////////////////////////
// /////////////////////////////////
// /////////////////////////////////
// /////////////////////////////////
// MODALS

// DOM
let currentEvent = '';

function showDetails (e) {
  currentEvent = e.target;
  let eventDetailsDisplay = document.getElementById("eventDetailsDisplay");
  let calendarPosition = e.target.getAttribute("data-event-position");
  let storedEvents = JSON.parse(localStorage.getItem('newEvent'));
  let eventObj = storedEvents.find(event => event.position == calendarPosition);
  
  for (let i = 0; i < 4; i++) {
    let titleDiv = document.createElement('div');
    let contentDiv = document.createElement('div');
    titleDiv.classList.add('event-details__title');
    contentDiv.classList.add('event-details__content');
    titleDiv.textContent = Object.keys(eventObj)[i];
    contentDiv.textContent = Object.values(eventObj)[i];
    eventDetailsDisplay.appendChild(titleDiv);
    eventDetailsDisplay.appendChild(contentDiv);
  }

    let deleteBtn = document.getElementById('eventDetailsDeleteBtn');
    deleteBtn.addEventListener('click', deleteEvent);
}

function deleteEvent () {
  let calendarPosition = currentEvent.getAttribute("data-event-position");
  let storedEvents = JSON.parse(localStorage.getItem('newEvent'));

  events = storedEvents.filter(object => object.position != calendarPosition);
  localStorage.setItem('newEvent', JSON.stringify(events));
  
  currentEvent.classList.remove('work', 'personal');
}

function finishEventDetails () {
  let eventDetailsDisplay = document.getElementById("eventDetailsDisplay");
  let deleteBtn = document.getElementById("eventDetailsDeleteBtn");
  while (eventDetailsDisplay.firstChild) {
      eventDetailsDisplay.removeChild(eventDetailsDisplay.lastChild);      
  }
  deleteBtn.removeEventListener("click", deleteEvent);
}

// Closing modal by clicking outside the modal window

window.addEventListener("click", function (e) {
  if (e.target === newEventDialog || e.target === eventDetailsDialog) {
    closeNewEvent();
    eventDetailsDialog.close();
    finishEventDetails();
  }
});
