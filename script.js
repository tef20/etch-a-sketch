// To add: 
//  - select your own colour
//  - erase - turn cells white
//  - click and hold option vs constant stream?
//  - connect radio return values to function names to simplify getNewCol function
//  - separate button for resetting cells / editing grid dimensions 
//  - improve asthetics

canvas = document.getElementById('canvas');


// set grid

patchesInRow = 16;

setGrid(patchesInRow);

function setGrid (gridSideLength) {
    canvas.setAttribute("style", `grid-template-rows: repeat(${gridSideLength}, 1fr`);
    canvas.setAttribute("style", `grid-template-columns: repeat(${gridSideLength}, 1fr`);
    
    numberOfPatches = gridSideLength ** 2;

    for (let i = 0; i < numberOfPatches; i++) {
        const newPatch = document.createElement('div');
        newPatch.className = 'patch';
        newPatch.style.border = '1px solid black';
        newPatch.style.backgroundColor = '#FFFFFF';
        newPatch.addEventListener('mouseenter', colourCell);
        canvas.appendChild(newPatch);
    }
}


// set colour

function colourCell (e) {
    paintStyle = document.querySelector('input[name="paintStyle"]:checked').value;
    oldColour = e.target.style.backgroundColor;
    e.target.style.backgroundColor = getNewColor(paintStyle, oldColour);
}

function getNewColor (paintStyle, currentCellColour) {
    if (paintStyle === 'rainbow') {
        return getRainbowCol(); 
    } else if (paintStyle === 'shade') {
        return getIncrementedShade(currentCellColour, -0.1);
    } else {
        return '#000000';
    }
}

function getRainbowCol () {
    return '#'+(Math.random().toString(16)+'00000').slice(2, 8);
}

function getIncrementedShade (inColour, lightnessFactor) {
    let rgb = inColour.substr(4).split(")")[0].split(",");
    outCol = 'rgb('
    for (let i = 0; i < rgb.length; i++) {
        newVal = parseInt(rgb[i]);
        newVal += 255 * lightnessFactor;
        // bellow doesn't seem to be necessary...
        // if (newVal > 255) {
        //     rgb[i] = 255;
        // } else if (newVal < 0) {
        //     rgb[i] = 0;
        // } else {
        //     rgb[i] = newVal;
        // }
        rgb[i] = newVal;
    }

    outCol += rgb.join() +')';

    return outCol;
}


// reset button //

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetGrid);

function resetGrid(e) {
    let patchesInRow = prompt('New grid length: ');
    while (patchesInRow < 1 || patchesInRow > 100) {
         patchesInRow = prompt('New grid length (0-100): ');
    }
    if (patchesInRow && patchesInRow > 0 && patchesInRow < 100) {
        removeAllChildNodes(canvas);
        setGrid(patchesInRow);
    }
}

function removeAllChildNodes(parent) {
    document.querySelectorAll('.patch').forEach((patch) => {
       canvas.removeChild(patch); 
    })
}