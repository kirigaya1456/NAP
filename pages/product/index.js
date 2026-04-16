import { MainPage } from "../main/index.js";

export class ProductPage {
    constructor(parent, cat) {
        this.parent = parent
        this.cat = cat
    }

    getData() {
        return {
            id: this.id,
            src: this.src,
            name: `Кот №${this.id}`,
            description: "Очень классный кот 🐱"
        };
    }

    clickBack() {
        const page = new MainPage(this.parent);
        page.render();
    }

    render() {
        const data = this.cat

        this.parent.innerHTML = `
            <div class="container mt-4">
                <button class="btn btn-secondary mb-3" id="back-btn">
                    Назад
                </button>

                <div class="card" style="width: 24rem;">
                    <img src="${data.src}" class="card-img-top">
                    <div class="card-body">
                        <h5>${data.name}</h5>
                        <p>${data.description}</p>
                    </div>
                </div>
            </div>
        `;

        document
            .getElementById("back-btn")
            .addEventListener("click", this.clickBack.bind(this));
    }
}
