import React from 'react';
import Jumbotron from './Jumbrotron';
import InfoSection from './InfoSection';
import SubscriptionPlans from './SubscriptionPlans/SubscriptionPlans';

const HomePage = props =>{


    return(
        <div className="homepage">
            <div className="jumbotron-bg">
                <div className="gradient-bgc">
                    <Jumbotron />
                </div>
            </div>
            <InfoSection/>
            <SubscriptionPlans/>
        </div>
    )
}

export default HomePage;