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

const SemesterList = () => {
    const tableRef = useRef([]);
    const [show, setShow] = useState(false);
    const [showEditModal, setEditModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [showAdditionalFields, setShowAdditionalFields] = useState(true);
    const [showEditForm, setShowEditForm] = useState(false);
    const [semesterApiData, setSemesterApiData] = useState({
        id: '',
        title: '',
        class: '',
    });
    const [semester, setSemester] = useState({
        ClassVal : '',
        Classname1 : '',
        Classname2 : '',
        CombinedData  : '',
    });
    const [editSemesterData, setEditSemesterData] = useState({
        classId : '',
        id : '',
        parent : '',
        title  : '',
    });

    const [apiData, setApiData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ApiServices.getAllSemesters();
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
  

    const HandleEditClass = async (id) => {
        const response = await ApiServices.getSemesterById(id);
        if (response.status == 200) {
            const data = response.data;
            setShowEditForm(true);
            setEditModal(true)
            var InClass = "";
            var InParent = "";
            setEditSemesterData(data)
        }
        console.log(semester);
    }

    const HandleSaveEditClassData = () => {
        let errors = {};
        if (!semesterApiData.title) {
            errors.title = 'Semester Name field is required';
        }
        if (semesterApiData.title && semesterApiData.title != "") {
            const data = {"semesterName":semesterApiData.title, "id":semesterApiData.id}
            FireEditData({data})
        }
        return errors;
    }

    const FireEditData = async ({data}) => {
        let errors = {};
        const resutlt = await ApiServices.saveEditSemester({ data })
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

    const HandleDeleteSemester = async (id) => {
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
                    const response = await ApiServices.DeleteSemesterById(id)
                    if (response == 204) {
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
        setSemester("")
    }

    const handleClose = () => {
        setEditModal(false);
        setShowEditForm(false);
        setFormErrors("")
    }

    const OpenCreateNewClassModal = async() => {
        const response = await ApiServices.getAllClasses();
        if (response.status == 200) {
            const data = response.data;
            setShow(true);
            setApiData(data)
        }
    }

    const HandleCreateNewSemester = (event) => {
        event.preventDefault()
        const errors = validateCreateSemesterData(semester);
        setFormErrors(errors);
    }

    const validateCreateSemesterData= (semester)=> {
        let errors = {};
        if (!semester.ClassVal) {
            errors.ClassVal = 'Select class field.!';
        }
        if (!semester.Classname1) {
            errors.Classname1 = 'Select semester field.!';
        }
        if (!semester.Classname2) {
            errors.Classname2 = 'Required!';
        }
        if (!semester.CombinedData) {
            errors.CombinedData = 'Required!';
        }
        var parent = "";
        if (semester.ClassVal && semester.ClassVal != ""
            && semester.Classname1 && semester.Classname1 != ""
            && semester.Classname2 && semester.Classname2 != ""
            && semester.CombinedData && semester.CombinedData != "") {
            if (semester.Classname2 =='FIRST SEMESTER') {
                parent = 1;
            }else if (semester.Classname2 =='SECOND SEMESTER') {
                parent = 2;
            }
            const data = {"classId": semester.ClassVal, "parent": parent, "title": semester.CombinedData }
            FireSendCreation({data})
        }
        return errors;
    }

    const FireSendCreation = async ({data}) => {
        let errors = {};
        const result = await ApiServices.saveNewSemester({ data })
       
        if (result.response !=null && result.response.status != 200) {
            errors.CombinedData = result.response.data;
            setFormErrors(errors);
        } else {
            toast.success("Successful Created.!");
            setTimeout(() => {
                window.location.reload(true);
            }, 1000);
        }
    }
    
    const OnChangeClass = (e) => {
        const { name, value } = e.target;
        setSemester((prevSemester) => ({
            ...prevSemester,
            [name]: value,
        }));
        
        let i = $('#CombinedData').val();
        let Classname2 = $("#Classname2").val();
        if (value == "") {
            $("#Classname1").empty();
            $("#Classname1").val('');
        } else {
            $('#Classname1').val('(' + value + '00L)');
            let c = '(' + value + '00L)';
            setSemester((prevSemester) => ({
                ...prevSemester,
                Classname1: c,
            }));
        }
        if (i != "") {
            let c = '(' + value + '00L)';
            setSemester((prevSemester) => ({
                ...prevSemester,
                Classname1: c,
            }));
            setSemester((prevSemester) => ({
            ...prevSemester,
                CombinedData: c + Classname2,
            }));
            $('#CombinedData').val(c + Classname2);
        }
    }

    const OnChangeClassOption = (e) => {
        const { name, value } = e.target;
        let Classname1 = $("#Classname1").val();
        if (value == "") {
            $("#CombinedData").empty();
            $("#CombinedData").val('');
        } else {
           setSemester((prevSemester) => ({
            ...prevSemester,
            Classname2: value,
            }));
           setSemester((prevSemester) => ({
            ...prevSemester,
            CombinedData: Classname1 + value,
            }));
        }
    }

    const OnChangeEditInput = (e) => {
        const { name, value } = e.target;
        setSemesterApiData({...semesterApiData, [name] : value});
    };
    

    const columns = [
        { header: 'S/N', accessorKey: 'id', Cell: ({ row }) => <div>{row.index + 1}</div> },
        {header: 'Semester', accessorKey: 'title'},
        {header: 'Actions', accessorKey: 'checkbox',
        Cell: ({ row }) => (
        <div className="flex d-flex" style={{ display: 'flex' }}>
            <div className="text-center">
                <button onClick={() =>HandleEditClass(row.original.id)} style={{width:'30px', alignItems:'center', textAlign:'center', borderRadius: '3px',boxShadow: 'none',border: '1px solid transparent', background:'#0073b7', }}>
                    <i className="fa fa-pencil" style={{marginLeft:'3px', color:'#fff'}}></i>
                </button>&nbsp;
                <button onClick={() =>HandleDeleteSemester(row.original.id)} style={{width:'30px', alignItems:'center', textAlign:'center', borderRadius: '3px',boxShadow: 'none',border: '1px solid transparent', background:'#dd4b39'}}>
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
                        <h3 className="box-title">Master Data</h3>
                        <div className="box-tools pull-right">
                            <button type="button" className="btn btn-box-tool" data-widget="collapse">
                                <i className="fa fa-minus"></i>
                            </button>
                        </div>
                        <div className="box-body">
                            <div className="mt-2 mb-4">
                                <button onClick={OpenCreateNewClassModal} type="button" className="btn btn-sm bg-blue btn-flat"><i className="fa fa-plus"></i> Add Data</button>
                                <div className="pull-right insiderBox" id="iz" style={{ display: "none" }}>
                                    <button id="delete__Btn" className="mr-4 btn btn-sm btn-danger btn-flat" type="button"><i className="fa fa-trash"></i> Delete</button>
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
                        <form method="post" onSubmit={HandleCreateNewSemester}>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <Form.Label htmlFor="ClassVal">Class:*</Form.Label>
                                        <Form.Select aria-label="ClassVal" name="ClassVal"  className={`form-control ${formErrors.ClassVal ? 'is-invalid' : ''}`} defaultValue={semester.ClassVal} onChange={(e)=>OnChangeClass(e)}>
                                            <option>-Select-</option>
                                            {apiData.map((classItem) => (
                                                <option key={classItem.id} value={classItem.id}>
                                                {classItem.title}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        {formErrors.ClassVal && <div className="invalid-feedback">{formErrors.ClassVal}</div>}
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12 col-xs-12">
                                    <Form.Label htmlFor="Semester:">Semester::*</Form.Label>
                                    <Form.Control type="text" name="Classname1" className={`form-control ${formErrors.Classname1 ? 'is-invalid' : ''}`} defaultValue={semester.Classname1} id="Classname1"  muted readOnly disabled="disabled"/>
                                    {formErrors.Classname1 && <div className="invalid-feedback">{formErrors.Classname1}</div>}            
                                </div>
                                <div className="col-md-6 col-sm-12 col-xs-12">
                                    <Form.Label htmlFor="Options">Select (1) Options:*</Form.Label>
                                     <Form.Select aria-label="classes" name="Classname2" className={`form-control ${formErrors.Classname2 ? 'is-invalid' : ''}`}  defaultValue={semester.Classname2} id="Classname2" onChange={(e)=>OnChangeClassOption(e)}>
                                        <option value="">--Select--</option>
                                        <option value="FIRST SEMESTER">FIRST SEMESTER</option>
                                        <option value="SECOND SEMESTER">SECOND SEMESTER</option>
                                    </Form.Select>
                                     {formErrors.Classname2 && <div className="invalid-feedback">{formErrors.Classname2}</div>}            
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    <Form.Label htmlFor="CombinedData">EXPECTED OUTPUT:*</Form.Label>
                                    <Form.Control type="text" name="CombinedData" id="CombinedData" className={`form-control ${formErrors.CombinedData ? 'is-invalid' : ''}`} defaultValue={semester.CombinedData} readOnly disabled/>
                                    {formErrors.CombinedData && <div className="invalid-feedback">{formErrors.CombinedData}</div>}
                                </div>
                            </div>
                        </form>   
                    </Modal.Body>                
                    <Modal.Footer>
                        <Button variant="primary" onClick={HandleCreateNewSemester}>Save Now</Button>
                    </Modal.Footer>
                </Modal>
                
                {showEditForm && (
                    <>
                    <Modal show={showEditModal} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form method="post" onSubmit={HandleSaveEditClassData}>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <Form.Label htmlFor="ClassVal">Class:*</Form.Label>
                                        <Form.Select aria-label="ClassVal" name="ClassVal"  className={`form-control ${formErrors.ClassVal ? 'is-invalid' : ''}`} defaultValue={semester.ClassVal} onChange={(e)=>OnChangeClass(e)}>
                                            <option>-Select-</option>
                                            {apiData.map((classItem) => (
                                                <option key={classItem.id} value={classItem.id}>
                                                {classItem.title}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        {formErrors.ClassVal && <div className="invalid-feedback">{formErrors.ClassVal}</div>}
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12 col-xs-12">
                                    <Form.Label htmlFor="Semester:">Semester::*</Form.Label>
                                    <Form.Control type="text" name="Classname1" className={`form-control ${formErrors.Classname1 ? 'is-invalid' : ''}`} defaultValue={semester.Classname1} id="Classname1"  muted readOnly disabled="disabled"/>
                                    {formErrors.Classname1 && <div className="invalid-feedback">{formErrors.Classname1}</div>}            
                                </div>
                                <div className="col-md-6 col-sm-12 col-xs-12">
                                    <Form.Label htmlFor="Options">Select (1) Options:*</Form.Label>
                                     <Form.Select aria-label="classes" name="Classname2" className={`form-control ${formErrors.Classname2 ? 'is-invalid' : ''}`}  defaultValue={semester.Classname2} id="Classname2" onChange={(e)=>OnChangeClassOption(e)}>
                                        <option value="">--Select--</option>
                                        <option value="FIRST SEMESTER">FIRST SEMESTER</option>
                                        <option value="SECOND SEMESTER">SECOND SEMESTER</option>
                                    </Form.Select>
                                     {formErrors.Classname2 && <div className="invalid-feedback">{formErrors.Classname2}</div>}            
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    <Form.Label htmlFor="CombinedData">EXPECTED OUTPUT:*</Form.Label>
                                    <Form.Control type="text" name="CombinedData" id="CombinedData" className={`form-control ${formErrors.CombinedData ? 'is-invalid' : ''}`} defaultValue={semester.CombinedData} readOnly disabled/>
                                    {formErrors.CombinedData && <div className="invalid-feedback">{formErrors.CombinedData}</div>}
                                </div>
                            </div>
                        </form>   
                    </Modal.Body>                
                    <Modal.Footer>
                        <Button variant="primary" onClick={HandleSaveEditClassData}>Save Now</Button>
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

export default SemesterList
