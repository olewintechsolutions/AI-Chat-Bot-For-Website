document.addEventListener('DOMContentLoaded', () => {

    // here i added a function called addEventListener which will automatically  display messages after 3 seconds
  setTimeout(() => {
    appendMessage('bot', "Hello! How can we assist you today?");
  }, 3000);

  setTimeout(() => {
    appendMessage('bot', " Add your services here");
  }, 5000);
  setTimeout(() => {
    appendMessage('bot', "1. Software Development");
  }, 7000);
  setTimeout(() => {
    appendMessage('bot', "2. Mobile Apps");
  }, 9000);
  setTimeout(() => {
    appendMessage('bot', "3. Machine Learning Model Development");
  }, 11000);

// here you can add your own custom message handlers and configure your application

  document.getElementById('sendBtn').addEventListener('click', sendMessage);
  // when user press Enter key after input  to send messages , if u remove it u have to click send button by mouse 
  document.getElementById('userInput').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });

// using microphone for voice message and click enter it will respond to your messages

  document.getElementById('micBtn').addEventListener('click', startVoiceRecognition);
});
// here is the main function that will be called when the user types something

function sendMessage() {
  const userInput = document.getElementById('userInput').value;
  if (userInput.trim() !== '') {
    appendMessage('user', userInput);
    generateResponse(userInput);
    document.getElementById('userInput').value = '';
  }
}

function appendMessage(sender, message) {
  const chatBox = document.getElementById('chatBox');
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);

  const messageText = document.createElement('span');
  messageText.textContent = message;
  messageElement.appendChild(messageText);
// addinga a ti,e stamp and date to the message
  const timestamp = document.createElement('span');
  timestamp.classList.add('timestamp');
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = now.toLocaleDateString();
  timestamp.textContent = dateString + " " + timeString;
  messageElement.appendChild(timestamp);

  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function generateResponse(userInput) {
  const lowerCaseInput = userInput.toLowerCase();
  let response = "I'm sorry, I didn't understand that. Could you please provide more details?";

  const keywords = {
    'hello': "Hello! How can we assist you today?",
    'hi': "Hi! How can we help you today?",
   


};

  for (const keyword in keywords) {
    if (lowerCaseInput.includes(keyword)) {
      response = keywords[keyword];
      break;
    }
  }

  appendMessage('bot', response);
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function startVoiceRecognition() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Your browser does not support voice recognition. Please use Chrome.");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;

  recognition.onstart = function() {
    console.log('Voice recognition started. Try speaking into the microphone.');
  };

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    document.getElementById('userInput').value = transcript;
    sendMessage();
  };

  recognition.onerror = function(event) {
    console.error('Voice recognition error', event.error);
  };

  recognition.onend = function() {
    console.log('Voice recognition ended.');
  };

  recognition.start();
}