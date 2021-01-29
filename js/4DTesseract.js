import {
  matrixMultiply,
  pointToMatrix1DArrayTesseract,
  lineDraw,
  clearCanvas,
} from "./matrixFunctions.js";

let angle = 0;

var points = [
  [100, -100, -100, 90],
  [100, 100, -100, 90],
  [-100, -100, -100, 90],
  [-100, 100, -100, 90],

  [100, -100, 100, 90],
  [100, 100, 100, 90],
  [-100, -100, 100, 90],
  [-100, 100, 100, 90],

  [100, -100, -100, -70],
  [100, 100, -100, -70],
  [-100, -100, -100, -70],
  [-100, 100, -100, -70],

  [100, -100, 100, -70],
  [100, 100, 100, -70],
  [-100, -100, 100, -70],
  [-100, 100, 100, -70],
];

var projectionMatrix = [
  [1, 0, 0],
  [0, 1, 0],
];

export default function renderingTesseract(context) {
  clearCanvas(context);
  var coordinates = [];
  var index = 0;

  var distance = 180;
  var scale = 80;

  var rotationMatrixX = [
    [1, 0, 0, 0],
    [0, Math.cos(angle), -Math.sin(angle), 0],
    [0, Math.sin(angle), Math.cos(angle), 0],
    [0, 0, 0, 1],
  ];

  var rotationMatrixY = [
    [Math.cos(angle), 0, Math.sin(angle), 0],
    [0, 1, 0, 0],
    [-Math.sin(angle), 0, Math.cos(angle), 0],
    [0, 0, 0, 1],
  ];

  var rotationMatrixZ = [
    [Math.cos(angle), -Math.sin(angle), 0, 0],
    [Math.sin(angle), Math.cos(angle), 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];

  var rotationMatrixW = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, Math.cos(angle), -Math.sin(angle)],
    [0, 0, Math.sin(angle), Math.cos(angle)],
  ];

  points.forEach((point) => {
    let rotated = matrixMultiply(
      rotationMatrixW,
      pointToMatrix1DArrayTesseract(point)
    ); //W
    var w = 1 / (distance - rotated[3][0]);
    var fourDProjectionMatrix = [
      [w, 0, 0, 0],
      [0, w, 0, 0],
      [0, 0, w, 0],
    ];

    rotated = matrixMultiply(rotationMatrixZ, rotated); //
    rotated = matrixMultiply(rotationMatrixX, rotated); //
    // rotated = matrixMultiply(rotationMatrixY, rotated)
    let projected3D = matrixMultiply(fourDProjectionMatrix, rotated);

    // let projected3D = matrixMultiply(fourDProjectionMatrix, pointToMatrix1DArrayTesseract(point))

    let projected2D = matrixMultiply(projectionMatrix, projected3D);
    coordinates.splice(index, 1, projected2D);
    context.beginPath();
    context.arc(
      projected2D[0][0] * scale,
      projected2D[1][0] * scale,
      3,
      0,
      Math.PI * 2
    );
    context.fill();
    index++;
  });

  angle += 0.01;
  index = 0;

  //Cubo Exterior
  lineDraw(coordinates, context, 0, 1, scale);
  lineDraw(coordinates, context, 0, 2, scale);
  lineDraw(coordinates, context, 0, 4, scale);
  lineDraw(coordinates, context, 1, 5, scale);
  lineDraw(coordinates, context, 1, 3, scale);
  lineDraw(coordinates, context, 2, 3, scale);
  lineDraw(coordinates, context, 3, 7, scale);
  lineDraw(coordinates, context, 4, 5, scale);
  lineDraw(coordinates, context, 4, 6, scale);
  lineDraw(coordinates, context, 5, 7, scale);
  lineDraw(coordinates, context, 6, 2, scale);
  lineDraw(coordinates, context, 7, 6, scale);
  //Cubo Interior
  lineDraw(coordinates, context, 8, 9, scale);
  lineDraw(coordinates, context, 8, 10, scale);
  lineDraw(coordinates, context, 8, 12, scale);
  lineDraw(coordinates, context, 9, 13, scale);
  lineDraw(coordinates, context, 9, 11, scale);
  lineDraw(coordinates, context, 10, 11, scale);
  lineDraw(coordinates, context, 11, 15, scale);
  lineDraw(coordinates, context, 12, 13, scale);
  lineDraw(coordinates, context, 12, 14, scale);
  lineDraw(coordinates, context, 13, 15, scale);
  lineDraw(coordinates, context, 14, 10, scale);
  lineDraw(coordinates, context, 15, 14, scale);
  //Diagonales
  lineDraw(coordinates, context, 8, 0, scale);
  lineDraw(coordinates, context, 9, 1, scale);
  lineDraw(coordinates, context, 10, 2, scale);
  lineDraw(coordinates, context, 11, 3, scale);
  lineDraw(coordinates, context, 12, 4, scale);
  lineDraw(coordinates, context, 13, 5, scale);
  lineDraw(coordinates, context, 14, 6, scale);
  lineDraw(coordinates, context, 15, 7, scale);
}
