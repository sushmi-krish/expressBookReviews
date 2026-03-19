##Test Plan -Book review Application (API testing)
#Introduction 
The purpose of this Test Plan to define the testing approach for the Book review Application , a Node.js+ Express.js backend that support the autherntication and CURD operation for book reviews.
Testing is focus on API functionality  , error handling and authentication , workflows .
---
##Scope of Testing 
- Testing all public endpoints 
- Testing user registration and login
- Testing CURD operations for book review 
- Testing search EndPoints(ISBN,title,Author)
- Testing review retrieval 
- Positive and negative test scenaios 
- API response 
- Authentication and authorization check
- Error Handling and status code
- Data validation for request bodies
##Out of SCope
-UI testing (no frontend testing )
-Performance testing
-Database performance testing
-cross browser testing
---
##Features to be tested 
User Authentication 
.POST/register - Register new user 
.POST/login - Login and receive JWT token
PUblic Book Endpoints 
.GET/- Retrive all the Books
.GET/isbn/:isbn -Retrieve books by isbn
.GET/author/:author -retrieve books by author 
.GET/title/:title - retrieve books by title 
Review Endpoint 
.POST/review/:isbn -Add review
.PUT/review/:isbn -update review
.DELETE/review/:isbn - Delete review
---
###Test Apporach 
Manual Testing 
- Funtionality  testing all end points
- Validation request/response bodies
- Negative testing(invalid input ,missing field)
- Authentication testing using JWT
- Dataverification using MongoDb Compass
API Testing
Postman Collection with
* Environment variables
* Postivie /Negative test cases
* Assertions
* chained requests(login->add review)







User 
