$ ->
  $("#new-ragot textarea").on "keypress" , (event) ->
    if event.shiftKey && event.which == 13
      $("#new-ragot").submit()
      false

  $("#new-ragot").on "submit", (event) ->
    $.ajax
      type : "POST"
      url : "/ragots"
      data : $("#new-ragot").serialize()
      beforeSend : (xhr, settings) ->
        $("#ragot-submit").addClass "onrequest"
      success : (response, state, xhr) ->
        if xhr.status == 201
          if $("#new-ragot textarea").hasClass "input-error"
            $("#new-ragot textarea").removeClass "input-error"
            $("#submit-ragot").html "Ragoter"
          $("#new-ragot textarea").val ""
          $("#ragots").prepend "<li>" + response.ragot.message + "</li>"
      error : (xhr, errorType, error) ->
        if xhr.status == 422
          res = JSON.parse xhr.response
          $("#new-ragot textarea").addClass "input-error"
          $("#submit-ragot").html "Ragoter (Erreur "+xhr.status+" : "+res.error+")"
        else if xhr.status == 500
          $("#submit-ragot").html "Ragoter (Erreur serveur)"
      complete : (xhr, status) ->
        $("#ragot-submit").removeClass "onrequest"

    event.preventDefault()
    false
