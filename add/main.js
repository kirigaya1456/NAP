// Обрати внимание на путь: мы заходим в папку pages, затем в main
import { MainPage } from './pages/main/index.js';

document.addEventListener("DOMContentLoaded", () => {
    // Ищем тот самый div#root из твоего main.html
    const rootElement = document.getElementById('root');

    if (rootElement) {
        // Создаем экземпляр страницы и рендерим карточки
        const mainPage = new MainPage(rootElement);
        mainPage.render();
    } else {
        console.error("Элемент #root не найден на странице!");
    }
});
