import React, {  PureComponent } from "react";
import { Route, Redirect, withRouter,Link } from "react-router-dom";
import { AuthContext } from "../../components/Auth/Auth";
import { Form } from 'react-bootstrap';


// Components
import CreateAdForm from './CreateAdForm';
import PrivateRoute from '../../containers/User/PrivateRoute';

class AdManager extends PureComponent{
//   const {currentUser} = this.context;
//   static contextType = AuthContext;

    state = {
        showForm: false
    }

    showForm = () => {
        this.setState({ showForm: true})
        // this.props.history.replace('/ad-manager/create-ad')
        // console.log("this.props.history", this.props.history)
    }


  render(){
    //   console.log("order", this.state.order)
        
    // let path = this.props.match.path + '/create-ad';
    
    let adSection = (
            <div className="manager-ad-form-row text-center">
                
                <div className="first">
                    <h2 className="">You have no running ads at the moment</h2>
                    <div class="d-flex button-container justify-content-center">
                        <button onClick={this.showForm} className="btn btn-add text-align-center d-flex"><i class="far fa-plus-square"></i> Create a campaign</button>
                        <button className="btn btn-watch-tutorial d-flex"><i class="fas fa-video"></i>Watch tutorial</button>

                        {/* <div className=" second">
                            <h3>Check out a tutorial how to run ads</h3>
                        </div> */}

                    </div>
                </div>
             </div>
      ); 
      
    let createAdForm = null;

    if(this.state.showForm){
        createAdForm = <CreateAdForm goToAdManger={() => this.setState({showForm: false})}/>
    }

    return (
        <div className="manager">
            
            <div className="manager-jumbotron d-md-flex justify-content-between">
                <h1 className="manager-jumbotron-title dark-purple-font ">Ad Dashboard</h1>
                
            </div>
            <div className="manager-ad-form">
                {this.state.showForm ? createAdForm : adSection}
            </div>
        </div>
       );
  }
};


export default withRouter(AdManager);