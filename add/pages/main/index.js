import { CatCardComponent } from "../../components/cat-card/index.js";
import { AlertComponent } from "../../components/alert/index.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.data = []; // Хранилище загруженных данных
    }

    async getData() {
        try {
            const response = await fetch('http://localhost:3000/stocks');
            if (!response.ok) throw new Error('Ошибка сети при загрузке данных');

            return await response.json();
        } catch (error) {
            console.error('Ошибка получения данных:', error);
            return [];
        }
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
    // Добавили центрирование и красивый отступ между карточками
    return `<div id="main-page" class="d-flex flex-wrap justify-content-center gap-4"></div>`;
}

    clickCard(e) {
    const id = e.target.dataset.id

    // Ищем товар в уже загруженных данных
    const cat = this.data.find(item => item.id == id)

    const page = new ProductPage(this.parent, cat)
    page.render()
}

    showAlert(item) {
        const alert = new AlertComponent(this.parent);
        alert.render(`✅ Услуга «${item.name}» добавлена в вашу заявку!`);
    }

    async deleteItem(id) {
        try {
            const response = await fetch(`http://localhost:3000/stocks/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Ошибка при удалении');

            // Напрямую удаляем элемент из DOM, чтобы не перерисовывать все и не сбрасывать чужие таймеры
            const cardElement = document.getElementById(`card-${id}`);
            if (cardElement) cardElement.remove();

            // Обновляем локальный массив, чтобы он оставался актуальным
            this.data = this.data.filter(item => item.id != id);
            CatCardComponent.activeTimers.delete(id); // Очищаем статус таймера (на всякий случай)
        } catch (error) {
            console.error('Ошибка удаления:', error);
        }
    }

    showTimerAlert(item, hasAnyTimer) {
        const alert = new AlertComponent(this.parent);
        if (hasAnyTimer) {
            alert.render(`⚠️ Внимание: в данный момент запущен таймер удаления для одной или нескольких карточек!`);
        } else {
            alert.render(`🕒 На данный момент нет ни одного активного таймера удаления.`);
        }
    }

    async render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        // Загружаем данные перед отрисовкой карточек
        this.data = await this.getData();

        this.data.forEach(cat => {
            const card = new CatCardComponent(this.pageRoot);
            card.render(
                cat,
                this.clickCard.bind(this),
                this.showAlert.bind(this),
                this.deleteItem.bind(this),
                this.showTimerAlert.bind(this)
            );
        });
    }
}
