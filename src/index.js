import "./index.scss";
import "./assets/styles/styles.scss";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import * as popUp from "./assets/javascript/popup.js";

const params = new URL(document.location).searchParams;
const contentNode = document.querySelector(".content");

//show all posts
const getPosts = async () => {
    try {
        const response = await fetch("https://restapi.fr/api/ormide/");
        const body = await response.json();
        showPosts(body);
    } catch (e) {
        console.error(e);
    }
};

//delete post[id]
const deletePost = async (id) => {
    try {
        const response = await fetch(`https://restapi.fr/api/ormide/${id}`, {
            method: "DELETE",
        });
        const body = response.json();
        console.log("delete article : " + body);
        getPosts();
        popUp.showPopUp("success", "Article has been deleted");
    } catch (e) {
        console.error(e);
    }
};

const showPosts = (posts) => {
    contentNode.innerHTML = ``;
    const articlesNode = document.createElement("div");
    articlesNode.classList.add("articles");
    //if data
    if (posts.length != 0) {
        //if multiple data
        if (posts.length > 0) {
            posts.map((p) => {
                const post = createPost(p);
                articlesNode.append(post);
            });
            //if only one data, no array to iterate with .map
        } else {
            const post = createPost(posts);
            articlesNode.append(post);
        }
    } else {
        //method to create a no data indicator
        console.log("no data to show");
    }
    contentNode.append(articlesNode);
};

const createPost = (p) => {
    const date = new Date(p.createdAt);
    const dateIso = date.toLocaleString();
    //title, cat, content
    const postNode = document.createElement("div");
    postNode.classList.add("article");
    postNode.innerHTML = `<h2 class="articleTitle">${p.title}</h2>
        <h4 class="articleCategory">${p.category}</h4>
        <p class="articleContent">${p.content}</p>`;
    //author, date, btn
    const articlesInfosNode = document.createElement("div");
    articlesInfosNode.classList.add("articleInfos");
    articlesInfosNode.innerHTML = `
            <img class="articleAuthorImg" src="${p.authorImg}" alt="${p.author}"/>
            <h5 class="articleDate">${dateIso}</h5>
            <h4 class="articleAuthor">${p.author}</h4>
            <button class='btn btn-read'>Read</button>
            `;
    postNode.append(articlesInfosNode);
    //btnDelete
    const btnDelete = document.createElement("button");
    btnDelete.setAttribute("class", "btn btn-danger btn-delete");
    btnDelete.innerHTML = `Delete`;
    btnDelete.addEventListener("click", () => {
        deletePost(p._id);
    });
    //editBtn
    const btnEdit = document.createElement("a");
    btnEdit.setAttribute("class", "btn btn-blue btn-edit");
    btnEdit.setAttribute("href", `./form.html?id=${p._id}`);
    btnEdit.innerHTML = "Edit";

    articlesInfosNode.append(btnEdit, btnDelete);

    return postNode;
};

getPosts();

//Show popUp (must be improved)
if (params.get("p") == "create") {
    popUp.showPopUp("success", "Article has been added");
} else if (params.get("p") == "edit") {
    popUp.showPopUp("success", "Article has been updated");
}
