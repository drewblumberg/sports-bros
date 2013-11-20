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