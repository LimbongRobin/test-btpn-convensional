import React, { fragment, Component, Fragment } from "react";
import { Row, Col, Card, CardBody, Input, Label, Button } from "reactstrap";
// import robin from "../../../../../src/images/list-images/photo.jpg";

import "./create-contact.styles.scss";

import store from "../../../../global/store";
import swal from "sweetalert";

class CreateContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrData: [],
      objDetail: {},
      category: "Name ",
      proFileImg:"",
      firstName:"",
      lastName:"",
      age:"",
      photo:"",
      photoName:""
    };
  }

  handleUploadFile = (e)=>{
  this.setState({
    photoName:e.target.files[0].name
  });
  
        let blob = new Blob([e.target.files[0]]);
        const url= window.URL.createObjectURL(blob);
        this.setState({
          photo:url
        })

    // const reader = new FileReader();
    // reader.onload = () =>{
    //   if(reader.readyState === 2){
    //     this.setState({
    //       photo: reader.result,
    //     });
    //   }
    // }
    // reader.readAsDataURL(e.target.files[0]);
    // console.log(reader.result);
  }

  handleFieldChange = (e)=>{
    if(e.target.type==="number"){
      if(e.target.value.length > 2){
        swal("warning", "You Cross The Maximum Length Number", "info");
        this.setState({
          [e.target.name]: this.state.age
        })
      }else{
        this.setState({
          [e.target.name]: e.target.value
        })
      }
    }else{
      this.setState({
        [e.target.name]: e.target.value
      })
    }
    
  }

  handleSaveContact = async(e)=>{
    e.preventDefault();
    let data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      photo: this.state.photo
    }
    try{
      let result = await store.actions.saveNewContact(JSON.stringify(data));
      if(result.status === 201){
        swal("info","Success", "success");
      }else{
        swal("info","Dont put any space", "success");
      }
    }catch(e){
      swal("info","Something Error With Your Connection", "info");
    }
    
  }

  render() {
    return (
      <Fragment>
        <div className="main-body">
          <div className="right-side">
            <CardBody className="card-right-side">
              <div>
                <div className="image-create-body">
                  <img src={this.state.photo} alt="" className="img-create img-thumbnail rounded" style={{display:this.state.photo===""?"none":"block"}}/>
                </div>
                <Row>
                  <Col xs="12" className="column-form">
                    <CardBody>
                      <Row>
                        <Col>
                          <Label htmlFor="first-name">First Name</Label>
                          <Input type="text" autoComplete="off" value={this.state.firstName} name="firstName" id="first-name" className="form-control" onChange={(e)=>this.handleFieldChange(e)}></Input>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label htmlFor="last-name">Last Name</Label>
                          <Input type="text" autoComplete="off" value={this.state.lastName}  name="lastName" id="last-name" className="form-control" onChange={(e)=>this.handleFieldChange(e)}></Input>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label htmlFor="age">Age</Label>
                          <Input type="number" min="1" max="99" maxLength="2" value={this.state.age}  accept="[0-9]" autoComplete="off" name="age" id="age" className="form-control" onChange={(e)=>this.handleFieldChange(e)}></Input>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                        <Label htmlFor="image">Image</Label>
                          <Button type="button" name="image" id="image" className="button-image form-control" > {this.state.photoName===""?"Unggah File":this.state.photoName}
                            <Input type="file" name="photo" id="input-image" className="input-image form-control" onClick={(e) => {e.target.value = null;
                              }} onChange={(e)=>this.handleUploadFile(e)} ></Input>
                          </Button>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Button type="button" name="image" id="image" className="button-save form-control"  onClick={(e)=>this.handleSaveContact(e)}> Save

                          </Button>
                        </Col>
                      </Row>
                    </CardBody>
                  </Col>
                </Row>
              </div>
            </CardBody>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default CreateContact;
