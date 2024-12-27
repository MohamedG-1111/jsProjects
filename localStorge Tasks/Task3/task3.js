//  sessionStorage.clear();
let name=document.querySelector(".name");
let number=document.querySelector(".number")
let password=document.querySelector(".password");
let se=document.querySelector(".select");
name.value=sessionStorage.getItem("name")||"";
number.value=sessionStorage.getItem("number")||"";
password.value=sessionStorage.getItem("password")||"";
se.value=sessionStorage.getItem("select")||"";
name.onblur=function(e){
    sessionStorage.setItem("name",e.target.value)
}
number.onblur=function(e){
    sessionStorage.setItem("number",e.target.value)
}
password.onblur=function(e){
    sessionStorage.setItem("password",e.target.value)
}
se.onblur=function(e){
    sessionStorage.setItem("select",e.target.value)
}