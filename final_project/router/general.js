const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const doesExist = (username) => {
    // Filter the users array for any user with the same username
    let userName = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userName.length > 0) {
        return true;
    } else {
        return false;
    }
}
public_users.post("/register", (req,res) => {
 const username = req.body.username;
 const password = req.body.password;
 if(username && password){
    if(!doesExit(username))
    {
        users.push({"username":username,"password":password});
        return res.status(200).json({message:"User Registed Successfully.Now you can  login"})
    }
    else
    {
        return res.status(400).json({message:"User already exists!"})
    }
 }
 return res.status(400).json({message:"Unable to register"})
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
 
  return res.send(JSON.stringify(books))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {

  let isbn = req.params.isbn;
  const book = books[isbn];
  if(book){
    return res.send(book)
  }
  else{
  return res.status(400).json({message:"Page not found"});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  
  let author = req.params.author;
  const bookbyAuthor = [];
 for(let book in books){
    if(books[book].author.toLowerCase() === author.toLocaleLowerCase()){
        bookbyAuthor.push(books[book])
    }
 }
 if(bookbyAuthor.length>0)
 {
   return res.json(bookbyAuthor);
 }
 else{
    return res.status(404).json({message:"Invalid author "})
 }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
 let title = req.params.title;
 const bookTitle =[]
for(let book in books){
    if(books[book].title.toLocaleLowerCase()=== title.toLocaleLowerCase())
    {
        bookTitle.push(books[book])
    }
}
if(bookTitle.length>0)
{
    return res.json(bookTitle)
}
else
{
    return res.status(404).json({message:"Invalid Title"})
}
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {

  let isbn = req.params.isbn;
  let bookReview = books[isbn]
  if(bookReview)
  {
    return res.json(bookReview)
  }
  else{
  return res.status(404).json({message: "No review"});
  }
});

module.exports.general = public_users;
