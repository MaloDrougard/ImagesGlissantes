
// save the anvas to jpg if true
var saveOption = true;
var fileName = "arbre-neige.jpg" ;

var img;
var tempPixels;   //

var stop = false;
// hold the algorithm state
var state = 0;
var canvas;


function preload() {
    img = loadImage("../static/"+ fileName);
}

function setup() {

    pixelDensity(1);

    console.log("width: " + $(window).width(), "height: " + $(window).height());
    canvas = createCanvas(1200, 1200);  //$(window).width(), $(window).height() - 10);  // I dont know why we need to -10

    image(img, 0, 0, width, height);

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

function middleLineSort() {

    var i;
    var j;

    for (var l = 0; l < height; l++) {
        for (var c = 0; c < width / 2 - 1; c += 1) {

            // transform line column into index
            i = c * 4 + l * width * 4;
            j = i + 4;
            if (compareRelativeLuminance(i, j) < 0) swap(i, j);
        }

        for (var c = width - 1; c >= width / 2; c -= 1) {

            // transform line colum into index
            i = c * 4 + l * width * 4;
            j = i + 4;
            if (compareRelativeLuminance(i, j) > 0) swap(i, j);
        }

    }
}


function lineColumnSort() {

    var i;
    var j;

    for (var l = 0; l < height; l++) {
        for (var c = 0; c < width - 1; c += 1) {

            // transform line column into index
            i = c * 4 + l * width * 4;
            j = i + 4;
            if (compareRelativeLuminance(i, j) < 0) swap(i, j);
        }

    }


    for (var c = 0; c < width; c++) {
        for (var l = 0; l < height - 1; l += 1) {

            // transform line column into index
            i = c * 4 + l * width * 4;
            j = c * 4 + (l + 1) * width * 4;
            if (compareRelativeLuminance(i, j) < 0) swap(i, j);
        }

    }

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


function keyPressed() {

    stop = !stop;

}


function draw3by3() {
    {
        if (stop == false && state == 1) {

            var isFinished = true;
            var res = true;

            res = bubbleSortLines(0, width / 3 - 1, 0, height * 1 / 3 - 1);
            isFinished = isFinished && res;
            res = bubbleSortLines(width / 3, width * 2 / 3 - 1, 0, height * 1 / 3 - 1);
            isFinished = isFinished && res;
            res = bubbleSortLines(width * 2 / 3, width - 1, 0, height * 1 / 3 - 1);
            isFinished = isFinished && res;

            isFinished = isFinished && res;
            res = bubbleSortLinesDecreasive(0, width / 3 - 1, height * 1 / 3, height * 2 / 3 - 1);
            isFinished = isFinished && res;
            res = bubbleSortLinesDecreasive(width / 3, width * 2 / 3 - 1, height * 1 / 3, height * 2 / 3 - 1);
            isFinished = isFinished && res;
            res = bubbleSortLinesDecreasive(width * 2 / 3, width - 1, height * 1 / 3, height * 2 / 3 - 1);
            isFinished = isFinished && res;

            isFinished = isFinished && res;
            res = bubbleSortLines(0, width / 3 - 1, height * 2 / 3, height - 1);
            isFinished = isFinished && res;
            res = bubbleSortLines(width / 3, width * 2 / 3 - 1, height * 2 / 3, height - 1);
            isFinished = isFinished && res;
            res = bubbleSortLines(width * 2 / 3, width - 1, height * 2 / 3, height - 1);
            isFinished = isFinished && res;

            updatePixels();


            if (isFinished) {
                state = 2;
            }


        } else if (stop == false && state == 2) {
            lineColumnSort();
        }


    }

}


function mySort2() {

    for (var c = 0; c + 1 < width; c += 2) {
        for (var l = 0; l + 1 < height; l += 1) {

            // transform line colum into index
            i = c * 4 + l * width * 4;
            j = i + 4;
            if (compareRelativeLuminance(i, j) < 0) swap(i, j);
        }
    }
    for (var c = 1; c + 1 < width; c += 2) {
        for (var l = 0; l + 1 < height; l += 1) {

            // transform line colum into index
            i = c * 4 + l * width * 4;
            j = i + 4;
            if (compareRelativeLuminance(i, j) < 0) swap(i, j);
        }
    }
    for (var l = 0; l + 1 < width; l += 2) {
        for (var c = 0; c < height; c += 1) {

            // transform line colum into index
            i = c * 4 + l * width * 4;
            j = c * 4 + (l + 1) * width * 4;
            if (compareRelativeLuminance(i, j) < 0) swap(i, j);
        }
    }

    for (var l = 1; l + 1 < width; l += 2) {
        for (var c = 0; c < height; c += 1) {

            // transform line colum into index
            i = c * 4 + l * width * 4;
            j = c * 4 + (l + 1) * width * 4;
            if (compareRelativeLuminance(i, j) < 0) swap(i, j);
        }
    }


}


function mySort() {

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

var count = 0;

function draw() {


    if (!stop) {

        var isFinished = mySort();

        if ( (!isFinished)  && count == 10 && saveOption == true ) {
            saveCanvas(canvas, "p-" + fileName , 'jpg');
            count = 0;
        }
        count++;


    }
    updatePixels();


}


