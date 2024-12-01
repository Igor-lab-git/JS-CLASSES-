//DOM

const serch = document.querySelector('#serch');
const mainGrid = document.querySelector('#grid');
const btnS = document.querySelector('#btn');

//склад, магазин
const store = [
    {id: 1, img:'./img/Picap.jpg', name: 'Picap', description: 'Рабочая машина', price: '1000 $'},
    {id: 2, img:'./img/Mustang.jpg', name: 'Mustang', description: 'Спортивная машина', price: '10000 $'},
    {id: 3, img:'./img/Lend-Rower.jpg', name: 'Land-Rower', description: 'Джип', price: '15000 $'},
    {id: 4, img:'./img/Mitsubisi.jpg', name: 'Mitsubisi', description: 'Внедорожник', price: '1200 $'},
    {id: 5, img:'./img/Moscvich.jpg', name: 'Moscvich', description: 'Отечественная машина', price: '500 $'},
    {id: 6, img:'./img/Busik.jpg', name: 'Busik', description: 'Семейная машина', price: '1100 $'},
]

//карзина
let cart = [];


//создаёт калсс калька
class Card {
    constructor(id, img, name, description, price, href) {
        this.id = id,
        this.img = img,
        this.name = name,
        this.description = description,
        this.price = price,
        this.href = href
    }
//метод добавляет в карзину
    addToCart(id, price) {
        cart.push({
            id,
            price
        })
    }

    // создаёт новые картички с новыми классами
    render () {
        const mainWrapper = document.createElement('div');
        mainWrapper.classList.add('card')


        const HTML = `
        <div id="card">
            <div class="add" id="add">Добавлено</div>

            <img class="card-img" id="card-img" src="${this.img}" alt="${this.name}">
            <div class="card-info" id="card-info">
                <h2 class="title" id="title">${this.name}</h2>
                <p class="card-text" id="card-text">${this.description}</p>

            </div>
            <div class="wrapper-btn">
                <button data-price = "${this.price}" class="btn" id="btn">Купить</button>
                <a class="link" id="link" href="#">Подробнее</a>
            </div>
        </div>
        `
//созданные карточки классов вставляются в узел mainGrid сетку
        mainWrapper.innerHTML = HTML;
        mainGrid.append(mainWrapper);

 // находим кновки и div-добавить в карточке       
       const btn = mainWrapper.querySelector('#btn');
       const add = mainWrapper.querySelector('#add'); //изначально имеет статус display: none

//при клике добавляет товар в карзину методом addToCart()       
       btn.addEventListener('click', (e) => {
        this.addToCart(this.id, e.target.dataset.price);
        btn.disabled = true; //блокирует кнопку при покупке
        add.classList.add('show'); //при клике добавляет элемент Добавленно
       })

//что бы товар оставался в карзине при новым поиске товара дублирование логики добавление элемента Добавленно
       const itemInCArt = cart.find((el) => el.id ===this.id);
       btn.disabled = itemInCArt;
       itemInCArt && add.classList.add('show');

       
    }

}

// функция избавляется от дублирования дочерних узлов
const removeAll = () => {
    while(mainGrid.children[0]) {
        mainGrid.replaceChildren()
    }
}

//функция нахождение крточки вводя какой либо текст в поиск
const renderAll = (text) => {

    removeAll() //изночально удаляет все элементы
// a = если текст пустой, то паказывает все карточки, иначе текст отфильтровывает товар в магазине от остальных карточек
    const a = !text ? store : store.filter(el => el.name.toLowerCase().includes(text) || el.description.toLowerCase().includes(text))
// отображение всех отфильтрованных елементов 
    a.filter(el => el.name.toLowerCase().includes(text) || el.description.toLowerCase().includes(text)).forEach((el) => {
        new Card(el.id, el.img, el.name, el.description, el.price).render();
    })
}

//изначально отрисовывает в документе карточки не нажимая на поиск и вводя название
document.addEventListener('DOMContentLoaded', () => {
    renderAll('')
})

//в поиске input функция renderAll() отображает наш поиск
serch.addEventListener('input', (e) => {
    renderAll(e.target.value) // в аргументе значение того поиска которого мы вписали в поиск
})





