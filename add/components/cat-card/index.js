export class CatCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card bg-dark text-light border-secondary m-2" style="width: 18rem; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
                <!-- Фиксируем высоту картинок, чтобы карточки были ровными, и немного затемняем их (opacity) -->
                <img src="${data.src}" class="card-img-top" alt="Услуга дата-центра" style="height: 200px; object-fit: cover; opacity: 0.85;">

                <div class="card-body d-flex flex-column">
                    <h5 class="card-title" style="color: #ff6600; font-weight: 600;">${data.name}</h5>
                    <p class="card-text flex-grow-1" style="color: #d1d1d1; font-size: 0.95rem;">${data.description}</p>

                    <!-- Используем твой класс button для основной кнопки -->
                    <button class="button w-100 mb-3" style="padding: 10px; border-radius: 6px; border: none; font-weight: bold;" id="alert-btn-${data.id}">
                        Добавить в заявку
                    </button>

                    <!-- Вторичная кнопка с прозрачным фоном и оранжевой рамкой -->
                    <button class="button w-100" style="padding: 10px; border-radius: 6px; background: transparent; border: 1px solid #ff6600; color: #ff6600; font-weight: bold;"
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
