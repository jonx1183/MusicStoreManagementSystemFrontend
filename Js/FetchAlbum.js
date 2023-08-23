const fetchAlbumsUrl = "http://localhost:8080/albums";
const postAlbumUrl = "http://localhost:8080/addAlbum"

function fetch(url){
    console.log(url)
    return fetch(url).then((response) => response.json())
}
let lstAlbums =[]
async function actionFetchAlbums(){
    lstAlbums = await fetch(fetchAlbumsUrl);
    lstAlbums.forEach(fillAlbumDropdown)
}

function fillAlbumDropdown(album){
    const el =document.createElement("option")
    el.textContent = album.title
    el.textContent = album.artist
    el.textContent = album.genre
    el.value = album.availability
    el.store = album
    ddAlbums.appendChild(el)

}

let body = {}
const postAlbumRequest = {
    method: "POST",
    headers: {
        "content-type": "application/json"
    },
    body: body
}

function postAlbums(album){
    body = JSON.stringify(album)
    console.log(body)
    postAlbumRequest.body = body
    fetch(postAlbumUrl, postAlbumRequest).catch((error) => console.log(error))
}

function actionPostAllAlbums(){
    if(lstAlbums){
        console.log("post all albums")
        lstAlbums.forEach(postAlbums)
    }
    else{
        console.log("Wrong!?")
    }
}

const pbFetchAlbums = document.getElementById("pbFetchAlbums")
pbFetchAlbums.addEventListener('click', actionFetchAlbums)
const pbPostAlbum = document.getElementById("pbPostAlbum")
pbPostAlbum.addEventListener('click', actionPostAllAlbums)