// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Le
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import NavigationBar from './Components/NavigationBar';
import FilterSearch from './Components/FilterSearch';
import TransactionTable from './Components/TransactionTable';
import TransactionForm from './Components/TransactionForm';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    // Fetch data from the local JSON database using native fetch API
    fetch('http://localhost:3000/transactions')
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
        setFilteredTransactions(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleAddTransaction = (newTransaction) => {
    // Add the newTransaction to the transactions state
    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
    setFilteredTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
  };

  const handleSearch = (searchTerm) => {
    // Filter transactions based on the search term
    const filtered = transactions.filter(
      (transaction) =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };

  const handleDeleteTransaction = (id) => {
    // Delete the transaction with the given id
    const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
    setTransactions(updatedTransactions);
    setFilteredTransactions(updatedTransactions);
  };

  return (
    <div>
      <NavigationBar />
      <h1>Bank Transactions</h1>
      <TransactionForm onAddTransaction={handleAddTransaction} />
      <FilterSearch onSearch={handleSearch} />
      <TransactionTable
        transactions={filteredTransactions}
        onDeleteTransaction={handleDeleteTransaction}
      />
    </div>
  );
};

export default App;