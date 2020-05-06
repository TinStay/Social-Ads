import React from 'react';
import Jumbotron from './Jumbrotron';
import InfoSection from './InfoSection';

const HomePage = props =>{


    return(
        <div className="homepage">
            <div className="jumbotron-bg">
                <div className="gradient-bgc">
                    <Jumbotron />
                </div>
            </div>
            <InfoSection/>
        </div>
    )
}

export default HomePage;