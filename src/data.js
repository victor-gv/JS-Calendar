
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


function addMayEmojis (dayInMayObject, dateTime) {
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
   
    

export { months, addMayEmojis };

