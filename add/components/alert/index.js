export class AlertComponent {
    constructor(parent) {
        // Теперь мы игнорируем переданный parent (root),
        // чтобы отвязать уведомления от сетки карточек сайта.

        // Ищем специальный плавающий контейнер для уведомлений
        this.container = document.getElementById('alerts-container');

        // Если его еще нет на странице — создаем
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'alerts-container';

            // Классы Bootstrap: фиксируем (position-fixed), прижимаем наверх (top-0)
            // и вправо (end-0), добавляем отступы (p-3)
            this.container.className = 'position-fixed top-0 end-0 p-3';

            // Делаем так, чтобы уведомления были гарантированно поверх всех остальных элементов сайта
            this.container.style.zIndex = '9999';

            // Прикрепляем контейнер прямо к телу страницы
            document.body.appendChild(this.container);
        }
    }

    render(message) {
        // --- 1. ЛИМИТ НА 4 УВЕДОМЛЕНИЯ ---
        const currentAlerts = this.container.querySelectorAll('.alert');
        if (currentAlerts.length >= 4) {
            // Удаляем самое старое уведомление (оно находится первым в списке)
            currentAlerts[0].remove();
        }

        // --- 2. СОЗДАНИЕ УВЕДОМЛЕНИЯ ---
        const alertDiv = document.createElement('div');
        // Добавил класс shadow для красивой легкой тени
        // Меняем alert-warning на темный фон с оранжевой рамкой
        alertDiv.className = 'alert bg-dark text-light border alert-dismissible fade show shadow mb-2';
        alertDiv.style.borderColor = '#ff6600';

        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" aria-label="Close"></button>
        `;

        const closeBtn = alertDiv.querySelector('.btn-close');

        // --- 3. ЗАКРЫТИЕ ПО КЛИКУ ---
        closeBtn.addEventListener('click', () => {
            alertDiv.remove();
        });

        // --- 4. АВТОМАТИЧЕСКОЕ УДАЛЕНИЕ ЧЕРЕЗ 4 СЕКУНДЫ ---
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 4000);

        // --- 5. ВСТАВКА В ПЛАВАЮЩИЙ КОНТЕЙНЕР ---
        // append добавляет новые уведомления друг под другом
        this.container.append(alertDiv);
    }
}
