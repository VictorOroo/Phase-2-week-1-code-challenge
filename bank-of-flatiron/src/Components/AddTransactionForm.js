// TransactionForm.js
import React, { useState } from 'react';

const TransactionForm = ({ onAddTransaction }) => {
  const [newTransaction, setNewTransaction] = useState({
    date: '',
    description: '',
    category: '',
    amount: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddTransaction(newTransaction);
    setNewTransaction({
      date: '',
      description: '',
      category: '',
      amount: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="date"
        value={newTransaction.date}
        onChange={handleInputChange}
        placeholder="Date"
        required
      />
      <input
        type="text"
        name="description"
        value={newTransaction.description}
        onChange={handleInputChange}
        placeholder="Description"
        required
      />
      <input
        type="text"
        name="category"
        value={newTransaction.category}
        onChange={handleInputChange}
        placeholder="Category"
        required
      />
      <input
        type="number"
        name="amount"
        value={newTransaction.amount}
        onChange={handleInputChange}
        placeholder="Amount"
        required
      />
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;