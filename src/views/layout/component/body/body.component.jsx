import React, { fragment, Component, Fragment } from "react";
import { Row, Col, Card, CardBody, Input, Modal, ModalHeader, ModalBody } from "reactstrap";
import ListContact from "../list-contact/list-contact.component";
import robin from "../../../../../src/images/list-images/photo.jpg";
import DetailContact from "../popup/detail-contact.component";
import {connect} from "react-redux";
import {setCurrentContact} from "../../../../../src/redux/contact/contact.action";

import "./body.styles.scss";

import store from "../../../../global/store";
import swal from "sweetalert";

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrData: [],
      proFileImg:"",
      objDataSearch:[],
      modal:false
    };
  }

  componentDidMount = async()=>{
    this.handleGetAllData();
  }

  handleGetAllData = async()=>{
    let result = await store.actions.getAllContact();
    this.setState({
      arrData:result.data.data
    })
  }

  handleSearchData = async(e)=>{
    if(e.target.value.length >0){
      try{
        let result = await store.actions.searchContact(e.target.value);
        console.log("wiwin 33 ", result.data);
        if(result.data!== undefined){
          this.state.objDataSearch =[];
          this.state.objDataSearch.push(result.data.data);
          this.setState({
            objDataSearch:this.state.objDataSearch
          })
        }else{
            swal("info","Contact Not Found", "info");
        }
      }catch(err){
        swal("info","Sorry Data Not Found", "info");
      }
    }else{
      this.setState({
        objDataSearch:[]
      })
    }
    
  }

  handleViewData = async (e)=>{
    let key = e.target.parentNode.parentNode.parentNode.parentNode.getAttribute("id");
    const obj = this.state.arrData.find((data)=>data.id===key);
    await this.props.setCurrentContact({dataContact:obj});
    this.handleModal();
  }

  handleViewDataFromSearch = async()=>{
    await this.props.setCurrentContact({dataContact:this.state.objDataSearch[0]});
    this.handleModal();
  }

  handleDeletContact = async(e)=>{
    let key = e.target.parentNode.parentNode.parentNode.getAttribute("id");
    swal({
      title: "Are You Sure",
      text:"Contact Will Be Deleted Permanently",
      icon:"warning",
      buttons:true,
      dangerMode:true
    }).then( async (willDelete)=>{
      if(willDelete){
        try{
          let result = await store.actions.deleteContact(key);
          console.log(result);
          if(result.status===202){
            swal("info", "Data Has Been Deleted", "success");
            await this.handleGetAllData();
          }
        }catch(e){
          swal("info", "Something Wrong With Your Connections ", "info");
        }
      }else{
        return false;
      }
    })
    
  }

  handleModal= ()=>{
    this.setState({
      modal: !this.state.modal
    },()=>{
      if(this.state.modal===false){
        this.handleGetAllData();
      }
    })
  }

  handleUploadFile = (e)=>{
    const reader = new FileReader();
    reader.onload = () =>{
      if(reader.readyState === 2){
        this.setState({
          proFileImg: reader.result
        })
      }
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  render() {
    console.log("wiwin ",this.state.objDataSearch);
    return (
      <Fragment>
        <div className="main-body">
          <div className="right-side">
            <CardBody className="card-right-side">
                {
                  this.state.arrData.map((data,index)=>(
                    <div className="card-body" id={data.id}>             
                      <div className="img-card">
                        <Row className="row-img-card">
                          <Col>
                            <img src={data.photo} alt="" className="img-contact"onClick={(e)=>this.handleViewData(e)}/>
                          </Col>
                          
                        </Row>
                      </div>
                      <div className="image-title">
                        <Row className="row-image-title">
                          <div xs="11" className="image-name">{data.firstName}</div>
                          <div xs="1" className="image-delete" onClick={(e)=>this.handleDeletContact(e)}>X</div>
                        </Row>
                      </div>
                    </div>
                  ))
                }
            </CardBody>
          </div>
          <div className="left-side">
            <CardBody>
              <div className="">
                <Row>
                  <Col>
                    <Input
                      type="text"
                      name="search"
                      placeholder="Search..."
                      onChange={(e) => this.handleSearchData(e)}
                    ></Input>
                  </Col>
                </Row>
                <Row>
                  <CardBody className="list-data">
                    <Col xs="12">
                      {this.state.objDataSearch.map((data, index) => (
                        <Row className="row-of-list"> 
                          <ListContact data={data} handleViewDataFromSearch={this.handleViewDataFromSearch}></ListContact>
                        </Row>
                      ))}
                    </Col>
                  </CardBody>
                </Row>
              </div>
            </CardBody>
          </div>
        </div>
        <div>
            <Modal 
              isOpen={this.state.modal}
              toggle={this.handleModal}
              className="modal-primary modal-lg"
              backdrop="static"
              keyboard={false}
              >
              <ModalHeader toggle={this.handleModal} closeButton>
                <h3>Contact Detail</h3>
              </ModalHeader>
              <ModalBody>
                  <DetailContact></DetailContact>
              </ModalBody>

            </Modal>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state=>({
  contact:state.contact
});

const  mapDispatchToProps = (dispatch) =>({
  setCurrentContact:(test)=> dispatch(setCurrentContact(test))
});
export default connect(mapStateToProps,mapDispatchToProps)(Body);
