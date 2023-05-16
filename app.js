// DOM Manipulation
// register sw (create seperated js file : contains all functionalities)
window.addEventListener('load',async function(){
    // fetch data from json api
    postsselect =document.getElementById('postsselect');
    postscontainer=document.getElementById('postscontainer');
    await fillselect();
    // register change event with select
    postsselect.addEventListener('change', displaypostdetails);
    // check if sw api available or not 
        if(navigator.serviceWorker){
            // supported
            console.log("service worker supported");
            // register logic for sw code (deal with cach , catch fetch data responses , ....)
            try{    
                await navigator.serviceWorker.register("./sw.js");
                console.log("sw registered");

            }catch(error){
                console.log("sw not registered",error);
            }
        }else{
            console.log("service worker not supported");
        }
});//end of load
async function  fillselect(){
   let allposts= await fetch("https://jsonplaceholder.typicode.com/posts");
   let allpostsasjs = await allposts.json();
  postsselect.innerHTML=  allpostsasjs.map(post=>{return `<option value="${post.id}">${post.title}</option>`})
}

async function displaypostdetails(event){
   let targetpost=await fetch(`https://jsonplaceholder.typicode.com/posts/${event.target.value}`)
    let targetpostasjs = await targetpost.json();
    postscontainer.innerHTML=`
        <div style="border:2px solid black;padding:10px;background-color:lightpink;margin:10px auto;width:80%">
            <h2>${targetpostasjs.title}</h2>
            <p>${targetpostasjs.body}</p>
        <div>
    `
}