const textarea = document.getElementById("journalEntry");
const saveBtn = document.getElementById("saveJournal");
const journalStatus = document.getElementById("journalStatus");
const dateInput = document.getElementById("journalDate");

// Default to today
const today = new Date().toISOString().slice(0, 10);
dateInput.value = today;

function getStorageKey(dateStr) {
  return `journal-${dateStr}`;
}

function loadJournalEntry(dateStr) {
  const saved = localStorage.getItem(getStorageKey(dateStr));
  textarea.value = saved || "";
}

// Load initial entry
window.addEventListener("DOMContentLoaded", () => {
  loadJournalEntry(dateInput.value);
});

// When date changes
dateInput.addEventListener("change", () => {
  loadJournalEntry(dateInput.value);
});

// Save entry
saveBtn.addEventListener("click", () => {
  const selectedDate = dateInput.value;
  localStorage.setItem(getStorageKey(selectedDate), textarea.value);
  journalStatus.textContent = "✅ Entry saved!";
  setTimeout(() => (journalStatus.textContent = ""), 2000);
});

document.getElementById('toggle-theme').textContent = document.body.classList.contains('dark') ? '🌙' : '☀️';
document.getElementById('toggle-theme').onclick = () => {
  document.body.classList.toggle('dark');
  const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  document.getElementById('toggle-theme').textContent = theme === 'dark' ? '🌙' : '☀️';
};

