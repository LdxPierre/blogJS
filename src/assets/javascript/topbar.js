const canvas = document.querySelector(".canvas");
const canvasShow = document.querySelector(".toggleCanvas");
canvasShow.addEventListener("click", (event) => {
    event.stopPropagation();
    canvas.setAttribute("class", "canvas show");
});
const canvasClose = document.querySelector(".canvasClose");
canvasClose.addEventListener("click", (event) => {
    event.stopPropagation();
    canvas.setAttribute("class", "canvas");
});
