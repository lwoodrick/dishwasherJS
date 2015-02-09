function dishwasherHelper() {

  var dish, coolPerson, dishwasherHasRoom, properArticle, lastDish;

  var DishLocation = function() {
    this.contents = [];
    this.findInitial = function() {
      var dishInitial = this.contents[0].charAt(0);
      if(dishInitial === "a" || dishInitial === "e" || dishInitial === "i" || dishInitial === "o" || dishInitial === "u") {
        properArticle = " an ";
      }
      else {
        properArticle = " a ";
      };
    };
    this.theOxfordTreatment = function() {
      var numDishes = this.contents.length;
      if (numDishes > 1) {
        lastDish = this.contents.pop()
        lastDish = " and " + lastDish;
      }
      else {
        lastDish = "";
      }
    }
  };

  var dishwasher = new DishLocation();
  var newCabinet = new DishLocation();
  var sink = new DishLocation();

  dishwasher.running = false, dishwasher.contentsState = 'dirty', dishwasher.full = true;



  var question1 = '<div id="dishQuestion1" class="question"><p>What are you bringing to the sink?</p><input type="text" class="newDish" placeholder="Your dish"/><div class="buttonContainer"><button class="addDish">ADD DISH</button></div></div>';
  var question2 = '<div id="dishQuestion2" class="question"><p>Is the dishwasher on or off?</p><div class="buttonContainer"><button class="dishwasherOn">ON</button><button class="dishwasherOff">OFF</button></div></div>';
  var question3 = '<div id="dishQuestion3" class="question"><p>Are the dishwasher\'s contents clean?</p><div class="buttonContainer"><button class="dishwasherClean">YES</button><button class="dishwasherDirty">NO</button></div></div>';
  var question4 = '<div id="dishQuestion5" class="question"><p>Is there space in the dishwasher?</p><div class="buttonContainer"><button class="dishwasherNotFull">YES</button><button class="dishwasherFull">NO</button></div></div>';
  var question5 = '<div id="dishQuestion4" class="question"><p>Are you a super-cool person?</p><div class="buttonContainer"><button class="cool">YES</button><button class="notCool">NO</button></div></div>';

  $(question1).appendTo('.questionBox');

  function toNextQuestion(currentQuestion, nextQuestion) {
    $(currentQuestion).fadeOut(200)
                      .animate({'top': '-40px'}, 200);
    $('.questionBox').contents().remove();
    $(nextQuestion).appendTo('.questionBox')
                   .hide()
                   .animate({'top': '0px'}, 200)
                   .fadeIn(200);
  };

  function toAnswer(currentQuestion) {
    $(currentQuestion).fadeOut(200)
                      .animate({'top': '-40px'}, 400);
    $('.questionBox').contents().remove();
    dishAction();
  }

  $(document.body).on('click', '.addDish', function(){
    dish = $('.newDish').val();

    toNextQuestion('#dishQuestion1', question2);
  });

  $(document.body).on('click', '.dishwasherOn', function(){
    dishwasher.running = true;
    toAnswer('#dishQuestion2');
  });

   $(document.body).on('click','.dishwasherOff', function(){
    dishwasher.running = false;
    toNextQuestion('#dishQuestion2', question3);
  });

  $(document.body).on('click', '.dishwasherClean', function(){
    dishwasher.contentsState = 'clean';
    toNextQuestion('#dishQuestion3', question5);
  });

  $(document.body).on('click', '.dishwasherDirty', function(){
    dishwasher.contentsState = 'dirty';
    if (dishwasher.contents < 10) {
      toNextQuestion('#dishQuestion3', question4);
    }
    toAnswer('#dishQuestion3');
  });

  $(document.body).on('click', '.dishwasherNotFull', function(){
    dishwasher.full = false;
    toAnswer('#dishQuestion4');
  });

  $(document.body).on('click', '.dishwasherFull', function(){
    dishwasher.full = true;
    toAnswer('#dishQuestion4');
  });

  $(document.body).on('click', '.cool', function(){
    coolPerson = true;
    toAnswer('#dishQuestion5');
  });

  $(document.body).on('click', '.notCool', function(){
    coolPerson = false;
    toAnswer('#dishQuestion5');
  });

  function dishAction() {

    if (dishwasher.running) {
      sink.contents.push(dish);
      sink.findInitial();
      sink.theOxfordTreatment();
      dishwasher.contentsState = 'clean';
      $('.questionBox').append('<div class=\'answer\'><p>It\'s alright, was kind of unavoidable. The sink now contains' + properArticle + sink.contents.join(', ') + lastDish + '.</p><div class=\'buttonContainer\'><button class=\'restart\'>WAIT, THERE\'S SOMETHING ELSE!</button></div></div>');
      console.log(sink.contents.length);
      sink.contents.push(lastDish.slice(5));
      deliverAnswer();
      restartCycle();
    }
    else if (dishwasher.running === false && dishwasher.contentsState === 'clean' && dishwasher.contents.length > 0) {
      Array.prototype.push.apply(newCabinet.contents, dishwasher.contents);
      newCabinet.theOxfordTreatment();
      sink.contents.push(dish);
      dishwasher.contents = [];
      dishwasher.contentsState = 'dirty';

      if (coolPerson) {
        Array.prototype.push.apply(newCabinet.contents, dishwasher.contents);
        dishwasher.contents = [];
        newCabinet.findInitial();
        newCabinet.theOxfordTreatment();
        Array.prototype.push.apply(dishwasher.contents, sink.contents);
        sink.contents = [];
        dishwasher.findInitial();
        dishwasher.theOxfordTreatment();
        $('.questionBox').append('<div class=\'answer\'><p>You put ' + newCabinet.contents.join(', ') + newCabinet+ ' into the cabinet and then you also put'  + properArticle + dishwasher.contents.join(', ') + lastDish + ' into the dishwasher. Everyone thinks you\'re intelligent and attractive, you know.</p><div class=\'buttonContainer\'><button class=\'restart\'>WAIT, THERE\'S SOMETHING ELSE!</button></div></div>');
        deliverAnswer();
        restartCycle();
        return;
      }
      $('.questionBox').append('<div class=\'answer\'><p>You put' + properArticle + newCabinet.contents.join(', ') + lastDish + ' into the cabinet. You\'re pretty cool.</p><div class=\'buttonContainer\'><button class=\'restart\'>WAIT, THERE\'S SOMETHING ELSE!</button></div></div>')
      deliverAnswer();
      restartCycle();
    }
    else if (dishwasher.running === false && dishwasher.contentsState === 'dirty' && dishwasher.contents.length >= 10) {
      // Mind you, this is shorthand for the dishwasher being full
      var dishAdded = dish;

      if (dishwasher.full === false) {
        dishwasher.contents.push(dish);
        dishwasher.running = true;
        $('.questionBox').append('<div class=\'answer\'><p>You put the ' + dishAdded + ' into the dishwasher and started that baby up! Super-good job!</p><div class=\'buttonContainer\'><button class=\'restart\'>WAIT, THERE\'S SOMETHING ELSE!</button></div></div>')
        deliverAnswer();
        restartCycle();
      }
      else {
        sink.contents.push(dish);
        dishwasher.running = true;
        $('.questionBox').append('<div class=\'answer\'><p>You leave the ' + dishAdded + ' in the sink and start the dishwasher up. We\'re now on our way to clean!</p><div class=\'buttonContainer\'><button class=\'restart\'>WAIT, THERE\'S SOMETHING ELSE!</button></div></div>')
        deliverAnswer();
        restartCycle();
      }
    }
    else {
      dishwasher.contents.push(dish);
      if (coolPerson && sink.contents.length > 0) {
        Array.prototype.push.apply(dishwasher.contents, sink.contents);
        var newLoad = sink.contents;
        sink.contents = [];

        $('.questionBox').append('<div class=\'answer\'><p>You put the ' + dish + ' into the dishwasher and then you also put ' + newLoad.join(', ') + lastDish + ' into the dishwasher. You have a great sense of style.</p><div class=\'buttonContainer\'><button class=\'restart\'>WAIT, THERE\'S SOMETHING ELSE!</button></div></div>')
        deliverAnswer();
        restartCycle();
        return;
      }
      $('.questionBox').append('<div class=\'answer\'><p>You put the ' + dish + ' into the dishwasher.</p><div class=\'buttonContainer\'><button class=\'restart\'>WAIT, THERE\'S SOMETHING ELSE!</button></div></div>')
        deliverAnswer();
        restartCycle();
    }
  };

  function deliverAnswer() {
    $('.answer').hide().animate({top: '0px'}, 400);
    $('.answer').fadeIn(400);
  };

  function restartCycle() {
    $(document.body).on('click', '.restart', function(){
      $('.answer').fadeOut(400);
      $('.questionBox').contents().remove();
      $(question1).appendTo('.questionBox')
                  .hide()
                  .animate({'top': '0px'}, 400)
                  .fadeIn(400);
    });
  };


};

$(document).ready(dishwasherHelper);