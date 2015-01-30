var dishwasher = {running: false, contentsState: 'dirty', contents: ['mug','mug','mug','mug','mug','mug','mug','mug','mug','mug','mug','mug',]},
    newCabinet = {contents: []},
    sink = {contents: []};

var dishAdded, personState, dishwasherHasRoom;

var restartCycle = function() {
  $('.restart').click(function(){
    $('.answer').fadeOut(400);
    $('.answer').remove();
    $('.dishQuestion1').animate({top: '0px'}, 400);
    $('.dishQuestion1').fadeIn(400);
  });
};

function dishAction(gaslighter,dish) {
  if (dishwasher.running) {
    sink.contents.push(dish);
    dishwasher.contentsState = 'clean';
    $('.questionBox').append('<div class="answer"><p>It\'s alright, was kind of unavoidable. The sink now contains a/an ' + sink.contents.join(', ') + '.</p><div class="buttonContainer"><button class="restart">WAIT, THERE\'S SOMETHING ELSE!</button></div></div>')
    $('.answer').hide().animate({top: '0px'}, 400);
    $('.answer').fadeIn(400);
    restartCycle();
  }
  else if (dishwasher.running === false && dishwasher.contentsState === 'clean') {
    Array.prototype.push.apply(newCabinet.contents, dishwasher.contents);
    sink.contents.push(dish);
    dishwasher.contents = [];
    dishwasher.contentsState = 'dirty';

    if (gaslighter === 'Totally Awesome Person') {
      Array.prototype.push.apply(dishwasher.contents, sink.contents);
      sink.contents = [];
      return alert('You put a ' + newCabinet.contents.join(', ') + ' into the cabinet and then you also put a/an ' + dishwasher.contents.join(', ') + ' into the dishwasher. Everyone thinks you\'re intelligent and attractive, you know.');
    }

    return alert('You put a ' + newCabinet.contents.join(', ') + ' into the cabinet. You\'re pretty cool.');
  }
  else if (dishwasher.running === false && dishwasher.contentsState === 'dirty' && dishwasher.contents.length >= 10) {
    // Mind you, this is shorthand for the dishwasher being full
    dishwasherHasRoom = confirm('Is it possible to put your dish into the dishwasher?');
    if (dishwasherHasRoom) {
      dishwasher.contents.push(dish);
      dishwasher.running = true;
      return alert('You put ' + dish + ' into the dishwasher and started that baby up! Super-good job!');
    }
    else {
      sink.contents.push(dish);
      dishwasher.running = true;
      $('.questionBox').append('<div class="answer"><p>You leave ' + dish + ' in the sink and start the dishwasher up. We\'re now on our way to clean!</p><div class="buttonContainer"><button class="restart">WAIT, THERE\'S SOMETHING ELSE!</button></div></div>')
    }
  }
  else {
    dishwasher.contents.push(dish);
    if (gaslighter === 'Totally Awesome Person' && sink.contents.length > 0) {
      Array.prototype.push.apply(dishwasher.contents, sink.contents);
      var newLoad = sink.contents;
      sink.contents = [];
      return alert('You put ' + dish + ' into the dishwasher and then you also put ' + newLoad.join(', ') + ' into the dishwasher. You have a great sense of style.');
    }
    return alert('You put a/an ' + dish + ' into the dishwasher.');
  }
};

// Thus begins the interaction with the markup...


$('.dishQuestion2').hide();
$('.dishQuestion3').hide();
$('.dishQuestion4').hide();
$('.dishQuestion5').hide();

$('.addDish').click(function(){
  dishAdded = $('.newDish').val();
  $('.dishQuestion1').fadeOut(400);
  $('.dishQuestion2').animate({top: '0px'}, 400);
  $('.dishQuestion2').fadeIn(400);
});

$('.dishwasherOn').click(function(){
  dishwasher.running = true;
  $('.dishQuestion2').fadeOut(400);
  dishAction(personState,dishAdded);
});

$('.dishwasherOff').click(function(){
  dishwasher.running = false;
  $('.dishQuestion2').fadeOut(400);
  $('.dishQuestion3').animate({top: '0px'}, 400);
  $('.dishQuestion3').fadeIn(400);
});

$('.dishwasherClean').click(function(){
  dishwasher.contentsState = "clean";
  $('.dishQuestion3').fadeOut(400);
  $('.dishQuestion4').animate({top: '0px'}, 400);
  $('.dishQuestion4').fadeIn(400);
});

$('.dishwasherDirty').click(function(){
  dishwasher.contentsState = "dirty";
  $('.dishQuestion3').fadeOut(400);
  $('.dishQuestion4').animate({top: '0px'}, 400);
  $('.dishQuestion4').fadeIn(400);
});

$('.cool').click(function(){
  personState = 'Totally Awesome Person';
  dishAction(personState,dishAdded);
});

$('.notCool').click(function(){
  personState = 'Okay Person';
  $('.dishQuestion4').fadeOut(400);
  dishAction(personState,dishAdded);
});
