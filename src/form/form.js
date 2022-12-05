import "./form.scss";
import "../assets/styles/styles.scss";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

const form = document.querySelector("form");
const params = new URL(document.location).searchParams;

let errors = [];

const getArticle = async (id) => {
    try {
        const response = await fetch(`https://restapi.fr/api/ormide/${id}`);
        const body = await response.json();
        articleToForm(body);
    } catch (e) {
        console.log(e);
    }
};

const articleToForm = (obj) => {
    form.querySelector("#title").value = obj.title;
    form.querySelector("#category").value = obj.category;
    form.querySelector("#author").value = obj.author;
    form.querySelector("#authorImg").value = obj.authorImg;
    form.querySelector("#body").value = obj.content;
};

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

const ajaxArticle = async (obj, method) => {
    try {
        let url;
        const id = params.get("id");
        const article = JSON.stringify(obj);
        let popUpMessage;
        id
            ? (url = `https://restapi.fr/api/ormide/${id}`)
            : (url = `https://restapi.fr/api/ormide/`);
        const response = await fetch(url, {
            method: method,
            body: article,
            headers: {
                "content-type": "application/json",
            },
        });
        const body = await response.json();
        id ? (popUpMessage = "edit") : (popUpMessage = "create");
        window.location.href = `./index.html?p=${popUpMessage}`;
    } catch (e) {
        console.log(e);
    }
};

//show array of errors
const showErrors = () => {
    const errorsNode = document.querySelector(".errors");
    errorsNode.innerHTML = ``;
    errors.forEach((e) => {
        const li = document.createElement("li");
        li.innerHTML = `${e}`;
        errorsNode.append(li);
    });
};

//autocomplete form
if (params.has("id")) {
    getArticle(params.get("id"));
}

//submit patch if params else post
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const obj = Object.fromEntries(formData.entries());
    if (formIsValid(obj)) {
        params.has("id") ? ajaxArticle(obj, "PATCH") : ajaxArticle(obj, "POST");
    } else {
        errors.push("All inputs are not completed");
        showErrors();
    }
});
