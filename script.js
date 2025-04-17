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
  

  function populateEmojis(category) {
    const emojiPicker = document.getElementById("emojiPicker");
    emojiPicker.innerHTML = ""; // clear
  
    emojiCategories[category].forEach(emoji => {
      const option = document.createElement("option");
      option.value = emoji;
      option.textContent = emoji;
      emojiPicker.appendChild(option);
    });
  }

  document.getElementById("categoryPicker").addEventListener("change", (e) => {
    populateEmojis(e.target.value);
  });
  populateEmojis("Health"); // default load

  function getCurrentStreak(completions) {
    const sorted = completions.map(d => new Date(d)).sort((a, b) => b - a);
    let streak = 0;
    for (let i = 0; i < sorted.length; i++) {
      const diff = (new Date().setHours(0,0,0,0) - sorted[i].setHours(0,0,0,0)) / (1000 * 60 * 60 * 24);
      if (diff === i) streak++;
      else break;
    }
    console.log(streak)
    return streak;
  }
  

let habits = JSON.parse(localStorage.getItem('habits')) || [];


  function saveHabits() {
    localStorage.setItem('habits', JSON.stringify(habits));
  }
  
  function today() {
    return new Date().toISOString().split('T')[0];
  }
  
  function getPast7Days() {
    const days = [];
    const todayDate = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(todayDate);
      d.setDate(todayDate.getDate() - i);
      days.push(d.toISOString().split('T')[0]);
    }
    return days;
  }
  
  function renderCalendar(completions) {
    const calendar = document.createElement('div');
    calendar.className = 'calendar';
  
    getPast7Days().forEach(date => {
      const day = document.createElement('div');
      day.className = 'calendar-day';
      day.textContent = date.slice(5); // MM-DD
  
      if (completions.includes(date)) {
        day.classList.add('done');
      } else {
        day.classList.add('missed');
      }
  
      calendar.appendChild(day);
    });
  
    return calendar;
  }
  
  function renderHabits() {
    habitList.innerHTML = '';
    habits.forEach((habit, index) => {
      // Fallback if completions doesn't exist (for old data)
      if (!Array.isArray(habit.completions)) {
        habit.completions = habit.lastDone ? [habit.lastDone] : [];
      }

      const li = document.createElement('li');
      const container = document.createElement('div');
  
      const name = document.createElement('strong');
      name.textContent = `${habit.emoji || "✅"} ${habit.name}`;
  
      const btn = document.createElement('button');
      btn.textContent = habit.completions.includes(today()) ? '✓ Done' : 'Mark Done';
      btn.disabled = habit.completions.includes(today());
  
      btn.onclick = () => {
        habit.completions.push(today());
        habit.completions = [...new Set(habit.completions)]; // unique dates
        saveHabits();
        renderHabits();
      };

      container.appendChild(name);
      container.appendChild(btn);
      li.appendChild(container);
      li.appendChild(renderCalendar(habit.completions));
      habitList.appendChild(li);

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '🗑️ Delete';
      deleteBtn.onclick = () => {
      habits.splice(index, 1);
      saveHabits();
      renderHabits();
};
container.appendChild(deleteBtn);
    });
    };
  
    habitForm.onsubmit = (e) => {
        e.preventDefault();
        const emoji = document.getElementById("emojiPicker").value || "✅";
        const newHabit = {
            name: habitInput.value.trim(),
            emoji: emoji,
            completions: [],
            xp: 0,
            level: 1,
            badges: [],
        };
        habits.push(newHabit);
        saveHabits();
        renderHabits();
        habitForm.reset();
    };


    function filterToday() {
        alert("Filter to today's habits (coming soon)!");
      }
      
      function filterAll() {
        renderHabits();
      }
      
      function showStats() {
        alert("Show stats: XP, streaks, badges (coming soon)!");
      }

renderHabits();
displayQuote();
applySavedTheme();