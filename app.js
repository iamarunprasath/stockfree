const auth = "563492ad6f91700001000001d74eaa6212b1462d93db3465b571167b";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");
let searchValue;
let currentSearch;
let page=1;
let fetchLink;

searchInput.addEventListener("input" , updateInput);
form.addEventListener("submit", (e)=>{
    currentSearch = searchValue;
    e.preventDefault();
    searchPhotos(searchValue);
});
more.addEventListener("click", loadMore);
function updateInput(e){
    searchValue = e.target.value;
}
async function fetchApi(url) {
    const dataFetch = await fetch( url , {
        method: "GET",
        headers:{
            Accept: "application/json",
            Authorization: auth
        }
    }
    );
    const data = await dataFetch.json();
    return data;
}

function generatePictures(data) {
        data.photos.forEach(photo => {
        console.log(photo);
        const galleryImg = document.createElement("div");
        galleryImg.classList.add("gallery-img");
        galleryImg.innerHTML = 
        `<div class="gallery-info">
        <p> ${photo.photographer}</p>
        <a href= ${photo.src.original} target="_blank" download="ShutterFreeImage">Download</a></div>
        <img src=${photo.src.large}></img>`;
        gallery.appendChild(galleryImg);   
    }); 
}

async function curatedPhotos(){
    fetchLink= "https://api.pexels.com/v1/curated?per_page=15&page=1"
    const data = await fetchApi(fetchLink);
    generatePictures(data);

}
curatedPhotos();

async function searchPhotos(search){
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${search}&per_page=15&page=1`
    const data = await fetchApi(fetchLink);
    generatePictures(data);

}
function clear() {
    gallery.innerHTML ="";
    searchInput.value="";
}

async function loadMore() {
    page++;
    if(currentSearch){
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
    }
    else{
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }

    const data = await fetchApi(fetchLink);
    generatePictures(data);
}



//Scroll up


var mybutton = document.getElementById("upBtn");

mybutton.addEventListener("click", topFunction);

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
