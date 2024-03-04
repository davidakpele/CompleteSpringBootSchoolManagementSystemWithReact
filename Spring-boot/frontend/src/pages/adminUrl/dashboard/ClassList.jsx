/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import $ from 'jquery';
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/jquery.dataTables.css'
import {useEffect, useRef, useState } from 'react';
import ApiServices from "../../../services/ApiServices";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Link } from "react-router-dom"
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from './components/Header/Nav/NavScroll';
import 'select2';
import 'select2/dist/css/select2.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const ClassList = () => {
    const tableRef = useRef([]);
    const [show, setShow] = useState(false);
    const [showEditModal, setEditModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [showAdditionalFields, setShowAdditionalFields] = useState(true);
    const [showEditForm, setShowEditForm] = useState(false);
    const [classApiData, setClassApiData] = useState({
        id: '',
        title:''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ApiServices.getAllClasses();
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
               const response = await ApiServices.DeleteClassById({ "id": boolx })
                if (response == 200) {
                    toast.success("Successfully Deleted.");
                    //Swal.fire('Deleted!', 'Successfully Deleted.', 'success')
                    setTimeout(() => {
                        window.location.reload(true);
                    }, 1000);
                } else {
                    toast.warning("Something went wrong.")
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
                const response = await ApiServices.DeleteClassById({ "id": StringData })
                if (response == 200) {
                    toast.success("Successfully Deleted.");
                    //Swal.fire('Deleted!', 'Successfully Deleted.', 'success')
                    setTimeout(() => {
                        window.location.reload(true);
                    }, 1000);
                } else {
                    toast.warning("Something went wrong.")
                }
            }
            }); 
        });
    }

    const HandleEditClass = async (id) => {
        const response = await ApiServices.getClassById(id);
        if (response.status == 200) {
            const data = response.data;
            setShowEditForm(true);
            setEditModal(true)
            setClassApiData({id:data.id, title:data.title})
        }
    }

    const HandleSaveEditClassData = () => {
        let errors = {};
        if (!classApiData.title) {
            errors.title = 'Class Name field is required';
        }
        if (classApiData.title && classApiData.title != "") {
            const data = {"className":classApiData.title, "id":classApiData.id}
            FireEditData({data})
        }
        return errors;
    }

     const FireEditData = async ({data}) => {
        let errors = {};
        const resutlt = await ApiServices.saveEditClass({ data })
        if (resutlt.response !=null && resutlt.response.status != 200) {
            errors.title = resutlt.response.data.error;
            setFormErrors(errors);
            } else {
            toast.success("Successful Updated.!");
            setTimeout(() => {
                window.location.reload(true);
            }, 1000);
        }
    }

    const HandleDeleteClass = async (id) => {
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
            }).then( async(result) => {
                if (result.isConfirmed) {
                    // call your delete api
                    const response = await ApiServices.DeleteClassById({ "id": [id] })
                    if (response == 200) {
                        toast.success("Successfully Deleted.");
                        //Swal.fire('Deleted!', 'Successfully Deleted.', 'success')
                        setTimeout(() => {
                            window.location.reload(true);
                        }, 1000);
                    } else {
                        toast.warning("Something went wrong.")
                    }
                }
            });
    }

    const CloseCreateNewClassModal = () => {
        setShow(false);
        setFormErrors("")
    }

    const handleClose = () => {
        setEditModal(false);
        setShowEditForm(false);
        setFormErrors("")
    }

    const OpenCreateNewClassModal = () => {
        setShow(true);
    }

    const HandleCreateNewClass = (event) => {
        event.preventDefault()
        const errors = validateCreateClassData(classApiData);
        setFormErrors(errors);
    }

    const validateCreateClassData= (classApiData)=> {
        let errors = {};
        if (!classApiData.title) {
            errors.title = 'Class Name field is required';
        }
        if (classApiData.title && classApiData.title != "") {
            const data = {"className":classApiData.title}
            FireSendCreation({data})
        }
        return errors;
    }
    
    const FireSendCreation = async ({data}) => {
        let errors = {};
        const resutlt = await ApiServices.saveNewClass({ data })
        if (resutlt.response !=null && resutlt.response.status != 200) {
            errors.title = resutlt.response.data.error;
            setFormErrors(errors);
            } else {
            toast.success("Successful Created.!");
            setTimeout(() => {
                window.location.reload(true);
            }, 1000);
        }
    }

    const OnChangeEditInput = (e) => {
        const { name, value } = e.target;
        setClassApiData({...classApiData, [name] : value});
    };
    
    const columns = [
        { header: 'S/N', accessorKey: 'id', Cell: ({ row }) => <div>{row.index + 1}</div> },
        { accessorKey: "deleteAll",
        header:<label className="mcui-checkbox"><input type="checkbox"  id="chk_all" onChange={handleCheckboxChange} /> <div><svg className="mcui-check" viewBox="-2 -2 35 35" aria-hidden="true"><title>checkmark-circle</title><polyline points="7.57 15.87 12.62 21.07 23.43 9.93" /></svg></div></label>,
        Cell: ({ row }) => (
           <label className="checkbox-container"><input type="checkbox" className="checkboxid" name="checkuser[]" value={row.original.id} onChange={handleCheckBoxChangleSingle}/><span className="checkmark"></span></label>
        )
      },
        {header: 'Course~Name', accessorKey: 'title'},
        {header: 'Actions', accessorKey: 'checkbox',
        Cell: ({ row }) => (
        <div className="flex d-flex" style={{ display: 'flex' }}>
            <div className="text-center">
                <button onClick={() =>HandleEditClass(row.original.id)} style={{width:'30px', alignItems:'center', textAlign:'center', borderRadius: '3px',boxShadow: 'none',border: '1px solid transparent', background:'#0073b7', }}>
                    <i className="fa fa-pencil" style={{marginLeft:'3px', color:'#fff'}}></i>
                </button>&nbsp;
                <button onClick={() =>HandleDeleteClass(row.original.id)} style={{width:'30px', alignItems:'center', textAlign:'center', borderRadius: '3px',boxShadow: 'none',border: '1px solid transparent', background:'#dd4b39'}}>
                    <i className="fa fa-trash" style={{marginLeft:'3px', color:'#fff'}}></i>
                </button>
            </div>
        </div>
    ),
    },
    ];
 
  const table = useMaterialReactTable({ data, columns });
    return (
      <>
    <ToastContainer />
      <Nav />
      
      {
        loading ? (
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
                                <button onClick={OpenCreateNewClassModal} type="button" className="btn btn-sm bg-blue btn-flat"><i className="fa fa-plus"></i> Add Data</button>
                                <div className="pull-right insiderBox" id="iz" style={{ display: "none" }}>
                                    <button id="delete__Btn" title="Delete This Professor" className="mr-4 btn btn-sm btn-danger btn-flat" type="button"><i className="fa fa-trash"></i> Delete</button>
                                    <button disabled="disabled" className="btn btn-sm" style={{ backgroundColor: "#000000", borderRadius: "25px" }}><span className="pull-left" id="deletebadge" style={{ color: "#fff" }}>Selected</span></button>
                                </div>
                            </div>
                            <div className={showAdditionalFields ? "":"d-flex" }>
                                <div className="col-md-12">
                                    <MaterialReactTable table={table} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <Modal show={show} onHide={CloseCreateNewClassModal} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form method="post" onSubmit={HandleCreateNewClass}>
                            <Form.Label htmlFor="Class Name">Class Name:*</Form.Label>  
                            <Form.Control type="text" id="title" name="title" className={`form-control ${formErrors.title ? 'is-invalid' : ''}`} defaultValue={classApiData.title}  onChange={(e)=>OnChangeEditInput(e)}/>  
                            {formErrors.title && <div className="invalid-feedback">{formErrors.title}</div>}
                        </form>   
                    </Modal.Body>                
                    <Modal.Footer>
                        <Button variant="primary" onClick={HandleCreateNewClass}>Save Now</Button>
                    </Modal.Footer>
                </Modal>
                {showEditForm && (
                    <>
                       <Modal show={showEditModal} onHide={handleClose} animation={false}>
                            <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form method="post" onSubmit={HandleSaveEditClassData}>
                                    <Form.Label htmlFor="Class Name">Class Name:*</Form.Label>  
                                    <Form.Control type="text" id="title" name="title" className={`form-control ${formErrors.title ? 'is-invalid' : ''}`} defaultValue={classApiData.title}  onChange={(e)=>OnChangeEditInput(e)}/>  
                                    {formErrors.title && <div className="invalid-feedback">{formErrors.title}</div>}
                                </form> 
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={HandleSaveEditClassData}>Save Changes</Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                )}
            </section>
            </>
        )
    }
    </>
  )
}

export default ClassList
