/* Function to Display Searchbox */

function searchbox(){
  var box = document.getElementById("search-box");

  if (box.style.opacity === "1") {
    box.style.opacity = "0";
    box.style.pointerEvents = "none";
  } else {
    box.style.opacity = "1";
    box.style.pointerEvents = "auto";
  }
}

/* Function to switch Play/Pause Icon */

var on = 0;

function swapicon() {
  var ico = document.getElementById("play");
  if ( on == 1){
    ico.src = "assets/img/icon-play.svg";
    on = 0;
  } else {
    ico.src = "assets/img/icon-pause.svg";
    on = 1;
  }
}
