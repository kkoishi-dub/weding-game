let timeBegan = null;
let timeStopped = null;
let stoppedDuration = 0;
let startInterval = null;
let flag = 0;
let minutes;
let seconds;
let milliseconds;

$(document).ready(function() {
    const $body = $('body');
    const $question = $("#question");
    const $startBtn = $("#start");
    const $minute = $("#minute");
    const $second = $("#second");
    const $millisecond = $("#millisecond");
    const $sound_play = $("#sound-play");
    const $sound_normal = $("#sound-normal");
    const $sound_result = $("#sound-result");

    const staticImageUrl = 'static.jpg';
    const animatedGifUrl = 'pokemon2.gif';

    $startBtn.on("click", function() {
        if(flag==0) {
            start();
            flag = 1;
            $question.text("音楽が止まるまでの秒数を考えてね");
            $startBtn.text("Pause");
            $sound_normal[0].pause();
            $sound_normal[0].currentTime = 0;
            $sound_play[0].play();
            $body.css('background-image', `url('${animatedGifUrl}')`);
        }
        else if(flag==1) {
            stop();
            flag = 2;
            $question.text("秒数を答えてね");
            $startBtn.text("Answer");
            $sound_play[0].pause();
            $sound_normal[0].play();
            $sound_play[0].currentTime = 0;
            $body.css('background-image', `url('${staticImageUrl}')`);
        }
        else if(flag==2) {
            $question.text("正解は・・・");

            $sound_normal[0].pause();
            $sound_result[0].play();
            $sound_normal[0].currentTime = 0;
            $startBtn.text("Reset");

            show();
            flag = 3;
        }else{
            $question.text("武松 駿也&式井 千乃 結婚おめでとう！！");

            reset();
            $sound_result[0].pause();
            $sound_result[0].currentTime = 0;
            flag = 0;
            $startBtn.text("Start");

        }
    });



    function start() {
        if (timeBegan === null)
            timeBegan = new Date();

        if (timeStopped !== null)
            stoppedDuration += (new Date() - timeStopped);

        startInterval = setInterval(timeRunning, 10);
    }

    function reset() {
        clearInterval(startInterval);
        timeBegan = null;
        timeStopped = null;
        stoppedDuration = 0;
        flag = false;
        $minute.text("00");
        $second.text("00");
        $millisecond.text("00");
        $body.css('background-image', `url('${staticImageUrl}')`);

    }
    function show() {
        $minute.text(minutes < 10 ? '0' + minutes : minutes);
        $second.text(seconds < 10 ? '0' + seconds : seconds);
        $millisecond.text(milliseconds < 10 ? '0' + milliseconds : milliseconds); 
    }
    function stop() {
        timeStopped = new Date();
        $millisecond.text("??");
        clearInterval(startInterval);
    }

    function timeRunning() {
        const currentTime = new Date();
        const timeElapsed = new Date(currentTime - timeBegan - stoppedDuration);

        minutes = timeElapsed.getUTCMinutes();
        seconds = timeElapsed.getUTCSeconds();
        milliseconds = Math.floor(timeElapsed.getUTCMilliseconds() / 10);

        if(timeElapsed < 9999) {
            $minute.text(minutes < 10 ? '0' + minutes : minutes);
            $second.text(seconds < 10 ? '0' + seconds : seconds);
            $millisecond.text(milliseconds < 10 ? '0' + milliseconds : milliseconds);            
        }else{
            $minute.text("??");
            $second.text("??");
            $millisecond.text(milliseconds < 10 ? '0' + milliseconds : milliseconds);  
        }

    }
});