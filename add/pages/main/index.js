import { CatCardComponent } from "../../components/cat-card/index.js";
import { AlertComponent } from "../../components/alert/index.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getData() {
        return [
            {
                id: 1,
                // Используем тематичные иконки или картинки серверов
                src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop",
                name: "Виртуальные серверы (VPS/VDS)",
                description: "Масштабируемые облачные серверы для ваших проектов. Высокий аптайм и SSD NVMe диски."
            },
            {
                id: 2,
                src: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?q=80&w=1000&auto=format&fit=crop",
                name: "Выделенные серверы",
                description: "Максимальная производительность. Полный контроль над физическим оборудованием дата-центра."
            },
            {
                id: 3,
                src: "https://habrastorage.org/getpro/habr/upload_files/f15/134/52c/f1513452c81d47bc7749c8c5d5005326.png",
                name: "Балансировщики нагрузки",
                description: "Интеллектуальное распределение трафика между дата-центрами для отказоустойчивости."
            }
        ];
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

    const cat = this.getData().find(item => item.id == id)

    const page = new ProductPage(this.parent, cat)
    page.render()
}

    showAlert(item) {
        const alert = new AlertComponent(this.parent);
        alert.render(`✅ Услуга «${item.name}» добавлена в вашу заявку!`);
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        this.getData().forEach(cat => {
            const card = new CatCardComponent(this.pageRoot);
            card.render(
                cat,
                this.clickCard.bind(this),
                this.showAlert.bind(this)
            );
        });
    }
}
