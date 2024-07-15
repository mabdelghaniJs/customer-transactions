import React, { useState } from 'react';
import './App.css';
import { Bar } from 'react-chartjs-2';
import data from './data.json';

function App() {

  const [filter, setFilter] = useState('');
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredTransactions = data.transactions.filter((transaction) => {
    const customer = data.customers.find((c) => c.id === transaction.customer_id);
    const customerName = customer.name.toLowerCase();
    const amount = transaction.amount.toString();
    const filterText = filter.toLowerCase();
    return customerName.includes(filterText) || amount.includes(filterText);
  });

  const customerNames = filteredTransactions.map((transaction) => {
    const customer = data.customers.find((c) => c.id === transaction.customer_id);
    return customer.name;
  });

  const transactionAmounts = filteredTransactions.map((transaction) => transaction.amount);

  const chartData = {
    labels: customerNames,
    datasets: [
      {
        label: 'Transaction Amount',
        data: transactionAmounts,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            precision: 0,
          },
        },
      ],
    },
  };


  return <>
    <div className="App">
      <h1>Customer Transactions</h1>
      <div className="filter">
        <label htmlFor="filterInput">Filter: </label>
        <input type="text" id="filterInput" value={filter} onChange={handleFilterChange} />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => {
            const customer = data.customers.find((c) => c.id === transaction.customer_id);
            return (
              <tr key={transaction.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{transaction.date}</td>
                <td>{transaction.amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    <div className="chart-container" >
      <Bar data={chartData} options={chartOptions} />
    </div>
  </>
}

export default App;