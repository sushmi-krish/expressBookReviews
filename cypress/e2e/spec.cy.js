describe('API Testing ',()=>{
    it('checks the server is running ',()=>{
        cy.request('http://localhost:5000/').then((response)=>{
          expect(response.status).to.be.oneOf([200,400])
})
    })
    it('get all books',()=>{
      cy.request('http://localhost:5000/').then((response)=>{
        expect(response.status).to.eq(200)
        expect(response.body).to.be.an('object')
      })
    })
    it('get book by id',()=>{
      cy.request('http://localhost:5000/isbn/1').then((response)=>{
        expect(response.status).to.eq(200)
        expect(response.body).to.be.an('object')
      })
    })
    it('Post the review for the book',()=>{
      cy.request('POST','http://localhost:5000/')
    })
})
