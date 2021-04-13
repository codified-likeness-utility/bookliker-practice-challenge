document.addEventListener("DOMContentLoaded", () => {
    getBooks()
});

const getBooks = () => {
    fetch('http://localhost:3000/books')
    .then(response => response.json())
    .then(books => {
        books.forEach(book => {
            renderBooks(book)
        });
    });
};

const renderBooks = (book) => {
    const listContainer = document.getElementById('list')

        const listItem = document.createElement('li')
            listItem.innerHTML = book.title
            listItem.addEventListener('click', (e) => {
                e.preventDefault()
                renderShowPage(book)
            });
    listContainer.append(listItem)    
}; 

const renderShowPage = (book) => {
    
    const showPanel = document.getElementById('show-panel')
        showPanel.innerHTML = ""

        const bookThumbnail = document.createElement('img')
            bookThumbnail.src = book.img_url

            const bookTitle = document.createElement('h3')
                bookTitle.innerText = book.title

                const bookSubtitle = document.createElement('h4')
                    bookSubtitle.innerText = book.subtitle

                    const bookAuthor = document.createElement('h4')
                        bookAuthor.innerText = book.author

                        const bookDescription = document.createElement('p')
                            bookDescription.innerText = book.description 

                            const likeDiv = document.createElement('div')
                                likeDiv.id = 'like-div'

                                const likeUl = document.createElement('ul')
                                    likeUl.id = 'like-ul'

                                    const bookUsers = book.users
                                        bookUsers.forEach(user => {
                                            const likeList = document.createElement('li')
                                                likeList.innerText = user.username
                                                    likeUl.append(likeList)
                                            })

                                        //create a like button with event listener
                                            const likeButton = document.createElement('button')
                                                likeButton.innerText = "Like"
                                                    likeButton.addEventListener('click', (e) => {
                                                        e.preventDefault()
                                                        addLike(e, book)
                                                    })

    showPanel.append(bookThumbnail, bookTitle, bookSubtitle, bookAuthor, bookDescription, likeDiv)
        likeDiv.append(likeUl, likeButton)
};

const addLike = (e, book) => {
    e.preventDefault()

        const users = book.users
        const newBody = {users: [...users, {"id":1, "username":"pouros"}]}

        fetch(`http://localhost:3000/books/${book.id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(newBody)
    })
    .then(response => response.json())
    .then(data => {
        // book.users.push(data)
        renderShowPage(data)

    })
}