import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import AdViewFb from '../AdPlacement/FacebookPlacements/AdViewFb';

const FbAdViewModal = (props) =>{

    return( 
        <div className="modal fade" id="FbAdView" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                <div className="modal-header mb-3">
                    <h5 className="modal-title " id="exampleModalLongTitle">View your ad design</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className=" fb-view-modal">
                    <AdViewFb 
                    runOnPlatforms={props.runOnPlatforms}
                    adDetails={props.adDetails}
                    pictureOrVideoUrl={props.pictureOrVideoUrl}
                    headline={props.headline}
                    description={props.description}
                    url={props.url}
                    />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Edit</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default FbAdViewModal;