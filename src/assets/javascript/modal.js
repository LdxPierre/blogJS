const contentNode = document.querySelector(".content");

const showModal = (obj) => {
    const modalNode = document.createElement("div");
    modalNode.classList.add("modal");
    contentNode.prepend(modalNode);

    const modalBodyNode = modalBody(obj);
    modalNode.append(modalBodyNode);

    const eventListener = modalEventListener(obj);
};

const modalBody = (obj) => {
    const modalBodyNode = document.createElement("div");
    modalBodyNode.classList.add("modal-body");

    let modalTitleNode;
    obj.title ? (modalTitleNode = modalTitle(obj.title)) : "";

    const modalContentNode = modalContent(obj.content);
    const modalFooterNode = modalFooter(obj.footer);

    obj.title
        ? modalBodyNode.append(
              modalTitleNode,
              modalContentNode,
              modalFooterNode
          )
        : modalBodyNode.append(modalContentNode, modalFooterNode);

    return modalBodyNode;
};

const modalTitle = (title) => {
    const modalTitleNode = document.createElement("div");
    modalTitleNode.classList.add("modal-title");
    modalTitleNode.innerHTML = `
    <span class="modal-title-text">${title}</span>
    <span class="modal-close">
        <i class="fa-solid fa-xmark"></i>
    </span>
    `;

    return modalTitleNode;
};

const modalContent = (content) => {
    const modalContentNode = document.createElement("div");
    modalContentNode.classList.add("modal-content");
    modalContentNode.innerHTML = `
    <span class="modal-content-text">
    ${content}
    </span>
    `;

    return modalContentNode;
};

const modalFooter = (footer) => {
    footer.cancel ? "" : (footer.cancel = "cancel");
    footer.confirm ? "" : (footer.confirm = "confirm");

    const modalFooterNode = document.createElement("div");
    modalFooterNode.classList.add("modal-footer");
    modalFooterNode.innerHTML = `
    <button class="modal-cancel">${footer.cancel}</button>
    <button class="modal-confirm">${footer.confirm}</button>
    `;

    return modalFooterNode;
};

const modalEventListener = (obj) => {
    const modalNode = document.querySelector(".modal");
    //event for close
    // X
    if (obj.title) {
        const modalCloseNode = document.querySelector(".modal-close");
        modalCloseNode.addEventListener("click", (event) => {
            event.stopPropagation();
            modalNode.remove();
        });
    }
    // background
    modalNode.addEventListener("click", (event) => {
        event.stopPropagation();
        event.target == modalNode ? modalNode.remove() : "";
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
        obj.footer.method(obj.footer.params1);
        modalNode.remove();
    });
};

export { showModal };
