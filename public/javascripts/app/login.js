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

    var hiddenUl = '<ul id="drop1" class="f-dropdown" data-dropdown-content><li><a href="/users/' + result.id + '">View Profile</a></li><li><a href="/users/' + result.id + '/edit">Update Profile</a></li><li><a href="/logout" id="logout">Logout</a></li></ul>'
    $ul.append('<li><a href="#" data-dropdown="drop1"><i class="fi-widget"></i></a>' + hiddenUl + '</li>');
  } else {
    $('#modalErr').empty();
    $('#modalErr').append('<div class="error">' + result.status + '</div>');
    $('#modalErr').css('margin-bottom', '10px');
  }
}