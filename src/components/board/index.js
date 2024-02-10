import { useEffect, useState } from "react";
import KanbanCard from "../card";
import './styles.css';
export default function Board({  groupBy = "status", sortBy = "priority" , tickets, users }) {
  const [groupedTickets, setGroupedTickets] = useState({});
  const [allGroupedTickets, setAllGroupedTickets] = useState({});

  useEffect(() => {
      console.log({allGroupedTickets});
  }, [ allGroupedTickets ])

  useEffect(() => {
    const _groupedTickets = {...groupedTickets};
    const priorities = [0,1,2,3,4];
    const statuses = ['Backlog', 'In progress', 'Todo', 'Done', 'Canceled'];

    if (groupBy === 'priority') {
      priorities.forEach(priority => {
        _groupedTickets[priority] = _groupedTickets[priority] || [];
      });
    } else if (groupBy === 'status') {
      statuses.forEach(status => {
        _groupedTickets[status] = _groupedTickets[status] || [];
      });
    }
    setAllGroupedTickets(_groupedTickets);
  }, [ groupedTickets ]);
  
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
            <div className="column-title">{key}</div>
            <div className="column-items">
              {allGroupedTickets[key].map((item, index) => (
                <KanbanCard key={index} {...item} />
              ))}
            </div>
          </div>
        ))}
        </div>);
}
