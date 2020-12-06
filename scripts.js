// get the elements
var video = document.querySelector('.video');
var playButton = document.querySelector('.play');
var skipButtons = document.querySelectorAll('[data-skip]');
var inputs = document.querySelectorAll('input');
var progressBar = document.querySelector('.progress-line');
var progress = document.querySelector('.progress');
// functionality
function play() {

    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}
function changeButton() {
    var content = video.paused ? '▶️' : "⏸️";
    playButton.textContent = content;
}
function skip() {
    console.log(this);
    video.currentTime += parseFloat(this.dataset.skip);
}
function handleRange() {
    console.log(this.name, this.value);
    video[this.name] = this.value;
}
function progressBarUpdate() {
    console.log(this.name);
    var time = (video.currentTime /video.duration) *100;
    progressBar.style.width = `${time}%`;
}
function scrub(e) {
    var time = (e.offsetX / progress.offsetWidth) * video.duration;
    console.log(time , e.offsetX, video.offsetWidth, video.duration);
    video.currentTime= time;
    console.log(e);
}
console.log(progressBar,"prg");
// hook listeners
video.addEventListener('click', play);
playButton.addEventListener('click', play);
video.addEventListener('play', changeButton);
video.addEventListener('pause',changeButton);
skipButtons.forEach( button => {
    button.addEventListener('click', skip);
})
inputs.forEach(input =>{
    input.addEventListener('change', handleRange);
    input.addEventListener('mousemove', handleRange);
})
video.addEventListener('timeupdate', progressBarUpdate);
let mousedown = false;
progress.addEventListener('mousedown', ()=> mousedown = true);
progress.addEventListener('mouseup',() => mouseup = false);
progress.addEventListener('mousemove', (e)=> mousedown && scrub(e));
