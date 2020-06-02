const http = new easyHTTP();

//GET users
// http.get('https://jsonplaceholder.typicode.com/users')
//     .then(data => console.log(data))
//     .catch(err => console.log(err));    


const data = {
    name: 'John Doe',
    username: 'JohnD',
    email: 'jdoe@gmail.com'
}

http.post('https://jsonplaceholder.typicode.com/posts', data)
    .then(data => console.log(data))
    .catch(err => console.log(err)); 


// http.put('https://jsonplaceholder.typicode.com/users/2', data)
//     .then(data => console.log(data))
//     .catch(err => console.log(err)); 

// http.delete('https://jsonplaceholder.typicode.com/users/2')
//     .then(data => console.log(data))
//     .catch(err => console.log(err)); 