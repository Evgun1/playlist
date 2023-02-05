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


document.addEventListener('DOMContentLoaded', init)

function init() {
    const searchForm = document.forms.item('itunes-search')
    document.addEventListener('click', addSongBtnClick)

    if (searchForm) {
        searchForm.addEventListener('submit', searchFormSubmitHandler)
    }
}

async function searchFormSubmitHandler(event) {
    event.preventDefault()
    const form = event.currentTarget
    const searchTerm = form['term']
    const termValue = searchTerm.value
    const url = form.action
    const endpoint = `${url}?term=${termValue}&limit=10`
    // console.log(endpoint)
    const songItemTmpl = document.getElementById('song-item')
    const songWrapper = document.querySelector('.songs-list__row')

    try {
        songWrapper.getElementsByClassName.opacity = .5

        const response = await fetch(endpoint, {
            method: "GET"
        })
        console.log(response);
        const json = response.ok && response.status === 200 ? await response.json() : new Error(response.statusText)
        if (json.resultCount > 0 && songItemTmpl) {
            let outputHtml = ""


            json.results.forEach(element => {
                // const songImageUrl = element.artworkUrl100
                const songImageAlt = element.trackName
                const songName = element.trackName
                const artistName = element.artistName
                const albumName = element.collectionName
                const songDuration = element.trackTimeMillis
                const { artworkUrl100: songImageUrl } = element

                const durationOutput = getTimeOutput(songDuration)

                outputHtml += songItemTmpl.innerHTML
                    .replace('{{songImageUrl}}', songImageUrl)
                    .replace('{{songImageAlt}}', songImageAlt)
                    .replace('{{songName}}', songName)
                    .replace('{{artistName}}', artistName)
                    .replace('{{albumName}}', albumName)
                    .replace('{{songDuration}}', durationOutput)
                // outputHtml.replaceChild('{{songImageUrl}}', songImageUrl)


            });
            console.log(outputHtml);

            songWrapper.innerHTML = outputHtml
        } else {
            songWrapper.innerHTML = "<h1>Nothing Was found</h1>"
        }

    } catch (e) {
        console.log(e)
        songWrapper.innerHTML = "<h1>Somethimg is wrong</h1>"

    }finally{
        songWrapper.getElementsByClassName.opacity = 1

    }

}

function addSongBtnClick(event) {
    const addButtton = event.target.closest('.songs-item__row-btn')
    if (!addButtton) return

    console.log('add song');
}

function getTimeOutput(duration) {
    let milliseconds = parseInt((duration % 1000) / 100),
        seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    console.log(minutes + ":" + seconds)

    return minutes + ":" + seconds;
}