// RANDOM PASSWORD GENERATOR

// FUNCTION
function passGen(){
    
    // STORE A STRING
    let passCode = "ABCDEFGHIJKLMNOPQRSTUVWZYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+";
    // EMPTY STRING
    let password = "";

    // FOR LOOP
    for(let i = 0; i <= passCode.length; i++){

        password = password + passCode.charAt(Math.floor(Math.random() * Math.floor(passCode.length - 1)))
    }return password;

};
// CALL THE FUNCTION
console.log(passGen());


