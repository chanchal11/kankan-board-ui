import { useState } from 'react';
import './styles.css';
import KanbanIcon from '../../images/kanban.png';
import ArrowDownIcon from '../../images/down-arrow.png';
import ArrowUpIcon from '../../images/up-arrow.png';


export default function Navbar({ groupingOption, sortingOption, handleGroupingOptionChange, handleSortingOptionChange }) {
    const [showOptions, setShowOptions] = useState(false);
    return (
        <div className="navbar">
        <div className="display-btn" onClick={() => setShowOptions( (show) => !show)}  >
            <img src={KanbanIcon} width={20} />
            <span>Display</span>
            <img src={showOptions ? ArrowUpIcon : ArrowDownIcon} width={20} className='arrow-down' />
        </div>
        <div className={`options${showOptions ? '' : ' hide' }`}>
          <div className='option' >
            <span className='option-title' >Grouping</span>
            <select value={groupingOption} onChange={(e) => handleGroupingOptionChange(e.target.value)}>
              <option value="status">Status</option>
              <option value="userId">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className='option' >
            <span className='option-title' >Ordering</span>
            <select value={sortingOption} onChange={(e) => handleSortingOptionChange(e.target.value)}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      </div>
    );
}