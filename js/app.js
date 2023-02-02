/**
 * TODO: анімоване приховуванння і відображення бокової панелі
 * 1) знайти елемент, на який будеш клікати мишкою
 * 2) підписаьтися у нього на Event click
 * 3) під час цього івенту переключати стан панелі(прихована відображена). Перехід має бути анімованим
 */
const btnBack = document.querySelector('.header__button-back')
let item = document.querySelector(".sidenav")

btnBack.addEventListener('click', function () {
    item.classList.toggle("sidenav__action");
})

btnBack.addEventListener('click', function () {
    let btnBack = document.querySelector('.arrow-back')
    btnBack.classList.toggle("arrow-forth");
})
