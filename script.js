const backgrounds = [
    "images/background1.jpeg",
    "images/background2.jpeg",
    "images/background3.jpeg",
    "images/background4.jpg",
    "images/background5.jpg",
    "images/background6.jpg",
    "images/background7.jpeg",
    "images/background8.jpeg"
]

function getTodayDateKey() {
    const now = new Date();
    return now.toISOString().split('T')[0];
  }
  
  async function fetchQuoteOfTheDay() {
    const stored = JSON.parse(localStorage.getItem('dailyQuote')) || {};
    const today = getTodayDateKey();
  
    if (stored.date === today) {
      return stored.quote;
    }
  
    try {
      const res = await fetch("https://api.quotable.io/random?tags=motivational");
      const data = await res.json();
      const quote = `“${data.content}” – ${data.author}`;
  
      // Save to localStorage
      localStorage.setItem("dailyQuote", JSON.stringify({ date: today, quote }));
  
      return quote;
    } catch (err) {
      console.error("Error fetching quote:", err);
      return "“Stay focused and never give up.” – Unknown";
    }
  }

function checkMorningOrAfternoon() {
    const now = new Date();
    const hour = now.getHours();
    const greetingEl = document.getElementById("greeting");
  
    let greeting = "Good Evening";
    if (hour < 12) {
      greeting = "Good Morning";
    } else if (hour < 18) {
      greeting = "Good Afternoon";
    }
  
    const name = localStorage.getItem("userName");
    greetingEl.textContent = name ? `${greeting}, ${name}` : greeting;
}
  

function updateTime() {
    const now = new Date();
    let hours = now.getHours(); // This gives you 0–23
    const minutes = now.getMinutes().toString().padStart(2, '0');
  
    hours = hours % 12;
    if (hours === 0) hours = 12;
  
    const timeString = `${hours}:${minutes}`;
    document.getElementById("time-display").textContent = timeString;
  }

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addTaskBtn = document.getElementById("addTaskBtn");

function addTask() {
    if (inputBox.value.trim() === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        saveData();
    }

    inputBox.value = "";
}

inputBox.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
      addTask();
  }
});
addTaskBtn.addEventListener("click", addTask);

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
});

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || '';
}

let currentBackgroundIndex = parseInt(localStorage.getItem("bgIndex")) || 0;

function setDynamicBackground() {
  const selectedImage = backgrounds[currentBackgroundIndex];
  document.body.style.backgroundImage = `url(${selectedImage})`;

  currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
  localStorage.setItem("bgIndex", currentBackgroundIndex);
}

setDynamicBackground();
setInterval(setDynamicBackground, 60 * 60 * 1000); 


const weatherIconMap = {
    "Clear": "images/weather/sunny.png",
    "Clouds": "images/weather/cloudy.png",
    "Rain": "images/weather/rainy.png",
    "Drizzle": "images/weather/rainy.png",
    "Thunderstorm": "images/weather/thunderstorm.png",
    "Snow": "images/weather/snow.png",
    "Mist": "images/weather/cloudy.png",
    "Haze": "images/weather/cloudy.png",
    "Fog": "images/weather/cloudy.png",
    "Smoke": "images/weather/cloudy.png"
  };
  
  async function fetchWeather() {
    try {
      const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=-33.87&longitude=151.21&current_weather=true");
      const data = await res.json();
  
      const temp = Math.round(data.current_weather.temperature);
      const code = data.current_weather.weathercode;
  
      // Simple mapping (customize if you want)
      const icon = code < 2 ? "sunny.png" :
                   code < 4 ? "cloudy.png" :
                   code < 60 ? "rainy.png" :
                   code < 80 ? "stormy.png" : "snowing.png";
  
      document.getElementById("weather-icon").src = `images/weather/${icon}`;
      document.getElementById("temperature").textContent = `${temp}°C`;
    } catch (err) {
      console.error("Weather fetch failed:", err);
    }
  }

  // Handle name input overlay
const namePrompt = document.getElementById("namePrompt");
const nameInput = document.getElementById("nameInput");

if (!localStorage.getItem("userName")) {
  namePrompt.style.display = "flex";
  nameInput.focus();
} else {
  namePrompt.style.display = "none";
}

nameInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && nameInput.value.trim() !== "") {
    const userName = nameInput.value.trim();
    localStorage.setItem("userName", userName);
    namePrompt.style.display = "none";
    checkMorningOrAfternoon(); // Refresh greeting
  }
});

const moodSelector = document.getElementById("moodSelector");
const spotifyFrame = document.getElementById("spotifyFrame");

const playlistMap = {
  lofi: "https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM?utm_source=generator",
  hardstyle: "https://open.spotify.com/embed/playlist/3yzqRALxP2sBy3hUmJaxWy?utm_source=generator",
  rnb: "https://open.spotify.com/embed/playlist/0At3ikNb9QDbi9T4UWw339?utm_source=generator",
  ambient: "https://open.spotify.com/embed/playlist/5iPjgCLzMr8r5VYmUOV6tp?utm_source=generator",
};

moodSelector.addEventListener("change", function () {
  const mood = moodSelector.value;
  const newSrc = playlistMap[mood] || playlistMap.default;
  spotifyFrame.src = newSrc;
});

const menuToggle = document.querySelector(".menu-toggle");
const dropdownMenu = document.getElementById("dropdownMenu");
const editNameOption = document.getElementById("editNameOption");

menuToggle.addEventListener("click", () => {
  dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
});

editNameOption.addEventListener("click", () => {
  localStorage.removeItem("userName");
  document.getElementById("namePrompt").style.display = "flex";
  document.getElementById("nameInput").value = "";
  document.getElementById("nameInput").focus();
  dropdownMenu.style.display = "none";
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".greeting-container")) {
    dropdownMenu.style.display = "none";
  }
});

let timer;
let mode = "pomodoro";
let timeLeft = 25 * 60;

const timerDisplay = document.getElementById("timerDisplay");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const modeButtons = document.querySelectorAll(".mode-btn");

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function startTimer() {
  clearInterval(timer);
  timeLeft--; // subtract one second immediately
  updateTimerDisplay(); // update right away
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("Time's up!");
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  setTimeByMode(mode);
  updateTimerDisplay();
}

function setTimeByMode(selectedMode) {
  switch (selectedMode) {
    case "pomodoro":
      timeLeft = 25 * 60;
      break;
    case "short":
      timeLeft = 5 * 60;
      break;
    case "long":
      timeLeft = 15 * 60;
      break;
  }
}

modeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    modeButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    mode = btn.getAttribute("data-mode");
    resetTimer();
  });
});

startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);

updateTimerDisplay(); 
fetchWeather();
showTask();
setInterval(updateTime, 1000);
updateTime();
checkMorningOrAfternoon();
fetchQuoteOfTheDay().then(quote => {
    document.querySelector('.quote').textContent = quote;
});


