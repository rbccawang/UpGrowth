var notes = document.getElementById("notes")
var reminder = document.getElementById("reminder")
var clearReminders = document.getElementById("clear-reminders")
var currentReminders = document.getElementById("current-reminders")

const handleNotes = (event) => {
  let notes = event.target.value
  chrome.storage.local.set({"notes": notes})
}

notes.addEventListener("input", (event) => {
  handleNotes(event)
})

reminder.addEventListener("submit", (event) => {
  event.preventDefault()
  var reminderName = document.getElementById("reminder-name").value
  var reminderDate = new Date(document.getElementById("reminder-date").value + "T00:00:00")
  console.log(reminderDate)
  reminderDate.setDate(reminderDate.getDate())
  chrome.storage.local.get({"reminders": []}, (data) => {
    let currentReminders = data.reminders
    var reminderToSet = {"reminderName": reminderName, "date": reminderDate.toDateString()}
    currentReminders.push(reminderToSet)
    chrome.storage.local.set({"reminders": currentReminders}, () => {
      setCurrentReminders()
    })
    var currentDate = new Date().toDateString()
    if (reminderToSet.date == currentDate) {
      displayNotification(reminderToSet.reminderName)
    }
  })
  reminder.reset()
})

clearReminders.addEventListener("click", () => {
  chrome.storage.local.get({"reminders": []}, (data) => {
    chrome.storage.local.set({"reminders": []}, () => {
      setCurrentReminders()
    })
  })
})

const setCurrentReminders = () => {
  currentReminders.innerHTML = ""
  chrome.storage.local.get({"reminders": []}, (data) => {
    for (const reminder of data.reminders) {
      let currentReminder = document.createElement("li")
      currentReminder.innerHTML = reminder.reminderName + " is due " + reminder.date
      currentReminders.appendChild(currentReminder)
    }
  })
}

const askNotificationPermission = () => {
  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notification");
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        console.log("Notification permission granted.")
      }
    });
  }
}

const displayNotification = (reminderName) => {
  var notification = new Notification("Reminder | UpGrowth", {
    body: reminderName + " is due tomorrow."
  })
}

const loadNotes = async () => {
  await chrome.storage.local.get("notes", (value) => {
    var stored_notes = value.notes
    if (typeof stored_notes == "string") {
      notes.value = stored_notes
    } else {
      notes.value = ""
    }
  })
}

const showReminders = () => {
  var currentDate = new Date().toDateString()
  chrome.storage.local.get({"reminders": []}, (data) => {
    for (const reminder of data.reminders) {
      if (reminder.date === currentDate) {
        displayNotification(reminder.reminderName)
      }
    }
  })
}


document.addEventListener("DOMContentLoaded", (event) => { 
  loadNotes()
});

window.onload = () => {
  // chrome.storage.local.clear()
  askNotificationPermission()
  showReminders()
  setCurrentReminders()
}

function Start(song) {
  song.play();
  }
  
  function Pause(song) {
  song.pause();
  }
  
  document.addEventListener('DOMContentLoaded', function(){
  var Play_Music = document.getElementById('play-circle');
  var Pause_Music = document.getElementById('pause-circle');
  
  Play_Music.addEventListener('click', function() {
      Start(softMusic);
  });
  Pause_Music.addEventListener('click', function() {
      Pause(softMusic);
  });
  });
