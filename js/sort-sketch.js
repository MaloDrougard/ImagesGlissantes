var img;
var tempPixels;   //
var stop = false;

function preload() {
    img = loadImage("../static/IMG_1721.jpg");
}

function setup() {

    pixelDensity(1);

    console.log("width: " + $(window).width(), "height: " + $(window).height());
    createCanvas($(window).width(), $(window).height() - 10);  // I dont know why we need to -10

    image(img, 0, 0, width, height);

    // windows pixels
    loadPixels();
    tempPixels = new Uint8ClampedArray(pixels.length);


}

// swap i and j pixel of pixels
function swap(i, j) {

    var p1r = 0;
    var p1g = 0;
    var p1b = 0;
    var p1a = 0;

    var p2r = 0;
    var p2g = 0;
    var p2b = 0;
    var p2a = 0;


    p1r = pixels[i];
    p1g = pixels[i + 1];
    p1b = pixels[i + 2];
    p1a = pixels[i + 3];

    p2r = pixels[j];
    p2g = pixels[j + 1];
    p2b = pixels[j + 2];
    p2a = pixels[j + 3];

    pixels[i] = p2r;
    pixels[i + 1] = p2g;
    pixels[i + 2] = p2b;
    pixels[i + 3] = p2a;

    pixels[j] = p1r;
    pixels[j + 1] = p1g;
    pixels[j + 2] = p1b;
    pixels[j + 3] = p1a;

}

function lineSort() {

    var i;
    var j;

    for(var l = 0; l < height; l++ ) {
        for (var c = 0; c < width - 1; c += 1) {

            // transform line colum into index
            i = c * 4 + l*width*4;
            j = i + 4;
            if (compareRelativeLuminance(i, j) == j) swap(i, j);
        }

    }

}



function compareRelativeLuminance(i,j){

    var r = -1;

    var l1 = 0.21 *  pixels[i] + 0.71 * pixels[i+1] + 0.72 * pixels[i+2];
    var l2 = 0.21 *  pixels[j] + 0.71 * pixels[j+1] + 0.72 * pixels[j+2];

    if(l1 >= l2) {
        r = i;
    }else {
        r = j;
    }

    return r;
}


function keyPressed() {

    stop = !stop;

}

function draw() {
    {
        if (stop == false) {

            loadPixels();
            lineSort()                       ;

            updatePixels();
        }
    }


}
