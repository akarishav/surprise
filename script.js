"use strict";
let string = document.getElementById("string");
let win_width = window.innerWidth * 0.8;//this var will work as 80vw 
let light_lamp = window.innerWidth * 0.5 // this is center of window
string.style.transform = `translate(${win_width}px, -400px)`;//setting the posistion of string on screeen
// light is on or not
let lightON = false

class string_boll {
    string_click = false
    y_string_pos = 0
    init() {
        let string = document.getElementById("string");
        string.addEventListener('mousedown', ()=>{
            // console.log("Mouse Down");
            this.string_click = true
        })
        window.addEventListener('mousemove', (e)=>{
            // console.log("Mouse Move");
            if(this.string_click){
                this.y_string_pos = e.clientY - 700
                if(this.y_string_pos > -300){
                    this.y_string_pos = -300;
                }
                else if(this.y_string_pos < -500){
                    this.y_string_pos = -500;
                }
                string.style.transform = `translate(${win_width}px, ${this.y_string_pos}px)`
            }
            
        })
        window.addEventListener("mouseup", (e)=>{
            // console.log("Mouse Up");
            if(this.string_click){
                lightON = (!lightON)
            console.log(`light is on ${lightON}`);
            }
            string.style.transform = `translate(${win_width}px, ${-400}px)`
            
            this.string_click = false;
        })
    }
}

function change_light(){
    let light = document.getElementById('main-lamp');
    if(lightON){
        light.style.backgroundImage = 'url(images/light.png)';
    }
    else{
        light.style.backgroundImage = 'url(images/dark.png)';
    }
}
function setLampContainer_height_and_width(){
    let light = document.getElementById('main-lamp');
    let width = window.innerWidth;
    light.style.width =  `${width * 0.75}px`;
    light.style.height = `${window.innerHeight}px`;
}
function set_Message_pos(){
    let message = document.getElementById("LoveYou");
    // message.style.display = 'none'
    message.style.transform = `translate(${(window.innerWidth / 2) - 100}px, 400px)`
    message.className = 'message_vis'
    if(message && lightON){
        message.style.display = 'block'
        message.className = 'message_animation';
        message.style.transform = `translate(${(window.innerWidth / 2) - 100}px, 400px)`
    }
}

function main(){
    change_light();
    setLampContainer_height_and_width();
    set_Message_pos();
}
setInterval(main, 0);
const str = new string_boll(); 
str.init();


const playBtn = document.getElementById("play-btn");
const nextBtn = document.getElementById("next-btn");
const previousBtn = document.getElementById("previous-btn");
const musicImage = document.getElementById("music-image");
const audioPlayer = document.getElementById("audio-player");

let isPlaying = false;
let currentIndex = 0;

const playlist = [
    { song: "images/Dil-Jhoom-MassTamilan.dev.mp3", image: "images/pool.jpeg" },
    { song: "images/Gulabi Saree-(PagalSongs.Com.IN).mp3", image: "images/gulabi.jpeg" },
    { song: "images/WhatsApp Audio 2024-04-10 at 10.15.22 AM.mpeg", image: "images/cute4.jpeg" },
    { song: "images/WhatsApp Audio 2024-04-10 at 10.15.27 AM (1).mpeg", image: "images/cute15.jpeg" },
    { song: "images/WhatsApp Audio 2024-04-10 at 10.15.27 AM (2).mpeg", image: "images/WhatsApp Image 2024-04-09 at 9.00.47 PM.jpeg" },
    { song: "images/zindagi.mpeg", image: "images/cute14.jpeg" },
    // Add more songs and images as needed
];

// function playMusic() {
//     if (isPlaying) {
//         audioPlayer.pause();
//         playBtn.textContent = "Play";
//     } else {
//         audioPlayer.play();
//         playBtn.textContent = "Pause";
//     }
//     isPlaying = !isPlaying;
// }

// playBtn.addEventListener("click", playMusic);

// function nextTrack() {
//     // Change image source
//     musicImage.src = "images/cute4.jpeg";
//     // Change audio source
//     audioPlayer.src = "images/Dil-Jhoom-MassTamilan.dev.mp3";
//     // Play the next track automatically if music is playing
//     if (isPlaying) {
//         audioPlayer.play();
//     }
// }

// nextBtn.addEventListener("click", nextTrack);

// function previousTrack() {
//     // Change image source
//     musicImage.src = "images/pool.jpeg";
//     // Change audio source
//     audioPlayer.src = "images/Gulabi Saree-(PagalSongs.Com.IN).mp3";
//     // Play the previous track automatically if music is playing
//     if (isPlaying) {
//         audioPlayer.play();
//     }
// }


// previousBtn.addEventListener("click", previousTrack);


function playMusic() {
    if (isPlaying) {
        audioPlayer.pause();
        playBtn.classList.remove("fa-pause");
        playBtn.classList.add("fa-play");
    } else {
        audioPlayer.play();
        playBtn.classList.remove("fa-play");
        playBtn.classList.add("fa-pause");
    }
    isPlaying = !isPlaying;
}

playBtn.addEventListener("click", playMusic);

// Function to play the next track
function nextTrack() {
    currentIndex = (currentIndex + 1) % playlist.length;
    updateTrack();
}

nextBtn.addEventListener("click", nextTrack);

// Function to play the previous track
function previousTrack() {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    updateTrack();
}

previousBtn.addEventListener("click", previousTrack);

// Function to update the current track (song and image)
function updateTrack() {
    const currentTrack = playlist[currentIndex];
    audioPlayer.src = currentTrack.song;
    musicImage.src = currentTrack.image;
    
    // If music is playing, play the updated track
    if (isPlaying) {
        audioPlayer.play();
    }
}

// Initial setup: Load the first track
updateTrack();