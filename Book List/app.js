class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI{
    addBookToList(book){
        const list = document.getElementById('book-list');
        //Create tr element
        const row = document.createElement('tr');
        //Insert columns
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
        `;
    
        list.appendChild(row);
    }

    showAlert(msg, className){
        const div = document.createElement('div');
        //Add classname
        div.className = `alert ${className}`;
        //Add text
        div.appendChild(document.createTextNode(msg));
        //Get parent
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');

        container.insertBefore(div, form);

        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();    
        }
    }

    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBox(){
        const books = Store.getBooks();
        const ui = new UI();
        books.forEach(book => {

            ui.addBookToList(book);
        })
    }

    static addBook(book){
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach((book, index) =>  {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    Store.displayBox();
});


//Add book
document.getElementById('book-form').addEventListener('submit', function(event){
    
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    const book = new Book(title, author, isbn );


    const ui = new UI();
    
    console.log(ui);

    if(title === '' || author === '' || isbn=== ''){
        //Error  alert
        ui.showAlert('Please, fill all the fields', 'error');
    }
    else{
        //Add book to list
        ui.addBookToList(book);

        //Add to local storage
        Store.addBook(book);

        ui.showAlert('Book added', 'success');

        ui.clearFields();
    }

    
    event.preventDefault();
});

//Delete book
document.getElementById('book-list').addEventListener('click', function(event){
    const ui = new UI();
    ui.deleteBook(event.target);

    Store.removeBook(event.target.parentElement.previousElementSibling.textContent);

    ui.showAlert('Book removed', 'success');

    event.preventDefault();
})
