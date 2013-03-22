#= require zepto
#= require_self

$ ->
  $("#new-ragot textarea").on "keypress" , (event) ->
    if event.shiftKey && event.which == 13
      $("#new-ragot").submit()
      false

  $("#new-ragot").on "submit", (event) ->
    submit_button = $('#new-ragot button[type="submit"]')
    $.ajax
      type : "POST"
      url : "/ragots"
      data : $("#new-ragot").serialize()
      beforeSend : (xhr, settings) ->
        submit_button.addClass "onrequest"
      success : (response, state, xhr) ->
        if xhr.status == 201
          if $("#new-ragot textarea").hasClass "input-error"
            $("#new-ragot textarea").removeClass "input-error"
            submit_button.html "Ragoter"
          $("#new-ragot textarea").val ""
          $("#ragots").prepend "<li class=\"new-ragot-item\" >" + response.ragot.message + "</li>"
      error : (xhr, errorType, error) ->
        if xhr.status == 422
          res = JSON.parse xhr.response
          $("#new-ragot textarea").addClass "input-error"
          submit_button.html "Ragoter (Erreur "+xhr.status+" : "+res.error+")"
        else if xhr.status == 500
          submit_button.html "Ragoter (Erreur serveur)"
      complete : (xhr, status) ->
        submit_button.removeClass "onrequest"

    event.preventDefault()
    false
