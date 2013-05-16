#= require zepto
#= require_self

$ ->
  socket = io.connect document.URL
  socket.on 'ragot', (ragot) ->
    add_new_ragot ragot
    
  $("#new-ragot textarea").on "keypress" , (event) ->
    if event.shiftKey && event.which == 13
      $("#new-ragot").submit()
      false

  $("#new-ragot").on "submit", (event) ->
    submit_button = $('#new-ragot button[type="submit"]')
    $.ajax
      url: '/ragots'
      type: "POST"
      data:
        ragot:
          message: $('#new-ragot [name="ragot[message]"]').val()
      beforeSend: (xhr, settings) ->
        submit_button.addClass "onrequest"
      success: (data, status, xhr) ->
        $("#new-ragot textarea").val ""
      error: (xhr, errorType, status) ->
        $("#new-ragot textarea").addClass "input-error"
        $('#new-ragot button[type="submit"]').html "Ragoter (Erreur : "+xhr.status+")"
      complete: (xhr, status) ->
        submit_button.removeClass "onrequest"
    event.preventDefault()

add_new_ragot = (ragot) ->
  submit_button = $('#new-ragot button[type="submit"]')
  if $("#new-ragot textarea").hasClass "input-error"
    $("#new-ragot textarea").removeClass "input-error"
    submit_button.html "Ragoter"
  item = $("<li class=\"ragot\">" + ragot.message + "</li>")
  item.css "height", "0"
  $("#ragots").prepend item
  item.animate
    height: "1.5em"
    500, 'ease-out'
