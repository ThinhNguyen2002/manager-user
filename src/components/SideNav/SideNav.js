import './SideNav.scss'
import { Link } from 'react-router-dom'

function SideNav() {
    return (
        <nav className="side-nav">
            <div className="wrap-menu">
                <div className="item">
                    <Link to=""> Home</Link>
                </div>
                <div className="item">
                    <Link to="/profile"> User Profile</Link>
                </div>
                <div className="item">
               <Link  to="/manage"> Quản lý User</Link>
                </div>
            </div>
        </nav>
    )
}

export default SideNav
