import './styles.css';
import LoadingGif from '../../images/loader.gif';
export default function LoadingAnimation(){
    return (
        <div className='loading' >
            <img src={LoadingGif} />
        </div>
    );
}