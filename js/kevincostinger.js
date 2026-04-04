"use strict";
/*******************************************************
 *     kevincostinger.js - 100p.
 *
 *     This is Kevin. Kevin keeps track of your expenses
 *     and costs. To add an expense, pick a date, declare
 *     the amount and add a short description.
 *
 *     When you submit the form, all fields are validated.
 *     If Kevin is not happy with your inputs, the least
 *     he will do is, bring you back to the field where
 *     you made a mistake. But who knows? Maybe he can
 *     even provide some excellent User experience?
 *     (+5 Bonus points available)
 *
 *     These are the rules for the form validation:
 *      - Date is valid, if it's not empty.
 *      - Amount is valid, if it's at least 0.01.
 *      - Text is valid, if it's at least 3 letters long.
 *
 *     If everything is okay, Kevin adds a new table row,
 *     containing the expense. The table row also contains
 *     a button, which deletes the expense, once you click
 *     it. After adding a table row, the form is reset and
 *     ready for the next input.
 *
 *     At the bottom of the expense tracker, you can see
 *     a small number. It represents the sum of all expenses,
 *     which are currently tracked. It is always accurate!
 *
 *     Have a look at the pictures provided. They demonstrate
 *     how the software looks like. Notice the details, like
 *     the perfectly formatted currency! Isn't that great?
 *
 *     By the way...
 *     Kevin is a clean guy. He is free of code duplications.
 *     Kevin defines his quality by using functions and
 *     events, to keep his sourcecode clean af. He understands
 *     the scope of his variables and of course, makes use of
 *     event delegation, to keep his event listeners tidied up!
 *
 *     Nora - 2026-03-25
 *******************************************************/
let sumExpenses = 0; //Use this variable to keep the sum up to date.

function submitForm(e) {
    e.preventDefault();
    //TODO: Prevent the default behavior of the submit button.
    //TODO: Validate the form. If everything is fine, add the expense to the tracker and reset the form.

    let date = document.getElementById("date").value;
    let amount = document.getElementById("amount").value;
    let expense = document.getElementById("expense").value;


    if (isEmpty(date)) {
        alert("Please enter date!");
        return;
    }
    if (Number(amount) < 0.01) {
        alert("Please enter an amount bigger than 0.01!");
        return;
    }
    if (isEmpty(expense)) {
        alert("Please enter your expense!");
        return;
    }

    let table = document.getElementById("expenses").getElementsByTagName("tbody")[0];
    let newRow = document.createElement("tr");

    let dateCell = document.createElement("td");
    dateCell.textContent = date;

    let amountCell = document.createElement("td");
    amountCell.textContent = formatEuro(Number(amount));

    let expenseCell = document.createElement("td");
    expenseCell.textContent = expense;

    let deleteCell = document.createElement("td");
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", function () {
        newRow.remove();
        sumExpenses -= Number(amount);
        document.getElementById("expenseSum").textContent = formatEuro(sumExpenses);
    });

    deleteCell.appendChild(deleteButton);
    newRow.appendChild(dateCell);
    newRow.appendChild(amountCell);
    newRow.appendChild(expenseCell);
    newRow.appendChild(deleteCell);
    table.appendChild(newRow);

    sumExpenses += Number(amount);

    document.getElementById("expenseSum").textContent = formatEuro(sumExpenses);
    document.querySelector("form").reset();
}
document.querySelector("form").addEventListener("submit", submitForm);

/*****************************
 * DO NOT CHANGE CODE BELOW.
 * USE IT.
 ****************************/


/*******************************************************
 *     Checks if variable is empty
 *     @param {any} variable - Variable which you want to check.
 *     @return {Boolean} Empty or not.
 ******************************************************/
let isEmpty = function(variable) {
    if(Array.isArray(variable))
        return (variable.length === 0);
    else if(typeof variable === "object")
        return (Object.entries(variable).length === 0);
    else
        return (typeof variable === "undefined" || variable == null || variable === "");
};

/*******************************************************
 *     Converts number into currency string.
 *     @param {Number} number - Any numeric value.
 *     @return {String} Well formatted currency string.
 ******************************************************/
function formatEuro(number) {
    return number.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
}