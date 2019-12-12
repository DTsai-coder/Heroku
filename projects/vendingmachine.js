// Creating a vending machine
// To store objects create an array
let snacks = [];
let profits = 0;
// index 2 Should be the snack name, index 3 should be the cash inputted.
const terminalArguments = process.argv;

// To set price create a class
class snack {
    constructor(price, name, quantity){
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
    restock(num){
        this.quantity = this.quantity + num;
    }
}
// Building a new snack object
let snickers = new snack(1.25, "Snickers Bar", 15); // always use the keyword new when creating a new object
snacks.push(snickers); // .push put it in the array
// Snack 2
let almondJoy = new snack(1.25, "Almond Joy", 15)
snacks.push(almondJoy);
// Snack 3
let hotCheetos = new snack(1.75, "Cheetos Flamin' Hot", 15)
snacks.push(hotCheetos);
// Snack 4
let potatoChips = new snack(1.75, "Lays", 15)
snacks.push(potatoChips);
// Snack 5
let oreo = new snack(1.50, "Oreos", 15)
snacks.push(oreo);
// Snack 6
let chipsAhoy = new snack(1.50, "Chips Ahoy!", 15)
snacks.push(chipsAhoy);
// Snack 7
let cheezIt = new snack(1.65, "Cheez It", 15)
snacks.push(cheezIt);
// Snack 8
let crackers = new snack(1.65, "Goldfish", 15)
snacks.push(crackers);

// Use linear search to go through each item

for (let i = 0; i < snack.length; i++){
     
    let currentSnack = snacks[i];

    if (terminalArguments[8] == snacks[i].name){
        if(snacks[i].quantity > 10){
            if(snacks[i].price <= terminalArguments[8]){
                console.log("You have purchased " + snacks[i].name);
                console.log("Your change is $ " + (terminalArguments[8] - snacks[i].price));
            }
        }
    } console.log(currentSnack)
}

