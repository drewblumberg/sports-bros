window.App = {};
$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  window.App.logInModal = $('#myModal').foundation('reveal');

  // Login and register
  $('form#newUser input[name=passwordconfirmation]').on('input', passwordCheck);
  $('form#newUser #register').on('click', clickRegister);
  $('#login').on('click', function(e){
    e.preventDefault();
    window.App.logInModal.foundation('reveal', 'open');
    window.App.logInModal.find('input').first().attr('autofocus', true);
  });
  $('#loginBtn').on('click', clickLogin);

  // Profile Page
  $('#initSetup').on('click', clickSetup);
  $('.teamList').on('click', '.team', selectTeam);
  $('.leagueCat').on('click', showTeams);
  $('#picUpload').on('change', function(){readURL(this);});
  $('#savePic').on('click', saveUploadedPic);
  $('.teamList').on('click', '.cancel', cancelTeamSelection);
  $('.teamList').on('click', '.save', saveTeamSelection);
  $('#finishSetup').on('click', finishSetup);

  // Users index and Friendships
  $('#bro').on('click', addBro);
  $('.decline').on('click', rejectBro);
  $('.accept').on('click', acceptBroship);
}

function addBro(e){
  var userId = $('#profileContainer').data('id');
  var $button = $(this);

  sendAjaxRequest('/users/createPendingFriend', {id: userId}, 'post', 'put', e, function(data){
    if(data.status === 'ok'){
      changeBroButton($button);
    } else {
      alert('There was an error adding a pending friend.');
    }
  });
}

function rejectBro(e){
  var $button = $(this);
  var userId = $button.data('id');

  sendAjaxRequest('/users/declineBro', {id: userId}, 'post', 'put', e, function(data){
    if(data.status === 'ok'){
      broshipRejected($button);
    } else {
      alert('There was an error rejecting this bro.');
    }
  });
}

function acceptBroship(e){
  var $button = $(this);
  var userId = $button.data('id');

  sendAjaxRequest('/relationships/create', {id: userId}, 'post', null, e, function(data){
    if(data.status === 'ok'){
      sendAjaxRequest('/users/declineBro', {id: userId}, 'post', 'put', e, function(data){
        if(data.status === 'ok'){
        } else {
          alert('Fail!');
        }
      });

      sendAjaxRequest('/users/addBroship', {id: userId, relId: data.relId}, 'post', 'put', null, function(data){
        if(data.status !== 'ok'){
          alert('Failed to add relationship');
        }
      });

      sendAjaxRequest('/users/addBroship', {relId: data.relId}, 'post', 'put', null, function(data2){
        if(data2.status !== 'ok'){
            alert('Failed to add relationship');
        } else {
          broshipFinished($button);
        }
      });
    } else {
      alert('Failed!');
    }
  });
}

function broshipFinished($button){
  $button.next().after('<button disabled=true class="button radius small success">Accepted!</button>');
  $button.next().remove();
  $button.remove();
}

function broshipRejected($button){
  $button.next().after('<button disabled=true class="button radius small alert">Declined!</button>');
  $button.next().remove();
  $button.remove();
}

function changeBroButton($button){
  $button.after('<button disabled=true class="button radius small">Pending Bro</button>');
  $button.remove();
}



