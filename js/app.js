const video = document.getElementById('qr-video');
const canvas = document.getElementById('qr-canvas');
const context = canvas.getContext('2d');
const resultParagraph = document.getElementById('qr-result');
    
// Get access to the camera
navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
.then(function(stream) {
video.srcObject = stream;
video.setAttribute('playsinline', true); // required to tell iOS safari we don't want fullscreen
video.play();
decode();
});
    
function decode() {
context.drawImage(video, 0, 0, canvas.width, canvas.height);
let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
let code = jsQR(imageData.data, imageData.width, imageData.height);
if (code) {
resultParagraph.innerText = "Found QR code: " + code.data;
}
requestAnimationFrame(decode);
}