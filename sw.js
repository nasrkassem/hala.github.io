// install : (set cahces)
let cachename="static-cache"
let cahceassets=[
    "./index.html",
    "./contact.html",
    "./images/UP/1.jpg",
    "./style.css",
    "./images/UP/2.jpg",
    "./fallback.json"

]
self.addEventListener('install',async function(){
    console.log("installed");
    //add cach using caches API using method open(cachename)
    let createdcache=await caches.open(cachename);
    await createdcache.addAll(cahceassets);
    // skipwaiting
    await self.skipWaiting();
    // add files inside cahes 
});//end of install

// activate : (manage cach or clear old cache )
self.addEventListener('activate',async function(){
    console.log("activated");
    // let allcaaches=await caches.keys();
    // for(let i=0;i<allcaaches.length;i++){
    //     if(allcaaches[i]!=cachename){
    //         await caches.delete(allcaaches[i]);
    //     }
    // }
});//end of activate

// fetch : (return response | ) : function event : fetch() : listen on fetch
self.addEventListener("fetch",async function(event){
    //console.log("fetched",event.request);
    // strategy : 1- cach first : any request will be respond to it from cache
//   return await  event.respondWith(caches.match(event.request));

    // check connectivity of user 
    
    // connected with internet : load data from network (from server)

    //else load data from cach
    

    if(!navigator.onLine){
    //    return await event.respondWith(caches.match(event.request));
     await cachefirst(event.request);
    }else{
    //    return await event.respondWith(fetch(event.request));
         await networkfirst(event.request);
    }

})

async function cachefirst(req){
   return await  caches.match(req) || await caches.match('fallback.json');
}

async function networkfirst(req){
    // create cache file dynamic according request
    
    let dynamiccach=await caches.open('cache-dynamic');
    let resp = await fetch(req);// fetch from network  
    try{ 
    await dynamiccach.put(req,resp.clone());
    }catch(error){
        console.log(error);
    }
    return resp;

    //if (!(evt.request.url.indexOf('http') === 0)) return; // skip the request. if request is not made with http protocol



}