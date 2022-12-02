import "./form.scss";
import "../assets/styles/styles.scss";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import * as popUp from "../assets/javascript/popup.js";

const form = document.querySelector("form");

let errors = [];

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const obj = Object.fromEntries(formData.entries());
    if (formIsValid(obj)) {
        postArticle(obj);
    } else {
        popUp.showPopUp("danger", "All field are not completed");
        errors.push("All inputs are not completed");
        showErrors();
    }
});

const formIsValid = (form) => {
    errors = [];
    if (!form.title || !form.content || !form.category || !form.author) {
        return false;
    } else {
        if (!form.authorImg) {
            form.authorImg =
                "https://cdn-icons-png.flaticon.com/512/1246/1246351.png?w=826&t=st=1669815469~exp=1669816069~hmac=d2170786e55bc69ccaf6f8c1e4bc84b1da0249e0738aeaa84b59999adc2a20c0";
        }
        return true;
    }
};

async function postArticle(obj) {
    try {
        obj.date = new Date().toLocaleDateString();
        const article = JSON.stringify(obj);
        await fetch("https://restapi.fr/api/ormide/", {
            method: "POST",
            body: article,
            headers: {
                "content-type": "application/json",
            },
        })
            .then(() => (window.location.href = "./index.html"))
            .then(() => {
                popUp.showPopUp("success", "GG");
            });
    } catch (e) {
        console.log(e);
    }
}

const showErrors = () => {
    const errorsNode = document.querySelector(".errors");
    errorsNode.innerHTML = ``;
    errors.forEach((e) => {
        const li = document.createElement("li");
        li.innerHTML = `${e}`;
        errorsNode.append(li);
    });
};
