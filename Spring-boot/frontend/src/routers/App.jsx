/* eslint-disable react/prop-types */

import { Navigate, Route, Routes } from 'react-router-dom';
import Default from '../pages/Default';
import ProgrammeEntryRequirements from '../pages/ProgrammeEntryRequirements/ProgrammeEntryRequirements';
import StudentLogin from '../pages/StudentAuthentication/Login';
import Payment from '../pages/InitialPaymentPortal/initialPayment';
import StudentRegistration from '../pages/StudentAuthentication/Register';
//Admin url manager
import AdminLoginPage from '../pages/adminUrl/auth/Login';
import ProfessorsList from '../pages/adminUrl/dashboard/ProfessorsList';
import AdminDefaultHomePage from '../pages/adminUrl/dashboard/Default';
import Students from '../pages/adminUrl/dashboard/Students';
import ViewStudentRecords from '../pages/adminUrl/dashboard/ViewStudentRecords';
import ApplicationList from '../pages/adminUrl/dashboard/ApplicationList';
import Faculties from '../pages/adminUrl/dashboard/Faculties';
import DepartmentList from '../pages/adminUrl/dashboard/DepartmentList';
import AdminUserList from '../pages/adminUrl/dashboard/Profile/User';
import ClassList from '../pages/adminUrl/dashboard/ClassList';
import SemesterList from '../pages/adminUrl/dashboard/SemesterList';
import CourseList from '../pages/adminUrl/dashboard/CourseList';
import SubjectList from './../pages/adminUrl/dashboard/SubjectList';
import UserList from './../pages/adminUrl/dashboard/UserList';

const GetUserInfo = localStorage.getItem('appData');
// Parse the JSON string to an object
const ParseUserDataInfo = JSON.parse(GetUserInfo)
var setVerification, UserProperty;
// Check if the "app" property exists in the parsed object
const AuthUser = () => {
    if (ParseUserDataInfo && Object.prototype.hasOwnProperty.call(ParseUserDataInfo, 'user')) {
        // Access the "app" property
        UserProperty = ParseUserDataInfo.user.person;
        return UserProperty;
    } else {
        return null;
    }
}

let UserAuthContext = AuthUser();
setVerification = (
  (UserAuthContext != null && UserAuthContext !== "" && (UserAuthContext.toLowerCase() === 'student' || UserAuthContext.toUpperCase() === 'STUDENT' || UserAuthContext.toUpperCase() ==='Student')) ? 
    "STUDENT_PASS" :
  (UserAuthContext != null && UserAuthContext !== "" && (UserAuthContext.toLowerCase() === 'professor' || UserAuthContext.toUpperCase() === 'PROFESSOR' || UserAuthContext.toUpperCase() ==='Professor')) ? 
    "PROFESSOR_PASS" :
  (UserAuthContext != null && UserAuthContext !== "" && (UserAuthContext.toLowerCase() === 'administrator' || UserAuthContext.toUpperCase() === 'ADMINISTRATOR' || UserAuthContext.toUpperCase() ===  'Administrator' )) ? 
    "USER_ZERO" :
  "ACTIVATE_PUBLIC"
);

const USER_TYPES = {
    PUBLIC: 'ACTIVATE_PUBLIC',
    STUDENT_AUTHENTICATION: 'STUDENT_PASS',
    PROFESSOR_AUTHENTICATION: 'PROFESSOR_PASS',
    AUTHENTICATED_USER: 'USER_ZERO',
    AUTHENTICATION_USER_LOGIN:setVerification
}

const CURRENT_USER_TYPE = USER_TYPES.AUTHENTICATION_USER_LOGIN

const App = () => {
    return (
        <>
            <Routes>
                {/* Public routes */}
          
                {/*AUTHENTICATED routes for users  [Employee and Employer]*/}
                <Route path='/admin/' element={<AUTHENTICATED_USER><AdminDefaultHomePage /></AUTHENTICATED_USER>}> </Route>
                <Route path='/admin/students' element={<AUTHENTICATED_USER><Students /></AUTHENTICATED_USER>}> </Route>
                <Route path='/admin/student/view/:id' element={<AUTHENTICATED_USER><ViewStudentRecords /></AUTHENTICATED_USER>}> </Route>
                <Route path='/admin/application' element={<AUTHENTICATED_USER><ApplicationList /></AUTHENTICATED_USER>}> </Route>
                <Route path='/admin/faculties' element={<AUTHENTICATED_USER><Faculties /></AUTHENTICATED_USER>}> </Route>
                <Route path='/admin/department' element={<AUTHENTICATED_USER><DepartmentList /></AUTHENTICATED_USER>}> </Route>
                <Route path='/admin/class' element={<AUTHENTICATED_USER><ClassList /></AUTHENTICATED_USER>}> </Route>
                <Route path='/admin/semester' element={<AUTHENTICATED_USER><SemesterList /></AUTHENTICATED_USER>}> </Route>
                <Route path='/admin/course' element={<AUTHENTICATED_USER><CourseList /></AUTHENTICATED_USER>}> </Route>
                <Route path='/admin/subject' element={<AUTHENTICATED_USER><SubjectList /></AUTHENTICATED_USER>}> </Route>
                <Route path='/admin/professors' element={<AUTHENTICATED_USER><ProfessorsList /></AUTHENTICATED_USER>}> </Route>
                <Route path='/admin/users/:id' element={<AUTHENTICATED_USER><AdminUserList /></AUTHENTICATED_USER>}> </Route>
                <Route path='/admin/user/list' element={<AUTHENTICATED_USER><UserList /></AUTHENTICATED_USER>}> </Route>
            
                {/* Authenticated Public */}
                <Route path='/programmeEntryRequirements' element={<AUTHENTICATED_PUBLIC><ProgrammeEntryRequirements /></AUTHENTICATED_PUBLIC>}> </Route>
                <Route path='/initialPayment' element={<AUTHENTICATED_PUBLIC><Payment /></AUTHENTICATED_PUBLIC>}> </Route>
                <Route path='*' element={<AUTHENTICATED_PUBLIC><Default /></AUTHENTICATED_PUBLIC>}> </Route>
                <Route path='/' element={<AUTHENTICATED_PUBLIC><Default /></AUTHENTICATED_PUBLIC>}></Route>
                <Route path='/login' element={<AUTHENTICATED_PUBLIC><StudentLogin /></AUTHENTICATED_PUBLIC>}> </Route>
                <Route path='/register' element={<AUTHENTICATED_PUBLIC><StudentRegistration /></AUTHENTICATED_PUBLIC>}> </Route>
                {/* Public urls */}
             
                <Route path='/admin/auth/login' element={<PublicRoute><AdminLoginPage /></PublicRoute>}> </Route>
                
            </Routes>
        </>
    )
}

function AUTHENTICATED_PUBLIC({ children }) {
    if (CURRENT_USER_TYPE == USER_TYPES.PUBLIC || CURRENT_USER_TYPE == USER_TYPES.PROFESSOR_AUTHENTICATION || CURRENT_USER_TYPE == USER_TYPES.STUDENT_AUTHENTICATION || CURRENT_USER_TYPE == USER_TYPES.AUTHENTICATED_USER) {
        return <>
            {children}
        </>
    } else {
        return <Navigate to={'/'}/>
    }
}
function PublicRoute({ children }) {
    if (CURRENT_USER_TYPE == USER_TYPES.PUBLIC) {
        return <>
            {children}
        </>
    } else {
        return <Navigate to={'/'}/>
    }
}

// function StudentRoute({children}) {
//     if (CURRENT_USER_TYPE == USER_TYPES.STUDENT_AUTHENTICATION) {
//         return <>
//             {children}
//         </>
//     } else { 
//         //
//     }
// }
// function ProfessorRoute({ children }) {
//     if (CURRENT_USER_TYPE == USER_TYPES.PROFESSOR_AUTHENTICATION) {
//         return <>
//             {children}
//         </>
//     } else { 
//         //
//     }
// }



function AUTHENTICATED_USER({ children }) {
     if (CURRENT_USER_TYPE == USER_TYPES.AUTHENTICATED_USER) {
        return <>
            {children}
        </>
     } else {
        const currentPath = window.location.pathname;
         if (currentPath == '/admin/login') {
            return <Navigate to={'../admin/auth/login'}/>
         } else if (currentPath == '/professor/login') {
            return <Navigate to={'../professor/auth/login'}/>
         } else if (currentPath == '/student/login') {
            return <Navigate to={'../auth/login'}/>
         } else {
            return <Navigate to={'/'}/>
         }
    }
}


export default App