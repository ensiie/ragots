toReadableDate = function(date) {
  var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var month = date.getMonth() < 9 ? "0" + (date.getMonth()+1) : date.getMonth()+1;
  var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

  return day + "/" + month + "/" + date.getFullYear()
    + " " + hours + ":" + minutes + ":" + seconds
};
