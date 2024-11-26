
let sum_num=6;
let currentQuizIndex = 0;
let gameInterval;
let flag = 0;


$(document).ready(function() {
  const $quizDisplay = $('#timer-message');
  const $startButton = $('#start-game');
  const $rule = $('#rule');
  const $sound_normal = $("#sound-normal");
  let sum=0;
  let message= '';
  let usedNumbers = new Set();
  const $quizNumber = $('#quiz-number');


  $startButton.on('click', function(){
    if(flag==0) {
      startGame();
      flag = 1;
    }else if(flag==1) {
      showAnswer();
      currentQuizIndex++;
    }
    else{
      flag=0;
      nextGame();
    }
  });


  function startGame() {
    $rule.hide();
    $startButton.hide();
    $quizDisplay.hide();
    $quizNumber.show();
    currentQuizIndex = 0;
    $sound_normal[0].play();
    nextQuiz();
    gameInterval = setInterval(nextQuiz, 2000);
  }
  
  function nextQuiz() {
    if (currentQuizIndex > sum_num) {
      endGame();
      return;
    }
  
    let num = generateUniqueNumber();
    $quizNumber.text(num);
    sum += num;
    currentQuizIndex++;
  }
  
  function endGame() {
    clearInterval(gameInterval);
    currentQuizIndex = 0;
    $quizNumber.hide();
    $quizDisplay.show().text('合計は？');
    $startButton.show().text('答えを見る');
  }
  
  function nextGame() {
    currentQuizIndex = 0;
    sum = 0;
    $sound_normal[0].pause();
    $sound_normal[0].currentTime = 0;
    $quizNumber.hide();
    $quizDisplay.show().text("フラッシュ暗算");
    $startButton.show().text('ゲーム開始');
  }

  function generateUniqueNumber() {
    const minCeiled = Math.ceil(10);
    const maxFloored = Math.floor(100);
    let num;
    do {
      num = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    } while (usedNumbers.has(num));
    
    usedNumbers.add(num);
    return num;
  }

  function showAnswer() {
    $startButton.text('もう一度プレイ');
    flag=3;
    $quizDisplay.html(sum);
  }

});