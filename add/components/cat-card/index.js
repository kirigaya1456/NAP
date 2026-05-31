export class CatCardComponent {
    static activeTimers = new Set(); // Глобальное хранилище активных таймеров для всех карточек

    constructor(parent) {
        this.parent = parent;
        this.deleteTimer = null; // Переменная для хранения ID таймера удаления
    }

    getHTML(data) {
        return `
            <div id="card-${data.id}" class="card bg-dark text-light border-secondary m-2" style="width: 18rem; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
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

                    <!-- Новые кнопки по заданию -->
                    <button class="button w-100 mt-2" style="padding: 10px; border-radius: 6px; background: #ffc107; border: none; color: #000; font-weight: bold;" id="del-delay-btn-${data.id}">
                        Удалить через 50 сек
                    </button>
                    <button class="button w-100 mt-2" style="padding: 10px; border-radius: 6px; background: #dc3545; border: none; color: #fff; font-weight: bold;" id="del-btn-${data.id}">
                        Удалить сразу
                    </button>
                    <button class="button w-100 mt-2" style="padding: 10px; border-radius: 6px; background: #17a2b8; border: none; color: #fff; font-weight: bold;" id="action-btn-${data.id}">
                        Проверить таймер
                    </button>
                </div>
            </div>
        `;
    }

    addListeners(data, openListener, alertListener, deleteListener, actionListener) {
        document
            .getElementById(`open-btn-${data.id}`)
            .addEventListener("click", openListener);

        document
            .getElementById(`alert-btn-${data.id}`)
            .addEventListener("click", () => alertListener(data));

        const delayBtn = document.getElementById(`del-delay-btn-${data.id}`);
        const storageKey = `delete_timer_${data.id}`;

        // Вспомогательная функция для удаления и очистки хранилищ
        const performDelete = () => {
            CatCardComponent.activeTimers.delete(data.id);
            localStorage.removeItem(storageKey); // Убираем таймер из памяти браузера
            deleteListener(data.id);
        };

        // Проверяем при загрузке, есть ли сохраненный таймер в localStorage
        const savedTimer = localStorage.getItem(storageKey);
        if (savedTimer) {
            const remainingTime = parseInt(savedTimer, 10) - Date.now();
            if (remainingTime > 0) {
                delayBtn.innerText = "Удаление в процессе...";
                CatCardComponent.activeTimers.add(data.id);
                this.deleteTimer = setTimeout(performDelete, remainingTime); // Запускаем на оставшееся время
            } else {
                performDelete(); // Время уже вышло, пока страница перезагружалась, удаляем сразу
            }
        }

        delayBtn.addEventListener("click", (e) => {
            if (!this.deleteTimer) {
                e.target.innerText = "Удаление через 50с...";
                CatCardComponent.activeTimers.add(data.id); // Помечаем таймер как активный
                localStorage.setItem(storageKey, Date.now() + 50000); // Сохраняем время завершения таймера
                this.deleteTimer = setTimeout(performDelete, 50000); // Таймер на 50 секунд
            }
        });

        document.getElementById(`del-btn-${data.id}`).addEventListener("click", () => {
            if (this.deleteTimer) {
                clearTimeout(this.deleteTimer); // Сбрасываем таймер, если он был
                this.deleteTimer = null;
            }
            performDelete(); // Удаляем сразу и чистим localStorage
        });

        document.getElementById(`action-btn-${data.id}`).addEventListener("click", () => {
            const hasAnyTimer = CatCardComponent.activeTimers.size > 0;
            actionListener(data, hasAnyTimer);
        });
    }

    render(data, openListener, alertListener, deleteListener, actionListener) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
        this.addListeners(data, openListener, alertListener, deleteListener, actionListener);
    }
}
