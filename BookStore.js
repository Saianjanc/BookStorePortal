//Program to Store and maintain Books in an Object

const readline = require("readline-sync");

let books = [
    {
        name:"Book1",
        price:30,
        status:"available",
        quantity:5
    },
    {
        name:"Book2",
        price:20,
        status:"available",
        quantity:7
    },
    {
        name:"Book3",
        price:50,
        status:"available",
        quantity:8
    }]

function displayBooks() {
    let id = 1
    console.log(`Available Books:
+----+--------------------+-------+----------+
| ID |        Name        | Price | Quantity |
+----+--------------------+-------+----------+`);
    books.forEach(ele => {
        console.log(`| ${id}  |        ${ele.name}       |  $${ele.price}  |     ${ele.quantity}    |`);
        id++
    });
    console.log(`+----+--------------------+-------+----------+`);
}

function addBook() {
    console.log();
}
let choice = 0
while (choice!=4) {
    choice = readline.questionInt("\nEnter Any Number:\n1.Display Books\n2.Add Books to Cart\n3.Show Cart\n4.Exit\n")
    switch (choice) {
        case 1:
            displayBooks()
            break;
        case 2:
            addBook()
            break;
        case 4:
            console.log("Bye!!\n");
            choice=4
            break;
        default:
            console.log("Invaild Input! Enter Vaild Input\n");
            break;
    }
}