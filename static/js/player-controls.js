window.addEventListener('DOMContentLoaded', function() {
    const player = new OpenPlayerJS('audio', {
        controls: {
            layers: {
            left: ['play', 'volume'],
            middle: [],
            right: [],
            },
        }
    });

    // Initialize player first
    player.init();

    // Get the HTMLMediaElement (<audio> or <video>)
    const media = player.getElement ? player.getElement() : player.getMedia();

    // Safety check
    if (!media || !media.addEventListener) {
        console.error('Could not get media element from OpenPlayerJS');
        return;
    }

    //TODO: add this check before moving pages
    // Listen for play (start)
    media.addEventListener('play', () => {
        setLastPlayTime(new Date().toISOString());
    });

    // Listen for pause (stop)
    media.addEventListener('pause', () => {
        setLastPlayTime(null);
    });

    // media.addEventListener('loadedmetadata', () => {
    //     if (isLastPlayClose()) {
    //         media.muted = true; // ✅ autoplay allowed when muted
    //         media.play().then(() => {
    //             console.log('Autoplay started muted');
    //         }).catch(err => {
    //             console.warn('Autoplay blocked even muted:', err);
    //         });
    //     }
    // });

    // // Optional: unmute on first user interaction
    // window.addEventListener('click', () => {
    //     media.muted = false;
    //     console.log('Unmuted after click');
    // });
});


function isLastPlayClose() {
    const lastPlayTime = getLastPlayTime();
    if (!lastPlayTime) return false;

    const lastPlayDate = new Date(lastPlayTime);
    const now = new Date();
    const diffSeconds = (now - lastPlayDate) / 1000;
    return diffSeconds <= 10; // within last 30 seconds
}

function getLastPlayTime() {
    return localStorage.getItem('lastPlayTime');
}

function setLastPlayTime(time = null) {
    localStorage.setItem('lastPlayTime', time);
}