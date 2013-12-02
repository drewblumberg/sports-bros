function getValue(selector, fn){
  var value = $(selector).val();
  value = value.trim();
  $(selector).val('');

  if(fn){
    value = fn(value);
  }

  return value;
}

function passwordCheck(e){
  var pass = $('input[name="password"]').val();
  var conf = $(this).val();
  var formName = 'form#' + $(this).parent().parent().parent().attr('id');
  var $button = $(formName + ' button');

  if(pass === conf){
    $button.prop('disabled', false);
  } else {
    $button.prop('disabled', true);
  }
}

function parseUpperCase(string){
  return string.toUpperCase();
}

function parseLowerCase(string){
  return string.toLowerCase();
}

function formatCurrency(number){
  return '$' + number.toFixed(2);
}

function cFL(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function sendAjaxRequest(url, data, verb, altVerb, event, successFn){
  var options = {};
  options.url = url;
  options.type = verb;
  options.data = data;
  options.success = successFn;
  options.error = function(jqXHR, status, error){console.log(error);};

  if(altVerb)
    if(typeof data === 'string')
      options.data += '&_method=' + altVerb;
    else
      options.data._method = altVerb;

  $.ajax(options);
  if(event) event.preventDefault();
}

function checkForErrors(data, msg, redirectPath){
  $('#errorMsg').empty();

  if(redirectPath && data.status === 'ok') {
    window.location.replace(redirectPath);
  } else if(data.status !== 'ok'){
    $('#errorMsg').append('<div class="error">' + data.status + ' Please try again.</div>');
  } else {
    $('#errorMsg').append('<div class="successful">' + msg + '</div>');
  }
}
