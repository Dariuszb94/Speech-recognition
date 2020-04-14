 
window.onload=function voiceRecording(){
    let message = document.querySelector('#message');
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
    let grammar = '#JSGF V1.0;'
    let recognition = new SpeechRecognition();
    let speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.lang = 'pl-PL';
    recognition.interimResults = false;
    recognition.continuous=true;

    recognition.onresult = function(event) {
        let last = event.results.length - 1;
        let command = event.results[last][0].transcript;
        message.textContent += command ;
    };

    recognition.onspeechend = function() {
        recognition.stop();
    };

    recognition.onerror = function(event) {
        message.textContent = 'Error occurred in recognition: ' + event.error;
    }        

    document.querySelector('#btnGiveCommand').addEventListener('click', function(){
        recognition.start();
    });

    document.querySelector('#saveNote').addEventListener('click', function(){
        recognition.stop();
        this.saveFile();
    });
    this.ifFirefox();
}

function ifFirefox(){
    if(navigator.userAgent.toLowerCase().indexOf('firefox') > 0){
    let div = document.getElementById('firefox');
    div.innerHTML = "1. In the address bar, type about:config (with no quotes), and press Enter.</br> 2. Click 'I'll be careful, I promise'<br />3.In the search bar, search for 'media.webspeech.recognition.force_enable' (with no quotes).</br>4. Right click the result named 'media.webspeech.recognition.force_enable' and click 'Toggle'.<br />5. In the search bar, search for 'media.webspeech.recognition.enable' (with no quotes).</br>6. Right click the result named 'media.webspeech.recognition.enable' and click 'Toggle'.";
    }
}
function saveFile(){
    blob = new Blob([message.textContent], { type: 'text/plain' }),
    anchor = document.createElement('a');
    anchor.download = "note.txt";
    anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
    anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
    anchor.click();
    message.textContent=null;
}