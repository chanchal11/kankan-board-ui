import logo from './logo.svg';
import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import KanbanCard from './components/card';
import Board from './components/board';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupingOption, setGroupingOption] = useState('status');
  const [sortingOption, setSortingOption] = useState('priority');

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      const data = await response.json();
      setTickets(data.tickets);
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  const handleGroupingOptionChange = (option) => {
    setGroupingOption(option);
  };

  const handleSortingOptionChange = (option) => {
    setSortingOption(option);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">

        <div className="options">
          <label>
            Group By:
            <select value={groupingOption} onChange={(e) => handleGroupingOptionChange(e.target.value)}>
              <option value="status">Status</option>
              <option value="userId">User</option>
              <option value="priority">Priority</option>
            </select>
          </label>
          <label>
            Sort By:
            <select value={sortingOption} onChange={(e) => handleSortingOptionChange(e.target.value)}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </label>
        </div>
        <div className="kanban-board">
          <Board groupBy={groupingOption} sortBy={sortingOption} tickets={tickets} users={users}  />
        </div>
      </header>
    </div>
  );
};

export default App;

// {tickets?.length > 0 && tickets.map((ticket) => (
//   <KanbanCard
//     key={ticket.id}
//     id={ticket.id}
//     title={ticket.title}
//     tag={ticket.tag}
//     userId={ticket.userId}
//     status={ticket.status}
//     priority={ticket.priority}
// />            
// ))}