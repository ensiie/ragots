toReadableDate = function(date) {
  var day = date.getDay() < 10 ? "0" + date.getDay() : date.getDay()
  var month = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()
  var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
  var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()

  return day + "/" + month + "/" + date.getFullYear() 
    + " " + hours + ":" + minutes + ":" + seconds
};
