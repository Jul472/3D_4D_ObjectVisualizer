export function matrixMultiply(A, B){
    let colsA = A[0].length
    let rowsA = A.length

    let colsB = B[0].length
    let rowsB = B.length

    if(colsA != rowsB){
        console.log("The columns of the Frist Matrix must match the rows of the Second Matrix")
        return null;
    } else {
        let resultMatrix = new Array(rowsA)
        for(let i = 0; i < resultMatrix.length; i++){
            resultMatrix[i] = new Array(colsB)
        }
        for(let i = 0; i < rowsA; i++){
            for(let j = 0; j < colsB; j++){
                let sum = 0;
                for(let k = 0; k < colsA; k++){
                    sum += A[i][k] * B[k][j]
                }
                resultMatrix[i][j] = sum
            }
        }
        // console.log(resultMatrix)
        return resultMatrix;
    }

}

//One dimension conversion functions
export function pointToMatrix1DArrayCube(point){

    let m = new Array(3)

    for(let i = 0; i < m.length; i++){
        m[i] = new Array(1)
    }
    m[0][0] = point[0]
    m[1][0] = point[1]
    if(point.length > 2){
        m[2][0] = point[2]  
    } else {
        m.splice(2)
    }

    // for(let i = 0; i < point.length; i++){
    //     m[i][0] = point[i]
    // }

    return m
}

export function pointToMatrix1DArrayTesseract(point){

    let m = new Array(4)

    for(let i = 0; i < m.length; i++){
        m[i] = new Array(1)
    }
    m[0][0] = point[0]
    m[1][0] = point[1]
    if(point.length > 2){
        m[2][0] = point[2]
        m[3][0] = point[3]  
    } else {
        m.splice(2)
    }

    // for(let i = 0; i < point.length; i++){
    //     m[i][0] = point[i]
    // }

    return m
}
//Connecting the Dots
export function lineDraw(array, context, a, b, scale) {
    let origin = array[a]
    let end = array[b]
    // context.strokeStyle = "blue"
    // context.lineWidth = "10"
    // context.lineCap = "round"
    context.beginPath()
    context.moveTo(origin[0][0]*scale, origin[1][0]*scale)
    context.lineTo(end[0][0]*scale, end[1][0]*scale)
    context.stroke()
}

export function clearCanvas(context){
    context.clearRect(-300, -300, 600, 600)
}