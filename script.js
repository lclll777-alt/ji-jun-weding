// ==========================
// Wedding Gallery v1
// ==========================

const pageTitle = document.getElementById("pageTitle");
const homePage = document.getElementById("homePage");
const gallery = document.getElementById("gallery");

let photoData = {};

// 메뉴 생성
function createMenu() {

    const menu = document.querySelector(".sidebar ul");

    menu.innerHTML = "";

    // Home
    const home = document.createElement("li");
    home.innerHTML = "🏠 Home";
    home.classList.add("active");

    home.onclick = () => {

        document.querySelectorAll(".sidebar li")
            .forEach(li => li.classList.remove("active"));

        home.classList.add("active");

        pageTitle.innerText = "Wedding Gallery";

        gallery.innerHTML = "";

        homePage.style.display = "block";

    };

    menu.appendChild(home);

    // 폴더 메뉴 생성
    Object.keys(photoData).forEach(folder => {

        const li = document.createElement("li");

        li.innerHTML = `📂 ${capitalize(folder)} (${photoData[folder].length})`;

        li.onclick = () => {

            document.querySelectorAll(".sidebar li")
                .forEach(li => li.classList.remove("active"));

            li.classList.add("active");

            openFolder(folder);

        };

        menu.appendChild(li);

    });

}

// 폴더 열기
function openFolder(folder){

    pageTitle.innerText = capitalize(folder);

    homePage.style.display = "none";

    gallery.innerHTML = "";

    photoData[folder].forEach(file=>{

        const img=document.createElement("img");

        img.src=`images/${folder}/${file}`;

        img.loading="lazy";

        img.alt=file;

        img.onclick=()=>{

    currentFolder=folder;

    openLightbox(img.src);

};

        gallery.appendChild(img);

    });

}

// 첫 글자 대문자
function capitalize(text){

    return text.charAt(0).toUpperCase()+text.slice(1);

}

// =======================
// Advanced Lightbox
// =======================

let currentFolder = "";

let currentIndex = 0;

const lightbox = document.createElement("div");

lightbox.className="lightbox";

lightbox.innerHTML=`

<button id="prevBtn" class="lb-btn">◀</button>

<img id="lightboxImage">

<button id="nextBtn" class="lb-btn">▶</button>

<button id="closeBtn" class="lb-btn">✕</button>

<a id="downloadBtn" class="lb-btn" download>⬇ 다운로드</a>

<div id="photoCount"></div>

`;

document.body.appendChild(lightbox);

const lightboxImage=document.getElementById("lightboxImage");

const photoCount=document.getElementById("photoCount");

const downloadBtn=document.getElementById("downloadBtn");

function openLightbox(src){

    currentIndex = photoData[currentFolder].findIndex(file =>
        src.endsWith("/" + file)
    );

    if(currentIndex === -1){
        currentIndex = 0;
    }

    updateLightbox();

    lightbox.classList.add("active");

}

function updateLightbox(){

    if(currentIndex < 0) currentIndex = 0;

    if(currentIndex >= photoData[currentFolder].length)
        currentIndex = photoData[currentFolder].length-1;

    const file = photoData[currentFolder][currentIndex];

    const src = `images/${currentFolder}/${file}`;

    lightboxImage.src = src;

    downloadBtn.href = src;

    photoCount.innerHTML =
        `${currentIndex+1} / ${photoData[currentFolder].length}`;

}

function nextPhoto(){

    currentIndex++;

    if(currentIndex>=photoData[currentFolder].length){

        currentIndex=0;

    }

    updateLightbox();

}

function prevPhoto(){

    currentIndex--;

    if(currentIndex<0){

        currentIndex=photoData[currentFolder].length-1;

    }

    updateLightbox();

}

document.getElementById("nextBtn").onclick=nextPhoto;

document.getElementById("prevBtn").onclick=prevPhoto;

document.getElementById("closeBtn").onclick=()=>{

    lightbox.classList.remove("active");

}

lightbox.onclick=e=>{

    if(e.target===lightbox){

        lightbox.classList.remove("active");

    }

};

document.addEventListener("keydown",e=>{

    if(!lightbox.classList.contains("active"))

        return;

    if(e.key==="Escape")

        lightbox.classList.remove("active");

    if(e.key==="ArrowRight")

        nextPhoto();

    if(e.key==="ArrowLeft")

        prevPhoto();

});

// ESC 종료

document.addEventListener("keydown",e=>{

    if(e.key==="Escape"){

        lightbox.classList.remove("active");

    }

});

// ==========================
// JSON 읽기
// ==========================

fetch("photos.json")

.then(res=>res.json())

.then(data=>{

    photoData=data;

    createMenu();

})

.catch(err=>{

    console.error(err);

});