let username=document.getElementsByName("username")[0]
let email=document.getElementsByName("Email")[0];
let pass=document.getElementsByName("Password")[0];
let conPass=document.getElementsByName("Cpassword")[0];
let sumbit=document.querySelector("#submit");
let error=document.querySelectorAll(".error");
sumbit.onclick=function(event){
 let boolen=vaildation();
 if(boolen === false){
    event.preventDefault();
 }
}
function errorMessage(element,message){
    let par = element.parentElement;
    let errorDiv = par.querySelector(".errorMsg");
    let inp=par.querySelector("input");
        errorDiv.innerHTML = message;
        inp.classList.add("error");
        inp.classList.remove("sucess");
}
function sucessMessage(element) {
    let par = element.parentElement;
    let errorDiv = par.querySelector(".errorMsg");
    let inp = par.querySelector("input");
    errorDiv.innerHTML = '';
    inp.classList.add("success");
    inp.classList.remove("error");
}

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function vaildation(){
    let useFlag=false,emailFlag=false,passflag=false,cpassflag=false;
    if(username.value==='' || username.value===null){
        errorMessage(username,"Username Required");
    }
    else{
        sucessMessage(username);
        useFlag=true;
    }
    if(email.value === '' || email.value === null){
        errorMessage(email,"Email Required");
        
    }
    else if(isValidEmail(email.value) === false){
        errorMessage(email,"Provide a valid email address");
   
    }
    else{
        sucessMessage(email);
        emailFlag=true;
    }
    if(pass.value==='' || pass.value===null){
        errorMessage(pass,"Password Required");
    }else if(pass.value.length < 8){
        errorMessage(pass,"Password must include at least 8 characters");
    }else if(pass.value.trim()==="password"){
        errorMessage(pass,"Not Password");
    }
    else{
        sucessMessage(pass);
        passflag=true;
    }
   if(conPass.value==='' || conPass.value===null){
    errorMessage(conPass,"Confirm Required");
   }else if(conPass.value.trim() !==pass.value.trim() || conPass.value.length < 8){
    errorMessage(conPass,"doesn't Match password")
   }
   else{
    sucessMessage(conPass);
    cpassflag=true;
   }
   if(cpassflag && passflag && emailFlag && useFlag)
    return true;
else 
return false;
}
// let username = document.getElementsByName("username")[0];
// let email = document.getElementsByName("Email")[0];
// let pass = document.getElementsByName("Password")[0];
// let conPass = document.getElementsByName("Cpassword")[0];
// let sumbit = document.querySelector("#submit");

// // إضافة مستمع أحداث على الفور
// username.addEventListener("input", function() {
//     validateUsername();
// });
// email.addEventListener("input", function() {
//     validateEmail();
// });
// pass.addEventListener("input", function() {
//     validatePassword();
// });
// conPass.addEventListener("input", function() {
//     validateConfirmPassword();
// });


// function validateUsername() {
//     if (username.value === '' || username.value === null) {
//         errorMessage(username, "Username Required");
//     } else {
//         sucessMessage(username);
//     }
// }

// function validateEmail() {
//     if (email.value === '' || email.value === null) {
//         errorMessage(email, "Email Required");
//     } else if (isValidEmail(email.value) === false) {
//         errorMessage(email, "Provide a valid email address");
//     } else {
//         sucessMessage(email);
//     }
// }

// function validatePassword() {
//     if (pass.value === '' || pass.value === null) {
//         errorMessage(pass, "Password Required");
//     } else if (pass.value.length < 8) {
//         errorMessage(pass, "Password must include at least 8 characters");
//     } else if (pass.value.trim() === "password") {
//         errorMessage(pass, "Not Password");
//     } else {
//         sucessMessage(pass);
//     }
// }

// function validateConfirmPassword() {
//     if (conPass.value === '' || conPass.value === null) {
//         errorMessage(conPass, "Confirm Required");
//     } else if (conPass.value.trim() !== pass.value.trim() || conPass.value.length < 8) {
//         errorMessage(conPass, "doesn't Match password");
//     } else {
//         sucessMessage(conPass);
//     }
// }
// function errorMessage(element, message) {
//     let par = element.parentElement;
//     let errorDiv = par.querySelector(".errorMsg");
//     let inp = par.querySelector("input");
//     errorDiv.innerHTML = message;
//     inp.classList.add("error");
//     inp.classList.remove("success");
// }

// function sucessMessage(element) {
//     let par = element.parentElement;
//     let errorDiv = par.querySelector(".errorMsg");
//     let inp = par.querySelector("input");
//     errorDiv.innerHTML = '';
//     inp.classList.add("success");
//     inp.classList.remove("error");
// }
// const isValidEmail = email => {
//     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }
