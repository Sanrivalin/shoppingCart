    document.addEventListener('DOMContentLoaded', (event) => {
    const myVideo = document.getElementById('myVideo');
 
    myVideo.addEventListener('ended', (event) => {
        console.log("Video has ended.");
        // Execute specific code here
        executeAfterVideo();
    });
});
function executeAfterVideo() {
    dataLayer.push({
        'event': 'tutorial_complete',
    });
    console.log('Event has been sended');
}
