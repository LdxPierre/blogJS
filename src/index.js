import "./index.scss";
import "./assets/styles/styles.scss";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import * as popUp from "./assets/javascript/popup.js";

const params = new URL(document.location).searchParams;
const contentNode = document.querySelector(".content");
let filtersArray = [];
let sort = "desc";

//show all posts
const getPosts = async () => {
    let url = new URL("https://restapi.fr/api/ormide/");
    if (filtersArray != 0) {
        filtersArray.forEach((f) => {
            url.searchParams.append("category", f);
        });
    }
    sort == "asc"
        ? url.searchParams.append("sort", "createdAt:asc")
        : url.searchParams.append("sort", "createdAt:desc");
    try {
        const response = await fetch(url);
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
        getPosts();
        popUp.showPopUp("success", "Article has been deleted");
    } catch (e) {
        console.error(e);
    }
};

const showFilters = () => {
    const filtersNode = document.createElement("div");
    filtersNode.classList.add("filters");
    filtersNode.innerHTML = `
        <div class="filter-select">
            <span class="sort-date">Sort by Date</span>
            <span class="filter-category">Filter by Category</span>
        </div>
        <div class="category-list">
            <label for="catA">
                Category A
                <input type="checkbox" name="catA" id="catA" value="A"/>
            </label>
            <label for="catB">
                Category B
                <input type="checkbox" name="catB" id="catB" value="B"/>
            </label>
            <label for="catC">
                Category C
                <input type="checkbox" name="catC" id="catC" value="C"/>
            </label>
            <label for="catD">
                Category D
                <input type="checkbox" name="catD" id="catD" value="D"/>
            </label>
        </div>
    `;
    contentNode.prepend(filtersNode);

    filtersNode
        .querySelector(".filter-category")
        .addEventListener("click", () => {
            const categoryListNode = document.querySelector(".category-list");
            const show = categoryListNode.classList.contains("show");
            show
                ? categoryListNode.classList.remove("show")
                : categoryListNode.classList.add("show");
        });
    sortDate();
    filtersInput();
};

const sortDate = () => {
    document.querySelector(".sort-date").addEventListener("click", () => {
        sort == "asc" ? (sort = "desc") : (sort = "asc");
        getPosts();
    });
};

const filtersInput = () => {
    const categoryListNode = document.querySelector(".category-list");
    const cats = categoryListNode.querySelectorAll("input");
    cats.forEach((c) => {
        c.addEventListener("click", () => {
            if (c.checked) {
                filtersArray.push(c.value);
                getPosts();
            } else {
                const index = filtersArray.indexOf(c.value);
                filtersArray.splice(index, 1);
                getPosts();
            }
        });
    });
    return filtersArray;
};

const showPosts = (posts) => {
    const articlesNode = document.querySelector(".articles");
    articlesNode.innerHTML = ``;
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
        //NO DATA
        console.log("no data to show");
    }
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
showFilters();

//Show popUp (must be improved)
if (params.get("p") == "create") {
    popUp.showPopUp("success", "Article has been added");
} else if (params.get("p") == "edit") {
    popUp.showPopUp("success", "Article has been updated");
}
