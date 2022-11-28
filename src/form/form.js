import "./form.scss";
import "../assets/styles/styles.scss";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

const form = document.querySelector("form");

let errors = [];

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const obj = Object.fromEntries(formData.entries());
    if (formIsValid(obj)) {
        postArticle(obj);
    } else {
        errors.push("All inputs are not completed");
        showErrors();
    }
});

const formIsValid = (form) => {
    if (!form.title || !form.content) {
        return false;
    } else {
        return true;
    }
};

async function postArticle(obj) {
    try {
        const article = JSON.stringify(obj);
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: article,
            headers: {
                "content-type": "application/json",
            },
        }).then(() => (window.location.href = "./index.html"));
    } catch (e) {
        console.log(e);
    }
}

const showErrors = () => {
    const errorsNode = document.querySelector(".errors");
    errors.forEach((e) => {
        const li = document.createElement("li");
        li.innerHTML = `${e}`;
        errorsNode.append(li);
    });
};
