document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expense-list");
  const nameInput = document.getElementById("expense-name");
  const amountInput = document.getElementById("expense-amount");
  const themeSelector = document.getElementById("theme");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  const saveToLocalStorage = () => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  };

  const renderExpenses = () => {
    expenseList.innerHTML = "";
    expenses.forEach((expense, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${expense.name} - $${expense.amount}
        <div>
          <button onclick="editExpense(${index})">Edit</button>
          <button onclick="deleteExpense(${index})">Delete</button>
        </div>
      `;
      expenseList.appendChild(li);
    });
  };

  window.editExpense = (index) => {
    const expense = expenses[index];
    nameInput.value = expense.name;
    amountInput.value = expense.amount;
    deleteExpense(index);
  };

  window.deleteExpense = (index) => {
    expenses.splice(index, 1);
    saveToLocalStorage();
    renderExpenses();
  };

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const amount = parseFloat(amountInput.value.trim());
    if (!name || isNaN(amount)) return;

    expenses.push({ name, amount });
    saveToLocalStorage();
    renderExpenses();
    expenseForm.reset();
  });

  themeSelector.addEventListener("change", (e) => {
    document.body.className = e.target.value;
  });

  renderExpenses();
});
