const textarea = document.querySelector("textarea");
const button = document.querySelector("button");
let isSpeaking = false;
let utterance;

const textTospeech = () => {
  const synth = window.speechSynthesis;
  const text = textarea.value;

  if (!synth.speaking && text && !isSpeaking) {
    utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);

    isSpeaking = true;
    button.innerText = "pause";

    utterance.onend = () => {
      isSpeaking = false;
      button.innerText = "convert to speech";
      utterance = null;
    };
  } else if (isSpeaking) {
    //pause the speech
    synth.pause();
    isSpeaking = false;
    button.innerText = "Resume";
  } else {
    synth.resume();
    isSpeaking = true;
    button.innerText = "Pause";
  }
};

button.addEventListener("click", textTospeech);
