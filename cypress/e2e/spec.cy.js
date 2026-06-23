describe('Homepage Test', { blockHosts: ['*googlesyndication.com', '*google-analytics.com', '*pagead*'] }, () => {
  beforeEach(() => {
    cy.visit('https://automationexercise.com')
  })

  it('Test 1: Verify Homepage Loads', () => {
    cy.url().should('include','automationexercise.com')
    cy.get('img[alt="Website for automation practice"]').should('be.visible')
    cy.get('.nav').should('be.visible')
    cy.contains('Signup / Login').should('be.visible')
  })


    it(' Test Case 2: Register a New User', () => {

      const email = `student${Date.now()}@test.com`
      const password= 'Password123!'
     cy.contains('Signup / Login').click()
     cy.get('[data-qa="signup-name"]').type('Test Student')
     cy.get('[data-qa="signup-email"]').type(email)
     cy.get('[data-qa="signup-button"]').click()
     cy.get('#id_gender1').check()
     cy.get('[data-qa="password"]').type('Password123!')
     cy.get('[data-qa="days"]').select('22')
     cy.get('[data-qa="months"]').select('February')
     cy.get('[data-qa="years"]').select('2000')
     cy.get('[data-qa="first_name"]').type('First')
     cy.get('[data-qa="last_name"]').type('Last')
     cy.get('[data-qa="address"]').type('123 Test Street')
     cy.get('[data-qa="country"]').select('United States')
     cy.get('[data-qa="state"]').type('California')
     cy.get('[data-qa="city"]').type('Los Angeles')
     cy.get('[data-qa="zipcode"]').type('90001')
     cy.get('[data-qa="mobile_number"]').type('1234567890')
     cy.get('[data-qa="create-account"]').click()
     cy.get('[data-qa="account-created"]').should('be.visible')
     cy.get('[data-qa="continue-button"]').click()
     
     
     cy.visit('https://automationexercise.com') 

     cy.contains('Logged in as ').should('be.visible')
     cy.contains('Delete Account').click()
     cy.get('[data-qa="account-deleted"]').should('be.visible')
     cy.get('[data-qa="continue-button"]').click()

    })


  it( 'Test Case 3: Login With Valid Credentials', () => {
    const validEmail = `login_test_${Date.now()}@test.com`
    const validPassword = 'Password123!'
    cy.contains('Signup / Login').click()
    cy.get('[data-qa="signup-name"]').type('Valid User')
    cy.get('[data-qa="signup-email"]').type(validEmail)
    cy.get('[data-qa="signup-button"]').click()
    cy.get('#id_gender1').check()
    cy.get('[data-qa="password"]').type(validPassword)
    cy.get('[data-qa="days"]').select('1')
    cy.get('[data-qa="months"]').select('January')
    cy.get('[data-qa="years"]').select('2000')
    cy.get('[data-qa="first_name"]').type('First')
    cy.get('[data-qa="last_name"]').type('Last')
    cy.get('[data-qa="address"]').type('123 Street')
    cy.get('[data-qa="country"]').select('United States')
    cy.get('[data-qa="state"]').type('State')
    cy.get('[data-qa="city"]').type('City')
    cy.get('[data-qa="zipcode"]').type('12345')
    cy.get('[data-qa="mobile_number"]').type('1234567890')
    cy.get('[data-qa="create-account"]').click()
    cy.get('[data-qa="continue-button"]').click()
    cy.visit('https://automationexercise.com')
    cy.contains('Logout').click()
      
    cy.contains('Signup / Login').click()
    cy.wait(1000) 

    cy.get('[data-qa="login-email"]').should('be.visible').type(validEmail)
    cy.get('[data-qa="login-password"]').should('not.be.disabled').type(validPassword, { force: true })
    cy.get('[data-qa="login-button"]').click()
    cy.contains('Logged in as').should('be.visible')
    cy.contains('Logout').click()
    cy.url().should('include', '/login')

  })

  it(' Test Case 4: Login With Invalid Credentials', () => {
    cy.contains('Signup / Login').click()

    cy.get('[data-qa="login-email"]').type('fake_user_does_not_exist@test.com')

    cy.get('[data-qa="login-password"]').type('WrongPassword123!')

    cy.get('[data-qa="login-button"]').click()

    cy.contains('incorrect', { matchCase: false }).should('be.visible')
  })


  it('Test Case 5: Search for a Product', () => {
    cy.contains('Products').click()
    cy.url().should('include', '/products')
    cy.get('#search_product').type('dress')
    cy.get('#submit_search').click()
    cy.contains('Searched Products').should('be.visible')
    cy.get('.features_items').should('be.visible').and('contain', 'Dress')
  })

   it('Test Case 6: View Product Details', () => {
    cy.contains('Products').click()

    cy.get('.choose > .nav > li > a').first().click()

    cy.url().should('include', '/product_details')
    cy.get('.product-information').should('be.visible')

    cy.get('.product-information h2').should('be.visible')
    cy.contains('Category:').should('be.visible')
    cy.contains('Rs.').should('be.visible')
    cy.contains('Availability:').should('be.visible')
    cy.contains('Condition:').should('be.visible')
    cy.contains('Brand:').should('be.visible')
  })


  it('Test Case 7: Add Product to Cart', () => {
    cy.contains('Products').click()
    cy.get('.add-to-cart').first().click()
    cy.contains('u', 'View Cart').click()
    cy.url().should('include', '/view_cart')
    cy.get('#cart_info_table').should('be.visible')
    cy.get('.cart_price').should('be.visible')
    cy.get('.cart_quantity').should('be.visible')
  })


   it('Test Case 8: Remove Product From Cart', () => {
    cy.contains('Products').click()
    cy.get('.features_items .add-to-cart').first().click()
    cy.get('.modal-content').should('be.visible') 
    cy.contains('u', 'View Cart').click()
    cy.get('.cart_quantity_delete').click()
    cy.get('#empty_cart').should('be.visible')
  })



  it('Test Case 9: Submit Contact Us Form', () => {
    cy.contains('Contact us').click()
    cy.get('[data-qa="name"]').type('Automation Student')
    cy.get('[data-qa="email"]').type('student@test.com')
    cy.get('[data-qa="subject"]').type('Assignment Submission')
    cy.get('[data-qa="message"]').type('This is an automated submission test message.')
    cy.on('window:confirm', (text) => {
    expect(text).to.contains('Press OK to proceed')
    return true
    })
    cy.get('[data-qa="submit-button"]').click()
    cy.get('.status').should('be.visible').and('contain', 'Success!')
  })
  
  it('Challenge 1: Add Multiple Products', () => {
    cy.contains('Products').click()
    cy.get('.add-to-cart').eq(0).click({ force: true })
    cy.contains('Continue Shopping').click()
    cy.get('.add-to-cart').eq(2).click({ force: true })
    cy.contains('Continue Shopping').click()
    cy.contains('Cart').click()
    cy.get('#cart_info_table tbody tr').should('have.length.at.least', 2)
  })


  it('Challenge 3: Subscribe to Newsletter', () => {
    cy.get('#footer').scrollIntoView()
    cy.get('#susbscribe_email').type('subscriber@test.com')
    cy.get('#subscribe').click()
    cy.get('.alert-success').should('be.visible')
  })


  })