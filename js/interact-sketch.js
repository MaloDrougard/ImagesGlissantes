
function setup() {
  createCanvas($(document).width(), $(document).height() );
}

function draw() {
  fill(color(120,250,102))
  if (mouseIsPressed){
    ellipse(mouseX, mouseY, 80, 80);
  }

}