import React from 'react';
import './styles.css';
import TagIcon from '../../images/tag.png';
import Avatar from '../avatar';
import PriorityIcon from '../priorityIcon';

const KanbanCard = ({ id, title, tag, userId,user,status, priority }) => {
  return (
    <div className="kanban-card">
        <div className='kanban-card-header'>
          <span className="kanban-card-id">{id}</span>
          <Avatar name={user.name} width={'20px'} available={user.available} />
        </div>
        <span className='kanban-card-title' >{title}</span>
        <div className='kanban-card-footer' >
            <div className='kanban-card-priority' ><PriorityIcon priority={priority} width={20} /></div>
            {tag.map((t, index) => (
              <div className='kanban-card-tag-container' >
                <img key={index} src={TagIcon} width={'12px'} height={'12px'} />
                <span key={index} className="kanban-card-tag">{t}</span>
              </div>
            ))}
        </div>
    </div>
  );
};

export default KanbanCard;