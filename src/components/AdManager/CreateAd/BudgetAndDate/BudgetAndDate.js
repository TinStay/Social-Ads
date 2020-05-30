import React,{ useState, useEffect } from 'react';
import { DateTimePicker } from 'react-widgets'
import  { Form  } from 'react-bootstrap'

import Globalize from 'globalize';
import globalizeLocalizer from 'react-widgets-globalize';

const BudgetAndDate = (props) => {
    // Globalize.load( require( "cldr-data" ).entireSupplemental() );
    Globalize.locale('en')

    globalizeLocalizer()

    // let { DateTimePicker } = DateTimePicker

    const [dailyBudget, setDailyBudget] = useState(true);
    const [lifetimeBudget, setLifetimeBudget] = useState(false);

    const [startingDate, setStartingDate] = useState();

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
            <form className="budget-form row">

            <div className="budget-form-budget col-md-6">
               <h3 className="budget-form-label font-color ">Budget</h3>
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
                    <div className="lifetime-budget-field">
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

            <div className="col-md-6">
                <div className="budget-form-date">
                    <div class="input-group mb-3">
                        <label className="font-color h4 mr-3">Starting date</label>
                        <Form.Group>
                        <label>Starting date</label>
                        <DateTimePicker
                        defaultValue={new Date()}
                    />
                       
                        </Form.Group>
                    </div>
                </div>
            </div>
                
                
                
            </form>
        </div>
    );
}

export default BudgetAndDate;