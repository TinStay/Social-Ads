import React from "react";
import * as subscriptionInfo from "../../../../shared/SubscriptionInfo";

const SubscriptionPlanInfo = (props) => {
  let subscriptionPlanInfo = null;

  switch (props.subscriptionPlan) {
    case "Basic":
      subscriptionPlanInfo = subscriptionInfo.basicPlan;
      break;

    case "Premium":
      subscriptionPlanInfo = subscriptionInfo.premiumPlan;
      break;

    case "Deluxe":
      subscriptionPlanInfo = subscriptionInfo.deluxePlan;
      break;

    case "onlyRunAds":
      subscriptionPlanInfo = subscriptionInfo.onlyRunAdsPlan;
      break;
  }

  return (
    <div className="subscription-info font-color">
      <div className="subscription-name">
        <i className={`fas ${subscriptionPlanInfo.iconClass}`}></i>{" "}
        {subscriptionPlanInfo && subscriptionPlanInfo.name}
      </div>

      <div class="subscription-description">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
        deleniti tempora ipsum optio amet blanditiis repudiandae officiis dolore
        asperiores praesentium.
      </div>

      <div className="subscription-options">
        {/* <p class="list-heading">This plan includes:</p> */}
        <ul>
          {subscriptionPlanInfo &&
            subscriptionPlanInfo.options.map((option, idx) => {
              return (
                <li key={idx}>
                  <i className="fas fa-check"></i> {option}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default SubscriptionPlanInfo;
