const contentNode = document.querySelector(".content");

let popUpNode;
let timer;

const showPopUp = (param1, param2) => {
    if (popUpNode) {
        popUpNode.remove();
        clearTimeout(timer);
    }
    popUpNode = document.createElement("div");
    popUpNode.classList.add("popUp");

    if (param1 == "success") {
        popUpNode.innerHTML = `
        <div class="popUp-success">
            <span class="popUp-ico"><i class="fa-solid fa-check"></i></span>
            <span class="popUp-message">${param2}</span>
            <span class="popUp-close"><i class="fa-solid fa-xmark"></i></span>
        </div>`;
    } else {
        popUpNode.innerHTML = `
        <div class="popUp-danger">
            <span class="popUp-ico"><i class="fa-solid fa-exclamation"></i></span>
            <span class="popUp-message">${param2}</span>
            <span class="popUp-close"><i class="fa-solid fa-xmark"></i></span>
        </div>`;
    }

    contentNode.before(popUpNode);

    popUpNode.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        popUpNode.remove();
        clearTimeout(timer);
    });

    popUpNode.querySelector(".popUp-close").addEventListener("click", () => {
        popUpNode.remove();
        clearTimeout(timer);
    });

    timer = setTimeout(() => {
        popUpNode.remove();
    }, 1000);
};

export { showPopUp };
