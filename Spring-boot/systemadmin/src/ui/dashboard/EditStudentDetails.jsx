
import { Link, useParams  } from 'react-router-dom';
import style from './EditStudentDetails.module.css'
import api from "../../services/ApiServices"
import { useEffect, useState } from 'react';
import $ from 'jquery'
import Swal from 'sweetalert2';
import Nav from './components/Header/Nav/Nav';

const EditStudentDetails = () => {
  const EmailRegaxValidation = (/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState({
    id: '',
    matricNumber: '',
    email: '',
    records: [
      {
        id:'',
        matricNumber:'',
        nationalIdentificationNumber: '',
        firstname: '',
        surname: '',
        dateOfBirth: '',
        gender: '',
        email: '',
        relationShipStatus: '',
        mobile: '',
      },
    ],
  });
  
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await api.FetchStudentById(id);
        const data = response.data; // Assuming the API response has the student data
        setLoading(false);
        // Update the state with the fetched student data
        setStudentData({
          id: data.id,
          matricNumber: data.matricNumber,
          nationalIdentificationNumber: data.records[0].nationalIdentificationNumber,
          surname: data.records[0].surname,
          firstname: data.records[0].firstname,
          email: data.records[0].email,
          mobile: data.records[0].mobile,
          dateOfBirth: data.records[0].dateOfBirth,
          gender: data.records[0].gender,
          relationShipStatus: data.records[0].relationShipStatus
        });
      } catch (error) {
        setLoading(false);
        console.error('Error fetching student data:', error);
        // Handle error, show an alert or redirect to an error page
      }
    };

    fetchStudentData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Updating the studentData state with the edited value
    setStudentData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const HandleSubmitForm = async(event) => {
    event.preventDefault();
    if (studentData.firstname == null || studentData.firstname =="") {
      $('.error').html("<span>Please Enter Your Firstname.</span>")
      $('.errormsgContainer').show()
      return false;
    }
    if (studentData.surname == null || studentData.surname =="") {
      $('.error').html("<span>Please Enter Your Surname.</span>")
      $('.errormsgContainer').show()
      return false;
    }
    if (studentData.surname == studentData.firstname) {
      $('.error').html("<span>Unaccepted Data.. Please Surname can't be the same with your Othername.</span>")
      $('.errormsgContainer').show()
      return false
    }
    if (studentData.email == null || studentData.email =="") {
      $('.error').html("<span>Please Enter Your Email Address.</span>")
      $('.errormsgContainer').show()
      return false;
    }else if (studentData.email != "") {
            if (!EmailRegaxValidation.test(studentData.email)) {
                $('.error').show()
                $('.errormsgContainer').html("<span>Invalid email address..! Please enter a valid email address.*</span>");
                return false;
            }
        }
    if (studentData.mobile == null || studentData.mobile =="") {
      $('.error').html("<span>Please Enter Your Mobile Number.</span>")
      $('.errormsgContainer').show()
      return false;
    }
    if (studentData.dateOfBirth == null || studentData.dateOfBirth =="") {
      $('.error').html("<span>Please Provide Your Date Of Birth.</span>")
      $('.errormsgContainer').show()
      return false;
    }
    if (studentData.gender == null || studentData.gender =="") {
      $('.error').html("<span>Please Select Your Gender.</span>")
      $('.errormsgContainer').show()
      return false;
    }
    if (studentData.relationShipStatus == null || studentData.relationShipStatus =="") {
      $('.error').html("<span>Please Select Your Relationship Status.</span>")
      $('.errormsgContainer').show()
      return false;
    }
    $('.error').empty();
    $('.errormsgContainer').hide()
    await api.UpdateStudentProfile(
      {
      "StudentAuthenticationInfo": { "email": studentData.email},
      "StudentRecordInfo": {
          "firstname": studentData.firstname, "surname": studentData.surname,
          "email": studentData.email, "mobile": studentData.mobile, "dateOfBirth": studentData.dateOfBirth,
          "gender": studentData.gender, "relationShipStatus": studentData.relationShipStatus
        },
       id
      }, 
    ).then(function (response) {
      if (response==200) {
       Swal.fire({
          title: "Success",
          text: "Student Details Updated.",
          icon: "success"
       });
        setTimeout(() => {
          window.location.reload(true);
        }, 2000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: 'Error'
        });
      }
    }).catch(function (error) {
      Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!"+error,
          footer: 'Error'
        });
    });
  }
  
  return (
    <>
      <Nav />
      {loading ? (
        <>
          <div className="spin" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
            <div className="custom-loader"></div>
          </div>
        </>
              
      ) : (
          <> 
            <section className="content-header">
              <h1>
                Edit Student  <small>Edit Student  Data</small>
              </h1>
              <div className="errContainer">
                  <div id="messagediv" className="success success-ico" style={{ display: "none" }}></div>
                  <p className="statusMsg error-ico" style={{ display: "none" }}> </p>
              </div>
              <ol className="breadcrumb">
                <li><a href="#"><i className="fa fa-dashboard"></i> Dashboard</a></li>
                <li className="active">Edit Student </li>
                <li className="active">Edit Student  Data</li>
              </ol>
            </section>
            <section className="content">
          <div className="errormsgContainer error error-ico" style={{display:'none'}}></div>
            <div id="messagediv" className="success success-ico" style={{display:'none'}}><span className="msgSuccess"></span></div>
            <form  method="post" acceptCharset="utf-8" encType="multipart/form-data" autoComplete="off" onSubmit={HandleSubmitForm}>
              <div className="hidden" style={{ display: "none" }}>
                <div className="form-group">
                  <label htmlFor="id">Student ID:<span className="text-danger">*</span></label>
                  <input type="text" readOnly className="form-control" name="id" id="id" value={studentData.id}  />
                </div>
                <div className="form-group">
                  <label htmlFor="matricNumber">Matric Number:<span className="text-danger">*</span></label>
                  <input readOnly type="text" className="form-control" name="matricNumber" id="matricNumber" value={studentData.matricNumber}  />
                </div>
                <div className="form-group">
                  <label htmlFor="NIN">NIN:</label>
                  <input className="form-control" id="NIN" type="number" value={studentData.nationalIdentificationNumber} placeholder="NIN:"/>
                </div>
              </div>
              <div className="box">
                <div className="box-header with-border">
                  <h3 className="box-title">Form Edit Student  Data</h3>
                  <div className={`${style._3a23} box-tools pull-right`}>
                    <Link to={"/students"} className="btn btn-sm btn-flat btn-primary">
                      <i className="fa fa-arrow-left"></i> Cancel
                    </Link>
                  </div>
                </div>
                <div className={`${style._4dsf2} ${style._ds3s} box-body`}>
                  <div className="row">
                    <div className="col-sm-12 col-sm-offset-12">
                      <div className="form-group">
                        <label htmlFor="firstname">First Name:<span className="text-danger">*</span></label>
                        <input type="text" className="form-control" name="firstname" id="firstname" placeholder="Last Name:" value={studentData.firstname} onChange={handleInputChange}/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="Surname">Surname:<span className="text-danger">*</span></label>
                        <input type="text" className="form-control" name="surname" id="Surname" value={studentData.surname} placeholder="Surname" onChange={handleInputChange}/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Student Email:<span className="text-danger">*</span></label>
                        <input type="email" className="form-control" name="email" value={studentData.email} id="email" placeholder="Student Email" onChange={handleInputChange}/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="tel">Mobile:<span className="text-danger">*</span></label>
                        <input type="tel" className="form-control" name="mobile" value={studentData.mobile} id="mobile" placeholder="+(234) 5435-4542-34" onChange={handleInputChange}/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="DBO:">Date of Birth:<span className="text-danger">*</span></label>
                        <input type="date" className="form-control" name="dateOfBirth" id="DOB" value={studentData.dateOfBirth} onChange={handleInputChange}/>
                      </div>
                      <div className="form-group">
                       <label htmlFor="gender">Gender</label>
                        <select name="gender" id="gender" className="form-control select2" onChange={handleInputChange}>
                          <option value="">--Empty--</option>
                          <option value="Male" selected={studentData.gender === 'Male'}>Male</option>
                          <option value="Female" selected={studentData.gender === 'Female'}>Female</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="relationShipStatus">Relationship Status </label>
                        <select name="relationShipStatus" id="relationShipStatus" className="form-control select2"  onChange={handleInputChange}>
                          <option value="Single" selected={studentData.relationShipStatus === 'Single'}>Single</option>
                          <option value="Divored" selected={studentData.relationShipStatus === 'Divored'}>Divored</option>
                          <option value="Married" selected={studentData.relationShipStatus === 'Married'}>Married</option>
                          <option value="Complicated" selected={studentData.relationShipStatus === 'Complicated'}>Complicated</option>
                          <option value="Window" selected={studentData.relationShipStatus === 'Window'}>Window</option>
                          <option value="In-Contract Marrige" selected={studentData.relationShipStatus === 'In-Contract Marrige'}>In-Contract Marrige</option>
                        </select>
                      </div>
                      
                      <div className="form-group pull-right">
                        <button type="submit" id="isEditStudent" className="btn btn-flat bg-green">
                          <i className="fa fa-pencil"></i> Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>	
              </div>
            </form>			
            </section>
            </>
          )}
    </>
  )
}

export default EditStudentDetails
