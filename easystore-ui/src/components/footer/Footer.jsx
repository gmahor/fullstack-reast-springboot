import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Footer = () => {
    return (
        <footer className="flex justify-center items-center py-4 font-primary text-gray-700">
            Built with
            <FontAwesomeIcon
                icon={faHeart}
                className='text-red-600 mx-1 animate-pulse'
                aria-hidden='true'
            />
            by 
            <a href='/' 
            className='text-primary font-semibold px-1 transition-colors duration-300 hover:text-dark'>
                eazybytes
            </a>
        </footer>
    );
}