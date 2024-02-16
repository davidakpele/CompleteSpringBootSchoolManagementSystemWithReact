import { Link } from "react-router-dom"
import Nav from "./components/Header/Nav/Nav"
import { useState } from 'react';
import $ from 'jquery'
import WebServicesDriver from '../../services/ApiServices'

const AddNewProfessor = () => {
    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({
    Firstname: '',
    Surname: '',
    Email: '',
    Telephone_No: '',
    Date_of_Birth: '',
    Place__of__birth: '',
    Gender: '',
    Relationship_sts: '',
    Citizenship: '',
    nationalIdentificationNumber: '',
    Height: '',
    Weight: '',
    Blood_Type: '',
    Religion: '',
    Qualification: '',
    Profile__Picture: '',
    Address: '',
    });

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        
         // If the input is a file input, update fileDetails state
        if (type === 'file') {
            setFormData({
            ...formData,
            [name]: files, 
            });
        }

        setFormData({
        ...formData,
        [name]: value,
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform your form validation here
        const errors = validateForm(formData);
        setFormErrors(errors);
    };

    const validateForm = (data) => {
        let errors = {};
        let photo = $("#Profile__Picture").val();
        var files = $("#Profile__Picture")[0].files
        let extension = photo.substr(photo.lastIndexOf('.') + 1).toLowerCase();
		let allowedExtensions =  ['jpg', 'jpeg', 'bmp', 'gif', 'png', 'svg', 'jfif'];
        if (!data.Firstname) {
            errors.Firstname = 'Firstname is required';
        }

        if (!data.Surname) {
            errors.Surname = 'Surname is required';
        }

        if (!data.Email) {
            errors.Email = 'Email is required';
        }

        if (!data.Telephone_No) {
            errors.Telephone_No = 'Mobile Number is required';
        }

        if (!data.Date_of_Birth) {
            errors.Date_of_Birth = 'Date of birth is required';
        }

        if (!data.Place__of__birth) {
            errors.Place__of__birth = 'Place of birth is required';
        }

        if (!data.Gender) {
            errors.Gender = 'Gender is required';
        }

        if (!data.Relationship_sts) {
            errors.Relationship_sts = 'Relationship Status is required';
        }

        if (!data.Citizenship) {
            errors.Citizenship = 'Citizenship is required';
        }

        if (!data.nationalIdentificationNumber) {
            errors.nationalIdentificationNumber = 'National Identification Number is required';
        }

        if (!data.Height) {
            errors.Height = 'Height is required';
        }

        if (!data.Weight) {
            errors.Weight = 'Weight is required';
        }

        if (!data.Blood_Type) {
            errors.Blood_Type = 'Blood Type is required';
        }

        if (!data.Religion) {
            errors.Religion = 'Religion is required';
        }

        if (!data.Qualification) {
            errors.Qualification = 'Qualification is required';
        }

        if (data.Profile__Picture && files.length !=0) { 
            const maxFileSize = 5 * 1024 * 1024;
            if (allowedExtensions.indexOf(extension) === -1) {
                errors.Profile__Picture = 'Invalid file type. Only '+allowedExtensions.join(', ')+' are allowed.' ;
            } else if (photo.size > maxFileSize) {
                errors.Profile__PictureSize = 'File size exceeds the maximum limit (5 MB).';
            } 
        } else {
            errors.Profile__Picture = 'Profile picture is required.';
        }

        if (!data.Address) {
            errors.Address = 'Address is required';
        }
        if (Object.keys(errors).length === 0) {
            const requestdata = {
                "ProfessorAuthenticationInfo": {
                    "AccessCode":"",
                    "email": data.Email,
                    "password": "",
                },
                "ProfessorRecordInfo": {
                    "firstname": data.Firstname,
                    "surname": data.Surname,
                    "dateOfBirth": data.Date_of_Birth,
                    "gender": data.Gender,
                    "email": data.Email,
                    "relationshipStatus": data.Relationship_sts,
                    "mobile": data.Telephone_No,
                    "nationalIdentificationNumber": data.nationalIdentificationNumber,
                    "religion": data.Religion,
                    "bloodType": data.Blood_Type,
                    "address": data.Address,
                    "photoUrl": data.Profile__Picture,
                    "qualification":data.Qualification
                },
            }
            firePost(requestdata)
        }
        return errors;
    };
    const reloadForm = () => {
        setTimeout(() => {
            window.location.reload(true);
        }, 100);
    }

    const firePost = async (requestdata) => {
        let errors = {};
        await WebServicesDriver.registerNewProfessor({ requestdata })
        .then(response => {
           if (response.data && response.data.status !== undefined && response.data.status !== null) {
                $(".ssmg").show();
           } else {
               $(".ssmg").hide();
               errors.Email = response.response.data.error;
               setFormErrors(errors);
            }
        }).catch(error => {
            // Handle error
            console.error('API request failed:', error);
        });
    }
  return (
    <>
      <Nav />
      <div className="container-fluid">
        <div className="alert alert-success mt-2 alert-dismissible fade show ssmg" role="alert" style={{display:'none'}}>
            <strong>Account Successfully Created.!</strong> <br/>
            <small className="font-weight-light">Verification mail has been sent to the professor email you provided. Please inform he/she to verify account to access for their dashboard. If you have used a wrong email, please fill the form again with a valid email address.</small>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={reloadForm}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <section className="content-header">
            <h1>
                Add Lecturer <small>Form Section</small>
            </h1>
            <div className="errContainer">
                <div id="messagediv" className="success success-ico" style={{display:"none"}}></div>
                <p className="statusMsg error-ico" style={{display:"none"}}> </p>
            </div>
            <ol className="breadcrumb">
                <li><a href="#"><i className="fa fa-dashboard"></i> Dashboard</a></li>
                <li className="active">Add Lecturer</li>
            </ol>
        </section>
        <section className="content container-fluid">
            <form id="formdosen" method="post" acceptCharset="utf-8" onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="off">
                <div className="box">
                    <div className="box-header with-border">
                        <h3 className="box-title">Form Add Lecturer Data</h3>
                        <div className="box-tools pull-right">
                            <Link to={'/professors'} className="btn btn-sm btn-flat btn-primary">
                                <i className="fa fa-arrow-left"></i> Cancel
                            </Link>
                        </div>
                    </div>
                    <div className="box-body">
                        <div className="row">
                            <div className="col-md-4 col-sm-12 col-xs-12" >
                                <label htmlFor="Firstname">Firstname:<span className="text-danger">*</span></label>
                                <input type="text" name="Firstname" id="Firstname"  placeholder="Firstname" value={formData.Firstname} onChange={handleInputChange} className={`form-control ${formErrors.Firstname ? 'is-invalid' : ''}`}/>
                                {formErrors.Firstname && <div className="invalid-feedback">{formErrors.Firstname}</div>}
                            </div>
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <label htmlFor="Surname">Surname:<span className="text-danger">*</span></label>
                                <input type="text" name="Surname" id="Surname"  placeholder="Last Name:" value={formData.Surname} onChange={handleInputChange} className={`form-control ${formErrors.Surname ? 'is-invalid' : ''}`}/>
                                 {formErrors.Surname && <div className="invalid-feedback">{formErrors.Surname}</div>}
                            </div>
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <label htmlFor="email">Lecturer Email</label>
                                <input type="email" name="Email" id="Email" placeholder="Lecturer Email" value={formData.Email} onChange={handleInputChange} className={`form-control ${formErrors.Email ? 'is-invalid' : ''}`}/>
                                {formErrors.Email && <div className="invalid-feedback">{formErrors.Email}</div>}
                            </div>	
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <label htmlFor="tel">Mobile:</label>
                                <input type="tel" name="Telephone_No" id="Telephone_No"  placeholder="+(234) 5435-4542-34" value={formData.Telephone_No} onChange={handleInputChange} className={`form-control ${formErrors.Telephone_No ? 'is-invalid' : ''}`}/>
                                {formErrors.Telephone_No && <div className="invalid-feedback">{formErrors.Telephone_No}</div>}
                            </div>
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <label htmlFor="DBO:">Date of Birth:</label>
                                <input type="date" name="Date_of_Birth" id="Date_of_Birth"  value={formData.Date_of_Birth} onChange={handleInputChange} className={`form-control ${formErrors.Date_of_Birth ? 'is-invalid' : ''}`}/>
                                 {formErrors.Date_of_Birth && <div className="invalid-feedback">{formErrors.Date_of_Birth}</div>}
                            </div>
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <label htmlFor="Place of Birth:">Place of Birth:</label>
                                <input type="text"  name="Place__of__birth" id="Place__of__birth"  placeholder="Lagos" value={formData.Place__of__birth} onChange={handleInputChange} className={`form-control ${formErrors.Place__of__birth ? 'is-invalid' : ''}`}/>
                                {formErrors.Place__of__birth && <div className="invalid-feedback">{formErrors.Place__of__birth}</div>}
                            </div>
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <label htmlFor="Gender">Gender</label>
                                <select name="Gender" id="Gender" value={formData.Gender} onChange={handleInputChange} className={`form-control select2 ${formErrors.Gender ? 'is-invalid' : ''}`} >
                                    <option value=""  selected>Select Gender</option>
                                    <option value="Female">Male</option>
                                    <option value="Male">Female</option>
                                </select>
                                {formErrors.Gender && <div className="invalid-feedback">{formErrors.Gender}</div>}
                            </div>
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <label htmlFor="Relationship_sts">Relationship Status </label>
                                <select name="Relationship_sts" id="Relationship_sts" value={formData.Relationship_sts} onChange={handleInputChange} className={`form-control select2 ${formErrors.Relationship_sts ? 'is-invalid' : ''}`}>
                                <option value=""  selected>Select Relationship</option>
                                    <option value="Single">Single</option>
                                    <option value="Divored">Divored</option>
                                    <option value="Married">Married</option>
                                    <option value="Complicated">Complicated</option>
                                    <option value="Window">Window</option>
                                    <option value="In -Contract Marrige">In -Contract Marrige</option>
                                </select>
                                {formErrors.Relationship_sts && <div className="invalid-feedback">{formErrors.Relationship_sts}</div>}
                            </div>
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <label htmlFor="Citizenship:">Citizenship:</label>
                                <input type="text" name="Citizenship" id="Citizenship" placeholder="Africa (Nigeria)" value={formData.Citizenship} onChange={handleInputChange} className={`form-control ${formErrors.Citizenship ? 'is-invalid' : ''}`}/>
                                {formErrors.Citizenship && <div className="invalid-feedback">{formErrors.Citizenship}</div>}
                            </div>
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <label htmlFor="NIN">NIN:</label>
                                <input  id="nationalIdentificationNumber" name="nationalIdentificationNumber" type="number"  placeholder="NIN:" maxLength="11" min="0"
                                max="1000000000009999" step="1" value={formData.NIN} onChange={handleInputChange} 
                                className={`form-control ${formErrors.nationalIdentificationNumber ? 'is-invalid' : ''}`}/>
                                {formErrors.nationalIdentificationNumber && <div className="invalid-feedback">{formErrors.nationalIdentificationNumber}</div>}
                            </div>
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <label htmlFor="Height">Height: </label>
                                <select name="Height" id="Height"  value={formData.Height} onChange={handleInputChange} className={`form-control select2 ${formErrors.Height ? 'is-invalid' : ''}`}>
                                <option value=""  selected>Select Height</option>
                                    <option value="1.45m">1.45m</option>
                                    <option value="1.55m">1.55m</option>
                                    <option value="1.60m">1.60m</option>
                                    <option value="1.66m">1.66m</option>
                                    <option value="1.71m">1.71m</option>
                                    <option value="1.78m">1.78m</option>
                                </select>
                                {formErrors.Height && <div className="invalid-feedback">{formErrors.Height}</div>}
                            </div>
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <label htmlFor="Weight">Weight: </label>
                                <select name="Weight" id="Weight" value={formData.Weight} onChange={handleInputChange} className={`form-control select2 ${formErrors.Weight ? 'is-invalid' : ''}`} >
                                <option value=""  selected>Select Weight</option>
                                    <option value="1.55m">1.55m</option>
                                    <option value="1.45m">1.45m</option>
                                    <option value="1.30m">1.30m</option>
                                    <option value="1.35m">1.35m</option>
                                    <option value="1.25m">1.25m</option>
                                    <option value="1.20m">1.20m</option>
                                </select>
                                {formErrors.Weight && <div className="invalid-feedback">{formErrors.Weight}</div>}
                            </div>	
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <label htmlFor="Blood_Type">Blood Type: </label>
                                <select name="Blood_Type" id="Blood_Type" value={formData.Blood_Type} onChange={handleInputChange} className={`form-control ${formErrors.Blood_Type ? 'is-invalid' : ''}`}>
                                <option value=""  selected>Select Blood Type</option>
                                    <option value="Group: A">Group: A</option>
                                    <option value="Group: B">Group: B</option>
                                    <option value="Group: AB">Group: AB</option>
                                    <option value="Group:-: O">Group:-: 0</option>
                                </select>
                                {formErrors.Blood_Type && <div className="invalid-feedback">{formErrors.Blood_Type}</div>}
                            </div>
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <label htmlFor="Religion">Religion: </label>
                                <select name="Religion" id="Religion" value={formData.Religion} onChange={handleInputChange} className={`form-control ${formErrors.Religion ? 'is-invalid' : ''}`}>
                                    <option value=""  selected>Select Professor Religion</option>
                                    <option value="Christianity">Christianity</option>
                                    <option value="Islam">Islam</option>
                                    <option value="Hinduism">Hinduism</option>
                                    <option value="Buddhism">Buddhism</option>
                                    <option value="Unaffiliated">Unaffiliated</option>
                                    <option value="Folk religions">Folk religions</option>
                                    <option value="None">None</option>
                                </select>
                                {formErrors.Religion && <div className="invalid-feedback">{formErrors.Religion}</div>}
                            </div>
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <label htmlFor="Qualification">Qualification: </label>
                                <select name="Qualification" id="Qualification" value={formData.Qualification} onChange={handleInputChange} className={`form-control ${formErrors.Qualification ? 'is-invalid' : ''}`} >
                                    <option value=""  selected>Select Professor Qualification</option>
                                    <option value="BSc">BSc</option>
                                    <option value="PhD">PhD</option>
                                    <option value="HnD">HnD</option>
                                    <option value="College Degree">College Degree</option>
                                    <option value="OND">OND</option>
                                </select>
                                {formErrors.Qualification && <div className="invalid-feedback">{formErrors.Qualification}</div>}
                            </div>			
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <label htmlFor="Profile Photo:">Profile Photo:</label>
                                <input type="file"  name="Profile__Picture" id="Profile__Picture" value={formData.Profile__Picture} onChange={handleInputChange} className={`form-control ${formErrors.Profile__Picture ? 'is-invalid' : ''}`}/>
                                {formErrors.Profile__Picture && <div className="invalid-feedback">{formErrors.Profile__Picture}</div>}
                            </div>
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <label htmlFor="Address:">Address:</label>
                                <textarea  name="Address" id="Address" cols="0" rows="4" placeholder="Address: Plot 28 Kingstone Bridge K29Q HighWay" value={formData.Address} onChange={handleInputChange} className={`form-control ${formErrors.NIN ? 'is-invalid' : ''}`}></textarea>
                                {formErrors.Address && <div className="invalid-feedback">{formErrors.Address}</div>}
                            </div>
                        </div>
                        <div className="col-md-12">
                                <div className="pull-right" style={{ marginTop: "20px" }}>
                                <button type="reset" className="btn btn-flat btn-default mr-4">
                                    <i className="fa fa-rotate-left"></i> Reset
                                </button>
                                    <button type="submit" id="isAddProfessor" className="btn btn-flat bg-purple" style={{ width: "200px" }}>
                                    <i className="fa fa-save"></i> Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>			
		</section>
		</div>
    </>
  )
}

export default AddNewProfessor
