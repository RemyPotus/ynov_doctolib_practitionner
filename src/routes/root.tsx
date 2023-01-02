import { Outlet } from "react-router-dom";
import './root.css';
import listIcon from '../assets/list-icon.png';
import ButtonInstallPWA from '../components/ButtonInstallPWA';

export default function Root() {
    return (
        <>
            <div>
                <div id="detail">
                    <Outlet />
                </div>
                <div className="bottom-navbar">
                    <nav style={{width:'80%', display:"flex"}}>
                        <div className="navbarItem">
                            <a className="iconCentered" href={`my-appointments`}><img className="navbarIcon" src={listIcon} alt="my appointments"/></a>
                        </div>
                        {<ButtonInstallPWA/>}
                    </nav>
                </div>
            </div>
        </>
    );
  }