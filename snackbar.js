const snackbar = document.getElementById("snackbar");

function showSnackbar(message) {
  snackbar.innerHTML = message;
  snackbar.className = "show-snackbar";

  setTimeout(function() {
    snackbar.className = snackbar.className.replace("show-snackbar", "");
    snackbar.className = "hide-snackbar";
  }, 3000);
}

function hideSnackbar() {
  snackbar.className = "hide-snackbar";
}
