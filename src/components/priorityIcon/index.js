import P4 from '../../images/p4.png';
import P3 from '../../images/p3.png';
import P2 from '../../images/p2.png';
import P1 from '../../images/p1.png';
import P0 from '../../images/option.png';

function getPriorityIcon(priority = 0) {
    switch (priority) {
        case 4:
            return P4;
        case 3:
            return P3;
        case 2:
            return P2;
        case 1:
            return P1;
        default:
            return P0;
    }
}

export default function PriorityIcon({ priority = 0, width }) {
    return (
       <img src={getPriorityIcon(priority)} width={width} />
    );
}