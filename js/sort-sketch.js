// save the canvas to jpg if true
var saveOption = false;
var fileName = "Selection/p1.jpg";

var img;
var tempPixels;   //

var stop = false;
// hold the algorithm state
var state = 0;
var canvas;


function preload() {
    img = loadImage("../static/" + fileName);
}

function setup() {

    pixelDensity(1);

    console.log("width: " + $(window).width(), "height: " + $(window).height());



    canvas = createCanvas(img.width, img.height);  //$(window).width(), $(window).height() - 10);  // I dont know why we need to -10

    image(img, 0, 0, width, height);

    TestDeduceLineColumn();

    // windows pixels
    loadPixels();
    tempPixels = new Uint8ClampedArray(pixels.length);

    saveCanvas(canvas, "p-" + fileName, 'jpg');
    state = 1;

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


// sort pixel line by line using bubble sort
// start, end  inclusive
// return true if the line is completely sorted
function bubbleSortLines(startColumn, endColum, startLine, endLine) {
    var i;
    var j;

    var hasSwap = false;

    for (var l = startLine; l <= endLine; l++) {
        for (var c = startColumn; c <= endColum - 1; c += 1) { // only columns needs -1 because we sort on columns
            // transform line column into index
            i = c * 4 + l * width * 4;
            j = i + 4;
            if (compareRelativeLuminance(i, j) < 0) {
                swap(i, j);
                hasSwap = true;

            }
        }
    }

    return !hasSwap;
}


// sort pixel line by line using bubble sort
// start, end  inclusive
function bubbleSortLinesDecreasive(startColumn, endColum, startLine, endLine) {
    var i;
    var j;
    var hasSwap = false;

    for (var l = startLine; l <= endLine; l++) {
        for (var c = startColumn; c <= endColum - 1; c += 1) { // only columns needs -1 because we sort on columns
            // transform line colum into index
            i = c * 4 + l * width * 4;
            j = i + 4;
            if (compareRelativeLuminance(i, j) > 0) {// here is the only change
                swap(i, j);
                hasSwap = true;
            }
        }
    }

    return !hasSwap;
}


// ch res; eck if the index is pixels
function checkIndex(idx) {
    var r = true;
    if (idx < 0 || idx > pixels.length - 1) {
        Console.log("Idx: " + i + " is no in pixels!");
        r = false;
    }
    return r;

}

function lineSort() {

    var i;
    var j;

    for (var l = 0; l < height; l++) {
        for (var c = 0; c < width - 1; c += 1) {

            // transform line colum into index
            i = c * 4 + l * width * 4;
            j = i + 4;
            if (compareRelativeLuminance(i, j) < 0) swap(i, j);
        }

    }
}


// return 0 if equal
// return 1 if  i < j
// return -1 + j > i
function compareRelativeLuminance(i, j) {

    var r = -1;

    var l1 = 0.21 * pixels[i] + 0.71 * pixels[i + 1] + 0.72 * pixels[i + 2];
    var l2 = 0.21 * pixels[j] + 0.71 * pixels[j + 1] + 0.72 * pixels[j + 2];

    if (l1 > l2) {
        r = -1;
    } else if (l1 == l2) {
        r = 0;
    } else {
        r = 1;
    }

    return r;
}


function keyTyped() {

    if (key == ' ') {
        stop = !stop;

    } else if (key == 's') {
        saveCanvas(canvas, "p-" + fileName, 'jpg');
    }

}


function myColumnsSort() {
    hasSwap = false;
    for (var c = 0; c < width; c += 1) {
        for (var l = 0; l + 1 < height; l += 2) {

            // transform line colum into index
            i = c * 4 + l * width * 4;
            j = c * 4 + (l + 1) * width * 4;
            if (compareRelativeLuminance(i, j) < 0) {
                swap(i, j);
                hasSwap = true;
            }
        }
    }

    for (var c = 0; c + 1 < width; c += 1) {
        for (var l = 1; l + 2 < height; l += 2) {


            // transform line colum into index
            i = c * 4 + l * width * 4;
            j = c * 4 + (l + 1) * width * 4;
            if (compareRelativeLuminance(i, j) < 0) {
                swap(i, j);
                hasSwap = true;

            }
        }
    }

    return !hasSwap;
}

function myLinesColumnsSort() {

    isFinished = false;

    isFinished = myLineSort();
    isFinished = isFinished & myColumnsSort();

    return isFinished;
}


function myLineSort() {

    var hasSwap = false;

    for (var c = 0; c + 1 < width; c += 2) {
        for (var l = 0; l + 1 < height; l += 1) {

            // transform line colum into index
            i = c * 4 + l * width * 4;
            j = i + 4;
            if (compareRelativeLuminance(i, j) < 0) {
                swap(i, j);
                hasSwap = true;
            }
        }
    }

    for (var c = 1; c + 1 < width; c += 2) {
        for (var l = 0; l + 1 < height; l += 1) {

            // transform line colum into index
            i = c * 4 + l * width * 4;
            j = i + 4;
            if (compareRelativeLuminance(i, j) < 0) {
                swap(i, j);
                hasSwap = true;
            }
        }
    }
    return !hasSwap;
}


function Sort3By3() {

    for (var c = 0; i + 2 < width; i += 3) {
        for (var l = 0; l + 2 < height; l += 3) {

        }
    }

}


// Compute the distance between two pixels
function Distance(i, j) {



}

// Deduce the Column coordinate of the pixel its the index.
// The top left corner is the pixels index 0 and 4 array elements by pixel is used
function DeduceColumn(pixelIdx) {

    // get the index without as if one element for each pixel will be used
    var i = (pixelIdx - (pixelIdx % 4) ) / 4;

    var c = i % width ;
    return c;
}

// Deduce the Column coordinate of the pixel its the index.
// The top left corner is the pixels index 0 and 4 array elements by pixel is used
function DeduceLine(pixelIdx) {

    // get the index without as if one element for each pixel will be used
    var i = (pixelIdx - (pixelIdx % 4) ) / 4;

    var c = i % width ;
    var l = (i -c) / width;
    return l;
}

function TestDeduceLineColumn() {

    var temp = 0;
    console.log(temp + ": l=" + DeduceLine(temp) + ", c=" + DeduceColumn(temp)  );
    var temp = 10;
    console.log(temp + ": l=" + DeduceLine(temp) + ", c=" + DeduceColumn(temp)  );
    var temp = 10 * 4;
    console.log(temp + ": l=" + DeduceLine(temp) + ", c=" + DeduceColumn(temp)  );
    var temp = 400 * 4 * width;
    console.log(temp + ": l=" + DeduceLine(temp) + ", c=" + DeduceColumn(temp)  );
    var temp = 400 * 4 * width + 3 * 4;
    console.log(temp + ": l=" + DeduceLine(temp) + ", c=" + DeduceColumn(temp)  );
    var temp =  4 * width * height -4 ;
    console.log(temp + ": l=" + DeduceLine(temp) + ", c=" + DeduceColumn(temp)  );
    var temp =  4 * width * height ;
    console.log(temp + ": l=" + DeduceLine(temp) + ", c=" + DeduceColumn(temp)  );

}

var count = 0;

function draw() {


    if (!stop) {

        var isFinished = myLinesColumnsSort();

        if ((!isFinished) && count == 10 && saveOption == true) {
            saveCanvas(canvas, "p-" + fileName, 'jpg');
            count = 0;
        }
        count++;


    }

    pixels[19] = 0;

    updatePixels();


}


