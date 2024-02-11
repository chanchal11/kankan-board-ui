import { useEffect, useState } from "react";
import KanbanCard from "../card";
import './styles.css';
import Addicon from '../../images/add.png';
import OptionIcon from '../../images/option.png';
import Avatar from "../avatar";

export default function Board({ groupBy = "status", sortBy = "priority", tickets, users }) {
  const [groupedTickets, setGroupedTickets] = useState({});
  const [allGroupedTickets, setAllGroupedTickets] = useState({});
  const [_users, setUsers] = useState({});

  useEffect(() => {
    const newUsers = {};
    users.forEach(user => {
      newUsers[user.id] = user;
    });
    setUsers(newUsers);
  }, [users]);

  useEffect(() => {
    console.log({ allGroupedTickets });
  }, [allGroupedTickets])

  useEffect(() => {
    const _groupedTickets = { ...groupedTickets };
    const priorities = [0, 1, 2, 3, 4];
    const priorityTitles = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];
    const statuses = ['Backlog', 'In progress', 'Todo', 'Done', 'Canceled'];

    if (groupBy === 'priority') {
      priorities.forEach(priority => {
        _groupedTickets[priorityTitles[priority]] = _groupedTickets[priority] || [];
        _groupedTickets[priority] = _groupedTickets[priority] || [];
        delete _groupedTickets[priority];
      });
    } else if (groupBy === 'status') {
      statuses.forEach(status => {
        _groupedTickets[status] = _groupedTickets[status] || [];
      });
    }
    else if (groupBy === 'userId') {
      users.forEach(user => {
        _groupedTickets[user.name] = _groupedTickets[user.id] || [];
        delete _groupedTickets[user.id];
      })
    }
    setAllGroupedTickets(_groupedTickets);
  }, [groupedTickets]);

  useEffect(() => {
    const groupTickets = (tickets) => {
      return tickets.reduce((acc, ticket) => {
        const group = ticket[groupBy];
        acc[group] = acc[group] || [];
        acc[group].push(ticket);
        return acc;
      }, {});
    };

    const sortTickets = (groupedTickets) => {
      Object.keys(groupedTickets).forEach(group => {
        groupedTickets[group].sort((a, b) => {
          if (sortBy === 'priority') {
            return a.priority - b.priority;
          } else if (sortBy === 'title') {
            return a.title.localeCompare(b.title);
          }
          return 0;
        });
      });
      return groupedTickets;
    };

    const groupedAndSortedTickets = sortTickets(groupTickets(tickets));
    setGroupedTickets(groupedAndSortedTickets);
  }, [groupBy, sortBy, tickets]);

  return (
    <div className="board">
      {Object.keys(allGroupedTickets).map((key) => (
        <div className="column" key={key}>
          <div className="column-title">
            <div className="gap">
              <div className="avatar-and-name" >
              {groupBy === 'userId' &&  <Avatar name={key} width={'20px'} available={users?.filter(user => user.name === key)?.[0]?.available} />} <span>{key}</span>
              </div> 
              <span>{allGroupedTickets[key].length}</span>
            </div> 
              <div className="gap" >
                <img className="col-icon" src={Addicon} width={20} /> 
                <img className="col-icon" src={OptionIcon} width={20} />
              </div>
             </div>
          <div className="column-items">
            {allGroupedTickets[key].map((item, index) => (
              <KanbanCard key={index} {...item} user={users.filter(user => user.id === item.userId)?.[0]} />
            ))}
          </div>
        </div>
      ))}
    </div>);
}
