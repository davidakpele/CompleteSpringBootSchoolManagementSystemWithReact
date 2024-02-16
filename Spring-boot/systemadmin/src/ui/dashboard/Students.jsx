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
import $ from 'jquery';
import {useMemo, useEffect, useRef, useState } from 'react';
import ApiServices from "../../services/ApiServices";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Link } from "react-router-dom"
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import userP from '../../assets/images/admin.png'
const Students = () => {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await ApiServices.FetchAllStudents();
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
          text: 'You will not be able to recover this student record!',
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
            const processDelete = await ApiServices.DeleteStudents({ "id": boolx });
            if (processDelete ==200) {
              toast.success("Successful Deleted.");
              setTimeout(() => {
                window.location.reload(true);
              }, 1000);
            } else {
              toast.error("Somethin went wrong in process student delete.");
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
          text: 'You will not be able to recover this student record!',
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
            const processDelete = await ApiServices.DeleteStudents({ "id": StringData });
            if (processDelete ==200) {
              toast.success("Successful Deleted.");
              setTimeout(() => {
                window.location.reload(true);
              }, 1000);
            } else {
              toast.error("Somethin went wrong in process student delete.");
            }
          }
        }); 
    });
  }
  
  const columns = useMemo(
    () => [
        {
        id: "rowNumber",
        header: "S/N",
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
        accessorKey: "matricNumber",
        header: "Matric Number"
      },
      {
        accessorKey: "email",
        header: "Email",
        Cell: ({ row }) => (
          <>
            {row.original.records.map((record, index) => (
              <div key={index}>
                <div>{record.email}</div>
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
            <div className="d-flex">
              <Link to={`/student/edit/${row.original.id}`} className="btn btn-flat btn-default btn-sm btn-primary mr-2">  <span className="fa fa-edit text-default"></span>Edit</Link>
              <Link to={`/student/view/${row.original.id}`} className="btn btn-flat btn-sm btn-success ml-1 mr-1"><span className="fa fa-eye text-default"></span>View Record</Link>
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
                <Link to={"/student/add"}><button type="button" className="btn btn-sm bg-blue btn-flat"><i className="fa fa-plus"></i> Add Data</button></Link>
                <Link to={"student/import"} className="btn btn-sm btn-flat btn-success disabled ml-3"><i className="fa fa-upload"></i> Import</Link>
                  <div className="pull-right insiderBox" id="iz" style={{ display: "none" }}>
                    <button id="delete__Btn" title="Delete This Student" className="mr-4 btn btn-sm btn-danger btn-flat" type="button"><i className="fa fa-trash"></i> Delete</button>
                    <button disabled="disabled" className="btn btn-sm" style={{ backgroundColor: "#000000", borderRadius: "25px" }}><span className="pull-left" id="deletebadge" style={{ color: "#fff" }}>Selected</span></button>
                  </div>
                </div>
                <MaterialReactTable table={table} />
              </div>
          </div>  
        </div>
      </section>  
     
      </>
      )}
    </>
  )
}

export default Students
