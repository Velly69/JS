const http = new easyHttp();


//GET posts
// http.get('https://jsonplaceholder.typicode.com/posts', function(error, response){
//     if(error){
//         console.log(error);
//     }
//     else{
//         console.log(response);
//     }
// });


// GET post
// http.get('https://jsonplaceholder.typicode.com/posts/1', function(error, response){
//     if(error){
//         console.log(error);
//     }
//     else{
//         console.log(response);
//     }
// });

const data = {
    title: 'Custom post',
    body: 'Custom body post'
};

//POST post
// http.post('https://jsonplaceholder.typicode.com/posts', data, function(error, response){
//     if(error){
//         console.log(error);
//     }
//     else{
//         console.log(response);
//     }
// });

//UPDATE post
// http.put('https://jsonplaceholder.typicode.com/posts/1', data, function(error, response){
//     if(error){
//         console.log(error);
//     }
//     else{
//         console.log(response);
//     }
// });

//DELETE post
http.delete('https://jsonplaceholder.typicode.com/posts/1', function(error, response){
    if(error){
        console.log(error);
    }
    else{
        console.log(response);
    }
});