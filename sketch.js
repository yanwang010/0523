let facemesh;
let video;
let predictions = [];

function setup() {
  createCanvas(640, 480); // 更新畫布大小
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on("predict", (results) => {
    predictions = results;
  });
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  background(220);
  image(video, 0, 0, width, height);
  drawFacemesh();
}

function drawFacemesh() {
  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    // 指定的點編號
    const indices1 = [409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291];
    const indices2 = [76, 77, 90, 180, 85, 16, 315, 404, 320, 307, 306, 408, 304, 303, 302, 11, 72, 73, 74, 184];

    stroke(255, 0, 0); // 紅色線條
    strokeWeight(1.5); // 線條粗細
    noFill();

    // 繪製第一組點的連結
    beginShape();
    for (let i = 0; i < indices1.length; i++) {
      const [x, y] = keypoints[indices1[i]];
      vertex(x, y);
    }
    endShape(CLOSE);

    // 繪製第二組點的連結
    for (let i = 0; i < indices2.length - 1; i++) {
      const [x1, y1] = keypoints[indices2[i]];
      const [x2, y2] = keypoints[indices2[i + 1]];
      line(x1, y1, x2, y2);
    }
  }
}
