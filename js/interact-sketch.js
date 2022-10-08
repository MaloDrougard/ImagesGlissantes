
function setup() {
  createCanvas($(document).width(), $(document).height() );
}

function draw() {
  fill(color(20,50,202))
  if (mouseIsPressed){
    ellipse(mouseX, mouseY, 80, 80);
  }

}