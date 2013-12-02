function clickRegister(e){
  var $form = $('form#newUser');
  var url = $form.attr('action');
  var data = $form.serialize();
  console.log(data);
  sendAjaxRequest(url, data, 'post', null, e, function(data, status, jqXHR){
    checkForErrors(data, 'Your account was created successfully! Please log in.', '/');
  });

  e.preventDefault();
}