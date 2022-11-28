import "./index.scss";
import "./assets/styles/styles.scss";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

const contentNode = document.querySelector(".content");

//show all posts
const getPosts = async () => {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts"
        );
        const body = await response.json();
        showPosts(body);
    } catch (e) {
        console.error(e);
    }
};

//show post[id]
const getPost = async (id) => {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        const body = await response.json();
        showPost(body);
    } catch (e) {
        console.error(e);
    }
};

//delete post[id]
const deletePost = async (id) => {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${id}`,
            {
                method: "DELETE",
            }
        );
        const body = await response.json();
        console.log("delete article : " + body);
    } catch (e) {
        console.error(e);
    }
};

//show post[id]/Comments
const getComments = async (id) => {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${id}/comments`
        );
        const body = await response.json();
        showComments(body);
    } catch (e) {
        console.error(e);
    }
};

const showPosts = (posts) => {
    contentNode.innerHTML = ``;
    const postsNode = document.createElement("div");
    postsNode.setAttribute("class", "posts");
    posts.forEach((p) => {
        const post = createPost(p);
        postsNode.append(post);
    });
    contentNode.append(postsNode);
};

const createPost = (p) => {
    //post
    const postNode = document.createElement("div");
    postNode.setAttribute("class", "post");
    postNode.innerHTML = `
    <h2>${p.title}</h2>
    <h3>Auteur : ${p.userId}</h3>
    <p>${p.body}</p>
    <a href="#">Read</a>`;
    postNode.addEventListener("click", () => {
        getPost(p.id);
    });
    //button delete
    const deleteBtn = document.createElement("span");
    deleteBtn.setAttribute("class", "deletePost");
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    deleteBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        deletePost(p.id);
    });
    postNode.append(deleteBtn);

    return postNode;
};

const showPost = (p) => {
    contentNode.innerHTML = ``;
    const returnToPostsBtn = document.createElement("button");
    returnToPostsBtn.innerHTML = `Back`;
    returnToPostsBtn.setAttribute("class", "btn");
    returnToPostsBtn.addEventListener("click", () => {
        getPosts();
    });
    const postNode = document.createElement("div");
    postNode.setAttribute("class", "post");
    postNode.innerHTML = `
    <span>id : ${p.id}</span>
    <span>Author : ${p.userId}</span>
    <span>Title : ${p.title}</span>
    <span>Body : ${p.body}</span>
    `;
    contentNode.append(returnToPostsBtn, postNode);
    getComments(p.id);
};

const showComments = (comments) => {
    const ul = document.createElement("ul");
    comments.forEach((c) => {
        const li = createComment(c);
        ul.append(li);
    });
    document.querySelector(".post").after(ul);
};

const createComment = (c) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <span>id : ${c.id}</span>
    <span>name : ${c.name}</span>
    <span>email : ${c.email}</span>
    <span>body : ${c.body}</span>
    `;
    return li;
};

// const toggleSpinner = (value) => {
//     if (value === true) {
//         const contentNode = document.querySelector(".content");
//         const spinnerNode = document.createElement("span");
//         spinnerNode.setAttribute("class", "spinner");
//         spinnerNode.innerHTML = `<i class="fa-solid fa-gear"></i>`;
//         contentNode.append(spinnerNode);
//     } else {
//         document.querySelector(".spinner").remove();
//     }
// };

getPosts();
