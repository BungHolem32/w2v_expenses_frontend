# WAY2VAT Home Assignment - Ui Part

This project was built as part of home assignment of way2vat company
This project was built on Vue Framework:

Here are the requirements:
1. Create an empty table (expenses) with the following column:
- Description - free text
-  price - amount
-  Currency - select of 5 different currencies
- Converted Price to USD - amount

2. User Can Add/Edit/Delete each row.
3. At the bottom of the page, display the total amount of the expenses table in USD.
4. At the top of the page, create a “select currency” (with the 5 currencies) that will
change the converted amount column and the total amount of the table.
5. The currency conversion data should be updated from server every 4 seconds. The
table and the total amount should display the updated data.


### Dependencies:
1. in order to see full functionality of the project you must first install backend part in the following link:  
https://github.com/BungHolem32/w2v_currencies_api_backend.git

### Installation

 1. clone project https://github.com/BungHolem32/w2v_expenses_frontend.git
 2. cd into project-folder
 3. install node_modules by typing:` npm install`
 4. create .env file with the following details according to .env.example
   ~~~~
   VUE_APP_BACKEND_URL=http://127.0.0.1:5000
   VUE_APP_BASE_URL= http://localhost:8081/
   ~~~~
   
 5.type: `npm run serve`
 
 6.paste this url inside your browser `http://localhost:8081`

 If anything work right you should see expenses dashboard in action
