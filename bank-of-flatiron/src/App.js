import React, { useState, useEffect } from 'react';
import TransactionTable from './components/TransactionTable';
import TransactionForm from './components/TransactionForm';
import SearchBar from './components/SearchBar';

// this are the state variables
const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true); //manages loading state of the application while data is being fetched

  // fetches transactions from the server
  useEffect(() => {
    fetch('http://localhost:8001/transactions')
      .then((response) => response.json())
      .then((data) => {
        
        setTransactions(data)
        
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  //this adds a new transaction the the list
  const handleAddTransaction = (newTransaction) => {
    newTransaction.id = Date.now();
    setTransactions((prevTransactions) => prevTransactions.concat(newTransaction));
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleDelete = (id) => {
    const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
    setTransactions(updatedTransactions);
  };

  // Apply search filter to transactions
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='App'>
      <h1>Bank of Flatiron Transactions</h1>
      <TransactionForm onAddTransaction={handleAddTransaction} />
      <SearchBar onSearch={handleSearch} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TransactionTable transactions={filteredTransactions} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default App;
