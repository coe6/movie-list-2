const app = {
    init(selectors) {
        this.movies = []
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)
        this.template = document.querySelector(selectors.templateSelector)

        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', (ev) => {
                ev.preventDefault()
                this.handleSubmit(ev)
            })
    },

    renderListItem(movie) {
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = movie.id
        item.querySelector('.movieName').textContent = movie.name

        return item
    },

    handleSubmit(ev) {
        const f = ev.target

        const movieItem = {
            name: f.movieName.value,
            id: ++this.max,
        }

        this.movies.unshift(movieItem)

        const item = this.renderListItem(movieItem)
        this.list.insertBefore(item, this.list.firstElementChild)

        f.reset()
    },
}

app.init({
    formSelector: '#movieInput',
    listSelector: '#movieList',
    templateSelector: '.movie.template',
})