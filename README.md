#  Book Review API - Cypress Automation Project 

- This project is a lightweight API automation suite built using Cypress, designed to validate the key endpoints of the Book Review system. It demonstrates real‑world QA practices, including manual API exploration, automated API testing, negative testing, and clear documentation of backend limitations.
- The test cases are written in a BDD‑style Gherkin format, making them readable, structured, and aligned with modern automation standards. The project also highlights defect identification, handling inconsistent API behavior, and adapting test coverage based on actual backend responses.
---
# Project Purpose 
   This project is part of QA automation Portfolio .It showcase 
   - API testing using cypress
   - Manual verfication process
   - CRUD understanding (POST,GET,PUT,PATCH,DELETE operation)
   - Detect identification and reporting
   - Professional documention of  backend  limitation
   ---
# Manual API Testing (Postman)
Before automating the API test in cypress, all end points were manually validate using postman .This ensured that 
- API route is reacheable
- The request/response structure was understood
- Authentication and session handling were confirmed
- Defects were identified early
- Automation was based on real ,observed behavior
---
# Postman Evidence Included 
- bookReview.PNG
- register.PNG
- login.PNG
- getallbooks.PNG
- getbooksbyTitle.PNG
- getbooksbyauthor.PNG
- getdetailsISBN.PNG
- deleted.PNG
---
### Automated Tested 
* Server HealthCheck
 Ensuer the backend testing is running and responding
    - GET "/"
    - Expected Status: 200 or 400 (based on the backend behaviour)
* GET All Books
  validate the APIs return all the books
   - GET "/"
   - Expected status : 200
   - Expected body : object
* GET book by Id
   Retrieves a specific books using ISBN
  - GET /isbn/id
  - Expected status : 200
  - Expected body: object
* Register the New user
   Creates new user with a unique username
  - POST /register
  - Expected status :200
  - Expected body :object
* Login with Vaild credentials
  Register the user first and login with same credentials 
  -  POST /customer/ login
  -  Expected status: 200
  -  Expected body : string
  -  Expected message : "user successfully logged in"
* Login with Invaild credentials
  Login with incorrect username and password
  - POST/customer/login
  - -Expected status: 400
  - Expected message : "Invalid username and password
---
Test Snippets 
### Valid Login Test 
```bash
it('Login with vaild username ',()=>{
const username = 'testusername' + Date.now() //unique
const password = 'testuser'
// Register the userName and Password
cy.request({
 method : POST,
 url : "http://localhost:5000/register",
 failOnStatusCode : false ,
 body :{username,password}
}).then (()=>{
//user login with same username and password 
cy.request({
method : "POST",
url :'http://localhost:5000/customer/login',
failOnStatusCode :false,
body :{username,password}
)}.then((response)=>{
cy.log("Login Response body :",JSON.stringfy(response.body))
expect(response.status).to.eq(200),
expect(response.body).to.be.a('string'),
expect(response.body).to.eq("user successfully loggedIn")
})
})
})
```
### Invalid Login Test 
```bash
it('validate the Invalid credentials',()=>{
cy.request({
  method :'POST',
  url :'http://localhost:5000/customer/login', 
  failOnStatusCode: false ,//validate the negative scenarios 
  body:{
   username : "testUsername"+ Date.now(),
   password : "testuser"
}
}).then((response)=>{
cy.log("Login Response Body:",JSON.stringify(response.body))
expect(response.status).to.eq(400),
expect(response.body).to.be.a('string'),
exect(response.body).to.eq('Invalid username and password')
})
})
```
---
# Conclusion :
 The project demostrated the manual test performed in postman tool to understand the API behavior ,API AUtomation testing in cypress tool to verify key endpoints, negative scenarios and real world QA practices , such as identified backend defects ,documenting inconsistence and design the test based on the actual behaviour . 






