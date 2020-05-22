import React,{ useState, useEffect } from 'react';
import  { Form } from 'react-bootstrap'

const BudgetAndDate = (props) => {
    const [dailyBudget, setDailyBudget] = useState(true);
    const [lifetimeBudget, setLifetimeBudget] = useState(false);

    const changeToDaily = (e) => {
        if(e.target.checked){
            setDailyBudget(true)
            setLifetimeBudget(false)
        }
    }

    const changeToLifetime = (e) => {
        if(e.target.checked){
            setDailyBudget(false)
            setLifetimeBudget(true)
        }
    }
    
    return(
        <div className="add-form-group">
            <h3 className="border-bottom add-form-label">Choose your budget and starting date</h3>
            <form className="budget-form">

            <div className="fb-placements-radioBtns col-md-6">
               <h3 className="fb-placements-label font-color ">Budget</h3>
                    <div className="daily-budget-field ">
                        <Form.Check
                            custom
                            block
                            label="Daily"
                            type="radio"
                            id={"daily-budget-radio"}
                            className="radio-big"
                            name="dailyBudget"
                            checked={dailyBudget}
                            onChange={(e) => changeToDaily(e)}
                        />
                       { dailyBudget ?  <div class="input-group mt-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">USD</span>
                            </div>
                            <input type="text" class="form-control" placeholder="Daily budget" aria-label="budget" aria-describedby="basic-addon1"/>
                        </div> : null }
                    </div>
                    <div className="daily-budget-field">
                        <Form.Check
                            custom
                            block
                            label="Lifetime"
                            type="radio"
                            id={`lifetime-budget-radio`}
                            className="radio-big"
                            name="lifetimeBudget"
                            checked={lifetimeBudget}
                            onChange={(e) => changeToLifetime(e)}
                        />
                        { lifetimeBudget ?  <div class="input-group mt-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">USD</span>
                            </div>
                            <input type="text" class="form-control" placeholder="Daily budget" aria-label="budget" aria-describedby="basic-addon1"/>
                        </div> : null }
                    </div>
                 
            </div>

            {/* <div className="row">
                <div className="budget-form-budget col-md-7">
                    <div class="input-group mb-3">
                        <label className="font-color h4 mr-3">Daily Budget</label>
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">USD</span>
                        </div>
                        <input type="text" class="form-control" placeholder="Budget" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                </div>
            </div> */}

            <div className="add-form-row">
                <div className="budget-form-date col-md-7">
                    <div class="input-group mb-3">
                        <label className="font-color h4 mr-3">Starting date</label>

                    </div>
                </div>
            </div>
                
                
                
            </form>
        </div>
    );
}

export default BudgetAndDate;