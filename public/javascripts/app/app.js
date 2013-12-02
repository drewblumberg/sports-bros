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

  // Update user
  $('form#editUser input[name=passwordconfirmation]').on('input', passwordCheck);
  $('#updateUser').on('click', updateUser);
}

function updateUser(e){
  var $form = $('form#editUser');
  var url = $form.attr('action');
  var data = $form.serialize();
  console.log(data);
  sendAjaxRequest(url, data, 'post', 'put', e, function(data, status, jqXHR){
    checkForErrors(data, 'Your account was successfully updated!');
  });

  e.preventDefault();
}





