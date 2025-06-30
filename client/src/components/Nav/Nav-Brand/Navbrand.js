import './NavBrand.css'
import { Link } from 'react-router-dom';

const NavBrand = () => {
    return ( 
        <div href="#home" className='navbrand__container'>
           <h2 className='navbrand'>
               <Link to="/">Click Smart Shopping</Link> {/* Updated name */}
            </h2>
        </div>
     );
}
 
export default NavBrand;