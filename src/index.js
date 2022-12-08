import "./index.scss";
import "./assets/styles/styles.scss";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import * as popUp from "./assets/javascript/popup.js";
import * as modal from "./assets/javascript/modal.js";

const params = new URL(document.location).searchParams;
const categoriesListNode = document.querySelector(".categoriesList");
let articles;
let filter;
let sort = "createdAt:desc";
let categoryShow = false;

//show all articles
const getArticles = async () => {
    try {
        const response = await fetch(
            `https://restapi.fr/api/ormide?sort=${sort}`
        );
        articles = await response.json();
        showArticles();
        categoriesMenu();
    } catch (e) {
        console.error(e);
    }
};

//delete article[id]
const deleteArticle = async (id) => {
    try {
        const response = await fetch(`https://restapi.fr/api/ormide/${id}`, {
            method: "DELETE",
        });
        const body = await response.json();
        getArticles();
        popUp.showPopUp("success", "Article has been deleted");
    } catch (e) {
        console.error(e);
    }
};

const categoriesMenu = () => {
    if (articles.length == 0) {
        categoriesListNode.innerHTML = ``;
    } else if (articles.length > 0) {
        let categoriesArray;
        const categories = articles.reduce((acc, article) => {
            acc[article.category]
                ? acc[article.category]++
                : (acc[article.category] = 1);
            return acc;
        }, {});

        categoriesArray = Object.keys(categories)
            .map((category) => {
                return [category, categories[category]];
            })
            .sort((c1, c2) => c1[0].localeCompare(c2[0]));

        createLiElements(categoriesArray);
    } else {
        createLiElements([[articles.category, 1]]);
    }
};

const createLiElements = (categoriesArray) => {
    categoriesListNode.innerHTML = ``;
    const liElements = categoriesArray.map((element) => {
        const li = document.createElement("li");
        li.innerHTML = `${element[0]} ( ${element[1]} )`;
        filter === element[0] ? li.classList.add("select") : "";
        li.addEventListener("click", () => {
            liElements.forEach((li) => {
                li.classList.remove("select");
            });
            if (filter === element[0]) {
                filter = null;
            } else {
                li.classList.add("select");
                filter = element[0];
            }
            showArticles();
        });
        return li;
    });

    categoriesListNode.append(...liElements);
};

const filterEventListener = () => {
    const sortDateNode = document.querySelector(".sortDate");
    sortDateNode.addEventListener("click", () => {
        sort == "createdAt:asc"
            ? (sort = "createdAt:desc")
            : (sort = "createdAt:asc");
        sort == "createdAt:asc"
            ? sortDateNode.setAttribute("class", "sortDate on")
            : sortDateNode.setAttribute("class", "sortDate off");
        getArticles();
    });

    const filterCategoriesNode = document.querySelector(".filterCategories");
    const filterCategoriesListNode = document.querySelector(".categoriesList");
    filterCategoriesNode.addEventListener("click", () => {
        if (!categoryShow) {
            filterCategoriesNode.setAttribute("class", "filterCategories on");
            filterCategoriesListNode.classList.add("show");
            categoryShow = !categoryShow;
        } else {
            filterCategoriesNode.setAttribute("class", "filterCategories off");
            filterCategoriesListNode.classList.remove("show");
            categoryShow = !categoryShow;
        }
    });
};

const showArticles = () => {
    const articlesNode = document.querySelector(".articles");
    articlesNode.innerHTML = ``;

    const articlesFilter = articles.filter((article) => {
        if (filter) {
            return article.category === filter;
        } else {
            return true;
        }
    });

    if (articlesFilter.length != 0) {
        if (articlesFilter.length > 0) {
            articlesFilter.map((a) => {
                const article = createArticle(a);
                articlesNode.append(article);
            });
        } else {
            const article = createArticle(articlesFilter);
            articlesNode.append(article);
        }
    } else {
        //NO DATA
        console.log("no data to show");
    }
};

const createArticle = (a) => {
    const date = new Date(a.createdAt);
    const dateIso = date.toLocaleString();
    //title, cat, content
    const articleNode = document.createElement("div");
    articleNode.classList.add("article");
    articleNode.innerHTML = `<h2 class="articleTitle">${a.title}</h2>
        <h4 class="articleCategory">${a.category}</h4>
        <p class="articleContent">${a.content}</p>`;
    //author, date, btn
    const articlesInfosNode = document.createElement("div");
    articlesInfosNode.classList.add("articleInfos");
    articlesInfosNode.innerHTML = `
            <img class="articleAuthorImg" src="${a.authorImg}" alt="${a.author}"/>
            <h5 class="articleDate">${dateIso}</h5>
            <h4 class="articleAuthor">${a.author}</h4>
            <button class='btn btn-read'>Read</button>
            `;
    articleNode.append(articlesInfosNode);
    //btnDelete
    const btnDelete = document.createElement("button");
    btnDelete.setAttribute("class", "btn btn-danger btn-delete");
    btnDelete.innerHTML = `Delete`;
    btnDelete.addEventListener("click", () => {
        modal.showModal({
            content: `Confirm delete of ${a.title} ? `,
            footer: {
                method: deleteArticle,
                params1: a._id,
            },
        });
    });
    //editBtn
    const btnEdit = document.createElement("a");
    btnEdit.setAttribute("class", "btn btn-blue btn-edit");
    btnEdit.setAttribute("href", `./form.html?id=${a._id}`);
    btnEdit.innerHTML = "Edit";

    articlesInfosNode.append(btnEdit, btnDelete);

    return articleNode;
};

getArticles();
filterEventListener();

//Show popUp (must be improved)
if (params.get("p") == "create") {
    popUp.showPopUp("success", "Article has been added");
} else if (params.get("p") == "edit") {
    popUp.showPopUp("success", "Article has been updated");
}
