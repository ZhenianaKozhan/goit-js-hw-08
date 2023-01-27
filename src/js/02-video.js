import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);


const onPlay = function (data) {
    localStorage.setItem("videoplayer-current-time", JSON.stringify(data));
};

player.on('timeupdate', throttle(onPlay, 1000));

const currentTimeLocalStorage = localStorage.getItem("videoplayer-current-time")

player.setCurrentTime(JSON.parse(currentTimeLocalStorage).seconds).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});



