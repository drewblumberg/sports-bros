function clickSetup(e){
  $('#firstTimeProfile').remove();
  $('#profileSetup').removeClass('hidden').addClass('active');
}

function finishSetup(e){
  var name = $('input[name="name"]').val();
  var location = $('input[name="location"]').val();
  var birthday = $('input[name="birthday"]').val();
  var userId = $('#profileSetup').data('userid');
  var url = '/users/' + userId + '/finishSetup';
  sendAjaxRequest(url, {name: name, location: location, birthday: birthday, isSetup: true}, 'post', 'put', e, function(data){
    if(data.status === 'ok'){
      checkForErrors(data, 'Your profile was successfully saved! Click the button below to go to your new profile!');

      $('#profileSetup').empty();
      $('#profileSetup').append('<div class="row"><div class="large-4 large-offset-4 columns"><a class="button radius success expand" href="/users/' + userId + '" >Go To Profile</a></div></div>');
    } else {
      checkForErrors(data);
    }
  });
}

function selectTeam(e){
  var $this = $(this);
  var $list = $this.closest('.teamList');
  var sport = $list.data('sport');
    var league = $list.data('league');

  $list.empty();
  $list.append('<div class="row"><div class="large-3 columns"></div></div>');
  $list.children().children().append($this);

  var $text = $('<div class="large-3 columns"></div>');
  $text.append('<textarea name="teamReason" class="reason" placeholder="Why are you a fan?" autofocus="true">');
  $list.children().append($text);

  var $text2 = $('<div class="large-6 columns"></div>');
  $text2.append('<button class="save button radius success small">Save</button>');
  $text2.append('<button class="cancel button radius alert small">Cancel</button>');
  $list.children().append($text2);

  var $text3 = $('<div class="row"><div class="large-3 columns"></div></div>');
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

function saveTeamSelection(e){
  var $button = $(this);
  var $leagueCat = $button.parent().parent().parent().prev();
  var url = '/users/' + $('#profileSetup').data('userid') + '/newFavTeam';
  var teamName = $button.parent().siblings().first().children().children().attr('class');
  var teamReason = $button.parent().prev().children().val();
  sendAjaxRequest(url, {teamName: teamName,  teamReason: teamReason, league: $leagueCat.text().toLowerCase()}, 'post', 'put', e, function(data){
    if(data.status === 'User Saved'){
      $leagueCat.trigger('click');
      $leagueCat.removeClass('leagueCat').addClass('catDone');
    } else {
      alert('User not saved!');
    }
  });

}

function readURL(input){
  if(input.files && input.files[0]){
    var reader = new FileReader();
    reader.onload = function(e){
      $('#profilePic').attr('src', e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  }
}

function saveUploadedPic(e){
  var userId = $('#profileSetup').data('userid');
  var path = $('#picUpload').val();
  sendAjaxRequest('/upload', {path: path, userId: userId}, 'post', null, e, function(data){
    alert(data.status);
    console.log(data.err);
  });
}