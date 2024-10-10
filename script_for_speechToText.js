// Check for browser compatibility with Web Speech API
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!window.SpeechRecognition) {
  document.getElementById('recognizedText').textContent = "Your browser does not support voice recognition.";
  document.getElementById('voiceButton').disabled = true;
}

let recognition = new window.SpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = false; // Finalize only when the user stops speaking
let isRecognitionActive = false; // Flag to track recognition state

const voiceButton = document.getElementById('voiceButton');
const listeningIndicator = document.getElementById('listeningIndicator');
const recognizedText = document.getElementById('recognizedText');

// Toggle between start/stop voice recognition
const toggleRecognition = () => {
  if (isRecognitionActive) {
    stopRecognition();
  } else {
    startRecognition();
  }
};

// Start voice recognition
const startRecognition = () => {
  if (isRecognitionActive) return;

  isRecognitionActive = true;
  voiceButton.textContent = "Stop Listening";
  voiceButton.classList.add("listening"); // Change button color to green
  listeningIndicator.style.display = 'flex'; // Show waves

  recognition.start(); // Begin listening
};

// Stop voice recognition
const stopRecognition = () => {
  recognition.stop(); // Stop the speech recognition
  isRecognitionActive = false;
  voiceButton.textContent = "Start Listening";
  voiceButton.classList.remove("listening"); // Change button color back to red
  listeningIndicator.style.display = 'none'; // Hide waves
};

// Handle voice recognition results
recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  recognizedText.textContent = transcript; // Display recognized text
};

// Handle recognition errors
recognition.onerror = (event) => {
  recognizedText.textContent = "Error: " + event.error;
};

// Handle end of recognition process
recognition.onend = () => {
  if (isRecognitionActive) {
    stopRecognition(); // Ensure it resets properly if stopped by the user
  }
};
