toReadableDate = function(date) {
  return date.toLocaleDateString("fr") + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
}
