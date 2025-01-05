let qtree;
var landscape;
function setup() {
  createCanvas(windowWidth,windowHeight);
  background(255);
  let boundary = new Rectangle(windowWidth, windowHeight, windowWidth, windowHeight);
  qtree = new QuadTree(boundary, 4);
  for (let i = 0; i < 500; i++) {
    let x = randomGaussian(width / 2, width / 8);
    let y = randomGaussian(height / 2, height / 8);
    let p = new Point(x, y);
    qtree.insert(p);
  }
}

function draw() {
  background(0);
  background(landscape);
  qtree.show();
  stroke(255,255,0);
  rectMode(CENTER);
  let range = new Rectangle(mouseX, mouseY, 25, 25);

  // This check has been introduced due to a bug discussed in https://github.com/CodingTrain/website/pull/556
  if (mouseX < width && mouseY < height) {
    rect(range.x, range.y, range.w * 2, range.h * 2);
    let points = qtree.query(range);
    for (let p of points) {
      strokeWeight(6);
      point(p.x, p.y);
    }
  }

}
function preload()
{
  landscape=loadImage("https://t4.ftcdn.net/jpg/03/06/49/25/360_F_306492512_Cnv1Ie8ZZ1qWMhtFJAupzafY9DGf5Bi8.jpg")
}