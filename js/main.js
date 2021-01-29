import renderingCube from './3DCube.js'
import renderingTesseract from './4DTesseract.js'

const canvas = document.getElementById("miCanvas");
const context = canvas.getContext("2d");
context.translate(300, 300)

//Desktop Buttons
const renderCubeBtnD = document.getElementById("renderCubeBtnD")
const renderTesseractBtnD = document.getElementById("renderTesseractBtnD")

//Mobile Buttons
const renderCubeBtnM = document.getElementById("renderCubeBtnM")
const renderTesseractBtnM = document.getElementById("renderTesseractBtnM")

//Clear Canvas Buttons
const clearCanvasBtn = document.querySelectorAll(".clearCanvasBtn")

var interval;

//Desktop Funtions
renderCubeBtnD.addEventListener("click", function(){
    clearInterval(interval)
    context.clearRect(-300, -300, canvas.width, canvas.height)
    interval = setInterval( function() { renderingCube(context) }, 10)
})

renderTesseractBtnD.addEventListener("click", function(){
    clearInterval(interval)
    context.clearRect(-300, -300, canvas.width, canvas.height)
    interval = setInterval( function() { renderingTesseract(context) }, 10)
})

//Mobile Functions
renderCubeBtnM.addEventListener("click", function(){
    clearInterval(interval)
    context.clearRect(-300, -300, canvas.width, canvas.height)
    interval = setInterval( function() { renderingCube(context) }, 10)
})

renderTesseractBtnM.addEventListener("click", function(){
    clearInterval(interval)
    context.clearRect(-300, -300, canvas.width, canvas.height)
    interval = setInterval( function() { renderingTesseract(context) }, 10)
})

//Clear Canvas Function
clearCanvasBtn.forEach( btn => btn.addEventListener("click", function(){
    clearInterval(interval)
    context.clearRect(-300, -300, canvas.width, canvas.height)
}))