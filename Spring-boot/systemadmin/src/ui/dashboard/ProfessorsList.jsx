/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */

import Nav from "./components/Header/Nav/Nav"
import '../../assets/css/admin/assets/bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css'
import '../../assets/css/admin/assets/bower_components/select2/css/select2.min.css'
import '../../assets/css/admin/assets/dist/css/skins/skin-blue.min.css'
import '../../assets/css/admin/assets/dist/css/skins/skin-yellow.min.css'
import '../../assets/css/admin/assets/bower_components/bootstrap-datetimepicker/bootstrap-datetimepicker.min.css'
import '../../assets/css/admin/assets/bower_components/pace/pace-theme-flash.css'
import '../../assets/css/admin/assets/bower_components/datatables.net-bs/plugins/Buttons-1.5.6/css/buttons.bootstrap.min.css'
import '../../assets/css/admin/assets/dist/css/mystyle.css'
import '../../assets/css/admin/assets/bower_components/codemirror/lib/codemirror.min.css'
import '../../assets/css/admin/assets/bower_components/froala_editor/css/froala_editor.pkgd.min.css'
import '../../assets/css/admin/assets/bower_components/froala_editor/css/froala_style.min.css'
import '../../assets/css/admin/assets/bower_components/froala_editor/css/themes/royal.min.css'
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/jquery.dataTables.css'
import './ProfessorList.css'
import $ from 'jquery';
import {useMemo, useEffect, useRef, useState } from 'react';
import ApiServices from "../../services/ApiServices";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Link } from "react-router-dom"
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import userP from '../../assets/images/admin.png'
import 'react-toastify/dist/ReactToastify.css';

const ProfessorsList = () => {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAdditionalFields, setShowAdditionalFields] = useState(true);

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

  const HandleEditProfessor = (id) => {
    setShowEditForm(true);
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

  const HandleProfessorAppointment = (id) => {
    setShowAppointmentForm(true)
  };

  const handleCancelAppointmentModal = async (event) => {
    event.preventDefault()
    setShowAppointmentForm(false);
  }

  const handleCancelEditProfessorModalForm = async (event) => {
    event.preventDefault()
    setShowEditForm(false);
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
                            <form method="post" autoComplete='off'>
                              <div className="form-group">
                                <label name="name" id="name">Full Name:*</label>
                                <input type="text" name="name" id="name" className='form-control'/>
                              </div>
                              <div className="form-group c-invalid">
                                  <label name="category" id="category">Application:*</label>
                                      <select name="category" id="category" className="form-control">
                                      <option value="">--Empty--</option>
                                      <option value="1"> Distance Learning Institute </option>
                                      <option value="2" > Postgraduate </option>
                                      <option value="3" > Undergraduate </option>
                                  </select>
                              </div>
                              <div className="form-group c-invalid">
                                <label name="Faculty" id="Faculty">Faculty:*</label>
                                <select name="Faculty" id="Faculty" className="form-control">
                                  <option value="">--Empty--</option>
                                </select>
                              </div>
                              <div className="form-group c-invalid">
                                <label name="Department" id="Department">Department:*</label>
                                <select name="Department" id="Department" className="form-control">
                                  <option value="">--Empty--</option>
                                </select>
                              </div>
                              <div className="form-group c-invalid">
                                <label name="Designation" id="Designation">Designation:*</label>
                                <select name="Designation" id="Designation" className="form-control">
                                  <option value="">--Empty--</option>
                                </select>
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
                              <h3>Edit Body</h3>
                              <button type="button"  onClick={handleCancelEditProfessorModalForm}  className='btn btn-default'>Cancel Update</button>
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
