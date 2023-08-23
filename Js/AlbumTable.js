const urlPostAlbum = 'http://localhost:8080/addAlbum'
document.addEventListener('DOMContentLoaded', createFormEventListener);
let formAlbum;

function createFormEventListener(){
    formAlbum = document.getElementById("album-form");
    formAlbum.addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event){
    event.preventDefault();
    const formData = new FormData(formAlbum);
    console.log(formData)
    const jsonToPost = convertFormDataToJson(formData);
    console.log(jsonToPost)
    try {
        const responseData = await  postFormDataAsJson(urlPostAlbum, jsonToPost);
        console.log(responseData)

        actionFetchAlbums()
    }catch (error){
        alert(error .message);
        console.error(error);
    }
}

function convertFormDataToJson(formData){
    const plainFormData = Object.fromEntries(formData.entries());
    const formdataJsonToString = JSON.stringify(plainFormData);
    console.log(formdataJsonToString)
    return formdataJsonToString
}

async function postFormDataAsJson(url, jsonToSend){
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: jsonToSend,
    };
    const response = await fetch(url, fetchOptions);
    if(!response.ok){
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    return response.json();

}

const urlGetAlbums = 'http://localhost:8080/albums'
const tableAlbums = document.getElementById('album-list')

async function createAlbumTable(album){
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${album.id}</td>
    <td>${album.title}</td>
    <td>${album.artist}</td>
    <td>${album.genre}</td>
    <td>${album.availability}</td>
    <td>${album.store}</td>
`;
    cell = row.insertCell(4)
    let pbUpdate = document.createElement("button")
    pbUpdate.textContent = "Update"
    pbUpdate.className = "buttonUpdate"
    pbUpdate.addEventListener('click', function (){
        const albumId = album.id
        printAlbum(albumId, album)
    })
    cell.appendChild(pbUpdate)
    tableAlbums.appendChild(row)
}

let lstAlbums = []
async function actionFetchAlbums(){
    lstAlbums = await fetchAny(urlGetAlbums);
    tableAlbums.innerHTML = '';
    lstAlbums.forEach(createAlbumTable)
}

function printAlbum(albumId, album){
    console.log(albumId)
    console.log(album)
}