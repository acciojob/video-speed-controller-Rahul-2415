
const video = document.querySelector(".flex");


video.src = "https://www.w3schools.com/html/mov_bbb.mp4";


const progress = document.createElement("div");
progress.className = "progress";

const progressFilled = document.createElement("div");
progressFilled.className = "progress__filled";

progress.appendChild(progressFilled);
video.parentElement.appendChild(progress);


const controls = document.createElement("div");
controls.className = "controls";


const toggle = document.createElement("button");
toggle.className = "player__button";
toggle.textContent = "►";
controls.appendChild(toggle);


const skipBack = document.createElement("button");
skipBack.dataset.skip = "-10";
skipBack.textContent = "« 10s";
controls.appendChild(skipBack);


const skipForward = document.createElement("button");
skipForward.dataset.skip = "25";
skipForward.textContent = "25s »";
controls.appendChild(skipForward);


const volumeInput = document.createElement("input");
volumeInput.type = "range";
volumeInput.name = "volume";
volumeInput.min = 0;
volumeInput.max = 1;
volumeInput.step = 0.05;
volumeInput.value = 1;
controls.appendChild(volumeInput);


const speedInput = document.createElement("input");
speedInput.type = "range";
speedInput.name = "playbackRate";
speedInput.min = 0.5;
speedInput.max = 3;
speedInput.step = 0.1;
speedInput.value = 1;
controls.appendChild(speedInput);


video.parentElement.appendChild(controls);

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  toggle.textContent = video.paused ? "►" : "❚ ❚";
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.width = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function handleUpdate() {
  video[this.name] = this.value;
}


video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);
skipBack.addEventListener("click", skip);
skipForward.addEventListener("click", skip);

volumeInput.addEventListener("input", handleUpdate);
speedInput.addEventListener("input", handleUpdate);

let isMouseDown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => isMouseDown && scrub(e));
progress.addEventListener("mousedown", () => (isMouseDown = true));
progress.addEventListener("mouseup", () => (isMouseDown = false));
