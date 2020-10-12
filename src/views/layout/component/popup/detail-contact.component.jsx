import React, { Fragment, useState, useEffect} from "react";
import { Row, Col, Label, CardBody, Button, Input } from "reactstrap";
import robin from "../../../../../src/images/list-images/photo.jpg";
import "./detail-contact.styles.scss";
import {connect} from "react-redux";
import{setCurrentContact} from "../../../../redux/contact/contact.action";
import store from "../../../../global/store";
import swal from "sweetalert";



const DetailContact = (props)=>{
    const [detail_first_name, setFirstName] = useState("");
    const [detail_last_name, setLastName] = useState("");
    const [detail_age, setAge] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");
    const [isDefault, setDefault] = useState(false);


    const [isFieldChange, setIsFieldChange] = useState(false);

    useEffect(()=>{
        if(isDefault === false){
            setFirstName(props.dataContact.firstName);
            setLastName(props.dataContact.lastName);
            setAge(props.dataContact.age);
            setPhoto(props.dataContact.photo);
            setId(props.dataContact.id);
            setDefault(true);
        }

    });

    const handleUpdateContact = async(e)=>{
        e.preventDefault();
        let data ={
            firstName:detail_first_name,
            lastName:detail_last_name,
            age:detail_age
        };
        let result = await store.actions.updateContact(id,JSON.stringify(data));
        if(result){
            swal("info", "Data Updated ","success");
        }
    }

    return(
        // console.log("robin")
        <Fragment>
            <div className="detail-contact">
                <CardBody>
                    <Row>
                        <Col>
                        <div  className="row-image-detail">
                            <img src={photo} alt="" name="detail-image" className="img-detail-contact img-thumbnail" />
                        </div>
                        </Col>
                        <Col className="col-text-info-detail">
                        <Row>
                        <Col id="first-name">
                        <Label htmlFor="first-name"> First Name : </Label>
        
                            <Input type="text" value={detail_first_name} onChange={(e)=>{setFirstName(e.target.value); setIsFieldChange(true);}}></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col id="last-name">
                        <Label htmlFor="last-name"> Last Name : </Label>

                            <Input type="text" value={detail_last_name} onChange={(e)=>{setLastName(e.target.value); setIsFieldChange(true);}}></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col id="age">
                        <Label htmlFor="age"> Age : </Label>

                            <Input type="text" value={detail_age} onChange={(e)=>{setAge(e.target.value); setIsFieldChange(true);}}></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button className={isFieldChange===true?"btn-update form-control btn-success":"btn-none"} onClick={(e)=>handleUpdateContact(e)}>Update</Button>
                        </Col>
                    </Row>
                
                        </Col>
                    </Row>
                    
                </CardBody>
                </div>
        </Fragment>
   
   );
}

const mapStateToProps = state=>({
    dataContact:state.contact.dataContact
  });
  
  const  mapDispatchToProps = (dispatch) =>({
    setCurrentContact:(test)=> dispatch(setCurrentContact(test))
  });
  export default connect(mapStateToProps,mapDispatchToProps)(DetailContact);
// export default DetailContact;