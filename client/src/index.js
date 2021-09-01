$(document).ready(function() {
  var submitHandler = function(text, successCB) {
    $.ajax({
      method: 'POST',
      url: '/upload_json',
      contentType: 'application/json',
      data: text,
      success: successCB,
      error: function (error) {
        console.error('Error sending data', error);
      }
    })
  }
  $('form').on('submit', function(e) {
    e.preventDefault();
    var text = $('#data-input').val();
    submitHandler(text, function() {
      $('#data-input').val('')
      console.log('POST is successful');
      $('body').append('<a href="/csv_report" download>Click HERE to download report</a>');
    })
  });
});
