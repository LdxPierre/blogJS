const contentNode = document.querySelector(".content");

const showModal = (title, content, method, methodParams1, methodParams2) => {
    const modalNode = document.createElement("div");
    modalNode.classList.add("modal");
    modalNode.innerHTML = `
    <div class="modal-body">
        <div class="modal-title">
            <span class="modal-title-text">${title}</span>
            <span class="modal-close">
                <i class="fa-solid fa-xmark"></i>
            </span>
        </div>
        <div class="modal-content">
            <span class="modal-content-text">
                ${content}
            </span>
        </div>
        <div class="modal-footer">
            <button class="modal-cancel">Cancel</button>
            <button class="modal-confirm">Confirm</button>
        </div>
    </div>
    `;
    contentNode.prepend(modalNode);

    //event for close
    // X
    const modalCloseNode = document.querySelector(".modal-close");
    modalCloseNode.addEventListener("click", (event) => {
        event.stopPropagation();
        modalNode.remove();
    });
    // background
    modalNode.addEventListener("click", (event) => {
        event.stopPropagation();
        event.target == modalNode ? closeModal() : "";
    });
    //cancel btn
    const cancelBtn = document.querySelector(".modal-cancel");
    cancelBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        modalNode.remove();
    });
    //escap down
    window.addEventListener("keydown", (event) => {
        event.stopPropagation();
        event.key == "Escape" ? modalNode.remove() : "";
    });

    //event confirm
    const confirmBtn = document.querySelector(".modal-confirm");
    confirmBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        method(methodParams1);
        modalNode.remove();
    });
};

export { showModal };
