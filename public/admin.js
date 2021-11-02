async function admin(){
    let response = await fetch('http://localhost:3001/listBooks')
    let books = await response.json()
    console.log(books) 
    books.forEach(book => renderBooks(book))
        
}
// target root
let root = document.querySelector('#root')
// target ul
let ul = document.createElement('ul')

// create a function for renderBooks
function renderBooks(book) {
    let li = document.createElement('li')


    // Show lists books
    li.textContent = book.title

    // Show number of books using setAttributes
    let numbBooks = document.createElement('input')
    numbBooks.setAttribute('type', 'number')
    // Show the books quantity
    numbBooks.value = book.quantity
    // create Submit Button and name it 'Save'
    let submitBtn = document.createElement('button')
    submitBtn.textContent = 'Save'
    // addEventListener for the submitBtn
    submitBtn.addEventListener('click', async function (){
        let response = await fetch('http://localhost:3001/updateBook', {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'
        },
            body: JSON.stringify({
                id: book.id,
                quantity: numbBooks.value
            })
        })
        // updatedBook => no need to reload it will render on the console
        let updatedBook = await response.json()
        console.log(updatedBook)
    })


    //add or attached use append 
    ul.append(li)

    li.append(numbBooks, submitBtn)
    
}
root.append(ul)

admin()