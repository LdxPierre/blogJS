import "./form.scss";
import "../assets/styles/styles.scss";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

//auto resize textearea
const textarea = document.querySelector("#body");
textarea.addEventListener("input", () => {
    textarea.style.height = "50px";
    textarea.style.height = textarea.scrollHeight + "px";
});

const submit = document.querySelector("#submit");
submit.addEventListener("click", (event) => {
    event.preventDefault();
    createPost();
});

const successPost = () => {
    const pop = document.querySelector(".pop");
    if (pop) {
        closePop();
    }
    const box = document.createElement("div");
    box.setAttribute("class", "pop");
    box.innerHTML = `
    <div class='popSuccess'>
    <span class='ico'><i class="fa-solid fa-check"></i></span>
    <span>Your post has been add</span>
    <span class='popClose'><i class="fa-solid fa-xmark"></i></span>
    </div>
    `;
    document.querySelector(".content").appendChild(box);
    document.querySelector(".popClose").addEventListener("click", closePop);
    document.querySelector(".pop").addEventListener("contextmenu", (event) => {
        event.preventDefault();
        closePop();
    });
    setTimeout(() => (window.location.href = "./index.html"), 1000);
};

const errorPost = (e) => {
    const pop = document.querySelector(".pop");
    if (pop) {
        closePop();
    }
    const box = document.createElement("div");
    box.setAttribute("class", "pop");
    box.innerHTML = `
    <div class='popError'>
    <span class='ico'><i class="fa-solid fa-xmark"></i></span>
    <span>Error: ${e}</span>
    <span class='popClose'><i class="fa-solid fa-xmark"></i></span>
    </div>
    `;
    document.querySelector(".content").appendChild(box);
    document.querySelector(".popClose").addEventListener("click", closePop);
    document.querySelector(".pop").addEventListener("contextmenu", (event) => {
        event.preventDefault();
        closePop();
    });
};

const closePop = () => {
    document.querySelector(".pop").remove();
};

const createPost = () => {
    const postTitle = document.querySelector("#title");
    const postBody = document.querySelector("#body");
    const postForm = { userId: 1, id: 50, title: postTitle, body: postBody };

    try {
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: postForm,
        })
            .then(() => console.log("ok"))
            .then(() => successPost())
            .catch((e) => {
                errorPost(e);
            });
    } catch (e) {
        errorPost(e);
    }
};
