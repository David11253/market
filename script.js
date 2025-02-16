import { market } from "./game.js"; // Импорт данных

document.addEventListener("DOMContentLoaded", () => {
    const marketContainer = document.getElementById("market");
    const sortButton = document.getElementById("sortButton");

    let sortMode = 0; // 0 - Цена ↑, 1 - Цена ↓, 2 - А-Я, 3 - Я-А
    const sortModes = ["Сортировка: Цена ↑", "Сортировка: Цена ↓", "Сортировка: А-Я", "Сортировка: Я-А"];

    // Создаём модальное окно (скрыто по умолчанию)
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.style.display = "none"; // Скрыто по умолчанию
    document.body.appendChild(modal);

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    modal.appendChild(modalContent);

    const closeButton = document.createElement("span");
    closeButton.innerHTML = "✖";
    closeButton.classList.add("close-button");
    modalContent.appendChild(closeButton);

    const modalInfo = document.createElement("div");
    modalContent.appendChild(modalInfo);

    function renderMarket() {
        marketContainer.innerHTML = ""; // Очистка контейнера

        market.forEach((item) => {
            const product = document.createElement("div");
            product.classList.add("product");

            product.innerHTML = `
                <h2>${item.name}</h2>
                <img src="${item.img}" alt="${item.name}">
                <div>
                    <button class="bt">Подробнее</button>
                    <p><strong>цена:</strong> ${item.specialkod}$ кол-во: ${item.number}</p>
                </div>       
            `;

            marketContainer.appendChild(product);

            const button = product.querySelector(".bt");

            // Открытие модального окна
            button.addEventListener("click", () => {
                modalInfo.innerHTML = `
                    <h2>${item.name}</h2>
                    <img src="${item.img}" alt="${item.name}">
                    <p><strong>Описание:</strong> ${item.informate}</p>
                    <p><strong>Доп. инфо:</strong> ${item.dpinfo}</p>
                    <p><strong>Кол-во:</strong> ${item.number}</p>
                    <p><strong>цена:</strong> ${item.specialkod}$</p>
                    <p>все идет в игровой валюте</p>
                `;
                modal.style.display = "flex";
            });
        });
    }

    function sortMarket() {
        if (sortMode === 0) {
            market.sort((a, b) => parseFloat(a.specialkod.replace(",", ".")) - parseFloat(b.specialkod.replace(",", "."))); // Цена по возрастанию
        } else if (sortMode === 1) {
            market.sort((a, b) => parseFloat(b.specialkod.replace(",", ".")) - parseFloat(a.specialkod.replace(",", "."))); // Цена по убыванию
        } else if (sortMode === 2) {
            market.sort((a, b) => a.name.localeCompare(b.name, "ru")); // А-Я
        } else if (sortMode === 3) {
            market.sort((a, b) => b.name.localeCompare(a.name, "ru")); // Я-А
        }

        renderMarket(); // Перерисовываем список товаров

        sortButton.innerText = sortModes[sortMode]; // Меняем текст кнопки
        sortMode = (sortMode + 1) % 4; // Переход к следующему режиму
    }

    // Закрытие модального окна
    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Закрытие окна при клике вне контента
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    sortButton.addEventListener("click", sortMarket);
    
    sortMarket(); // Запускаем сортировку и рендер
});
