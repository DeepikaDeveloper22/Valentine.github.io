const folderPasswords = {
  "folder-photos": "1222",
  "folder-notes": "141015",
  "folder-surprise": "281222"
};

const folderHintEl = document.getElementById("folderHint");
const folderPasswordInput = document.getElementById("folderPassword");
const openFolderBtn = document.getElementById("openFolderBtn");
const folderError = document.getElementById("folderError");

const bgMusic = document.getElementById("bgMusic");
const bgMusicToggle = document.getElementById("bgMusicToggle");

const folderMusicMap = {
  "folder-photos": document.getElementById("music-photos"),
  "folder-notes": document.getElementById("music-notes"),
  "folder-surprise": document.getElementById("music-surprise")
};

let activeFolderId = null;

// Background music toggle
bgMusicToggle.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play().catch(() => {});
    bgMusicToggle.textContent = "🔇 Pause Music";
  } else {
    bgMusic.pause();
    bgMusicToggle.textContent = "🔊 Background Music";
  }
});

function stopAllFolderMusic() {
  Object.values(folderMusicMap).forEach(audio => {
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  });
}

// Show hint when clicking folder
document.querySelectorAll(".folder").forEach(btn => {
  btn.addEventListener("click", () => {
    activeFolderId = btn.dataset.target;
    folderHintEl.textContent = btn.dataset.hint;
    folderHintEl.classList.remove("hidden");
    folderError.classList.add("hidden");
  });
});

// Open folder + switch music
openFolderBtn.addEventListener("click", () => {
  if (!activeFolderId) {
    alert("Touch a folder first.");
    return;
  }

  const correctPassword = folderPasswords[activeFolderId];
  const userInput = folderPasswordInput.value.trim();

  document.querySelectorAll(".folder-content").forEach(fc => fc.classList.add("hidden"));
  stopAllFolderMusic();

  if (userInput === correctPassword) {
    document.getElementById(activeFolderId).classList.remove("hidden");
    folderPasswordInput.value = "";

    // Pause background music
    if (!bgMusic.paused) {
      bgMusic.pause();
      bgMusicToggle.textContent = "🔊 Background Music";
    }

    // Play folder audio
    const folderAudio = folderMusicMap[activeFolderId];
    if (folderAudio) {
      folderAudio.play().catch(() => {});
    }

  } else {
    folderError.classList.remove("hidden");
  }
});


