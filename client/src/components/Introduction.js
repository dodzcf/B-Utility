import React from 'react';
import './introduction.css';
import mobile from '../images/mobile.jpg';
const Introduction=()=>
{
    return (
        <>
        <div className="fluid jumbotron firstbox">
            {/* <div className="container">
                <h1 className="headerlogo">B-Utility</h1>
            </div> */}
            <br></br>
            <div class="row d-flex justify-content-center">
                <div class="col-md-4 d-flex justify-content-center"><img src={mobile} className="mobile" />&nbsp;</div>
                <div class="col-md-8 d-flex justify-content-center">
                <div className="whatis"><h3><b>What is B-Utility?</b></h3>
                <ul>
                    <li>B-Utility (Backup-Utility) is a web application backup program for you where you can call a specific repairperson to fix your household items. </li>
                    <li>After you place an order. You will be accepted by a local repairperson near you.</li>
                    <li>The repairperson will contact you using this website's message.</li>
                    <li>After the work is done you can pay the repairperson using an option of your choice.</li>
                </ul></div>
               
                 </div>
            </div>
        </div>
        </>
    )
}

export default Introduction;