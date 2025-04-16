const habitForm = document.getElementById('habit-form');
const habitInput = document.getElementById('habit-input');
const habitList = document.getElementById('habit-list');

const emojiCategories = {
    Health: ["💪", "🏃", "🥗", "💧", "🛏️"],
    Productivity: ["✅", "📝", "📚", "📅", "🧠"],
    Mindfulness: ["🧘", "🌿", "🙏", "📖", "🕯️"],
  };


const avatarBtn = document.getElementById("avatarBtn");
const avatarModal = document.getElementById("avatarPicker");
const avatarOptions = document.getElementById("avatarOptions");

const avatarChoices = ["🧠", "🌟", "🎨", "🐱", "🧘", "⚡", "🦊", "🐻", "🦄", "🐸"];

function populateAvatars() {
    avatarOptions.innerHTML = "";
    avatarChoices.forEach(emoji => {
      const span = document.createElement("span");
      span.textContent = emoji;
      span.addEventListener("click", () => {
        avatarBtn.textContent = emoji;
        localStorage.setItem("habitAvatar", emoji);
        avatarModal.style.display = "none";
      });
      avatarOptions.appendChild(span);
    });
  }
  
  avatarBtn.addEventListener("click", () => {
    avatarModal.style.display = "block";
    populateAvatars();
  });
  
  // Optional: click outside to close
  window.addEventListener("click", (e) => {
    if (e.target === avatarModal) avatarModal.style.display = "none";
  });
  
  // Load saved avatar
  const savedAvatar = localStorage.getItem("habitAvatar");
  if (savedAvatar) {
    avatarBtn.textContent = savedAvatar;
  }



const quotes = [
    "Small steps every day.",
    "You’re doing better than you think.",
    "Progress, not perfection.",
    "Show up for yourself today.",
    "Consistency is more important than intensity."
  ];
  
  function displayQuote() {
    const quoteEl = document.getElementById('quote');
    const dailyIndex = new Date().getDate() % quotes.length;
    quoteEl.textContent = quotes[dailyIndex];
  }


  document.getElementById('toggle-theme').onclick = () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  };
  
  function applySavedTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') document.body.classList.add('dark');
  }
  

  const sideQuotes = [
    "Small steps every day 🌱",
    "You're building momentum 💪",
    "Progress over perfection ✨",
    "Keep the streak alive 🔥",
  ];
  document.getElementById("quoteBox").textContent = "🌞 " + sideQuotes[Math.floor(Math.random() * sideQuotes.length)];
  

  
  displayQuote()
  applySavedTheme();