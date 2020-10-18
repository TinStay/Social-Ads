import React, { useState, useEffect} from 'react';
import { Button } from "react-bootstrap";

// Redux
import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions/actionTypes';

const Checkout = (props) => {
   

    return(
        <div>
            <h3 className="border-bottom add-form-label">Checkout</h3>

            <div className="d-flex justify-content-end">
                <button onClick={() => props.handleBack()} className="btn btn-cancel" type="submit">
                    Back
                </button>
                <Button variant="contained" className="btn btn-next">
                    Continue
                </Button>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return{
        adInfo: state.adInfo,
        state: state
    }
}

const mapDispatchToProps = dispatch => {
    return{
        // saveSubscriptionPlan: (plan) => dispatch({type: actionTypes.SAVE_SUBSCRIPTION_PLAN, plan: plan})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
