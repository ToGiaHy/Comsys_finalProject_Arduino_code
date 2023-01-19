const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

// Song titles
const songs = ['Renegade','Transitory Lands','Thank U'];

// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//get duration & currentTime for Time of song
function DurTime (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	// define minutes currentTime
	let min = (currentTime==null)? 0:
	 Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;

	// define seconds currentTime
	function get_sec (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	} 

	get_sec (currentTime,sec);

	// change currentTime DOM
	currTime.innerHTML = min +':'+ sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	} 

	// define seconds duration
	
	get_sec_d (duration);

	// change duration DOM
	durTime.innerHTML = min_d +':'+ sec_d;
		
};

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

// Time of song
audio.addEventListener('timeupdate',DurTime);
var openBtn = document.querySelector("#open_btn");
var closeBtn = document.querySelector("#close_btn");
function open_music_player(){
	musicContainer.style.transform = "translateX(1350px)";
	openBtn.style.visibility= "hidden";
	closeBtn.style.visibility="visible";
}
function close_music_player(){
	musicContainer.style.transform = "translateX(0px)";
	openBtn.style.visibility= "visible";
	closeBtn.style.visibility="hidden";
}
var openBtnImg = document.querySelector("#open_btn_img");
var closeBtnImg = document.querySelector("#close_btn_img");
var changeImg = document.querySelector(".change_img");
function openImgSlider(){
	changeImg.style.transform = "translateX(250px)";
	openBtnImg.style.visibility= "hidden";
	closeBtnImg.style.visibility="visible";
}
function closeImgSlider(){
	changeImg.style.transform = "translateX(0px)";
	openBtnImg.style.visibility= "visible";
	closeBtnImg.style.visibility="hidden";
}
var prevImg = document.querySelector("#prev_img");
var nextImg = document.querySelector("#next_img");
const images = ['SF','DeusEx','darksouls'];
var bgnImg = document.querySelector(".main_process");
var imgIndex = 0;
loadImg(images[imgIndex]);
function loadImg(images) {
	bgnImg.style.backgroundImage = `url("images_background/${images}.gif")`;
}
function nextImgFunction(){
	imgIndex++;

	if (imgIndex > images.length - 1) {
		imgIndex = 0;
	}
  
	loadImg(images[imgIndex]);
}
function prevImgFunction(){
	imgIndex--;

  if (imgIndex < 0) {
    imgIndex = images.length - 1;
  }

  loadImg(images[imgIndex]);
}
function displayModel(){
	var e3 = document.getElementById("registration_form");
	var e4 = document.getElementById("log_in_page");
	e3.style.transform = "rotateZ(0deg)";
	e3.style.opacity = "1";
	e3.style.pointerEvents = "auto";
	e4.style.opacity= "0.5";
}
function closeWindow(){
	var e3 = document.getElementById("registration_form");
	var e4 = document.getElementById("log_in_page");
	e3.style.transform = "rotateZ(-6deg)";
	e3.style.opacity = "0";
	e3.style.pointerEvents = "none";
	e3.style.transformOrigin = "bottom right";
	e3.style.transition = "all 500ms ease";
	e4.style.opacity= "1";
}

