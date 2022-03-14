import { useCallback } from 'react';
import './GoToTop.scss'
import { IconArrowDown } from '../../assets/components/iconArrowDown';


const GoToTop = () => {
    const goTop = useCallback(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [])
    
    return (
        <div className='toTopButton' onClick={() => goTop()} >
            <IconArrowDown color='white' />
        </div>
    );
}

export default GoToTop;