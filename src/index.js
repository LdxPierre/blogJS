import "./assets/styles/styles.scss";
import "./index.scss";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

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
