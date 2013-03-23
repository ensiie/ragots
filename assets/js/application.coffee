#= require zepto
#= require_self

$ ->
  socket = io.connect "http://localhost:3000"
  socket.on 'ragot', (ragot) ->
    add_new_ragot ragot
  socket.on 'error', (err) ->
    $("#new-ragot textarea").addClass "input-error"
    $('#new-ragot button[type="submit"]').html "Ragoter (Erreur : "+err.name+")"
    
  $("#new-ragot textarea").on "keypress" , (event) ->
    if event.shiftKey && event.which == 13
      $("#new-ragot").submit()
      false

  $("#new-ragot").on "submit", (event) ->
    submit_button = $('#new-ragot button[type="submit"]')
    submit_button.addClass "onrequest"
    socket.emit("ragot", { "message" : $('#new-ragot [name=message]').val() })
    submit_button.removeClass "onrequest"
    event.preventDefault()

add_new_ragot = (ragot) ->
  submit_button = $('#new-ragot button[type="submit"]')
  if $("#new-ragot textarea").hasClass "input-error"
    $("#new-ragot textarea").removeClass "input-error"
    submit_button.html "Ragoter"
  $("#new-ragot textarea").val ""
  item = $("<li class=\"ragot\">" + ragot.message + "</li>")
  item.css "height", "0"
  $("#ragots").prepend item
  item.animate
    height: "1.5em"
    500, 'ease-out'
