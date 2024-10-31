# E-Commerce API React

Welcome to E-Commerce API: A React project by Grant Copeland

Start by downloading all files and the Module 6 Flask Project also created by myself located here: https://github.com/gcland/Mod06-Mini-Project
This sets up the backend-API used within the react project.

To summarize the backend setup (see README of that repository for more details): 
    - download all files from the previously mentioned repository
    - add your password to the password file to connect to MySQL Workbench
    - open the python 'app.py' file and run the file

Launch the E-Commerce-API-React folder within your IDE, navigate to the terminal within the react project by typing:
'cd e-commerce-api-react-project'
Launch the project by typing:
'npm run dev' navigate to the page returned by the terminal. You are now at the homepage of the React project! Welcome!

You will open to the home page which features a navigation bar across the top with several links:
- Home
    - This is the home page with styling and cards with navigation links to:
        - the view customers page
        - the products page
        - the order page

- View/Edit Customers
    - Links to the customers page which list views of all customers with a few features:
        - Edit Customer Account button: links to a page allowing the user to edit the customer information
        - Delete Customer Account button: removes the customer account info from the database
        - Show Account Info button: the ability to toggle display the customer account information (username, password)

- Add Customers 
    - Links to a form to add customers requiring the user to input all information before a successful submission. 
    - Once a submission is successful the user will be sent to the view customers page

- Add Products 
    - Links to a form to add a product requiring the user to input all information before a successful submission
    - Once a submission is successful the user will be sent to the products list page

- View Orders
    - Links to a list views of all orders with the Delete Product button which removes the product info from the database.
      The order list is automatically sorted by customer ID.
    - Enter a customer ID to filter the list of orders to view only orders by the input Customer ID

- Shop Products
    - Links to a list views of all products with a few features:
        - Edit Product button: links to a page allowing the user to edit product information
        - Delete Product button: removes the product info from the database
        - Add to Cart button: allows the user to add the product to a cart. Go to the 'Checkout' page to view cart and order summary

- Checkout 
    - Links to the page where the user checks out
    - User should:
        - first go to the 'Shop Products' page and add items to their cart. Return to this page once items within cart
        - Input a Customer ID within the first input field
        - The order date is set to the current date and the delivery date is set to an arbitrary current date + 5 days
        - Once the cart has items (see first point) and the Customer ID field is filled, the user can submit the order.
          The order may be successfully placed into the database by pressing the 'Submit' button at the bottom of the page.
          A modal will appear letting the user know it was successful.
        
        - Optionally, before submitting the order, the user may press the 'View Order Summary Button' to view the details
          of their order, including the list of products on the order, their details, and the total price of the order

        **PLEASE NOTE: the cart only allows the ability to add qty 1 of any product ID due to a limitation of the backend (no quantity field, the products field is a list). The React project has built in functionality to limit a given product ID to 1 within the cart list.

Begin by adding customers and products to the database using the previously defined functionality. Afterwards, try adding products to the cart and placing an order to the database. 


---------------------------------------------------------------------------------------------------------------------------
                                            *** Future work ideas ***

- Add the ability to log in as a user or as admin/employee. Users will not be able to see other accounts or add / delete products / other accounts. Users will only be able to see their own orders

- Add the ability to properly edit orders

- Reorganize backend/react project to properly accept a qty of an item per product ID

- Add the ability to view cart as a smaller window while within the 'Shop Products' page
