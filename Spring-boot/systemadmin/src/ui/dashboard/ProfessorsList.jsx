/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Nav from "./components/Header/Nav/Nav"
import '../../assets/css/admin/assets/dist/css/mystyle.css'
import 'select2/dist/css/select2.min.css'
import 'datatables.net-dt/css/jquery.dataTables.css'
import './ProfessorList.css'
import $, { event } from 'jquery';
import {useMemo, useEffect, useRef, useState } from 'react';
import ApiServices from "../../services/ApiServices";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Link } from "react-router-dom"
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import userP from '../../assets/images/admin.png'
import 'react-toastify/dist/ReactToastify.css';
import 'select2'

const ProfessorsList = () => {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAdditionalFields, setShowAdditionalFields] = useState(true);
  const [isSelectDepartment, setIsSelectDepartment]= useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [scheduleformErrors, setScheduleFormErrors] = useState({});
  const [departments, setDepartments] = useState([]);
  const [validationError, setValidationError] = useState('');
  const [formData, setFormData] = useState({
    id:'',
    Email: '',
    Firstname: '',
    Surname: '',
    Telephone_No: '',
    Date_of_Birth: '',
    Gender: '',
    Relationship_sts: '',
    Citizenship: '',
    nationalIdentificationNumber: '',
    Blood_Type: '',
    Religion: '',
    Qualification: '',
    Profile__Picture: '',
    Address: ''
  });
  
  const [appointForm, setAppointForm] = useState({});
  const [appointmentFormData, setAppointmentFormData] = useState({
    professorId:'',
    categoryId: '',
    facultyId: '',
    departmentId: [],
    designation:'',
  })
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiServices.getAllProfessors();
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
    // Initialize DataTable when the component mounts
    $(tableRef.current).DataTable();
    // CleanUp when the component unmounts
    return () => {
      // Destroy DataTable to avoid memory leaks
      $(tableRef.current).DataTable().destroy(true);
    };
  }, []);
  
  useEffect(() => {
    const handleResize = () => {
      setShowAdditionalFields(window.innerWidth < 1165);
      };
      // Initial check on mount
      handleResize();
      // Attach the event listener
      window.addEventListener('resize', handleResize);
      // Clean up the event listener on unmount
      return () => {
      window.removeEventListener('resize', handleResize);
      };
  }, []);

  const handleDepartmentCheckboxChange = (departmentId) => {
    setAppointmentFormData((prevFormData) => ({
      ...prevFormData,
      departmentId: prevFormData.departmentId.includes(departmentId)
        ? prevFormData.departmentId.filter((id) => id !== departmentId)
        : [...prevFormData.departmentId, departmentId],
    }));
    setValidationError('');
    setIsSelectDepartment(false)
  };

  const handleCheckboxChange = (event) => {
    $('#iz').hide();
    const { id } = event.target;
    let count = 0;

    if (id === 'chk_all') {
      let inputs = $(".checkboxid");
      let boolx = [];
      for (let i = 0; i < inputs.length; i++) {
        let type = inputs[i].getAttribute("type");
        if (type === "checkbox") {
          if (event.target.checked) {
            count++;
            $('#iz').show();
            boolx.push(inputs[i].value);
            inputs[i].checked = true;
          } else {
            $('#iz').hide();
            inputs[i].checked = false;
          }
        }
      }
      document.getElementById("deletebadge").innerHTML = count;
      const element = document.getElementById('delete__Btn');
      element.addEventListener("click", () => { 
        Swal.fire({
          title: "Are you sure?",
          text: 'You will not be able to recover this record!',
          icon: 'warning',
          type: "question",
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          background: '#fff',
          backdrop: `rgba(0,0,123,0.4)`,
          confirmButtonText: 'Yes, Delete!',
          // using theN & done promise callback
        }).then(async(result) => {
          if (result.isConfirmed) {
            // call your delete api
            const processDelete = await ApiServices.DeleteProfessor({ "id": boolx });
            if (processDelete ==200) {
              toast.success("Successful Deleted.");
              setTimeout(() => {
                window.location.reload(true);
              }, 1000);
            } else {
              toast.error("Somethin went wrong in process professor delete.");
            }
          }
        });
      })
  }
  };

  const handleInputChangeOnDesignationField = (event) => {
    const { name, value } = event.target;

    setAppointmentFormData({
      ...appointmentFormData,
      [name]: value,
    });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckBoxChangleSingle = () =>{
      $('#iz').hide();
      let items = document.querySelectorAll('.checkboxid');
      let StringData = [];
      let count = 0;
      for (var i in items) {
        if (items[i].checked) {
          count++;
        }
      }
      if (count == 1) {
        $('#iz').show();
        for (i = 0; i < items.length; i++) {
          if (items[i].checked) {
            StringData.push(items[i].value);
            document.getElementById("deletebadge").innerHTML = count;
          }
        }
      } else if (count > 1) {
        $('#iz').show();
        for (i = 0; i < items.length; i++) {
          if (items[i].checked) {
            StringData.push(items[i].value);
            document.getElementById("deletebadge").innerHTML = count;
          }
        }
      } else {
        $('#iz').hide();
        items[i].checked = false;
        var checkbox = document.getElementById("chk_all");
        checkbox.checked = false;
      }
      const element = document.getElementById('delete__Btn')
      element.addEventListener("click", () => {
        Swal.fire({
          title: "Are you sure?",
          text: 'You will not be able to recover this record!',
          icon: 'warning',
          type: "question",
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          background: '#fff',
          backdrop: `rgba(0,0,123,0.4)`,
          confirmButtonText: 'Yes, Delete!',
          // using theN & done promise callback
        }).then(async(result) => {
          if (result.isConfirmed) {
            // call your delete api
            const processDelete = await ApiServices.DeleteProfessor({ "id": StringData });
            if (processDelete ==200) {
              toast.success("Successful Deleted.");
              setTimeout(() => {
                window.location.reload(true);
              }, 1000);
            } else {
              toast.error("Somethin went wrong in process professor delete.");
            }
          }
        }); 
    });
  }
  
  const setFeaturesToVisible = async(id) => {
    const response = await ApiServices.setProfessorFeatureToEnabled(id);
    if (response == 200) {
      toast.success("Successfully activated.");
      setTimeout(() => {
        window.location.reload(true);
      }, 1000);
    } else {
      toast.error("Something went wrong.");
    }
  }

  const setFeaturesToNotVisible = async(id) => {
    const response = await ApiServices.setProfessorFeatureToNotEnabled(id);
    if (response == 200) {
      toast.success("Successfully Disactivated.");
      setTimeout(() => {
        window.location.reload(true);
      }, 1000);
    } else {
      toast.error("Something went wrong.");
    }
  }

  const HandleEditProfessor = async (id) => {
    try {
      await ApiServices.getProfessorById(id)
        .then(response => { 
          if (response.status == 200) {
            setShowAppointmentForm(false)
            setShowEditForm(true)
            setFormData({
              id: response.data.id,
              nationalIdentificationNumber: response.data.records[0].nationalIdentificationNumber,
              Surname: response.data.records[0].surname,
              Firstname: response.data.records[0].firstname,
              Email: response.data.email,
              Telephone_No: response.data.records[0].mobile,
              Date_of_Birth: response.data.records[0].dateOfBirth,
              Address: response.data.records[0].address,
              Qualification: response.data.records[0].qualification,
              Blood_Type: response.data.records[0].bloodType,
              Religion: response.data.records[0].religion,
              Gender: response.data.records[0].gender,
              Relationship_sts: response.data.records[0].relationshipStatus
            });
          } else {
            setShowEditForm(false)
          }
        }).fail(xhr => {
           setShowEditForm(false)
          console.log(xhr);
        })
    } catch (error) {
      setShowEditForm(false)
    }
   
  };

  const HandleDeleteProfessor = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      type: "question",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      background: '#fff',
      backdrop: `rgba(0,0,123,0.4)`,
      confirmButtonText: 'Yes, Delete!',
      // using theN & done promise callback
    }).then(async(result) => {
      if (result.isConfirmed) {
        // call your delete api
        const processDelete = await ApiServices.DeleteProfessor({ "id": [id] });
        if (processDelete ==200) {
          toast.success("Successful Deleted.");
          setTimeout(() => {
            window.location.reload(true);
          }, 1000);
        } else {
          toast.error("Somethin went wrong in process professor delete.");
        }
      }
    }); 
  };

  const HandleProfessorAppointment = async(id) => {
    try {
      setDepartments([]);
      await ApiServices.appointProfessorToDepartmentManagement(id)
        .then(response => { 
          if (response.status == 200) {
            if (response.data.appointed ==true) {
              //set appointed modal display visible
              setShowEditForm(false)
            } else {
              //set new setShowAppointmentForm visible
              setShowEditForm(false)
              setShowAppointmentForm(true)
              setAppointForm({
                  id: response.data.id,
                  surname: response.data.surname,
                  firstname: response.data.firstname,
                  selectedCategoryId: '',
                  categories: response.data.categories,
              });
              const newValue = response.data.id;
              setAppointmentFormData((prevFormData) => ({
                ...prevFormData,
                professorId: newValue,
              }));
            }
           
          } else {
            setShowAppointmentForm(false)
          }
        }).fail(xhr => {
           setShowAppointmentForm(false)
          console.log(xhr);
        })
    } catch (error) {
      setShowAppointmentForm(false)
    }
  };

  const handleCancelAppointmentModal = async (event) => {
    event.preventDefault()
    setShowAppointmentForm(false);
  }

  const handleCancelEditProfessorModalForm = async (event) => {
    event.preventDefault()
    setShowEditForm(false);
  }

  const HandleEditSubmit = (e) => {
    e.preventDefault();
    // Perform your form validation here
    const errors = validateEditFormData(formData);
    setFormErrors(errors);
  }

  const validateEditFormData = (data) => {
    let errors = {};
    var id = data.id;
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

    if (!data.Gender) {
        errors.Gender = 'Gender is required';
    }

    if (!data.Relationship_sts) {
        errors.Relationship_sts = 'Relationship Status is required';
    }

    if (!data.nationalIdentificationNumber) {
        errors.nationalIdentificationNumber = 'National Identification Number is required';
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
                "qualification":data.Qualification
            },
        }
        fireEditPost(requestdata, id)
    }
    return errors;
  }

  const fireEditPost = async (requestdata, id) => {
    const response = await ApiServices.updateProfessorDetails(requestdata, id);
    if (response == 200) {
      toast.success("Successfully Updated.");
      setTimeout(() => {
        window.location.reload(true);
      }, 1000);
    } else {
      toast.error("Something went wrong.");
    }
  }

  const handleCategoryChange = async (event) => {
    const { name, value } = event.target;
     setAppointmentFormData({
      ...appointmentFormData,
      [name]: value,
    });
    try {
      var id = value;
      if (id == null || id == "") { 
        $('#facultyId').empty();
        $('#facultyId').append('<option value="">--Empty--</option>')
        $('#departmentName').empty();
        $('#departmentName').append('<option value="">--Empty--</option>')
        setDepartments([]);
        return false;
      } else {
        const getfacultyapi = await ApiServices.FetechFacultiesBaseOnSelectedApplicationId({ id });
        if (getfacultyapi.status == 200) {
          $('#facultyId').empty();
          $('#facultyId').append('<option value="">--Select--</option>')
           setDepartments([]);
          getfacultyapi.data.data.forEach(function (element) {
            $('#facultyId').append('<option value="' + element.id + '">' + element.facultyName + '</option>');
          });
        }
      }
    } catch (error) {
      //
    }           
    
  };

  const handleInputChangeOnFacultyField = async (event) => {  
    const { name, value } = event.target;
     setAppointmentFormData({
      ...appointmentFormData,
      [name]: value,
    });
    try {
      var id = value;
      if (id== null || id == "") {
        $('#departmentName').empty();
         setDepartments([]);
        $('#departmentName').append('<option value="">--Empty--</option>')
        return false;
      } else {
        const getdepartmentapi = await ApiServices.FetechDepartmentBaseOnSelectedApplicationId({ id })
        setDepartments(getdepartmentapi.data.data);
        if (getdepartmentapi.status ==200) {
          $('#departmentName').empty();
          $('#departmentName').append('<option value="">--Select--</option>')
          getdepartmentapi.data.data.forEach(function(element) {
            $('#departmentName').append('<option value="' + element.id + '">' + element.departmentName + '</option>');
          });
        }
      }
    } catch (error) {
        console.warn("Error in fetchinh Department Api's ");
    }
  };
  
  const HandleAppointmentSubmit =(e) => {
    e.preventDefault();
    // Perform your form validation here
    const errors = validateAppointmentFormData(appointmentFormData);
    setScheduleFormErrors(errors);
  }

  const validateAppointmentFormData = (appointmentFormData) => {
    let errors = {};

    if (!appointmentFormData.categoryId) {
      errors.categoryId = 'Please select category.';
    }
    if (!appointmentFormData.professorId) {
      errors.professorId = 'Please provide professor details.';
    }
    if (!appointmentFormData.facultyId) {
      errors.facultyId = 'Please select faculty.';
    }
    if (departments.length > 0 && appointmentFormData.departmentId.length === 0) {
      setIsSelectDepartment(true)
      setValidationError('Please select at least one department.');
    } else {
      setIsSelectDepartment(false)
      setValidationError('');
    }

    if (!appointmentFormData.designation) {
      errors.designation = 'Please select designation';
    }
    if (appointmentFormData.categoryId && appointmentFormData.facultyId && appointmentFormData.departmentId.length >=1 && appointmentFormData.designation) {
      // api
      saveAppointment({"professorId":appointmentFormData.professorId, "categoryId":appointmentFormData.categoryId, "facultyId":appointmentFormData.facultyId, "departmentId":appointmentFormData.departmentId.join(','), "designation":appointmentFormData.designation})
    }
    return errors;
  }

  const saveAppointment = async (data) => {
    const respones=  await ApiServices.storeProfessorApointmentBase(data)
    if (respones.status == 200) {
      toast.success("Successfully Updated.");
      setTimeout(() => {
        window.location.reload(true);
      }, 1000);
    } else {
      if (respones.response.status ==409) {
         toast.warning("This professor has already been appointed.");
      } else {
        toast.error("Something went wrong.");
      }
      
    }
  }

  var ColClass = "";
  var ColClass2 = "";
  if (showAppointmentForm && showAdditionalFields || showEditForm && showAdditionalFields) {
      ColClass = 'col-md-12';
      ColClass2 = 'col-md-12 mt-4';
  } else if (!showAppointmentForm && showAdditionalFields  || !showEditForm && showAdditionalFields) {
      ColClass = 'col-md-12'
      ColClass2 = 'col-md-12 mt-4';
  } else if (showAppointmentForm && !showAdditionalFields  || showEditForm && !showAdditionalFields)  {
      ColClass = 'col-md-8 ww-1'
      ColClass2 = 'col-md-4';
  } else {
    ColClass = 'col-md-12'
    ColClass2 = 'col-md-12';
  }
  const columns = useMemo(
    () => [
      {
        id: "rowNumber",
        header: "S/N",
        // eslint-disable-next-line react/prop-types
        Cell: ({ row }) => <div>{row.index + 1}</div>
      },
      {
        accessorKey: "deleteAll",
        header:<label className="mcui-checkbox"><input type="checkbox"  id="chk_all" onChange={handleCheckboxChange} /> <div><svg className="mcui-check" viewBox="-2 -2 35 35" aria-hidden="true"><title>checkmark-circle</title><polyline points="7.57 15.87 12.62 21.07 23.43 9.93" /></svg></div></label>,
        Cell: ({ row }) => (
           <label className="checkbox-container"><input type="checkbox" className="checkboxid" name="checkuser[]" value={row.original.id} onChange={handleCheckBoxChangleSingle}/><span className="checkmark"></span></label>
        )
      },
      {
        accessorKey: "permission",
        header:"User Permit",
        Cell: ({ value, row }) => (
          <div>
            {!row.original.features ? (
              <button onClick={() => setFeaturesToVisible(row.original.id)}  className="btn btn-danger btn-xs" style={{height:'10%'}}><i className="fa fa-plus"></i>Activate visibility</button>
            ) : (
              <button onClick={() => setFeaturesToNotVisible(row.original.id)}  className="btn btn-default btn-xs" style={{height:'30px',padding:'5px'}}><i className="fa fa-minus"></i>Disactivate visibility</button>
            )}
          </div>
        ),
      },
      {
        accessorKey: "accessCode",
        header:"Access Code",
      },
      {
        accessorKey: "name",
        header: "Name",
          Cell: ({ row }) => (
          <>
            {row.original.records.map((record, index) => (
              <div key={index}>
                <div>{record.firstname+' '+record.surname}</div>
              </div>
            ))}
          </>
        ),
      },
      {
        accessorKey: "image",
        header: "Image",
        Cell: ({ row }) => (
          <>
            {row.original.records.map((record, index) => (
              <div key={index}>
                <div><img src={userP} alt={record.firstname + ' ' + record.surname} className="rounded img-thumbnail" style={{ width: "40px", height: "40.7px" }} /></div>
              </div>
            ))}
          </>
        ),
      },
      {
        id: "Actions",
        header: "Actions",
        Cell: ({ row }) => (
          <>
            <div className="flex d-flex" style={{ display: 'flex' }}>
              <div className="text-center">
                <button onClick={() =>HandleEditProfessor(row.original.id)} style={{width:'30px', alignItems:'center', textAlign:'center', borderRadius: '3px',boxShadow: 'none',border: '1px solid transparent', background:'#0073b7', }}>
                  <i className="fa fa-pencil" style={{marginLeft:'3px', color:'#fff'}}></i>
                </button>&nbsp;
                <button onClick={() =>HandleProfessorAppointment(row.original.id)} style={{width:'30px', alignItems:'center', textAlign:'center', borderRadius: '3px',boxShadow: 'none',border: '1px solid transparent', background:'#3c763d', }}>
                  <i className="fa fa-calendar " style={{marginLeft:'3px', color:'#fff'}}></i>
                </button>&nbsp;
                <button onClick={() =>HandleDeleteProfessor(row.original.id)} style={{width:'30px', alignItems:'center', textAlign:'center', borderRadius: '3px',boxShadow: 'none',border: '1px solid transparent', background:'#dd4b39'}}>
                  <i className="fa fa-trash" style={{marginLeft:'3px', color:'#fff'}}></i>
                </button>
              </div>
            </div>
          </>
        )
      }
    ],
    []
  );
 
  const table = useMaterialReactTable({
        data,
        columns
  });

  return (
    <>
      <ToastContainer />
      <Nav />
      {loading ? (
        <>
          <div className="spin" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
            <div className="custom-loader"></div>
          </div>
        </>
              
      ) : (
        <>
      <section className="content container-fluid">
        <div className="box">
          <div className="box-header with-border">
            <h3 className="box-title">Master Student  Data</h3>
            <div className="box-tools pull-right">
              <button type="button" className="btn btn-box-tool" data-widget="collapse">
                <i className="fa fa-minus"></i>
              </button>
            </div>
            <div className="box-body">
              <div className="mt-2 mb-4">
                <Link to={"/professor/add_professor"}><button type="button" className="btn btn-sm bg-blue btn-flat"><i className="fa fa-plus"></i> Add Data</button></Link>
                <Link to={"student/import"} className="btn btn-sm btn-flat btn-success disabled ml-3"><i className="fa fa-upload"></i> Import</Link>
                  <div className="pull-right insiderBox" id="iz" style={{ display: "none" }}>
                    <button id="delete__Btn" title="Delete This Professor" className="mr-4 btn btn-sm btn-danger btn-flat" type="button"><i className="fa fa-trash"></i> Delete</button>
                    <button disabled="disabled" className="btn btn-sm" style={{ backgroundColor: "#000000", borderRadius: "25px" }}><span className="pull-left" id="deletebadge" style={{ color: "#fff" }}>Selected</span></button>
                  </div>
                </div>
                 <div className={showAdditionalFields ? "":"d-flex" }>
                    <div className={ColClass}>
                      <MaterialReactTable table={table} />
                    </div>
                      {showAppointmentForm && (
                        <>
                      <div className={ColClass2}>
                        <div className="card">
                          <div className="card-header">
                           <h6 style={{fontFamily:'sans-serif', textAlign:'center', fontStyle:'normal', fontWeight:'bolder'}}>Appointmenting Professor</h6> 
                          </div>
                          <div className="card-body">
                            <form method="post" autoComplete='off' onSubmit={HandleAppointmentSubmit}>
                              <input type="text" name="professorId" id="professorId" value={appointForm.id} className="hidden" style={{ display:'none'}} />
                              <div className="form-group">
                                <label name="name" id="name">Full Name:*</label>
                                <input type="text" name="name" id="name" className='form-control' value={appointForm.firstname+' '+appointForm.surname} readOnly disabled/>
                              </div>
                              <div className="form-group c-invalid">
                                  <label name="categoryId">Application:*</label>
                                    <select name="categoryId" id="categoryId" className={`form-control ${scheduleformErrors.categoryId? 'is-invalid' : ''}`}  onChange={handleCategoryChange}>
                                      <option value="">--Empty--</option>
                                      {appointForm.categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                          {category.categoryName}
                                        </option>
                                      ))}
                                  </select>
                                  {scheduleformErrors.categoryId && <div className="invalid-feedback">{scheduleformErrors.categoryId}</div>}
                              </div>
                              <div className="form-group">
                                <label name="facultyId">Faculty:*</label>
                                <select name="facultyId" id="facultyId" className={`form-control ${scheduleformErrors.facultyId ? 'is-invalid' : ''}`}  onChange={handleInputChangeOnFacultyField}>
                                  <option value="">--Empty--</option>
                                </select>
                                {scheduleformErrors.facultyId && <div className="invalid-feedback">{scheduleformErrors.facultyId}</div>}
                              </div>
                                <div className="form-group">
                                  <label name="departmentName">Department:*</label>
                                    <div className="departmentBlog">
                                        {departments.map((element) => (
                                        <div key={element.id}>
                                          <label className="checkbox-container">
                                            <input type="checkbox" 
                                            id={`departmentCheckbox_${element.id}`}
                                              value={element.id}
                                              onChange={() => handleDepartmentCheckboxChange(element.id)}/>
                                            <span className="checkmark"></span>
                                          </label>
                                          <label htmlFor={`departmentCheckbox_${element.id}`} className="ml-3">
                                            <span>&nbsp;&nbsp;{element.departmentName}</span>
                                          </label>
                                        </div>
                                      ))}
                                    </div>
                                     {isSelectDepartment && validationError && ( <div className="error-message" style={{marginTop: '0.25rem',fontSize: '80%',color:' #dc3545'}}>{validationError}</div> )}
                                </div>
                              <div className="form-group c-invalid">
                                <label name="Designation">Designation:*</label>
                                <select name="designation" id="designation" className={`form-control ${scheduleformErrors.designation ? 'is-invalid' : ''}`}  onChange={handleInputChangeOnDesignationField}>
                                  <option value="">--Empty--</option>
                                  <option value="Full Time" >Full Time</option>
                                  <option value="Part Time">Part Time</option>
                                  <option value="Contract">Contract</option>
                                  <option value="Remotely">Remotely</option>
                                </select>
                                {scheduleformErrors.designation && <div className="invalid-feedback">{scheduleformErrors.designation}</div>}
                              </div>
                              <button type="submit" className='btn btn-success pull-right'>Save Update</button>
                              <button type="button"  onClick={handleCancelAppointmentModal}  className='btn btn-default'>Cancel Update</button>
                            </form>
                          </div>
                        </div>  
                      </div>
                        </>
                      )
                      }
                      {showEditForm && (
                        <>
                        <div className={ColClass2}>
                          <div className="card">
                            <div className="card-header">
                              <h6 style={{fontFamily:'sans-serif', textAlign:'center', fontStyle:'normal', fontWeight:'bolder'}}>Edit Professor</h6> 
                            </div>
                            <div className="card-body">
                              <form method="post" onSubmit={HandleEditSubmit}>
                                <div className="row">
                                  <input type="text" id="_2id" name="_2id" value={formData.id} className="hidden" hidden style={{display:"none"}}/>
                                  <div className="col-md-12 col-sm-12 col-xs-12" >
                                    <label htmlFor="Firstname">Firstname:<span className="text-danger">*</span></label>
                                    <input type="text" name="Firstname" id="Firstname"  placeholder="Firstname" value={formData.Firstname} onChange={handleInputChange} className={`form-control ${formErrors.Firstname ? 'is-invalid' : ''}`}/>
                                    {formErrors.Firstname && <div className="invalid-feedback">{formErrors.Firstname}</div>}
                                    </div>
                                    <div className="col-md-12 col-sm-12 col-xs-12">
                                        <label htmlFor="Surname">Surname:<span className="text-danger">*</span></label>
                                        <input type="text" name="Surname" id="Surname"  placeholder="Last Name:" value={formData.Surname} onChange={handleInputChange} className={`form-control ${formErrors.Surname ? 'is-invalid' : ''}`}/>
                                        {formErrors.Surname && <div className="invalid-feedback">{formErrors.Surname}</div>}
                                    </div>
                                    <div className="col-md-12 col-sm-12 col-xs-12">
                                        <label htmlFor="Email">Lecturer Email</label>
                                        <input type="email" name="Email" id="Email" placeholder="Lecturer Email" value={formData.Email} onChange={handleInputChange} className={`form-control ${formErrors.Email ? 'is-invalid' : ''}`}/>
                                        {formErrors.Email && <div className="invalid-feedback">{formErrors.Email}</div>}
                                    </div>	
                                    <div className="col-md-12 col-sm-12 col-xs-12">
                                        <label htmlFor="Telephone_No">Mobile:</label>
                                        <input type="tel" name="Telephone_No" id="Telephone_No"  placeholder="+(234) 5435-4542-34" value={formData.Telephone_No} onChange={handleInputChange} className={`form-control ${formErrors.Telephone_No ? 'is-invalid' : ''}`}/>
                                        {formErrors.Telephone_No && <div className="invalid-feedback">{formErrors.Telephone_No}</div>}
                                    </div>
                                    <div className="col-md-12 col-sm-12 col-xs-12">
                                        <label htmlFor="Date_of_Birth">Date of Birth:</label>
                                        <input type="date" name="Date_of_Birth" id="Date_of_Birth"  value={formData.Date_of_Birth} onChange={handleInputChange} className={`form-control ${formErrors.Date_of_Birth ? 'is-invalid' : ''}`}/>
                                        {formErrors.Date_of_Birth && <div className="invalid-feedback">{formErrors.Date_of_Birth}</div>}
                                    </div>
                                    <div className="col-md-12 col-sm-12 col-xs-12">
                                      <label htmlFor="Gender">Gender</label>
                                      <select name="Gender" id="Gender" value={formData.Gender} onChange={handleInputChange} className={`form-control select2 ${formErrors.Gender ? 'is-invalid' : ''}`} >
                                          <option value=""  selected>Select Gender</option>
                                          <option  selected={formData.Gender == "Female" ? "selected" : "Female"} value="Female">Male</option>
                                          <option selected={formData.Male == "Male" ? "selected" : "Male"} value="Male">Female</option>
                                      </select>
                                      {formErrors.Gender && <div className="invalid-feedback">{formErrors.Gender}</div>}
                                    </div>
                                    <div className="col-md-12 col-sm-12 col-xs-12">
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
                                    <div className="col-md-12 col-sm-12 col-xs-12">
                                      <label htmlFor="nationalIdentificationNumber">NIN:</label>
                                      <input  id="nationalIdentificationNumber" name="nationalIdentificationNumber" type="number"  placeholder="NIN:" maxLength="11" min="0"
                                      max="1000000000009999" step="1" value={formData.nationalIdentificationNumber} onChange={handleInputChange} 
                                      className={`form-control ${formErrors.nationalIdentificationNumber ? 'is-invalid' : ''}`}/>
                                      {formErrors.nationalIdentificationNumber && <div className="invalid-feedback">{formErrors.nationalIdentificationNumber}</div>}
                                    </div>
                                    <div className="col-md-12 col-sm-12 col-xs-12">
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
                                    <div className="col-md-12 col-sm-12 col-xs-12">
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
                                  <div className="col-md-12 col-sm-12 col-xs-12">
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
                                  <div className="col-md-12 col-sm-12 col-xs-12">
                                      <label htmlFor="Address">Address:</label>
                                      <textarea  name="Address" id="Address" cols="0" rows="4" placeholder="Address: Plot 28 Kingstone Bridge K29Q HighWay" value={formData.Address} onChange={handleInputChange} className={`form-control ${formErrors.NIN ? 'is-invalid' : ''}`}></textarea>
                                      {formErrors.Address && <div className="invalid-feedback">{formErrors.Address}</div>}
                                  </div>
                                  </div>
                                <div className="col-md-12 col-sm-12 col-xs-12 mt-3">
                                  <button type="button"  onClick={handleCancelEditProfessorModalForm}  className='btn btn-default'>Cancel Update</button>
                                  <button type="submit" id="isAddProfessor" className="ml-4 btn btn-flat bg-purple" style={{ width: "200px" }}><i className="fa fa-save"></i> Save Edit</button>
                                </div>
                              </form>
                            

                          </div>
                        </div>
                        </div>
                    </>
                      )}
                    </div>
              </div>
          </div>  
        </div>
      </section>  
      </>
      )}
    </>
  )
}

export default ProfessorsList
