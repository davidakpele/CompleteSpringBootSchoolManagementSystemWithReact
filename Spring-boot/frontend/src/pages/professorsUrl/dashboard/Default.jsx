/* eslint-disable no-unused-vars */
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Link } from "react-router-dom"
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'select2';
import HeaderNav from './components/Header/Nav/HeaderNav';
import Aside from './components/Header/Menu/Aside';

const Default = () => {
  return (
    <>
      <ToastContainer />
      <HeaderNav />
      <Aside/>
      
    </>
  )
}

export default Default
