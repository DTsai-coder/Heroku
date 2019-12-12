function passGen(){
    let random = document.getElementById("passGen").value;
    let passCode = "ABCDEFGHIJKLMNOPQRSTUVWZYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+";
    let password = "";

    for(var i = 0; i <= random; i++){

        password = password + passCode.charAt(Math.floor(Math.random() * Math.floor(passCode.length - 1)))
    };
};

console.log(passGen)