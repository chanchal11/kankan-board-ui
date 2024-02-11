import React from "react";
import OnlineIcon from "../../images/online.png";
import OfflineIcon from "../../images/offline.png";
import './styles.css';

const Avator = ({ name, width=20, available=false }) => {
    return (
            <div>
                <img src={`https://ui-avatars.com/api/?name=${name.split(' ').join('+')}&background=random`} alt={name} width={width} style={{borderRadius: '50%'}}  />
                <span className="avator-available" >
                  { available ?  <img src={OnlineIcon} width={'10px'}  /> : <img src={OfflineIcon} width={'10px'} /> }
                    </span>
            </div>
    );

}

export default React.memo(Avator);