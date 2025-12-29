// Select elements
const video = document.querySelector(".flex"); // the video element
const progress = document.createElement("div");
progress.className = "progress";
const progressFilled = document.createElement("div");
progressFilled.className = "progress__filled";
progress.appendChild(progressFilled);
video.parentElement.appendChild(progress);

// Create controls container
const controls = document.createElement("div");
controls.className = "controls";

// Play/pause button
const toggle = document.createElement("button");
toggle.className = "player__button";
toggle.textContent = "►";
controls.appendChild(toggle);

// Skip buttons
const skipBack = document.createElement("button");
skipBack.dataset.skip = "-10";
skipBack.textContent = "« 10s";
controls.appendChild(skipBack);

const skipForward = document.createElement("button");
skipForward.dataset.skip = "25";
skipForward.textContent = "25s »";
controls.appendChild(skipForward);

// Volume input
const volumeInput = document.createElement("input");
volumeInput.type = "range";
volumeInput.name = "volume";
volumeInput.min = 0;
volumeInput.max = 1;
volumeInput.step = 0.05;
volumeInput.value = 1;
volumeInput.className = "controls__volume";
controls.appendChild(volumeInput);

// Playback speed input
const speedInput = document.createElement("input");
speedInput.type = "range";
speedInput.name = "playbackRate";
speedInput.min = 0.5;
speedInput.max = 3;
speedInput.step = 0.1;
speedInput.value = 1;
speedInput.className = "controls__speed";
controls.appendChild(speedInput);

video.parentElement.appendChild(controls);

// Play/pause toggle
function togglePlay() {
  if (video.paused) video.play();
  else video.pause();
}

// Update button text
function updateButton() {
  toggle.textContent = video.paused ? "►" : "❚ ❚";
}

// Handle skip buttons
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Handle progress bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.width = `${percent}%`;
}

// Scrub video
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Handle input updates
function handleUpdate() {
  video[this.name] = this.value;
}

// Event listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);
skipBack.addEventListener("click", skip);
skipForward.addEventListener("click", skip);

volumeInput.addEventListener("change", handleUpdate);
volumeInput.addEventListener("mousemove", handleUpdate);

speedInput.addEventListener("change", handleUpdate);
speedInput.addEventListener("mousemove", handleUpdate);

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
