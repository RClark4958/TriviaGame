$("#start").on('click',function(){
  $("#start").remove();
  game.loadQuestion();
})

$(document).on('click','.answer-button',function(e){
  game.clicked(e);
})

$(document).on('click', '#reset', function() {
  game.reset();
})

var questions = [{
  question: "What is the name of Rick's pickle form?",
  answers: ["Pickle Rick", "Rick the Pickle", "Pickly Rickly", "Hotdog Harry"],
  correctAnswer: "Pickle Rick",
  image:"../assets/images/first.gif"
}, {
  question: "In what restaurant does Rick meet the alien voiced by Nathan Fillion?",
  answers: ["Denny's", "Mcdonald's", "Shoney's", "Arby's"],
  correctAnswer: "Shoney's",
  image:"../assets/images/second.gif"
}, {
  question: "What is Rick's most treasured exhibit in Anatomy Park?",
  answers: ["Pirates of the Pancreas", "It's a small, small intestine", "The Bone Train", "Hepatitis C"],
  correctAnswer: "Pirates of the Pancreas",
  image: "/../assets/images/third.gif"
}, {
  question: "Which famous Mcdonald's food is featured in the episode Rickshank Redemption",
  answers: ["McRib", "Rickle Pickles", "Szechuan Sauce", "Morty Milk"],
  correctAnswer: "Szechuan Sauce",
  image: "../assets/images/fourth.gif"
}];

var game = {
  questions:questions,
  currentQuestion:0,
  counter:30,
  correct: 0,
  incorrect: 0,
  countdown: function() {
    game.counter--;
    $("#counter").html(game.counter);
    if(game.counter <= 0){
      console.log("TIME UP!");
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    $('#subwrapper').html("<h2>TIME REMAINING <span id='counter'><b>30</b></span> Seconds</h2>");
    $('#subwrapper').append("<h2>" + questions[game.currentQuestion].question + "</h2>");
    for (var i = 0; i < questions[game.currentQuestion].answers.length; i++) {
      $('#subwrapper').append('<button class="answer-button" id="button-'+i+'" data-name="'+questions[game.currentQuestion].answers[i]+'">'+questions[game.currentQuestion].answers[i]+'</button>');
    }
  },
  nextQuestion: function(){
    game.counter = 30;
    $('#counter').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    game.unanswered++;
    $('#subwrapper').html('<h2>OUT OF TIME</h2>');
    $('#subwrapper').append('<h3>The Correct Answer Was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    if(game.currentQuestion==questions.length-1){
      setTimeout(game.results,3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function (){
    clearInterval(timer);
    $('#subwrapper').html("ALL DONE!");
    $('#subwrapper').append("<h3>Correct: " + game.correct + "</h3>");
    $('#subwrapper').append("<h3>Incorrect: " + game.incorrect + "</h3>");
    $('#subwrapper').append("<h3>Unanswered: " + game.unanswered + "</h3>"); 
    $('#subwrapper').append("<button id='reset'>RESET</button>");

    
  },
  clicked: function (e){
    clearInterval(timer);
    if($(e.target).data("name")==questions[game.currentQuestion].correctAnswer){
      game.answeredCorrectly();
    } else {
        game.answeredIncorrectly();
    }
  },
  answeredCorrectly: function (){
    console.log("YOU GOT IT");
    clearInterval(timer);
    game.correct++;
    $('#subwrapper').html('<h2>YOU GOT IT RIGHT!</h2>');
    if(game.currentQuestion==questions.length-1){
      setTimeout(game.results,3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredIncorrectly: function (){
    console.log("WRONG")
    clearInterval(timer);
    game.incorrect++;
    $('#subwrapper').html('<h2>YOU GOT IT WRONG!</h2>');
    $('#subwrapper').append('<h3>The Correct Answer Was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    if(game.currentQuestion==questions.length-1){
      setTimeout(game.results,3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function (){
    game.currentQuestion = 0;
    game.counter = 0;
    game.correct = 0;
    game.incorrect = 0;
    game.unanswered = 0;
    game.loadQuestion();
  }


}