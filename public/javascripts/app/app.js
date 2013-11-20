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
}

function passwordCheck(e){
  var pass = $('input[name="password"]').val();
  var conf = $(this).val();
  var $button = $('form#newUser button');

  if(pass === conf){
    $button.prop('disabled', false);
  } else {
    $button.prop('disabled', true);
  }
}

function clickRegister(e){
  var $form = $('form#newUser');
  var url = $form.attr('action');
  var data = $form.serialize();
  console.log(data);
  sendAjaxRequest(url, data, 'post', null, e, function(data, status, jqXHR){
    checkForErrors(data);
  });

  e.preventDefault();
}

function clickLogin(e){
  var url = $(this).parent().parent().parent().attr('action');
  var data = $('form#loginUser').serialize();
  sendAjaxRequest(url, data, 'post', 'put', e, function(data, status, jqXHR){
    htmlUpdateLoginStatus(data);
  });

  e.preventDefault();
}

function htmlUpdateLoginStatus(result){
  if(result.status === 'ok') {
    window.App.logInModal.foundation('reveal', 'close');
    var $ul = $('ul#auth');
    $ul.empty();
    $ul.removeAttr('id').attr('id', 'signedIn');
    $ul.append('<li><a href="/users/' + result.id + '">' + result.email + '</a></li>');

    var hiddenUl = '<ul id="drop1" class="f-dropdown" data-dropdown-content><li><a href="/users/' + result.id + '">View Profile</a></li><li><a href="/users/' + result.id + '/edit">Update Profile</a></li><li><a href="/logout">Logout</a></li></ul>'
    $ul.append('<li><a href="#" data-dropdown="drop1"><i class="fi-widget"></i></a>' + hiddenUl + '</li>');
  }
}


