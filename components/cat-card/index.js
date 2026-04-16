export class CatCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card m-2" style="width: 18rem;">
                <img src="${data.src}" class="card-img-top" alt="кот">
                <div class="card-body">
                    <h5 class="card-title">${data.name}</h5>
                    <p class="card-text">${data.description}</p>

                    <button class="btn btn-success" id="alert-btn-${data.id}">
                        Погладить кота
                    </button>

                    <button class="btn btn-primary mt-2"
                        id="open-btn-${data.id}"
                        data-id="${data.id}">
                        Подробнее
                    </button>
                </div>
            </div>
        `;
    }

    addListeners(data, openListener, alertListener) {
        document
            .getElementById(`open-btn-${data.id}`)
            .addEventListener("click", openListener);

        document
            .getElementById(`alert-btn-${data.id}`)
            .addEventListener("click", () => alertListener(data));
    }

    render(data, openListener, alertListener) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
        this.addListeners(data, openListener, alertListener);
    }
}
