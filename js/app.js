// variable declaration
const inputField = document.getElementById('input-field');
const searchButton = document.getElementById('search-button');
const totlaResult = document.getElementById('total-result');
const errorMessage = document.getElementById('error-message');
const bookContainer = document.getElementById('book-container');


// add event listener
    searchButton.addEventListener('click', () => { 
       
    ///// preloader added ///// 
    errorMessage.innerHTML = `
    <div class="w-100 h-100 d-flex justify-content-center align-items-center ">
    <div class="spinner-border text-info" role="status">
    <span class="visually-hidden">Loading...</span>
    </div>
    </div>

    `;
    const search = inputField.value;
    const url = `https://openlibrary.org/search.json?q=${search}`;
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => showData(data));

    const showData = (books => {
    const total = books.numFound;
    console.log(books);

        books = books.docs
        console.log(books);
        const newArray = books.filter((book) => book.cover_i !== undefined && book.author_name !== undefined && book.publisher !== undefined && book.title !== undefined && book.first_publish_year !== undefined);
        console.log(newArray);

         inputField.value = '';


    ///// validation for ERROR MESSAGE /////
        if ( newArray.length === 0){
            errorMessage.innerHTML = '';
            errorMessage.innerHTML = ` NO RESULT FOUND`;
            totlaResult.innerHTML = '';
            bookContainer.innerHTML = '';
        }
        else{
           
            totlaResult.innerHTML = `Total Books: ${total}, Showing ${newArray.length} Books`;
            errorMessage.innerHTML = '';
            

    //// forEach loop  /////
            newArray.forEach(book => {
            
                const div = document.createElement('div');
                div.innerHTML = `
                 <div class = "card my-3" style= "width: 18rem; height: auto">
                 <img class=" card-img-top img-fluid"  style="width:100%; height 250px" src= 'https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg'>
                 <div class = "card-body">
                 <h5 class= "card-title text-success">${book.title}</h5>
                 <p class= "card-subtitle text-primary mb-2">${book.author_name[0]}</p>
                 <p class=" card-text text-secondary">${book.publisher[0]}</p>
                 <P class ="card-text"> First Publish Year: ${book.first_publish_year}</p>
                 </div>
                 </div>
                `;
                bookContainer.appendChild(div);
            })
        }
    })
})
