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
                src: "https://c.pxhere.com/photos/83/d0/kitten_british_cat_pet_cute_cat_sweet_little-1387692.jpg!d",
                name: "Барсик",
                description: "Любит спать и есть"
            },
            {
                id: 2,
                src: "https://c.pxhere.com/photos/fd/59/cat_british_shorthair_mieze_blue_eye_fur_brown_beige_sweet-728026.jpg!d",
                name: "Мурзик",
                description: "Очень игривый"
            },
            {
                id: 3,
                src: "https://c.pxhere.com/photos/4a/cf/leopard_cat_big_cat_wildcat_zoo_tiergarten_dangerous_hunting-1042367.jpg!d",
                name: "Снежок",
                description: "Белый и пушистый"
            }
        ];
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `<div id="main-page" class="d-flex flex-wrap"></div>`;
    }

    clickCard(e) {
    const id = e.target.dataset.id

    const cat = this.getData().find(item => item.id == id)

    const page = new ProductPage(this.parent, cat)
    page.render()
}

    showAlert(cat) {
        const alert = new AlertComponent(this.parent);
        alert.render(`Вы погладили кота: ${cat.name} 😺`);
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
