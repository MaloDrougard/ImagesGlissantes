
var fileName1 = "head1.jpg";
var fileName2 = "head1-reverse.jpg";

var img1;
var img2;

var imgs = [] ;

function preload() {
    img1 = loadImage("../static/" + fileName1);
    img2 = loadImage("../static/" + fileName2   );
}

function setup() {

   canvas = createCanvas( 1920  , 1080  ); //img.width, img.height);  //$(window).width(), $(window).height() - 10);  // I dont know why we need to -10

   imgWidth = width/4;
   imgHeight = height/2;

   image(img1, 0,0, imgWidth, imgHeight);

   image(img1, imgWidth,0, imgWidth, imgHeight);

   image(img1, 2*imgWidth,0, imgWidth, imgHeight);

   image(img1, 3*imgWidth,0, imgWidth, imgHeight);

   image(img2, 0, imgHeight, imgWidth, imgHeight);

   image(img2, imgWidth, imgHeight, imgWidth, imgHeight);

   image(img2, 2*imgWidth, imgHeight, imgWidth, imgHeight);

   image(img2, 3*imgWidth, imgHeight, imgWidth, imgHeight);


}

function draw() {
    /*
  fill(color(20,50,202))
  if (mouseIsPressed){
    ellipse(mouseX, mouseY, 80, 80);
  }

*/
}