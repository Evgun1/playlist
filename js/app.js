/**
 * TODO: анімоване приховуванння і відображення бокової панелі
 * 1) знайти елемент, на який будеш клікати мишкою
 * 2) підписаьтися у нього на Event click
 * 3) під час цього івенту переключати стан панелі(прихована відображена). Перехід має бути анімованим
 */
const btnBack = document.querySelector('.header__button-back')
let item      = document.querySelector(".sidenav")

btnBack.addEventListener('click', function () {
    item.classList.toggle("sidenav__action");
})

btnBack.addEventListener('click', function () {
    let btnBack = document.querySelector('.arrow-back')
    btnBack.classList.toggle("arrow-forth");
})


document.addEventListener('DOMContentLoaded', init)

function init() {
    const searchForm = document.forms.item('itunes-search')
    if (searchForm) {
        searchForm.addEventListener('submit', searchFormSubmitHandler)
    }
}

async function searchFormSubmitHandler(event) {
    event.preventDefault()
    const form       = event.currentTarget
    const searchTerm = form['term']
    const termValue  = searchTerm.value
    const url        = form.action
    const endpoint   = `${url}?term=${termValue}&limit=10`
    console.log(endpoint)

    try {
        const response = await fetch(endpoint, {
            method: "GET"
        })
        const json     = response.ok && response.status === 200 ? await response.json() : new Error(response.statusText)
        console.log(json)

    } catch (e) {
        console.log(e)
    }

}