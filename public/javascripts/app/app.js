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
  // $('#logout').on('click', clickLogout);
}

// function clickLogout(e){
//   var url = '/logout';
//   var data = {};
//   sendAjaxRequest(url, data, 'post', 'delete', null, function(data){
//     navOnLogout(data);
//   })
// }




