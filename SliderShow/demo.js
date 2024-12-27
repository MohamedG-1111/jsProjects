let imges = document.querySelectorAll(".imgs img");
let arrayImg = Array.from(imges);
let current = 1;
let length = imges.length;

function Show() {
    removeAll(); 
    arrayImg[current - 1].classList.add("active"); 
    current++;
    if (current > length) {
        current = 1; 
    }
}

function removeAll() {
    arrayImg.forEach((ele) => {
        ele.classList.remove("active");
    });
}

setInterval(() => {
    console.log(current)
    Show(); 
}, 2000);
