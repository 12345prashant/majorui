
// kEYBOARD PART //

const wordList = [
    // Pronouns
    "i", "you", "he", "she", "it", "we", "they", "me", "him", "her", "us", "them", "my dear","my","dear"
    ,"son",
    // Common verbs
    "be", "have", "do", "say", "go", "can", "get", "make", "know", "think", "take", "see", 
    "come", "want", "use", "find", "give", "tell", "work", "call", "try", "ask", "need", 
    "feel", "become", "leave", "put", "mean", "keep", "let", "begin", "seem", "help", 
    "talk", "turn", "start", "show", "hear", "play", "run", "move", "like", "live", 
    "believe", "hold", "bring", "happen", "write", "provide", "sit", "stand", "lose", 
    "pay", "meet", "include", "continue", "set", "learn", "change", "lead", "understand", 
    "watch", "follow", "stop", "create", "speak", "read", "spend", "grow", "open", "walk", 
    "win", "offer", "remember", "love", "buy", "wait", "serve", "send", "stay", "fall", 
    "cut", "reach", "kill", "raise", "pass", "sell", "decide", "return", "explain", 
    "hope", "develop", "carry", "break", "receive", "agree", "support", "hit", "produce", 
    "eat", "cover", "catch", "draw", "choose", "wear", "drive", "catch", "spend",

    // Common nouns
    "person", "year", "day", "thing", "man", "world", "life", "hand", "part", "child", 
    "eye", "woman", "place", "work", "week", "case", "point", "government", "company", 
    "number", "group", "problem", "fact", "house", "friend", "school", "family", "country", 
    "story", "student", "word", "side", "example", "system", "mother", "father", "name", 
    "car", "job", "minute", "game", "night", "water", "food", "head", "body", "air", 
    "door", "room", "money", "line", "land", "home", "love", "state", "service", "health",
    "power", "idea", "reason", "city", "community", "information", "month", "morning", 
    "program", "question", "war", "result", "control", "market", "book", "class", 
    "student", "teacher", "patient", "doctor", "hospital", "medicine", "time", "hour",

    // Adjectives
    "good", "new", "first", "last", "long", "great", "little", "own", "other", "old", 
    "right", "big", "high", "different", "small", "large", "next", "early", "young", 
    "important", "few", "public", "bad", "same", "able", "happy", "sad", "angry", "tired", 
    "hungry", "thirsty", "cold", "hot", "easy", "hard", "strong", "weak", "fast", "slow",

    // Common adverbs
    "very", "quite", "always", "never", "sometimes", "often", "usually", "quickly", 
    "slowly", "well", "badly", "here", "there", "now", "then", "today", "tomorrow", 
    "yesterday", "really", "easily", "carefully", "loudly", "silently", "happily", 
    "sadly", "again", "soon",

    // Conjunctions and prepositions
    "and", "or", "but", "because", "so", "if", "when", "where", "although", "until", 
    "since", "as", "while", "before", "after", "during", "with", "without", "about", 
    "against", "between", "through", "under", "over", "before", "after", "in", "on", 
    "at", "by", "for", "to", "from", "into", "up", "down", "off", "out", "around", 
    "throughout", 

    // Modal verbs
    "can", "could", "will", "would", "should", "may", "might", "must",

    // Basic conversation phrases
    "yes", "no", "please", "thank you", "sorry", "excuse me", "hello", "goodbye", 
    "how are you", "i'm fine", "help", "stop", "go", "wait", "okay", "good", "bad", 
    "where", "what", "why", "how", "who", "when", "which", "more", "less", "all", "some", 
    "none", "this", "that", "here", "there",

    // Emotions and feelings
    "happy", "sad", "angry", "tired", "excited", "bored", "afraid", "worried", "confused", 
    "lonely", "grateful", "proud", "ashamed", "surprised", "curious", "calm", "frustrated", 
    "annoyed", "jealous", "content", "hopeful", "anxious", "relieved", "disappointed", 

    // Basic daily needs
    "water", "food", "drink", "bathroom", "restroom", "bed", "chair", "clothes", 
    "blanket", "medicine", "doctor", "nurse", "help", "pain", "rest", "sleep", "wash", 
    "clean", "hot", "cold", "tired", "hungry", "thirsty", "full", "sick", "better", 
    "worse"
];

let isCaps = false;

function typeKey(key) {
    const output = document.getElementById('output');
    if (key === 'BACKSPACE') {
        output.value = output.value.slice(0, -1);
    } else {
        if (isCaps) {
            output.value += key.toUpperCase();
        } else {
            output.value += key.toLowerCase();
        }
    }
    updatePredictions(output.value.trim().split(" ").pop());
}

function updatePredictions(input) {
    const predictionsDiv = document.getElementById('predictions');
    predictionsDiv.innerHTML = ''; // Clear previous predictions

    if (input.length === 0) return; // Don't show predictions if input is empty

    // Filter the wordList based on current input
    const filteredWords = wordList.filter(word => word.startsWith(input.toLowerCase()));

    // Show top 3 predictions
    filteredWords.slice(0, 3).forEach(word => {
        const predictionButton = document.createElement('button');
        predictionButton.classList.add('prediction');
        predictionButton.innerText = word;
        predictionButton.onclick = () => selectPrediction(word);
        predictionsDiv.appendChild(predictionButton);
    });
}

function selectPrediction(word) {
    const output = document.getElementById('output');
    const currentText = output.value.trim().split(" ");
    currentText.pop(); // Remove the last word (prefix)
    output.value = currentText.join(" ") + " " + word + " "; // Add the selected word with a space
    document.getElementById('predictions').innerHTML = ''; // Clear predictions after selecting one
}

function toggleCaps() {
    isCaps = !isCaps;
    const capsBtn = document.getElementById('capslock');
    capsBtn.style.backgroundColor = isCaps ? "#ffc107" : "#61dafb";
}

function clearText() {
    document.getElementById('output').value = '';
    document.getElementById('predictions').innerHTML = ''; // Clear predictions
}

//-----------------------------------------------------------------------------------

// for speak whatever typed:
let text = "";
const voice = () => {
    const msg = new SpeechSynthesisUtterance();
    text = document.getElementById('output').value;
    
    if (text.trim() === "") {
        console.log("No text to speak.");
    }

    msg.text = text;
    msg.lang = "en-US";
    window.speechSynthesis.speak(msg);
};


// ------------------------------------------------------------------------------------------

// OFF BUTTON PART //
document.getElementById('offButton').addEventListener('click', function () {
    const blackout = document.getElementById('blackout');
    const unlockButton = document.getElementById('unlockButtonsleep');

    // Show the blackout and unlock button
    blackout.classList.add('visible');
});

// SLEEP BUTTON PART //
document.getElementById('sleepButton').addEventListener('click', function () {
    const blackout = document.getElementById('blackout');
    const unlockButton = document.getElementById('unlockButtonsleep');

    // Show the blackout and unlock button
    blackout.classList.add('visible');
    unlockButton.style.display = 'block'; // Show unlock button
});

document.getElementById('unlockButtonsleep').addEventListener('click', function () {
    const blackout = document.getElementById('blackout');
    const unlockButton = document.getElementById('unlockButtonsleep');

    // Hide the blackout and unlock button
    blackout.classList.remove('visible');
    unlockButton.style.display = 'none'; // Hide unlock button
});

// LOCK BUTTON PART //
document.getElementById('lockButton').addEventListener('click', function () {
    const lockScreen = document.getElementById('lockScreen');
    lockScreen.classList.remove('hidden');
    lockScreen.style.opacity = '1';

    document.getElementById('unlockButton').addEventListener('click', function unlock() {
        lockScreen.style.opacity = '0';
        setTimeout(() => lockScreen.classList.add('hidden'), 500);
    });
});

// --------------------------------------------------------------------------------------