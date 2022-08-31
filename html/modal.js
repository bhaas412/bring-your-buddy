// login logout modal
let modal = document.getElementById("login-modal");

let loginModalbtn = document.getElementById("loginbtn");
let signupModalbtn = document.getElementById("signupbtn");
let mobileLoginbtn = document.getElementById("mloginbtn");
let moblileSignupbtn = document.getElementById("msignupbtn");

let xbutton = document.getElementById("x-btn");

const openModal = function() {
    modal.style.display = "block";
}

const closeModal = function() {
    modal.style.display = "none";
};


//modal with login
loginModalbtn.addEventListener('click',openModal)
signupModalbtn.addEventListener('click',openModal)

//modal with signup
mobileLoginbtn.addEventListener('click', openModal)
mobileSignupbtn.addEventListener('click', openModal)

xbutton.addEventListener('click', closeModal)

