$(function(){
  "use strict";

  let
    max = 75,
    bingo = [],
    status = true,
    roulette,
    random,
    number,
    result,
    $number = $("#number"),
    $result = $("#result"),
    $sound_play = $("#sound-play"),
    $sound_pause = $("#sound-pause");

  for(var i = 1; i <= max; i++) {
    bingo.push(i);
    $number.append($("<li>").text(("0" + i).slice(-2)));
  }

  // 事前に定義
  const magic_bingo = new Array( 
    1, 
    2, 
    3, 
    4, 
    5,
    6,
    7,
    8,
    9,
    10,
    11, 
    12, 
    13, 
    14, 
    15,
    16,
    17,
    18,
    19,
    20,
    21, 
    22, 
    23, 
    24, 
    25,
    26,
    27,
    28,
    29,
    30,  
    31, 
    32, 
    33, 
    34, 
    35,
    36,
    37,
    38,
    39,
    40,
    41, 
    42, 
    43, 
    44, 
    45,
    46,
    47,
    48,
    49,
    50,
    51, 
    52, 
    53, 
    54, 
    55,
    56,
    57,
    58,
    59,
    60,  
    61, 
    62, 
    63, 
    64, 
    65,
    66,
    67,
    68,
    69,
    70,
    71, 
    72, 
    73, 
    74,
    75
  );

  let index = 0;
  $("#button").on("click", function(){
    if(status) {
      status = false;
      $(this).text("STOP");
      $sound_play.trigger("play");
      $sound_pause.trigger("pause");
      $sound_pause[0].currentTime = 0;

      roulette = setInterval(function(){
        random = Math.floor(Math.random() * bingo.length);
        number = bingo[random];
        $result.text(number);
      }, 10);
    } else {
      status = true;
      $(this).text("START");
      $sound_pause.trigger("play");
      $sound_play.trigger("pause");
      $sound_play[0].currentTime = 0;

      clearInterval(roulette);

      result = magic_bingo[index];
      index++;
      bingo.splice(random, 1);

      $result.text(result);
      $number.find("li").eq(parseInt(result, 10) - 1).addClass("hit");
    }
  });
});