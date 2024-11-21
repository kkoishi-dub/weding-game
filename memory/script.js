const quizzes = [
  { question: "Q01. 日本を英語で？", answer: "A. Japan" },
  { question: "Q02. 新婦のフルネームは? (ひらがなでも可)", answer: "A. 式井千乃" },
  { question: "Q03. 1年は何ヶ月？", answer: "A. 12" },
  { question: "Q04. 今日は何月何日？", answer: "A. 11月30日" },
  { question: "Q05. 赤と青を混ぜると何色？", answer: "A. 紫" },
  { question: "Q06. サッカーは何人制？", answer: "A. 11" },
  { question: "Q07. 日本で一番高い山は？", answer: "A. 富士山" },
  { question: "Q08. 2 + 2 = ?？", answer: "A. 4" },
  { question: "Q09. 1時間は何秒？", answer: "A. 3600" },
  { question: "Q10. 新郎のフルネームは? (ひらがなでも可)", answer: "A. 武松駿也" }
];

let currentQuizIndex = 0;
let gameInterval;
let flag = 0;


$(document).ready(function() {
  const $quizDisplay = $('#timer-message');
  const $startButton = $('#start-game');
  const $rule = $('#rule');
  const $sound_normal = $("#sound-normal");


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
    currentQuizIndex = 0;
    $sound_normal[0].play();
    nextQuiz();
    gameInterval = setInterval(nextQuiz, 3000);
  }

  function nextQuiz() {
    if (currentQuizIndex >= quizzes.length) {
      endGame();
      return;
    }

    $quizDisplay.text(quizzes[currentQuizIndex].question);
    currentQuizIndex++;
  }

  function showAnswer() {
    if (currentQuizIndex >= quizzes.length) {
      $startButton.text('もう一度プレイ');
      flag=3;
      return;
    }
    $quizDisplay.html(quizzes[currentQuizIndex].question + "<br>" + quizzes[currentQuizIndex].answer);
  }

  function endGame() {
    clearInterval(gameInterval);
    currentQuizIndex=0;

    $quizDisplay.text("回答してください！");
    $startButton.show().text('答えを見る');
  }
  function nextGame() {
    currentQuizIndex=0;
    $sound_normal[0].pause();
    $sound_normal[0].currentTime = 0;
    $quizDisplay.text("3秒クイズゲーム");
    $startButton.show().text('ゲーム開始');
  }
});