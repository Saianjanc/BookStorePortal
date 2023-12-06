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
let unavailableBooks = []

function displayBooks() {
    if (unavailableBooks.length){
        console.log(`\nUnavailable Books:
+-----+--------------------+-------+----------+
| ID  |        Name        | Price | Quantity |
+-----+--------------------+-------+----------+`);
unavailableBooks.forEach(ele => {
    console.log(`| ${ele.id} |        ${ele.name}       |  $${ele.price}  |     ${ele.quantity}    |`);
});
console.log(`+-----+--------------------+-------+----------+`);
    }
    console.log(`\nAvailable Books:
+-----+--------------------+-------+----------+
| ID  |        Name        | Price | Quantity |
+-----+--------------------+-------+----------+`);
    books.forEach(ele => {
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
    if (books[id].quantity==0) {
        books[id].status="Unavailable"
        unavailableBooks.push({name:name,price:price,quantity:0,id:books[id].id})
    }
}

function showCart() {
    if (total==0) {
        console.log("\nYour Cart is Empty");
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
        if (ch==1){removeCart()}
        else if(ch==2){updateCart()}
    }
}

function removeCart(){
    i=readline.questionInt("Enter Book ID To Remove Book: ")
    cartObj = cart.find((ele)=>ele.id==i)
    bookObj = books.find((ele)=>ele.id==i)
    total-=cartObj.total
    bookObj.quantity += cartObj.quantity
    cart=cart.filter((ele)=>ele.id!=i)
    if (bookObj.quantity>0){bookObj.status="available"
    unavailableBooks=unavailableBooks.filter((ele)=>ele.id!=i)}
    
}

function updateCart(){
    i=readline.questionInt("Enter Book ID To Update Book: ")
    if (i>120 && i<124){
        q = readline.questionInt("Enter Quantity to Update: ")
        if (q<=0){
        console.log("\nInvaild Quantity Entered!!")}
        else{
            cartObj = cart.find((ele)=>ele.id==i)
            bookObj = books.find((ele)=>ele.id==i)
            bookObj.quantity+=(cartObj.quantity-q)
            cartObj.total-=cartObj.quantity*cartObj.price
            total-=cartObj.quantity*cartObj.price
            if (bookObj.quantity>0){bookObj.status="available"
                unavailableBooks=unavailableBooks.filter((ele)=>ele.id!=i)}
            cartObj.quantity=q
            total+=cartObj.quantity*cartObj.price
            cartObj.total+=cartObj.quantity*cartObj.price
            console.log("\nCart is Updated!!");
                 }
            }
            else{console.log("\nInvaild Book ID");}
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
            if (id>books.length || id<0) {
                console.log("\nInvaild Book ID!!")
            }
            else{
            let quantity = readline.questionInt("Enter Quantity to Add to Cart: ")
            addBook(id,quantity)
            }
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