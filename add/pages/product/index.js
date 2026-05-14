import { MainPage } from "../main/index.js";

export class ProductPage {
    // В параметрах оставил cat, чтобы не ломать вызов из MainPage, но внутри мы работаем с ним как с data
    constructor(parent, cat) {
        this.parent = parent;
        this.cat = cat;
    }

    clickBack() {
        const page = new MainPage(this.parent);
        page.render();
    }

    render() {
        const data = this.cat;

        this.parent.innerHTML = `
            <div class="container mt-4 mb-5 text-light">
                <button class="button mb-4" id="back-btn" style="background: transparent; border: 1px solid #ff6600; color: #ff6600; padding: 8px 20px; border-radius: 5px;">
                    ← Вернуться к услугам
                </button>

                <!-- Широкая горизонтальная карточка для детального просмотра -->
                <div class="card bg-dark text-light border-secondary shadow-lg" style="border-radius: 12px; overflow: hidden;">
                    <div class="row g-0">
                        <div class="col-md-6">
                            <img src="${data.src}" class="img-fluid rounded-start" alt="Оборудование" style="height: 100%; width: 100%; object-fit: cover; min-height: 350px; opacity: 0.85;">
                        </div>
                        <div class="col-md-6">
                            <div class="card-body d-flex flex-column h-100 p-5">
                                <h2 class="card-title mb-3" style="color: #ff6600;">${data.name}</h2>
                                <h6 class="mb-4" style="color: #888;">Стандарт ИУ5-46Б</h6>

                                <p class="card-text fs-5 mb-4" style="color: #d1d1d1; line-height: 1.6;">
                                    ${data.description}
                                </p>

                                <p class="card-text mt-auto">
                                    <small style="color: #ff6600;">✓ Выделенные ресурсы</small><br>
                                    <small style="color: #ff6600;">✓ Защита от DDoS</small><br>
                                    <small style="color: #ff6600;">✓ Аппаратная балансировка нагрузки</small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document
            .getElementById("back-btn")
            .addEventListener("click", this.clickBack.bind(this));
    }
}
