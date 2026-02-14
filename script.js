// Passwords for folders
const folderPasswords = {
  "folder-photos": "1222",
  "folder-notes": "141015",
  "folder-surprise": "281222"
};

const folderHintEl = document.getElementById("folderHint");
const folderPasswordInput = document.getElementById("folderPassword");
const openFolderBtn = document.getElementById("openFolderBtn");
const folderError = document.getElementById("folderError");

// Background music
const bgMusic = document.getElementById("bgMusic");
const bgMusicToggle = document.getElementById("bgMusicToggle");

// Folder-specific music
const folderMusicMap = {
  "folder-photos": document.getElementById("music-photos"),
  "folder-notes": document.getElementById("music-notes"),
  "folder-surprise": document.getElementById("music-surprise")
};

let activeFolderId = null;

// Stop and reset background music
function stopBackgroundMusic() {
  if (!bgMusic.paused) {
    bgMusic.pause();
    bgMusic.currentTime = 0;
  }
  bgMusicToggle.textContent = "🔊 Background Music";
}

// Stop and reset all folder music
function stopAllFolderMusic() {
  Object.values(folderMusicMap).forEach(audio => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  });
}

// 🎧 **Updated background music toggle**
bgMusicToggle.addEventListener("click", () => {
  // Stop any folder music first
  stopAllFolderMusic();

  if (bgMusic.paused) {
    // Make sure the audio is loaded before play
    bgMusic.load();
    bgMusic.play().then(() => {
      bgMusicToggle.textContent = "🔇 Pause Music";
    }).catch(err => {
      console.warn("Unable to play background music:", err);
    });
  } else {
    stopBackgroundMusic();
  }
});

// Show hint when clicking folder buttons
document.querySelectorAll(".folder").forEach(btn => {
  btn.addEventListener("click", () => {
    activeFolderId = btn.dataset.target;
    folderHintEl.textContent = btn.dataset.hint;
    folderHintEl.classList.remove("hidden");
    folderError.classList.add("hidden");
  });
});

// Open folder and play corresponding music
openFolderBtn.addEventListener("click", () => {
  if (!activeFolderId) {
    alert("Touch a folder first.");
    return;
  }

  const correctPassword = folderPasswords[activeFolderId];
  const userInput = folderPasswordInput.value.trim();

  // Hide all folder content and stop all music
  document.querySelectorAll(".folder-content").forEach(fc => fc.classList.add("hidden"));
  stopAllFolderMusic();
  stopBackgroundMusic();

  if (userInput === correctPassword) {
    document.getElementById(activeFolderId).classList.remove("hidden");
    folderPasswordInput.value = "";

    // Play the folder's music
    const folderAudio = folderMusicMap[activeFolderId];
    if (folderAudio) {
      folderAudio.play().catch(() => {});
    }
  } else {
    folderError.classList.remove("hidden");
  }
});
