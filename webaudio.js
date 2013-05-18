// Two Examples. Uncomment these to use
// var audioOne   = new audioApiKey("audioOne","A.mp3","mouseover");    // the first parameter is a dom node and the next is the audio file you want to trigger.The third parameter is the event.
// var audioTwo  = new audioApiKey("audioTwo","b.mp3","click");     

// END of two examples

var context = new webkitAudioContext();
function audioApiKey(domNode,fileDirectory,audioTriggerEvent) {
this.audioTriggerEvent = audioTriggerEvent;
this.domNode = domNode;
this.fileDirectory = fileDirectory;
var bufferFunctionName;
var incomingBuffer;
var savedBuffer;
var xhr;

bufferFunctionName = function () {
var source = context.createBufferSource();
source.buffer = savedBuffer;
source.connect(context.destination);
source.noteOn(0); 
};
var xhr = new XMLHttpRequest();
xhr.open('get',fileDirectory, true);
xhr.responseType = 'arraybuffer';
xhr.onload = function () {
        context.decodeAudioData(xhr.response,
             function(incomingBuffer) {
                 
                 savedBuffer = incomingBuffer;
                 
                 var note = document.getElementById(domNode);
                 note.addEventListener(audioTriggerEvent, bufferFunctionName , false);
             }
        );
};
xhr.send();
};
