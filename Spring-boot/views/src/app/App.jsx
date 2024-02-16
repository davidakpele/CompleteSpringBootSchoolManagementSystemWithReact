/* eslint-disable react/prop-types */

import { Navigate, Route, Routes } from 'react-router-dom';
import Default from '../ui/Default';
import ProgrammeEntryRequirements from '../ui/components/ProgrammeEntryRequirements/ProgrammeEntryRequirements';
import StudentLogin from '../ui/components/StudentAuthentication/Login';
import Payment from '../ui/components/InitialPaymentPortal/initialPayment';
import StudentRegistration from '../ui/components/StudentAuthentication/Register';


const GetUserInfo = localStorage.getItem('appData');
// Parse the JSON string to an object
const ParseUserDataInfo = JSON.parse(GetUserInfo)
var setVerification, UserProperty;
// Check if the "app" property exists in the parsed object
const AuthUser = () => {
    if (ParseUserDataInfo && Object.prototype.hasOwnProperty.call(ParseUserDataInfo, 'app')) {
        // Access the "app" property
        UserProperty = ParseUserDataInfo.user;
        return UserProperty;
    } else {
        return null;
    }
}

let UserAuthContext = AuthUser();
setVerification = (UserAuthContext != null || UserAuthContext !== "" && UserAuthContext === 'user' || UserAuthContext === 'USER' ? "AUTHENTICATED_USER" : (UserAuthContext != null || UserAuthContext != "" && UserAuthContext == 'agent' || UserAuthContext == 'AGENT') ? "ACTIVATE_PRIVATE" : "ACTIVATE_PUBLIC");

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
                {/* Public routes */}
                
                {/* <Route path='/auth/login' element={<PublicRoute><Login /></PublicRoute>}> </Route>
                <Route path='/auth/register' element={<PublicRoute><Register /></PublicRoute>}> </Route> */}
            
                {/*AUTHENTICATED routes for users  [Employee and Employer]*/}
                {/* <Route path='/chat/:id' element={<AUTHENTICATED_USER><Chat /></AUTHENTICATED_USER>}> </Route>
                <Route path='/find_friends' element={<AUTHENTICATED_USER><Find_Friends /></AUTHENTICATED_USER>}> </Route> */}
                <Route path='/programmeEntryRequirements' element={<PublicRoute><ProgrammeEntryRequirements /></PublicRoute>}> </Route>
                <Route path='/login' element={<PublicRoute><StudentLogin /></PublicRoute>}> </Route>
                <Route path='/register' element={<PublicRoute><StudentRegistration /></PublicRoute>}> </Route>
                <Route path='/initialPayment' element={<PublicRoute><Payment /></PublicRoute>}> </Route>
                <Route path='*' element={<PublicRoute><Default /></PublicRoute>}> </Route>
                <Route path='/' element={<PublicRoute><Default /></PublicRoute>}></Route>
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



// function AUTHENTICATED_USER({ children }) {
//      if (CURRENT_USER_TYPE == USER_TYPES.AUTHENTICATED_USER) {
//         return <>
//             {children}
//         </>
//     } else {
//         return <Navigate to={'../auth/login'}/>
//     }
// }


export default App