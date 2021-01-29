import {
    matrixMultiply,
    pointToMatrix1DArrayCube,
    clearCanvas,
    lineDraw
} from './matrixFunctions.js';

//context.fillStyle = "#000000"

let angle = 0

var projectionMatrix = [
    [1, 0, 0],
    [0, 1, 0]
]

var points = [
    [100, -100, -100],
    [100, 100, -100],
    [-100, -100, -100],
    [-100, 100, -100],

    [100, -100, 100],
    [100, 100, 100],
    [-100, -100, 100],
    [-100, 100, 100]
]

export default function renderingCube(context){

    clearCanvas(context)
    var coordinates = new Array(8)
    var rotationMatrixX = [
        [1, 0, 0],
        [0, Math.cos(angle), -(Math.sin(angle))],
        [0, Math.sin(angle), Math.cos(angle)]
    ]
    var rotationMatrixY = [
        [Math.cos(angle), 0, Math.sin(angle)],
        [0, 1, 0],
        [-(Math.sin(angle)), 0, Math.cos(angle)]
    ]
    var rotationMatrixZ = [
        [Math.cos(angle), -(Math.sin(angle)), 0],
        [Math.sin(angle), Math.cos(angle), 0],
        [0, 0, 1]
    ]
    var index = 0
    points.forEach(point => {
        let rotated = matrixMultiply(rotationMatrixX, pointToMatrix1DArrayCube(point))
        rotated = matrixMultiply(rotationMatrixY, rotated)
        rotated = matrixMultiply(rotationMatrixZ, rotated)
        let projected = matrixMultiply(projectionMatrix, rotated)
        coordinates.splice(index, 1, projected)
        context.beginPath()
        context.arc(projected[0][0], projected[1][0], 3, 0, Math.PI * 2)
        context.fill()
        index++
    })

    angle += 0.01
    index = 0
    
    lineDraw(coordinates, context, 0, 1, 1)
    lineDraw(coordinates, context, 1, 5, 1)
    lineDraw(coordinates, context, 0, 4, 1)
    lineDraw(coordinates, context, 4, 5, 1)

    lineDraw(coordinates, context, 1, 3, 1)
    lineDraw(coordinates, context, 5, 7, 1)
    lineDraw(coordinates, context, 0, 2, 1)
    lineDraw(coordinates, context, 2, 3, 1)

    lineDraw(coordinates, context, 7, 6, 1)
    lineDraw(coordinates, context, 4, 6, 1)
    lineDraw(coordinates, context, 6, 2, 1)
    lineDraw(coordinates, context, 3, 7, 1)
}