const app = {
    init(selectors) {
        this.movies = []
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)
        this.template = document.querySelector(selectors.templateSelector)
        this.filter = document.querySelector(selectors.filterSelector)

        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', (ev) => {
                ev.preventDefault()
                this.handleSubmit(ev)
            })

        document
            .querySelector(selectors.filterSelector)
            .addEventListener('submit', ev => {
                ev.preventDefault()
                this.filterList(ev)
            })
    },

    renderListItem(movie) {
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = movie.id
        item.querySelector('.movieName').textContent = movie.name

        item
            .querySelector('.button.alert')
            .addEventListener('click', this.deleteItem.bind(this, movie))

        item
            .querySelector('.button.fav')
            .addEventListener('click', this.favItem.bind(this, movie))

        item
            .querySelector('.button.moveUp')
            .addEventListener('click', this.moveUp.bind(this, movie))

        item
            .querySelector('button.moveDown')
            .addEventListener('click', this.moveDown.bind(this, movie))

        item
            .querySelector('button.edit')
            .addEventListener('click', this.editContent.bind(movie, this))

        return item
    },

    handleSubmit(ev) {
        const f = ev.target

        const movieItem = {
            name: f.movieName.value,
            genre: f.genre.value,
            status: f.watch.value,
            fav: false,
            id: ++this.max,
        }

        this.movies.unshift(movieItem)

        const item = this.renderListItem(movieItem)
        this.list.insertBefore(item, this.list.firstElementChild)

        f.reset()
    },

    favItem(movie, ev) {
        const listItem = ev.target.closest('.movie')
        movie.fav = !movie.fav

        if(movie.fav) {
            listItem.classList.add('fav')
        } else {
            listItem.classList.remove('fav')
        }
    },

    deleteItem(movie, ev) {
        const listItem = ev.target.closest('.movie')
        listItem.remove()

        for(let i = 0; i < this.movies.length; i++) {
            if(listItem.dataset.id === this.movies[i].id.toString()) {
                this.movies.splice(i, 1)
                break
            }
        }
    },

    moveUp(movie, ev) {
        const pos = this.movies.indexOf(movie)
        this.movies.splice(pos, 1)
        this.movies.splice(pos-1, 0, movie)

        while(this.list.hasChildNodes()) {
            this.list.removeChild(this.list.lastChild)
        }

        for(var i = this.movies.length-1; i >= 0; i--) {
            const item = this.renderListItem(this.movies[i])
            this.list.insertBefore(item, this.list.firstElementChild)
        }
    },

    moveDown(movie, ev) {
        const pos = this.movies.indexOf(movie)
        this.movies.splice(pos, 1)
        this.movies.splice(pos+1, 0, movie)

        while(this.list.hasChildNodes()) {
            this.list.removeChild(this.list.lastChild)
        }

        for(var i = this.movies.length-1; i >= 0; i--) {
            const item = this.renderListItem(this.movies[i])
            this.list.insertBefore(item, this.list.firstElementChild)
        }
    },

    editContent(movie, ev) {

    },

    filterList(ev) {
        const filter = this.filter.filter.value

        while(this.list.hasChildNodes()) {
            this.list.removeChild(this.list.lastChild)
        }

        if(filter === 'noFilter') {
            for(var i = this.movies.length-1; i >= 0; i--) {
                const item = this.renderListItem(this.movies[i])
                this.list.insertBefore(item, this.list.firstElementChild)
            }
            return
        } else {
            const list = document.createElement('ul')

            for(var i = 0; i < this.movies.length; i++) {
                if(filter === this.movies[i].genre) {
                    const item = this.renderListItem(this.movies[i])
                    this.list.insertBefore(item, this.list.firstElementChild)
                }
            }
        }
    },

    
}

app.init({
    formSelector: '#movieInput',
    listSelector: '#movieList',
    templateSelector: '.movie.template',
    filterSelector: '#filterMovie',
})



//homework:
    //allow users to edit the names of the movies in the list after they are added (span content editable)