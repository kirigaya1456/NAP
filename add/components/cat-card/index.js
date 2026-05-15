import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class CatCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card bg-dark text-light border-secondary m-2" style="width: 18rem; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
                <!-- Контейнер для 3D предпросмотра -->
                <div id="3d-container-${data.id}" style="height: 200px; width: 100%; background-color: #212529; position: relative;"></div>

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

    init3DModel(data) {
        const container = document.getElementById(`3d-container-${data.id}`);
        if (!container) return;

        // Инициализация сцены, камеры и рендера
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#212529'); // Под цвет карточки (bg-dark)

        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(0, 2, 5);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Добавляем свет
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 5);
        scene.add(directionalLight);

        // Контроллер для вращения
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enableZoom = false; // Отключаем зум, чтобы колесо мыши скроллило страницу
        controls.autoRotate = true;  // Медленное автоматическое вращение
        controls.autoRotateSpeed = 2.0;

        // Загрузка GLB модели
        const loader = new GLTFLoader();
        // По умолчанию грузим файл 'models/data_centr_rack.glb', но если в данных есть поле data.model, то используем его
        const modelUrl = data.model || '../../models/data_center_rack.glb';

        loader.load(modelUrl, (gltf) => {
            const model = gltf.scene;

            // Вычисляем габариты для автоматического центрирования и масштабирования
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            model.position.sub(center); // Центрируем

            // Масштабируем так, чтобы модель красиво помещалась в рамку
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 2.5 / maxDim;
            model.scale.set(scale, scale, scale);

            scene.add(model);
        }, undefined, (error) => {
            console.error(`Ошибка загрузки модели ${modelUrl}:`, error);
            container.innerHTML = `<div style="color: #ff6600; text-align: center; padding-top: 70px;">Модель не найдена<br><span style="font-size: 12px; color: #aaa;">Путь: ${modelUrl}</span></div>`;
        });

        // Анимация вращения
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();
    }

    render(data, openListener, alertListener) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
        this.addListeners(data, openListener, alertListener);
        this.init3DModel(data); // Запускаем рендер после добавления карточки в DOM
    }
}
