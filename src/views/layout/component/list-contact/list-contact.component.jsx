import React, { Fragment } from "react";
import swal from "sweetalert";
import {
    Row,
    Col,
    Card,
    CardBody,
    CardImg,
    CardTitle,
    CardSubtitle,
    Input,
    Label,
} from "reactstrap";
import "./list-contact.styles.scss";
import robin from "../../../../../src/images/list-images/photo.jpg";

class ListContact extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return(
            <Fragment>
                <div className="list-contact" onClick={()=>this.props.handleViewDataFromSearch()}>
                    <Card>
                        <img src={this.props.data.photo} alt="" className="image-list"/>
                    </Card>
                    <div className="image-name">{this.props.data.firstName}</div>
                </div>
            </Fragment>
        )
    }
}

export default ListContact;