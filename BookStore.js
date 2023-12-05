//Program to Store and maintain Books in an Object

const readline = require("readline-sync");

let books = [
    {
        name:"Book1",
        price:30,
        status:"available",
        quantity:5,
        id:121
    },
    {
        name:"Book2",
        price:20,
        status:"available",
        quantity:7,
        id:122
    },
    {
        name:"Book3",
        price:50,
        status:"available",
        quantity:8,
        id:123
    }]

function displayBooks() {
    console.log(`\nAvailable Books:
+-----+--------------------+-------+----------+
| ID  |        Name        | Price | Quantity |
+-----+--------------------+-------+----------+`);
    books.forEach(ele => {
        if (ele.quantity==0) {
            ele.status="Unavailable"
        }
        if (ele.status=="available"){
        console.log(`| ${ele.id} |        ${ele.name}       |  $${ele.price}  |     ${ele.quantity}    |`);
        }
    });
    console.log(`+-----+--------------------+-------+----------+`);
}

let cart = []
let total = 0

function addBook(id,qty) {
    let flag = true;
    let {name,price,quantity} = books[id];
     
    if (qty<=quantity && qty!=0) {
        books[id].quantity -= qty
        
        let ntotal = price*qty

        total += ntotal
        cart.forEach(ele => {
            if (ele.name==name){
                ele.quantity += qty
                ele.total += ntotal
                flag = false
                console.log("\nBook Updated in Cart!");
            }
        })
        if (flag) {
            cart.push({name:name,price:price,quantity:qty,total:ntotal,id:books[id].id})
            console.log("\nBook Added to Cart!");
        }
    } else {
        if (qty==0){
            console.log("Enter Quantity > 0!");
            qty=readline.question("Enter new Quantity available quantity is "+quantity+" : ")
            addBook(id,qty)
        }
        else if(books[id].quantity==0) {
            console.log("\nBook Out of Stock!");
        }
        else{
            quantity=readline.question("Enter new Quantity available quantity is "+books[id].quantity+" : ")
            addBook(id,qty)
        }
    }
}

function showCart() {
    if (total==0) {
        console.log("Your Cart is Empty");
    } else {
        console.log("\nCart:");
        console.log(`+----+-----------+-----------+-----------+-------+`);
        console.log(`| ID |    Name   |   Price   |  Quantity | Total |`);
        console.log(`+----+-----------+-----------+-----------+-------+`);
        cart.forEach(ele => {
            console.log(`| ${ele.id}|    ${ele.name}  |    $${ele.price}    |     ${ele.quantity}     |  $${ele.total}  |`); 
        });
        console.log(`+----+-----------+-----------+-----------+-------+`);
        console.log("Total Cart Price = $"+total);
        let ch = readline.questionInt("\nEnter\n1:Remove Book from Cart\n2:Update Book Quantity\n3:To Continue\n");
        switch (ch) {
            case 1:
                i=readline.questionInt("Enter Book ID To Remove Book: ")
                total-=cart.find((ele)=>ele.id==i).total
                books.find((ele)=>ele.id==i).quantity += cart[i-121].quantity
                cart=cart.filter((ele)=>ele.id!=i)
                break;
            case 2:
                i=readline.questionInt("Enter Book ID To Update Book: ")
                q = readline.questionInt("Enter Quantity to Update: ")
                c = cart.find((ele)=>ele.id==i)
                b = books.find((ele)=>ele.id==i)
                if (c.quantity<q) {
                    b.quantity+=(c.quantity-q)
                } else {
                    b.quantity+=(c.quantity-q)
                }
                if (b.quantity>0){b.status="available"}
                c.quantity=q
                console.log("\nCart is Updated!!");
                break;
            default:
                break;
        }
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
            displayBooks()
            let id = readline.questionInt("Enter Book ID to Add to Cart: ")
            id=id-121
            if (id>books.length) {
                id = readline.questionInt("Enter Vaild Book ID to Add to Cart: ")
                id=id-121
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