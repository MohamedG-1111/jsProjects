let pre=document.querySelector("#pre");
let next=document.querySelector("#nxt");
let images=document.querySelectorAll(".imgslider img");
let length=images.length;
let controlSliderB=document.querySelector(".controlSlider .bulltes");
let imgcounter=document.querySelector(".imgcounter");
let bulltesUl=document.createElement("ul");;
let currentImage=1;
let ArrayImage=Array.from(images)
for(let i=0;i<length;i++){
    let bulltesLi=document.createElement("li");
    bulltesLi.textContent=i+1;
    bulltesUl.appendChild(bulltesLi);
}
controlSliderB.appendChild(bulltesUl)
let ArrayLi=document.querySelectorAll(".bulltes ul li");
ArrayLi.forEach((ele)=>{
    ele.onclick=function(){
        currentImage=parseInt(ele.textContent);
        BasicFun();
    }
})
BasicFun();
function Next(){
    if(currentImage < length ){
        currentImage++;
    }
    BasicFun()
}
function previous(){
    if(currentImage > 1)
    currentImage--;
    BasicFun()
}
pre.onclick=previous;
next.onclick=Next;
function BasicFun(){
    imgcounter.textContent=`${currentImage} / ${length}`;
    if(currentImage === 1){
        pre.classList.add("disbled")
    }
    else{
        pre.classList.remove("disbled")
    }
    if(currentImage === length){
        next.classList.add("disbled")
    }
    else{
        next.classList.remove("disbled")
    }
    removeActive();
    ArrayImage[currentImage - 1].classList.add("active");
    ArrayLi[currentImage - 1].classList.add("active")

}
function removeActive(){
    ArrayImage.forEach((ele)=>{
        ele.classList.remove("active");
    })
   ArrayLi.forEach((ele)=>{
    ele.classList.remove("active");
   })    
}