let target=document.querySelector(".target");
console.log(target);
if(localStorage.getItem("font")&& localStorage.getItem("color") && localStorage.getItem("size")){
    target.style.color=localStorage.getItem("color");
    target.style.fontSize= localStorage.getItem("size")+"px";
    target.style.fontFamily=localStorage.getItem("font");
}
document.querySelectorAll(".first div").forEach((ele) => {
    if (ele.textContent.trim() === localStorage.getItem("font")) {
        ele.classList.add("active");
    } else {
        ele.classList.remove("active");
    }
});

// Set active class for selected color
document.querySelectorAll(".second div").forEach((ele) => {
    if (ele.textContent.trim() === localStorage.getItem("color")) {
        ele.classList.add("active");
    } else {
        ele.classList.remove("active");
    }
});

// Set active class for selected size
document.querySelectorAll(".three div").forEach((ele) => {
    if (ele.textContent.trim() === localStorage.getItem("size")) {
        ele.classList.add("active");
    } else {
        ele.classList.remove("active");
    }
});
let selectedFont=document.querySelectorAll(".first div");
let selectedColor=document.querySelectorAll(".second div");
let selectedSize=document.querySelectorAll(".three div");
selectedFont.forEach((ele)=>{
    ele.onclick=function(e){
        let font=e.target.textContent.trim();
        localStorage.setItem("font",font);
        target.style.fontFamily=localStorage.getItem("font");
        selectedFont.forEach((ele)=>{
            ele.classList.remove("active");
        })
        e.target.classList.add("active");
    }
})
selectedColor.forEach((ele)=>{
    ele.onclick=function(e){
        let color = e.target.textContent.trim(); 
        localStorage.setItem("color",color);
        target.style.color=localStorage.getItem("color");
        selectedColor.forEach((ele)=>{
            ele.classList.remove("active");
        })
        e.target.classList.add("active");
    }
})
selectedSize.forEach((ele)=>{
    ele.onclick=function(e){
        let size = e.target.textContent.trim();
        localStorage.setItem("size",size);
        target.style.fontSize= localStorage.getItem("size")+"px";
        selectedSize.forEach((ele)=>{
            ele.classList.remove("active");
        })
        e.target.classList.add("active");
    }
})
