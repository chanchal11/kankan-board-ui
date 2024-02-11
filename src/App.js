import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Board from './components/board';
import Navbar from './components/navbar';
import LoadingAnimation from './components/loadingAnimation';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupingOption, setGroupingOption] = useState('status');
  const [sortingOption, setSortingOption] = useState('priority');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      const data = await response.json();
      setTickets(data.tickets);
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }finally{
      setLoading(false);
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

  if(loading){
    return <LoadingAnimation/>;
  }
  else {
    return (
      <div>
        <Navbar groupingOption={groupingOption} sortingOption={sortingOption} handleGroupingOptionChange={handleGroupingOptionChange} handleSortingOptionChange={handleSortingOptionChange} />
        <div className="kanban-board">
            <Board groupBy={groupingOption} sortBy={sortingOption} tickets={tickets} users={users}  />
          </div>
      </div>
    );
  }
};

export default App;