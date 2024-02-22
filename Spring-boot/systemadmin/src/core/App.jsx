/* eslint-disable react/prop-types */

import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../ui/dashboard/Home'
import Students from '../ui/dashboard/Students';
import Login from '../ui/auth/Login';
import EditStudentDetails from './../ui/dashboard/EditStudentDetails';
import ViewStudentRecords from './../ui/dashboard/ViewStudentRecords';
import AddNewStudent from '../ui/dashboard/AddNewStudent';
import ApplicationList from '../ui/dashboard/ApplicationList';
import Faculties from './../ui/dashboard/Faculties';
import DepartmentList from './../ui/dashboard/DepartmentList';
import User from '../ui/dashboard/Profile/User';
import ProfessorsList from '../ui/dashboard/ProfessorsList';
import AddNewProfessor from '../ui/dashboard/AddNewProfessor';
import FileUploadForm from '../ui/dashboard/FileUploadForm';

const GetUserInfo = localStorage.getItem('appData');
// Parse the JSON string to an object
const ParseUserDataInfo = JSON.parse(GetUserInfo)
var setVerification, UserProperty;
// Check if the "app" property exists in the parsed object
const AuthUser = () => {
    if (ParseUserDataInfo && Object.prototype.hasOwnProperty.call(ParseUserDataInfo, 'user')) {
        // Access the "app" property
        UserProperty = ParseUserDataInfo.user;
        return UserProperty;
    } else {
        return null;
    }
}

let UserAuthContext = AuthUser();
setVerification = (UserAuthContext != null || UserAuthContext !== ""
    && UserAuthContext === 'user' || UserAuthContext === 'USER' ? "AUTHENTICATED_USER" :
    (UserAuthContext != null || UserAuthContext != "" && UserAuthContext == 'agent' || UserAuthContext == 'AGENT') ? "ACTIVATE_PRIVATE" : "ACTIVATE_PUBLIC");

const USER_TYPES = {
    PUBLIC: 'ACTIVATE_PUBLIC',
    AUTHENTICATED_USER: 'AUTHENTICATED_USER',
    AUTHENTICATION_USER_LOGIN:setVerification
}

const CURRENT_USER_TYPE = USER_TYPES.AUTHENTICATION_USER_LOGIN

const App = () => {
    return (
        <>
            <Routes>
                
                {/* <Route path='/auth/login' element={<PublicRoute><Login /></PublicRoute>}> </Route>
                <Route path='/auth/register' element={<PublicRoute><Register /></PublicRoute>}> </Route> */}
            
                {/*AUTHENTICATED routes for users  [Employee and Employer]*/}
                {/* <Route path='/chat/:id' element={<AUTHENTICATED_USER><Chat /></AUTHENTICATED_USER>}> </Route> */}
                <Route path='/' element={<AUTHENTICATED_USER><Home /></AUTHENTICATED_USER>}> </Route> 
                <Route path='*' element={<AUTHENTICATED_USER><Home /></AUTHENTICATED_USER>}> </Route>
                <Route path='/students' element={<AUTHENTICATED_USER><Students /></AUTHENTICATED_USER>}> </Route>
                <Route path='/student/edit/:id' element={<AUTHENTICATED_USER><EditStudentDetails /></AUTHENTICATED_USER>}> </Route>
                <Route path='/student/view/:id' element={<AUTHENTICATED_USER><ViewStudentRecords /></AUTHENTICATED_USER>}> </Route>
                <Route path='/student/add' element={<AUTHENTICATED_USER><AddNewStudent /></AUTHENTICATED_USER>}> </Route>
                <Route path='/application' element={<AUTHENTICATED_USER><ApplicationList /></AUTHENTICATED_USER>}> </Route>
                <Route path='/faculties' element={<AUTHENTICATED_USER><Faculties /></AUTHENTICATED_USER>}> </Route>
                <Route path='/department' element={<AUTHENTICATED_USER><DepartmentList /></AUTHENTICATED_USER>}> </Route>
                <Route path='/professors' element={<AUTHENTICATED_USER><ProfessorsList /></AUTHENTICATED_USER>}> </Route>
                <Route path='/users' element={<AUTHENTICATED_USER><User /></AUTHENTICATED_USER>}> </Route>
                <Route path='/professor/add_professor' element={<AUTHENTICATED_USER><AddNewProfessor /></AUTHENTICATED_USER>}> </Route>
                <Route path='/file' element={<AUTHENTICATED_USER><FileUploadForm /></AUTHENTICATED_USER>}> </Route>
                
                <Route path='/auth/login' element={<PublicRoute><Login /></PublicRoute>}> </Route>
            </Routes>
        </>
    )
}


function PublicRoute({ children }) {
    if (CURRENT_USER_TYPE == USER_TYPES.PUBLIC || CURRENT_USER_TYPE == USER_TYPES.USERS_BASE) {
        return <>
            {children}
        </>
    } else {

        return <Navigate to={'/'}/>
    }
}



function AUTHENTICATED_USER({ children }) {
     if (CURRENT_USER_TYPE == USER_TYPES.AUTHENTICATED_USER) {
        return <>
            {children}
        </>
    } else {
        return <Navigate to={'../auth/login'}/>
    }
}


export default App