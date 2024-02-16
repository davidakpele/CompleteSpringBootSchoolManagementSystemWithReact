
import Nav from './components/Header/Nav/Nav';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import $ from "jquery";
import { useEffect, useState } from "react";
import WebServicesDriver from '../../services/ApiServices'
import style from './AddNewStudent.module.css'

const AddNewStudent = () => {
    
    const telephone = $('#Telephone').val();
    const EmailRegaxValidation = (/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    const appRef = useRef(null);
    const depRef = useRef(null);
    const facRef = useRef(null);
    const proRef = useRef(null);
    const ninRef = useRef(null);
    const entRef = useRef(null);
    const fnaRef = useRef(null);
    const surRef  = useRef(null);
    const dobRef  = useRef(null);
    const gndRef  = useRef(null);
    const emlRef  = useRef(null);
    const relRef  = useRef(null);
    const telRef  = useRef(null);
    useEffect(() => {
        document.title = 'Register New Student';
       
    }, []);
     
    const HandleSubmitForm = async(event) => {
        event.preventDefault()
        const applicationType = $('#Application').val();
        if (applicationType == "") {
            appRef.current.focus();
            $('.error').html("<span>Select Your Application Type.</span>")
            $('.errormsgContainer').show()
            return false;
        }
        const faculty = $('#Faculty').val();
        if (faculty == "") {
            facRef.current.focus();
            $('.error').html("<span>Select Your Prefere Faculty.</span>")
            $('.errormsgContainer').show()
            return false;
        }
        const department = $('#Department').val();
        if (department == "") {
            depRef.current.focus();
            $('.error').html("<span>Select Your Course Type.</span>")
            $('.errormsgContainer').show()
            return false;
        }
        const program = $('#Program').val();
        if (program == "") {
            proRef.current.focus();
            $('.error').html("<span>Select Your Program aim.</span>")
            $('.errormsgContainer').show()
            return false;
        }
        const nationalIdentificationNumber = $('#NationalIdentificationNumber').val();
        if (nationalIdentificationNumber == "") {
            ninRef.current.focus();
            $('.error').html("<span>Please Enter Your National Identification Number [NIN].</span>")
            $('.errormsgContainer').show()
            return false;
        }
        var entrylevel = $('#Entrylevel').val();
        if ($('.EntryDevparent').hasClass('hidden')) {
            newUsersDetails.entrylevel = "Postgraduate";
        } else {
            if (entrylevel == "") {
                entRef.current.focus();
                $('.error').html("<span>Select Your Entry Level.</span>")
                $('.errormsgContainer').show()
                return false;
            }
        }
        const firstname = $('#Firstname').val();
        if (firstname == "") {
            fnaRef.current.focus();
            $('.error').html("<span>Please Enter Your Firstname.</span>")
            $('.errormsgContainer').show()
            return false;
        }
        const surname = $('#Surname').val();
        if (surname == "") {
            surRef.current.focus();
            $('.error').html("<span>Please Enter Your Surname.</span>")
            $('.errormsgContainer').show()
            return false;
        }
       
        if (surname == firstname) {
            surRef.current.focus();
            $('.error').html("<span>Unaccepted Data.. Please Surname can't be the same with your Othername.</span>")
            $('.errormsgContainer').show()
            return false
        }
        const dob = $('#Dob').val();
        if (dob == "") {
            dobRef.current.focus();
            $('.error').html("<span>Please Provide Your Date Of Birth.</span>")
            $('.errormsgContainer').show()
            return false;
        }
        const gender = $('#Gender').val();
        if (gender == "") {
            gndRef.current.focus();
            $('.error').html("<span>Please Select Your Gender.</span>")
            $('.errormsgContainer').show()
            return false;
        }
        const email = $('#Email').val();
        if (email == "") {
            emlRef.current.focus();
            $('.error').html("<span>Please Enter Your Email Address.</span>")
            $('.errormsgContainer').show()
            return false;
        } else if (email != "") {
            if (!EmailRegaxValidation.test(email)) {
                emlRef.current.focus();
                $('.error').show()
                $('.errormsgContainer').html("<span>Invalid email address..! Please enter a valid email address.*</span>");
                return false;
            }
        }
        const relationshipstatus = $('#Relationshipstatus').val();
        if (relationshipstatus == "") {
            relRef.current.focus();
            $('.error').html("<span>Please Select Your Relationship Status.</span>")
            $('.errormsgContainer').show()
            return false;
        }
        if (telephone == "") {
            telRef.current.focus();
            $('.error').html("<span>Please Enter Your Mobile Number.</span>")
            $('.errormsgContainer').show()
            return false;
        }
        const data = {
            "StudentAuthenticationInfo": {
                "email": newUsersDetails.email,
                "password": newUsersDetails.surname,
            },
            "StudentRecordInfo": {
                "applicationId": newUsersDetails.application,
                "facultyId": newUsersDetails.faculty,
                "departmentId": newUsersDetails.department,
                "programId": newUsersDetails.program,
                "nationalIdentificationNumber": newUsersDetails.nationalIdentificationNumber,
                "entryLevel": newUsersDetails.entrylevel,
                "firstname": newUsersDetails.firstname,
                "surname": newUsersDetails.surname,
                "dateOfBirth": newUsersDetails.dob,
                "gender": newUsersDetails.gender,
                "email": newUsersDetails.email,
                "relationShipStatus": newUsersDetails.relationshipstatus,
                "mobile": newUsersDetails.telephone,
            },
        }
        WebServicesDriver.saveRegistration({ data })

      
    }

    const handleInput = (e) => {
        const inputValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        const limitedValue = inputValue.slice(0, 11); // Keep only the first 11 digits
        handleInputChange({ target: { name: 'nationalIdentificationNumber', value: limitedValue } });
    };

    const [newUsersDetails, setnewUsersDetails] = useState({
        application: '', faculty: '',
        department: '', program: '',
        entrylevel: '', dob: '',
        gender:'', telephone:'',
        firstname: '', surname: '',
        email: '', nationalIdentificationNumber:'', relationshipstatus:''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setnewUsersDetails({...newUsersDetails, [name] : value});
    };
    
    // OnChange Fields state
    const handleInputChangeOnApplicationType = async (e) => {
        const value = e.target.value;
        setnewUsersDetails({ ...newUsersDetails, [e.target.name]: value });
        //Fetch Faculties based on Application Selected
        const id = value;
        try {
            if (id == null || id == "") {
                $('#Faculty').empty();
                $('#Faculty').append('<option value="">--Empty--</option>')
                $('#Program').empty();
                $('#Program').append('<option value="">--Empty--</option>')
                $('#Department').empty();
                $('#Department').append('<option value="">--Empty--</option>')
                $('#Entrylevel').empty();
                $('#Entrylevel').append('<option value="">--Empty--</option>')
                return false;
            }
            const getfacultyapi = await WebServicesDriver.FetechFacultiesBaseOnSelectedApplicationId({ id });
            if (getfacultyapi.status == 200) {
                $('#Faculty').empty();
                $('#Faculty').append('<option value="">--Select--</option>')
                $('#Department').empty();
                $('#Department').append('<option value="">--Empty--</option>')
                getfacultyapi.data.data.forEach(function(element) {
                    $('#Faculty').append('<option value="' + element.id + '">' + element.facultyName + '</option>');
                });
                const getprogramsapi = await WebServicesDriver.FetechProgramsBaseOnSelectedApplicationId({ id })
                if (getprogramsapi.status == 200) {
                    $('#Program').empty();
                    $('#Program').append('<option value="">--Select--</option>')
                    getprogramsapi.data.data.forEach(function(element) {
                        $('#Program').append('<option value="' + element.id + '">' + element.programName + '</option>');
                    });
                } else {
                    console.error('Something went wrong in fetching programs api\'s ');
                }
                const getentrylevelapis = await WebServicesDriver.FetechEntryLevelBaseOnSelectedApplicationId({ id })
                if (getentrylevelapis.status == 200) {
                    if (getentrylevelapis.data == "") {
                        $('.EntryDevparent').removeClass('visible');
                        $('.EntryDevparent').addClass('hidden');
                    } else {
                        $('.EntryDevparent').removeClass('hidden');
                        $('.EntryDevparent').addClass('visible');
                        $('#Entrylevel').empty();
                        $('#Entrylevel').append('<option value="">--Select--</option>')
                        getentrylevelapis.data.forEach(function(element) {
                            $('#Entrylevel').append('<option value="' + element.entryLevelName + '">' + element.entryLevelName + '</option>');
                        });
                    }
                }
            } else {
                console.warn("Something went wrong in fetch Faculty api's ");
            }
        } catch (error) {
        // Handle errors
            console.error('Error :', error);
        }
    };

    const handleInputChangeOnFacultyField = async (event) => {
        
        const value = event.target.value;
        setnewUsersDetails({ ...newUsersDetails, [event.target.name]: value });
        if (value == null || value == "") {
            $('#Department').empty();
            $('#Department').append('<option value="">--Empty--</option>')
            return false;
        }
        try {
            const id = value;
            const getdepartmentapi = await WebServicesDriver.FetechDepartmentBaseOnSelectedApplicationId({ id })
           if (getdepartmentapi.status ==200) {
                $('#Department').empty();
                $('#Department').append('<option value="">--Select--</option>')
                getdepartmentapi.data.data.forEach(function(element) {
                    $('#Department').append('<option value="' + element.id + '">' + element.departmentName + '</option>');
                });
           }
        } catch (error) {
            console.console.warn("Error in fetchinh Department Api's ");
        }
    };

    const handleInputChangeOnDepartmentField = (event) => {
        const value = event.target.value;
        setnewUsersDetails({...newUsersDetails, [event.target.name] : value});
    };

    const handleInputChangeOnProgramField = (event) => {
        const value = event.target.value;
        setnewUsersDetails({...newUsersDetails, [event.target.name] : value});
    };

    const handleInputChangeOnEntryLevelField = (event) => {
        const value = event.target.value;
        setnewUsersDetails({...newUsersDetails, [event.target.name] : value});
    };

    const handleInputChangeOnGenderOptions = (event) => {
        const value = event.target.value;
        setnewUsersDetails({...newUsersDetails, [event.target.name] : value});
    };

    const handleInputChangeOnRelationShipStatus = (event) => {
        const value = event.target.value;
        setnewUsersDetails({...newUsersDetails, [event.target.name] : value});
    };
  return (
    <>
      <Nav />
      <section className="content container-fluid">
        <div className="box">
            <div className="errormsgContainer error error-ico" style={{display:'none'}}></div>
            <div id="messagediv" className="success success-ico" style={{display:'none'}}><span className="msgSuccess"></span></div>
            <form id="addstudent" onSubmit={HandleSubmitForm} method="post" acceptCharset="utf-8" encType="multipart/form-data" autoComplete="off">
                <div className="box-header with-border">
                    <h3 className="box-title">Form Add Student Data</h3>
                    <div className="box-tools pull-right">
                        <Link to={"/students"} className="btn btn-sm btn-flat btn-primary">
                            <i className="fa fa-arrow-left"></i> Cancel
                        </Link>
                    </div>
                </div>
                <div className="box-body">
                    <div className="row">
                        <div className="col-md-4 col-sm-12 col-xs-12">
                            <label htmlFor="Application">Application Type:</label>
                            <select  ref={appRef} className={`${style._43ds}`} name="application" id="Application"
                            defaultValue={newUsersDetails.application} onChange={handleInputChangeOnApplicationType}>
                                <option value="">--Select--</option>
                                <option value="1"> Distance Learning Institute </option>
                                <option value="2"> Postgraduate </option>
                                <option value="3"> Undergraduate </option>
                            </select>
                        </div>
                        <div className="col-md-4 col-sm-12 col-xs-12">
                            <label htmlFor="Faculty">Faculty:</label>
                            <select ref={facRef}  name="faculty" className={`${style._43ds} facultylist`}  id="Faculty"  onChange={handleInputChangeOnFacultyField}>
                                <option value="">--Empty--</option>
                            </select>
                        </div>
                        <div className="col-md-4 col-sm-12 col-xs-12">
                            <label htmlFor="Department">Department:</label>
                            <select ref={depRef} name="department" className={`${style._43ds}`} id="Department" onChange={handleInputChangeOnDepartmentField}>
                                <option value="">--Empty--</option>
                            </select>
                        </div>
                        <div className="col-md-4 col-sm-12 col-xs-12">
                           <label htmlFor="Program">Program:</label>
                            <select ref={proRef} name="program" className={`${style._43ds}`} id="Program"
                            defaultValue={newUsersDetails.program}  onChange={handleInputChangeOnProgramField}>
                                <option value="">--Empty--</option>
                            </select> 
                        </div>
                        <div className="col-md-4 col-sm-12 col-xs-12">
                            <label htmlFor="NationalIdentificationNumber">NIN: <small>(National Identification Number)</small></label>
                            <input ref={ninRef} name="nationalIdentificationNumber" id="NationalIdentificationNumber" className={`${style._43ds}`} maxLength="11" min="0"
                            max="1000000000009999" step="1" type="number" placeholder="National Identification Number:" 
                            autoComplete="off" onChange={handleInput} value={newUsersDetails.nationalIdentificationNumber}/>
                        </div>
                        <div className="col-md-4 col-sm-12 col-xs-12 EntryDevparent">
                            <div className="EntryDevchild">
                                <label htmlFor="Entrylevel">Entry Level:</label>
                                <select ref={entRef} className={`${style._43ds}`} defaultValue={newUsersDetails.entrylevel}  name="entrylevel" id="Entrylevel" onChange={handleInputChangeOnEntryLevelField}>
                                    <option  value="">--Empty--</option>
                                </select>
                            </div>
                        </div>
						<div className="col-md-12 col-sm-12 col-xs-12">
                            <div style={{ marginTop: "20px", marginLeft: "20px", fontWeight: "bold", fontSize: "20px", textDecoration: "underline" }}><p>Personal Details</p></div>
                        </div>
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <lable htmlFor="Firstname">First Name:*</lable>
                                <input ref={fnaRef} type="text" className={`${style._43ds}`} name="firstname" id="Firstname" placeholder="Firstname:" 
                                defaultValue={newUsersDetails.firstname}  onChange={(e)=>handleInputChange(e)}/>
                            </div>	
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <lable htmlFor="Surname">Surname*</lable>
                                <input ref={surRef} type="text" className={`${style._43ds}`} name="surname" id="Surname" placeholder="Surname" autoComplete="off" 
                                defaultValue={newUsersDetails.lastname}  onChange={(e)=>handleInputChange(e)}/>
                            </div>
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <lable htmlFor="Dob">Date Of Birth*</lable>
                                <input ref={dobRef} type="date" className={`${style._43ds}`} id="Dob" name="dob" placeholder="Date Of Birth:" 
                                defaultValue={newUsersDetails.dob}  onChange={(e)=>handleInputChange(e)} autoComplete="off" />
                            </div>
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <lable htmlFor="Gender">Gender*</lable>
                                <select ref={gndRef} className={`${style._43ds}`} placeholder="Gender" name="gender" id="Gender"
                                defaultValue={newUsersDetails.gender} onChange={handleInputChangeOnGenderOptions} autoComplete="off" >
                                    <option value="">--Select--</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <lable htmlFor="Email">Email*</lable>
                                <input ref={emlRef} type="email" className={`${style._43ds}`} name="email" placeholder="Email:" id="Email"
                                defaultValue={newUsersDetails.email}  onChange={(e)=>handleInputChange(e)} autoComplete="off" />
                            </div>
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <lable htmlFor="Relationshipstatus">Relationship Status*</lable>
                                <select ref={relRef} name="relationshipstatus" className={`${style._43ds}`}  id="Relationshipstatus"
                                defaultValue={newUsersDetails.relationshipstatus} onChange={handleInputChangeOnRelationShipStatus} autoComplete="off" >
                                    <option value="">--Select--</option>
                                    <option value="Divored">Divored</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Complicated">Complicated</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                               <lable htmlFor="Telephone">Tel*</lable>
                                <input ref={telRef} type="tel" className={`${style._43ds}`} defaultValue={newUsersDetails.telephone}  onChange={(e)=>handleInputChange(e)} id="Telephone"  name="telephone" placeholder="+(234) 8032 4552 09" autoComplete="off" maxLength="19" />
                            </div>
							
								<div className="col-md-12" id="guidanceform"></div>
								<div className="col-md-12">
                                    <div className="pull-right" style={{ marginTop: "20px" }}>
										<button type="reset" className="btn btn-flat btn-default">
											<i className="fa fa-rotate-left"></i> Reset
										</button>
										<button type="submit" id="isAddProfessor" className="btn btn-flat bg-purple" style={{width:"200px"}}>
											<i className="fa fa-save"></i> Save
										</button>
									</div>
								</div>
							</div>
						</div>
					
                  </form>
              </div>
		</section>
    </>
  )
}

export default AddNewStudent
