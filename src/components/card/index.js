import React from 'react';
import './styles.css';
import UserIcon from '../../images/user.png';
import OptionIcon from '../../images/option.png';

const KanbanCard = ({ id, title, tag, userId, status, priority, optionOnClick = ()=>null  }) => {
  return (
    <div className="kanban-card">
        <div className='kanban-card-header'>
          <span className="kanban-card-id">{id}</span>
          <img className="kanban-card-user" src={UserIcon} width={20}  />
        </div>
        <span className='kanban-card-title' >{title}</span>
        <div className='kanban-card-footer' >
            <div onClick={optionOnClick} ><img src={OptionIcon} width={20} /></div>
            {tag.map((t, index) => (
                <span key={index} className="kanban-card-tag">{t}</span>
            ))}
        </div>
    </div>
  );
};

export default KanbanCard;


/*

 <div className="kanban-card" data-status={status} data-priority={priority}>
      <h3 className="kanban-card-title">{title}</h3>
      {tag.map((t, index) => (
        <span key={index} className="kanban-card-tag">{t}</span>
      ))}
      <div className="kanban-card-footer">
        <span className="kanban-card-user">User ID: {userId}</span>
        <span className="kanban-card-id">Card ID: {id}</span>
      </div>
    </div>
*/