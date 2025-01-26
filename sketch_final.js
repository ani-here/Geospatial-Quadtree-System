let qtree;
var landscape;
let gui;
let params = {
  numPoints: 150,
  quadtreeCapacity: 4,
  rangeSize: 25,
  backgroundColor: [240, 140, 140],
};


function setup() {
  createCanvas(windowWidth, windowHeight);
  setupGUI();
  initializeQuadtree();
  
}

function setupGUI() {
  gui = new dat.GUI();
  gui.add(params, 'numPoints', 100, 1000).onChange(initializeQuadtree);
  gui.add(params, 'quadtreeCapacity', 1, 10).onChange(initializeQuadtree);
  gui.add(params, 'rangeSize', 10, 100);
  gui.addColor(params, 'backgroundColor');
}

function initializeQuadtree() {
  let boundary = new Rectangle(width / 2, height / 2, width, height);
  qtree = new QuadTree(boundary, max(0,params.quadtreeCapacity-1));
  for (let i = 0; i < params.numPoints; i++) {
    let x = randomGaussian(width / 2, width / 8);
    let y = randomGaussian(height / 2, height / 8);
    qtree.insert(new Point(x, y));
  }
}

// Add a new point when the canvas is clicked
function mousePressed() {
  if (mouseX < width && mouseY < height) {
    let newPoint = new Point(mouseX, mouseY);
    qtree.insert(newPoint);
  }
}


function draw() {
  background(params.backgroundColor);
  qtree.show();

  // Draw the query range
  stroke(255, 255, 0); // Yellow color for the range rectangle
  rectMode(CENTER);
  let range = new Rectangle(mouseX, mouseY, params.rangeSize, params.rangeSize);

  if (mouseX < width && mouseY < height) {
    // Draw the query rectangle
    rect(range.x, range.y, range.w * 2, range.h * 2);

    // Highlight points within the range
    let pointsInRange = qtree.query(range);
    for (let p of pointsInRange) {
      stroke(0, 255, 0); // Green color for points within the range
      strokeWeight(4);
      point(p.x, p.y);
    }

    // Highlight the nearest neighbor
    let mousePoint = new Point(mouseX, mouseY);
    let nearest = qtree.findNearestNeighbor(mousePoint, 100); // Search within 100px radius
    if (nearest) {
      stroke(255, 0, 0); // Red color for the nearest neighbor
      line(mouseX, mouseY, nearest.x, nearest.y); // Draw a line to the nearest neighbor
      strokeWeight(6);
      point(nearest.x, nearest.y);
    }
  }
  addTitleAndDescription();

  
}


function addTitleAndDescription() {
  let bg = createDiv();
  bg.position(20, 20);
  bg.style("background-color", "rgba(255, 255, 255, 0.7)"); // White with 70% opacity
  bg.style("padding", "10px");
  bg.style("border-radius", "5px");
  bg.style("max-width", "600px");

  let title = createElement("h1", "QuadTree System");
  title.parent(bg); 
  title.style("color", "#333"); // Dark gray color
  title.style("font-family", "Arial, sans-serif"); 
  title.style("margin", "0"); 

}
