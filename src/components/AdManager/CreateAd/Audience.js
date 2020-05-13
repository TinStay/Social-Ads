import React,{ useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
// import Auxilliary from '../../../hoc/Auxilliary';


const Audience = (props) => {

    const [isAgeFrom, setIsAgeFrom] = useState(false);

    let options = [];
    for(let i = 13; i <= 65; i++){
        options.push(i);
    }

    let ageFrom = options.map( age =>{
    return <option value={age} className="audience-form-option">{age}</option>
    })

    console.log("options", options);

    return(
        <div className="add-form-group">
        <h3 className="border-bottom add-form-label">Choose your audience</h3>
        <form className="audience-form">
            <div className="audience-form-gender ">
                <label className="" for="exampleFormControlSelect1">Gender:</label>
                <select className="add-form-select " id="exampleFormControlSelect1" >
                    <option>All</option>
                    <option>Men</option>
                    <option>Women</option>
                </select>
            </div>
            <div className="audience-form-age ">
                <label for="exampleFormControlSelect1">Age</label>
               <div className="d-flex col-md-6">
                    <p>From</p>
                        <select className="audience-form-select col-sm-5" id="exampleFormControlSelect1" >
                        {ageFrom}
                        </select>

                    <p>To</p>
                    <div class="wrapper">
                        <select name="" id="" class="audience-form-select">
                            <option value="">One</option>
                            <option value="">Two</option>
                            <option value="">Three</option>
                            <option value="">Four</option>
                            <option value="">Five</option>
                            <option value="">Six</option>
                            <option value="">Seven</option>
                            <option value="">Eight</option>
                            <option value="">Nine</option>
                            <option value="">Ten</option>
                            <option value="">One</option>
                            <option value="">Two</option>
                            <option value="">Three</option>
                            <option value="">Four</option>
                            <option value="">Five</option>
                            <option value="">Six</option>
                            <option value="">Seven</option>
                            <option value="">Eight</option>
                            <option value="">Nine</option>
                            <option value="">Ten</option>
                        </select>
                    </div>

               </div>
            </div>
            {/* <div className="form-group">
                <label for="exampleFormControlSelect2">Example multiple select</label>
                
            </div> */}
            <div className="form-group">
                <label for="exampleFormControlTextarea1">Example textarea</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
        </form>
        </div>
    );
}

export default Audience