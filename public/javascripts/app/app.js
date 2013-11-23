window.App = {};
$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  window.App.logInModal = $('#myModal').foundation('reveal');

  $('form#newUser input[name=passwordconfirmation]').on('input', passwordCheck);
  $('form#newUser #register').on('click', clickRegister);
  $('#login').on('click', function(e){
    e.preventDefault();
    window.App.logInModal.foundation('reveal', 'open');
    window.App.logInModal.find('input').first().attr('autofocus', true);
  });

  $('#loginBtn').on('click', clickLogin);

  $('#initSetup').on('click', clickSetup);
  $('.teamList').on('click', '.team', selectTeam);
  $('.leagueCat').on('click', showTeams);
  $('.teamList').on('click', '.cancel', cancelTeamSelection);
  // $('.teamList').on('click', '.save', saveTeamSelection);
}


function clickSetup(e){
  $('#firstTimeProfile').remove();
  $('#profileSetup').removeClass('hidden').addClass('active');
}

function selectTeam(e){
  var $this = $(this);
  var $list = $this.closest('.teamList');
  $list.empty();
  $list.append('<div class="row"><div class="large-3 columns"></div></div>');
  $list.children().children().append($this);

  var $text = $('<div class="large-3 columns"></div>');
  $text.append('<textarea name="teamReason" class="reason" placeholder="Why are you a fan?" autofocus="true">');
  $list.children().append($text);

  var $text2 = $('<div class="large-6 columns"></div>');
  $text2.append('<button class="cancel button radius alert small">Cancel</button>');
  $list.children().append($text2);
}

function showTeams(e){
  $(this).children().toggleClass('rotate');
  $(this).next().toggleClass('active');
}

function cancelTeamSelection(e){
  var $button = $(this);
  var league = $button.parent().parent().parent().prev().text().toLowerCase();
  sendAjaxRequest('/teams/' + league, {}, 'post', null, e, function(data){
    var $relList = $button.closest('.teamList');
    $relList.empty();
    _.each(data.teams, function(team){
      var modTeam = team.name.toLowerCase().split(' ').join('_');
      var $team = $('<div>');
      $team.addClass('team');
      $team.append('<img src="../images/' + league.toUpperCase() + '/lgo_' + league + '_' + modTeam + '.png" class=' + modTeam + '>');
      $relList.append($team);
    });
  });
}



