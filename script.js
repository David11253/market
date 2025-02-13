import { market } from "./game.js"; // Импорт данных

document.addEventListener("DOMContentLoaded", () => {
    const marketContainer = document.getElementById("market");

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

    // Добавляем товары в список
    market.forEach((item) => {
        const product = document.createElement("div");
        product.classList.add("product");

        product.innerHTML = `
            <h2>${item.name}</h2>
            <img src="${item.img}" alt="${item.name}">
            <button class="bt">Подробнее</button>
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
            `;
            modal.style.display = "flex";
        });
    });

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
});
