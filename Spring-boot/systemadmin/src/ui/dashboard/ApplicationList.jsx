/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */

import Nav from './components/Header/Nav/Nav';
import 'datatables.net-dt/css/jquery.dataTables.css'
import {  useEffect, useRef, useState } from 'react';
import ApiServices from "../../services/ApiServices";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import $ from 'jquery'
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ApplicationList = () => {

  const tableRef = useRef(null);
  const appRef = useRef(null)
  const categoryNameRef = useRef(null)
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [showAdditionalFields, setShowAdditionalFields] = useState(true);
  const [categoryData, setCatetoryData] = useState({
    id: '',
    categoryName:''
  });

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
  
  const setStatusToHidden = async(id) => {
    const response = await ApiServices.setCategoryStatusToHiiden(id);
    if (response == 200) {
      toast.success("Successfully Activate.");
      setTimeout(() => {
        window.location.reload(true);
      }, 1000);
    }else {
      toast.danger("Something went wrong.");
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Updating the studentData state with the edited value
    setCatetoryData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const setStatusToVisible = async(id) => {
    const response = await ApiServices.setCategoryStatusToVisible(id);
    if (response == 200) {
      toast.success("Successfully Disactivate.");
      setTimeout(() => {
        window.location.reload(true);
      }, 1000);
    } else {
      toast.danger("Something went wrong.");
    }
  }

  const HandleEditCategory = async(id) => {
    const response = await ApiServices.getCategorById(id);
    if (response.status == 200) {
      const data = response.data;
      setShowEditForm(true);
      setApiData(data);
      setCatetoryData({id:data.id, categoryName:data.categoryName})
      
    }
  }

  const HandleDeleteCategory = async (id) => {
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
            const response = await ApiServices.DeleteCategory(id)
            if (response == 204) {
              toast.success("Successfully Deleted.");
              //Swal.fire('Deleted!', 'Successfully Deleted.', 'success')
              setTimeout(() => {
                window.location.reload(true);
              }, 1000);
            } else {
              Swal.fire({
                "title": "Error",
                "text": "Something went wrong",
                "type": "error"
              });
            }
          }
        });
  }

  const handleSaveEdit = async (event) => {
    event.preventDefault()
    var categoryName = $('#categoryName').val();
    var id = $('#categoryId').val();
    if (categoryName ==null || categoryName =="") {
      $(".m-invalid").addClass('has-error');
      categoryNameRef.current.focus();
      $('.m-help-block').show().html("The field is required.");
      return false;
    } else {
      //save update
      const response = await ApiServices.UpdateCategory({ 'categoryName': categoryName, "id":id })
      if (response == 200) {
        toast.success("Update Successful.");
        // Swal.fire('Updateed!', 'Update Successful.', 'success')
        setTimeout(() => {
          window.location.reload(true);
        }, 1000);
      } else {
        $(".invalid").addClass('has-error');
        appRef.current.focus();
        $('.help-block').show().html("The field is required.");
        return false;
      }
    }
  }

  const handleCancelUpdate = async (event) => {
    event.preventDefault()
    setShowEditForm(false);
  }

  const handleAddNewCategory = async(event) => {
    event.preventDefault()
    var appname = $('#appname').val();
    
    if (appname ==null || appname =="") {
      $(".invalid").addClass('has-error');
      appRef.current.focus();
      $('.help-block').show().html("The field is required.");
      return false;
    } else {
      $(".invalid").removeClass('has-error');
      $('.help-block').hide();
      const response = await ApiServices.CreateNewCategory({ 'categoryName': appname })
      if (response == 201) {
        toast.success('New Category Added');
       // Swal.fire('Created!', 'New Category Added', 'success')
        setTimeout(() => {
          window.location.reload(true);
        }, 1000);
      } else {
        $(".invalid").addClass('has-error');
        appRef.current.focus();
        $('.help-block').show().html("The field is required.");
        return false;
      }
     
    }
  }

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await ApiServices.FetchAllCategories();
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
    // Cleanup when the component unmounts
    return () => {
      // Destroy DataTable to avoid memory leaks
      $(tableRef.current).DataTable().destroy(true);
    };
  }, []);

    
  var ColClass = "";
  var ColClass2 = "";
  if (showEditForm && showAdditionalFields) {
    ColClass = 'col-md-12';
    ColClass2 = 'col-md-12 mt-4';
  } else if (!showEditForm && showAdditionalFields) {
    ColClass = 'col-md-12'
    ColClass2 = 'col-md-12 mt-4';
  } else if (showEditForm && !showAdditionalFields)  {
    ColClass = 'col-md-8 ww-1'
    ColClass2 = 'col-md-4';
  } else {
    ColClass = 'col-md-12'
    ColClass2 = 'col-md-12';
  }
  const columns = [
    { header: 'S/N', accessorKey: 'id',Cell: ({ row }) => <div>{row.index + 1}</div> },
      {header: 'Status', accessorKey: 'status',
        Cell: ({ value, row }) => (
          <div>
            {!row.original.status ? (
              <button  onClick={() => setStatusToVisible(row.original.id)} className="btn btn-danger btn-xs" style={{height:'10%'}}><i className="fa fa-plus"></i>Activate visibility</button>
            ) : (
              <button onClick={() => setStatusToHidden(row.original.id)}  className="btn btn-default btn-xs" style={{height:'30px',padding:'5px'}}><i className="fa fa-minus"></i>Disactivate visibility</button>
            )}
          </div>
        ),
      },
    {accessorKey: "categoryName", header: "Category Name"},
    {accessorKey: 'parent', header: 'Parent'},
    {header: 'Actions', accessorKey: 'id',
    Cell: ({ value, row }) => (
    <div className="flex d-flex" style={{ display: 'flex' }}>
      <div className="text-center">
        <button onClick={() =>HandleEditCategory(row.original.id)} style={{width:'30px', alignItems:'center', textAlign:'center', borderRadius: '3px',boxShadow: 'none',border: '1px solid transparent', background:'#0073b7', }}>
          <i className="fa fa-pencil" style={{marginLeft:'3px', color:'#fff'}}></i>
        </button>&nbsp;
         <button onClick={() =>HandleDeleteCategory(row.original.id)} style={{width:'30px', alignItems:'center', textAlign:'center', borderRadius: '3px',boxShadow: 'none',border: '1px solid transparent', background:'#dd4b39'}}>
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
      {loading ? (
        <>
          <div className="spin" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
            <div className="custom-loader"></div>
          </div>
        </>
              
      ) : (
          <>
        <section className="content-header">
          <h1>Administrative <small>Category  Data</small></h1>
          <ol className="breadcrumb">
            <li><a href="#"><i className="fa fa-dashboard"></i> Dashboard</a></li>
            <li className="active">Administrative</li>
            <li className="active">Category  Data</li>
          </ol>
        </section>
        <section className="content container-fluid">
              <div className="box" >
            <div className="box-header with-border">
              <h3 className="box-title">Master Administration Data</h3>
              <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i></button>
              </div>
            </div>
            <div className="box-body">
              <div className="mt-2 mb-4">
                <a data-toggle="modal" href="#matkulId" style={{ textDecoration: "none" }}>
                  <button type="button" className="btn btn-sm bg-blue btn-flat">
                    <i className="fa fa-plus"></i> Add New Category 
                  </button>
                  </a>
                  <div className="pull-right insiderBox" id="iz" style={{ display: "none" }}>
                    <button id="delete__Btn" title="Delete This Professor" className="btn btn-sm btn-danger btn-flat" type="button"><i className="fa fa-trash"></i> Delete</button>
                    <button disabled="disabled" className="btn btn-sm" style={{ backgroundColor: '#000000', borderRadius: "25px" }}><span className="pull-left" id="deletebadge" style={{ color: "#fff" }}>Selected</span></button>
                  </div>
                </div>
                  {/* table */}
                  <div className={showAdditionalFields ? "":"d-flex" }>
                    <div className={ColClass}>
                      <MaterialReactTable table={table} />
                    </div>
                    {showEditForm && (
                      <>
                      <div className={ColClass2}>
                        <div className="card">
                          <div className="card-header">
                           <h6>Edit {apiData && <span>{apiData.categoryName} </span>} Category</h6> 
                          </div>
                          <div className="card-body">
                            <form method="post" autoComplete='off'>
                              <input type="number" name="categoryId" id="categoryId" value={categoryData.id}  className='form-control'  hidden/>
                              <div className="form-group m-invalid">
                                <label htmlFor="categoryName">Category Name: </label>
                                <input  ref={categoryNameRef} type="text" name="categoryName" id="categoryName" className="form-control" value={categoryData.categoryName} onChange={handleInputChange}/>
                                <small className="m-help-block" style={{color: '#dd4b39'}}></small>
                              </div>
                              <button type="submit" onClick={handleSaveEdit} className='btn btn-success pull-right'>Save Update</button>
                              <button type="button" onClick={handleCancelUpdate} className='btn btn-default'>Cancel Update</button>
                            </form>
                          </div>
                        </div>  
                      </div>
                      </>
                      )
                    }
                    
                  </div>
                </div>
            </div>
              {/* modal */}
              <div className="modal fade" id="matkulId" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Add New Data</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form method="post" >
                        <div className="form-group invalid">
                            <label htmlFor="appname">Category Name: </label>
                            <input  ref={appRef} type="text" name="appname" id="appname" className="form-control" />
                            <small className="help-block" style={{color: '#dd4b39'}}></small>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-xs btn-primary pull-right" onClick={handleAddNewCategory} style={{width:'150px',marginBottom: '0',marginLeft: '5px'}}>Save new category</button>
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

export default ApplicationList
