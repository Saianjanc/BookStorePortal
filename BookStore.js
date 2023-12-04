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
    let id = 0
    console.log(`\nAvailable Books:
+----+--------------------+-------+----------+
| ID |        Name        | Price | Quantity |
+----+--------------------+-------+----------+`);
    books.forEach(ele => {
        id++
        if (ele.quantity==0) {
            ele.status="Unavailable"
        }
        if (ele.status=="available"){
        console.log(`| ${id}  |        ${ele.name}       |  $${ele.price}  |     ${ele.quantity}    |`);
        }
    });
    console.log(`+----+--------------------+-------+----------+`);
}

let cart = []
let total = 0

function addBook(id,quantity) {
    let flag = true
    if (quantity<=books[id-1].quantity && quantity!=0) {
        let name = books[id-1].name
        let price = books[id-1].price
        books[id-1].quantity -= quantity
        let ntotal = price*quantity
        total += ntotal
        cart.forEach(ele => {
            if (ele.name==books[id-1].name){
                ele.quantity += quantity
                ele.total += ntotal
                flag = false
                console.log("Book Updated in Cart!");
            }
        })
        if (flag) {
            cart.push({name:name,price:price,quantity:quantity,total:ntotal})
            console.log("Book Added to Cart!");
        }
    } else {
        if (quantity==0){
            console.log("Enter Quantity > 0!");
            quantity=readline.question("Enter new Quantity available quantity is "+books[id-1].quantity+" : ")
            addBook(id,quantity)
        }
        else if(books[id-1].quantity==0) {
            console.log("Book Out of Stock!");
        }
        else{
            quantity=readline.question("Enter new Quantity available quantity is "+books[id-1].quantity+" : ")
            addBook(id,quantity)
        }
    }
}

function showCart() {
    if (total==0) {
        console.log("Your Cart is Empty");
    } else {
        console.log("\nCart:");
        console.log(`+---------------+-----------+-----------+-------+`);
        console.log(`|     Name      |   Price   |  Quantity | Total |`);
        console.log(`+---------------+-----------+-----------+-------+`);
        cart.forEach(ele => {
            console.log(`|     ${ele.name}     |    $${ele.price}    |     ${ele.quantity}     |  $${ele.total} |`); 
        });
        console.log(`+---------------+-----------+-----------+-------+`);
        console.log("Total Cart Price = $"+total);
    }
}

let choice = 0
while (choice!=4) {
    choice = readline.questionInt("\nEnter Any Number:\n1.Display Books\n2.Add Books to Cart\n3.Show Cart\n4.Exit\n")
    switch (choice) {
        case 1:
            displayBooks()
            break;
        case 2:
            let id = readline.questionInt("Enter Book ID to Add to Cart: ")
            if (id>books.length) {
                id = readline.questionInt("Enter Vaild Book ID to Add to Cart: ")
            }
            let quantity = readline.questionInt("Enter Quantity to Add to Cart: ")
            addBook(id,quantity)
            break;
        case 3:
            showCart()
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