import "./assets/styles/styles.scss";
import "./index.scss";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

const showResult = (data) => {
    const posts = document.querySelector(".posts");
    data.forEach((d) => {
        const post = document.createElement("div");
        post.setAttribute("class", "post");
        post.innerHTML = `
        <h2>${d.title}</h2>
        <h3>Auteur : ${d.userId}</h3>
        <p>${d.body}</p>
        <a href="#">Read</a>`;
        const deleteBtn = document.createElement("span");
        deleteBtn.setAttribute("class", "deletePost");
        deleteBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
        deleteBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            deletePost(d.id);
        });
        posts.append(post);
        post.append(deleteBtn);
    });
};

const showError = (err) => {
    console.log(err);
};

const toggleSpinner = (value) => {
    if (value === true) {
        const content = document.querySelector(".content");
        const spinner = document.createElement("span");
        spinner.setAttribute("class", "spinner");
        spinner.innerHTML = `<i class="fa-solid fa-gear"></i>`;
        content.append(spinner);
    } else {
        document.querySelector(".spinner").remove();
    }
};

async function request() {
    toggleSpinner(true);
    setTimeout(() => {
        try {
            fetch("https://jsonplaceholder.typicode.com/posts")
                .then((response) => response.json())
                .then((json) => showResult(json.reverse()));
        } catch (e) {
            showError(e);
        } finally {
            toggleSpinner(false);
        }
    }, 2000);
}

async function deletePost(id) {
    try {
        fetch("https://jsonplaceholder.typicode.com/posts/" + id, {
            method: "DELETE",
        })
            .then(() => console.log("post : " + id + "delete"))
            .catch((e) => console.log(e));
    } catch {
        console.log("failed");
    }
}

request();
