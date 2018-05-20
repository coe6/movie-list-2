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
        console.log(this.movies)
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

    filterList(ev) {
        ev.preventDefault()

    const filter = filterForm.filter.value
    const movies = document.querySelector('#movies')

    while(movies.hasChildNodes()) {
        movies.removeChild(movies.lastChild)
    }

    if(filter === 'noFilter') {
        const list = document.createElement('ul')

        for(var i = 0; i < movieArray.length; i++) {
            Object.keys(movieArray[i]).map(value => {
                const item = renderListItem(value, movieArray[i][value])
                list.appendChild(item)
                })
            createDeleteBttn(list)
        }

        movies.appendChild(list)
        return
    } else {
        const list = document.createElement('ul')

        for(var i = 0; i < movieArray.length; i++) {
            if(filter === movieArray[i].Genre) {
                Object.keys(movieArray[i]).map(value => {
                    const item = renderListItem(value, movieArray[i][value])
                    list.appendChild(item)
                })

                createDeleteBttn(list)
            }
        }

        movies.appendChild(list)
    }

    },
}

app.init({
    formSelector: '#movieInput',
    listSelector: '#movieList',
    templateSelector: '.movie.template',
})



//homework:
    //add buttons to move the movie up and down the list
    //make the buttons also change their place in the array
    //allow users to edit the names of the movies in the list after they are added (span content editable)