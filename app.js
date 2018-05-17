const app = {
    init(selectors) {
        this.movies = []
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)

        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', (ev) => {
                ev.preventDefault()
                this.handleSubmit(ev)
            })
    },

    renderListItem(movie) {
        const item = document.createElement('li')
        item.dataset.id = movie.id
        item.textContent = movie.name

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
})