// login logout modal
let loginmodal = document.getElementById("login-modal");
let signupmodal = document.getElementById("login-modal");

let loginModalbtn = document.getElementById("loginbtn");
let signupModalbtn = document.getElementById("signupbtn");

let mobileLoginbtn = document.getElementById("mloginbtn");
let moblileSignupbtn = document.getElementById("msignupbtn");

let loginxbutton = document.getElementById("login-x-btn");
let signupxbutton = document.getElementById("signup-x-btn");






//modal open buttons
loginModalbtn.addEventListener('click', function() {
    loginmodal.style.display = "block";
})
signupModalbtn.addEventListener('click', function() {
    signupmodal.style.display = "block";
})

// mobile open buttons
mobileLoginbtn.addEventListener('click', function() {
    loginmodal.style.display = "block";
})
moblileSignupbtn.addEventListener('click', function() {
    signupmodal.style.display = "block";
})



//login logout modal close buttons
loginxbutton.addEventListener('click', function() {
    loginmodal.style.display = "none";
})
signupxbutton.addEventListener('click', function() {
    signupmodal.style.display = "none";
})


//post and comment modal
let postmodal = document.getElementById("post-modal")
let commentmodal = document.getElementById("comment-modal")
let postxbutton = document.getElementById("post-x-btn");
let commentxbutton = document.getElementById("comment-x-btn");

//modal close buttons
postxbutton.addEventListener('click', function() {
    postmodal.style.display = "none";
})

commentxbutton.addEventListener('click', function() {
    commentmodal.style.display = "none";
})






