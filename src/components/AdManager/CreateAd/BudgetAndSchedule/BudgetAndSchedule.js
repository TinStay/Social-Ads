import React,{ useState, useEffect } from 'react';
import DatePicker,{addDays} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import  { Form, Alert, Button } from 'react-bootstrap';
// Redux
import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions/actionTypes';


// import Globalize from 'globalize';
// import globalizeLocalizer from 'react-widgets-globalize';

const BudgetAndSchedule = (props) => {
    // Alert 
    const [alertType, setAlertType] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    
    const [showAlerts, setShowAlerts] = useState(false);
    const [scheduleError, setScheduleError] = useState("The period for running your ads should be more than 30 days");
    const [fbBudgetError, setFbBudgetError] = useState("Facebook or instagram daily budget is too small");
    const [googleBudgetError, setGoogleBudgetError] = useState("Google daily budget is too small");


    // Budget type
    const [isDailyBudget, setIsDailyBudget] = useState(true);
    const [isLifetimeBudget, setIsLifetimeBudget] = useState(false);

    // Budget figures
    // Facebook 
    const [dailyBudgetFb, setDailyBudgetFb] = useState(1);
    const [lifetimeBudgetFb, setLifetimeBudgetFb] = useState(30);

    // Google
    const [googleDailyBudget, setGoogleDailyBudget] = useState(1)
    
    const setDailyAndLifetimeBudget = e => {

        if(e.target.name === "daily"){
            // Float value from form
            const dailyBud = parseFloat(e.target.value).toFixed(2);

            // Integer value from form
            // const dailyBud = e.target.value;
            // dailyBud.toFixed(2);

            // Checks if dailyBudget > 1 else => shows error
            if(dailyBud > 1){
                // setShowAlert(false)
                setFbBudgetError("")
                setDailyBudgetFb(dailyBud);
            }else{
                // setShowAlert(true)
                // setAlertType("DailyBudgetTooSmall")
                setFbBudgetError("Facebook or instagram daily budget is too small")
                setDailyBudgetFb(dailyBud);
            }
            
            // For float value
            setLifetimeBudgetFb((dailyBud * period).toFixed(2))

            // For integer value
            // setLifetimeBudgetFb(dailyBud * period);
        }


        if(e.target.name === "lifetime"){
            const lifetimeBud = parseFloat(e.target.value).toFixed(2);

            // Checks if dailyBudget > 1 else => shows error
            if(lifetimeBud / period >= 1){
                // setShowAlert(false);
                setFbBudgetError("");
                const priceDaily = (lifetimeBud / period).toFixed(2);
                setDailyBudgetFb(priceDaily);
            }else{
                setFbBudgetError("Facebook or instagram daily budget is too small");
                // setShowAlert(true);
                // setAlertType("DailyBudgetTooSmall");
            }
            setLifetimeBudgetFb(lifetimeBud);
        }
    }


    // Schedule type
    const [asapSchedule, setAsapSchedule] = useState(true);
    const [customSchedule, setCustomSchedule] = useState(false);

    // Schedule dates
    const [startDate, setStartDate] = useState();

    // Setting 30 days difference between dates
    const endDateMin = new Date();
    endDateMin.setDate(endDateMin.getDate() + 30);
    const [endDate, setEndDate] = useState();
    const [period, setPeriod] = useState(30);

    // Update form values from redux state 
    useEffect(() => {
        if(props.adInfo.budgetAndSchedule != null && props.adInfo.budgetAndSchedule != null){

            let budgetRedux = {...props.adInfo.budgetAndSchedule.budget};
            let scheduleRedux = {...props.adInfo.budgetAndSchedule.schedule};

            // console.log("budgetRedux", budgetRedux);
            // console.log("scheduleRedux", scheduleRedux);

            // Update schedule
            if(scheduleRedux.asapSchedule == true || scheduleRedux.asapSchedule != undefined){
                setAsapSchedule(true);
                setCustomSchedule(false);

            }else if(scheduleRedux.customSchedule == true || scheduleRedux.customSchedule != undefined){
                setAsapSchedule(false);
                setCustomSchedule(true);

                // Set redux dates to form values
                setStartDate(scheduleRedux.startDate);
                setEndDate(scheduleRedux.endDate);
            }else{
                // Do not update anything
            }

            // Update budget values 
            if(budgetRedux.fbDailyBudget != (null || undefined) && budgetRedux.fbLifetimeBudget != (null || undefined)){
                setDailyBudgetFb(budgetRedux.fbDailyBudget);
                setLifetimeBudgetFb(budgetRedux.fbLifetimeBudget);
            }else{
                console.log("Facebook budget missing from redux state");
            }

            if(budgetRedux.googleDailyBudget != (null || undefined)){
                setGoogleDailyBudget(budgetRedux.googleDailyBudget);
            }else{
                console.log("Google daily budget missing from redux state");
            }


        }else{
            console.log("Redux state missing")
        }

        
        
    }, [])



    // Values which will trigger a re-render
    const state = [isDailyBudget, isLifetimeBudget, dailyBudgetFb, lifetimeBudgetFb, googleDailyBudget, 
        asapSchedule, customSchedule, startDate, endDate, period]


    // Update errors everytime user changes some of the values
    useEffect(()=>{
        if(customSchedule){
            const oneDay = 24 * 60 * 60 * 1000;
            const diffDays = Math.round(Math.abs((startDate - endDate) / oneDay));
            setPeriod(diffDays); // Difference between the start and end date

            // Update lifetime value for facebook ads
            if(props.adInfo.runOn.includes("runOnFacebook") || props.adInfo.runOn.includes("runOnInstagram")){
                setLifetimeBudgetFb(dailyBudgetFb * period);
            }

            if(diffDays < 30){
                setScheduleError("The period for running your ads should be at least 30 days")
                // setShowAlert(true)
            }else{
                setScheduleError("");

                if((lifetimeBudgetFb / diffDays) < 1){
                    setFbBudgetError("Facebook or instagram daily budget is too small");
                    // setShowAlert(true)
                }else{
                    setFbBudgetError("");
                    // setShowAlert(false)
                }
            }
        }

        if(asapSchedule){
            setPeriod(30)
            setScheduleError("")

            if(lifetimeBudgetFb < 30){
                // setShowAlert(true)
                setFbBudgetError("Facebook or instagram daily budget is too small")
            }else{
                setFbBudgetError("")
            }
        }


        // Set googleBudgetError message
        if(props.adInfo.runOn.includes("runOnGoogle")){
            if(googleDailyBudget >= 1){setGoogleBudgetError("")}
            else{setGoogleBudgetError("Google daily budget is too small")}
        }else{
            setGoogleBudgetError("")
        }
        

    },[state])


    const changeToDaily = (e) => {
        if(e.target.checked){
            setIsDailyBudget(true)
            setIsLifetimeBudget(false)
        }
    }

    const changeToLifetime = (e) => {
        if(e.target.checked){
            setIsDailyBudget(false)
            setIsLifetimeBudget(true)
        }
    }

    const changeAsapSchedule = (e) => {
        if(e.target.checked){
            setAsapSchedule(true)
            setCustomSchedule(false)
        }
    }

    const changeCustomSchedule = (e) => {
        if(e.target.checked){
            setAsapSchedule(false)
            setCustomSchedule(true)
        }
    }



    const saveData = e => {
        e.preventDefault()


        if(scheduleError === "" && fbBudgetError === "" && googleBudgetError === "" ){
            setShowAlerts(false)
            let formData;

            if(props.adInfo.runOn.includes("runOnFacebook")  || props.adInfo.runOn.includes("runOnInstagram")){
                // Both fb and google ads have been selected
                if(props.adInfo.runOn.includes("runOnGoogle")){
                    formData = {
                        budget: {
                            fbDailyBudget: dailyBudgetFb,
                            fbLifetimeBudget: lifetimeBudgetFb,
                            googleDailyBudget: googleDailyBudget
                        }
                    };
                }else{
                    formData = {
                        budget: {
                            fbDailyBudget: dailyBudgetFb,
                            fbLifetimeBudget: lifetimeBudgetFb,
                        }
                    };
                }

            }else if(props.adInfo.runOn.includes("runOnGoogle")){
                formData = {
                    budget: {
                        googleDailyBudget: googleDailyBudget
                    }
                };
            }

            if(asapSchedule){
                formData = {
                    ...formData,
                    schedule: {
                        asapSchedule: asapSchedule,
                        period: `${period} days`
                    }
                }
            }else if(customSchedule){
                formData = {
                    ...formData,
                    schedule: {
                        customSchedule: customSchedule,
                        startDate: startDate,
                        endDate: endDate,
                        period: `${period} days`
                    },
                }
            }

            props.saveBudgetAndSchedule(formData)
            props.goToSubscriptionPlans()
        }else{
            setShowAlerts(true)
        }
       
    }
    
    let scheduleAlert = null;
    let fbBudgetAlert = null;
    let googleBudgetAlert = null;

    if(showAlerts){
        if(scheduleError != ""){
            scheduleAlert = (
            <Alert variant='danger' >
                {scheduleError}
            </Alert>
            )
        }
        if(fbBudgetError != ""){
            fbBudgetAlert = (
            <Alert variant='danger' >
                {fbBudgetError}
            </Alert>
            )
        }
        if(googleBudgetError != ""){
            googleBudgetAlert = (
            <Alert variant='danger' >
                {googleBudgetError}
            </Alert>
            )
        }
      
    }

    // Budget info box
    let budgetInfo;
    budgetInfo = <span><b>{lifetimeBudgetFb}$</b> for the period of {customSchedule ? period + " days" : "30 days"}  and around <b>{dailyBudgetFb}$</b>/day.</span>

    let budgetTitleFb = "";
    if(props.adInfo.runOn.includes("runOnFacebook") && props.adInfo.runOn.includes("runOnInstagram")){
        budgetTitleFb = "Facebook & Instagram"
    }else if(props.adInfo.runOn.includes("runOnFacebook")){
        budgetTitleFb = "Facebook"
    }else if(props.adInfo.runOn.includes("runOnInstagram")){
        budgetTitleFb = "Instagram"
    }

    return(
        <div className="add-form-group">
            <h3 className="border-bottom add-form-label">Choose your budget and starting date</h3>
            <form onSubmit={(e) => saveData(e)} className="budget-form ">
                <div className="col-12">
                    {scheduleAlert}
                </div>
                <div className="budget-form-schedule col-md-6">
                    <h3 className="budget-form-label font-color ">Schedule</h3>
                    <div className="asap-schedule-field">
                        <div>
                        <Form.Check
                            custom
                            block
                            label="Run as soon as possible "
                            type="radio"
                            id="asap-schedule"
                            className="radio-schedule"
                            name="Asap schedule"
                            checked={asapSchedule}
                            onChange={(e) => changeAsapSchedule(e)}
                        />
                        </div>
                    </div>
                    <div className="custom-schedule-field ">
                        <Form.Check
                            custom
                            block
                            label="Custom schedule"
                            type="radio"
                            id="custom-schedule"
                            className="radio-schedule"
                            name="Custom schedule"
                            checked={customSchedule}
                            onChange={(e) => changeCustomSchedule(e)}
                        />
                        { customSchedule ? 
                            <div className="">
                                <Form.Group>
                                <div className="start-date d-flex">
                                    <label className="mr-2 my-auto">Start date:</label>
                                    <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    minDate={new Date()}
                                    dateFormat="dd-MM-yyyy"
                                    className="date-picker"
                                    placeholderText="Click to select a date"
                                    />
                                </div>
                                <div className="end-date d-flex">
                                    <label className="mr-2 my-auto">End date:</label>
                                    <DatePicker
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    minDate={endDateMin}
                                    dateFormat="dd-MM-yyyy"
                                    className="date-picker"
                                    placeholderText="Click to select a date"
                                    />
                                </div>
                            </Form.Group>
                            </div> : null}

                    </div>
            </div>
                <div className="budget-form-budget col-md-12">
                <h3 className="budget-form-label font-color">Budget</h3>
                    {props.adInfo.runOn.includes("runOnFacebook") || props.adInfo.runOn.includes("runOnInstagram") ? 
                        <div className="fb-budget">
                        <h4 className="font-color mb-4">{budgetTitleFb}</h4>
                        <div className="row fb-budget-box border">
                            <div className="col-12">
                                {fbBudgetAlert}
                            </div>
                            <div className="col-md-5">
                                <div className="daily-budget-field d-flex ">
                                {/* <div className=""> */}
                                    <Form.Check
                                        custom
                                        block
                                        label="Daily budget:"
                                        type="radio"
                                        id={"daily-budget-radio"}
                                        className="radio-budget"
                                        name="dailyBudget"
                                        checked={isDailyBudget}
                                        onChange={(e) => changeToDaily(e)}
                                    />
                                {/* </div> */}
                                { isDailyBudget ?  
                                <div className="input-group mx-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">USD</span>
                                    </div>
                                    <input type="number" name="daily" value={dailyBudgetFb} onChange={(e) => setDailyAndLifetimeBudget(e)} className="form-control" placeholder="Daily budget" min="1.00" max="500" step="1"/>
                                </div> : null }
                            </div>
                            <div className="lifetime-budget-field d-flex">
                                {/* <div className="">   */}
                                    <Form.Check
                                        custom
                                        block
                                        label="Lifetime budget:"
                                        type="radio"
                                        id={`lifetime-budget-radio`}
                                        className="radio-budget"
                                        name="lifetimeBudget"
                                        checked={isLifetimeBudget}
                                        onChange={(e) => changeToLifetime(e)}
                                    />
                                {/* </div> */}
                                { isLifetimeBudget ?  
                                <div className="input-group ml-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">USD</span>
                                    </div>
                                    <input type="number" name="lifetime" value={lifetimeBudgetFb} onChange={(e) => setDailyAndLifetimeBudget(e)} className="form-control" placeholder="Lifetime budget" min="30.00" max="2000000" step="1"/>
                                </div> : null }
                            </div>
                            </div>

                            <div className="col-md-7">
                                <div className="spending text-center">
                                    <p className="my-0">You will spend no more than {budgetInfo}</p>
                                </div>
                            </div>
                        </div>
                    </div> : null}

                    {props.adInfo.runOn.includes("runOnGoogle") ? 
                        <div className="ggl-budget">
                            <h4 className="font-color mb-4">Google ads</h4>
                            <div className="col-12">
                                {googleBudgetAlert}
                            </div>
                            <div className="row ggl-budget-box border">
                                <div className="col-12 ">
                                    <p>Google ads will run every month unless you specify a time period or stop them in your Ad Manager.</p>
                                </div>
                                <div className="col-md-5 d-flex">
                                    <label >Daily budget:</label>
                                    <div className="ggl-budget-field input-group mx-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1">USD</span>
                                        </div>
                                        <input type="number" name="gglBudget" value={googleDailyBudget} onChange={(e) => setGoogleDailyBudget(e.target.value)} className="form-control" placeholder="Google budget" min="1" max="2000000" step="1.00"/>
                                    </div>
                                </div>

                                <div className="col-md-7">
                                    <div className="spending text-center">
                                        <p className="my-0">You will spend no more than <b>{googleDailyBudget * 30}$</b>/month.</p>
                                    </div>
                                </div>
                            </div>
                        </div> : null}
                    
                </div>
                <div className="d-flex justify-content-end">
                    <button
                        onClick={() => props.handleBack()}
                        className="btn btn-cancel"
                        type="submit"
                    >
                    Back
                    </button>
                    <Button variant="contained" className="btn btn-next" onClick={(e) => saveData(e)}>
                        Continue
                    </Button>
                </div>
            </form>
          
        </div>
    );
}

const mapStateToProps = state => {
    return{ 
        adInfo: state.adInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveBudgetAndSchedule: (data) => dispatch({type: actionTypes.SAVE_BUDGET_AND_SCHEDULE, data: data}),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetAndSchedule);