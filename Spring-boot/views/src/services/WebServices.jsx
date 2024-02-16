/* eslint-disable no-unused-vars */
import  { Component } from 'react';
import api from "../api/axios";
import $ from 'jquery'

class Services extends Component{
    
    FetechFacultiesBaseOnSelectedApplicationId = async ({ ...data }) => {
        const id = data.id;
        try {
           const result = await api.get("/api/v1/collections/getfaculties/" + id)
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    FetechProgramsBaseOnSelectedApplicationId = async ({ ...data }) => {
        const id = data.id;
        try {
           const response = await api.get("/api/v1/collections/getprograms/" + id)
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    FetechEntryLevelBaseOnSelectedApplicationId = async ({ ...data }) => {
        const id = data.id;
        try {
           const response = await api.get("/api/v1/collections/getentrylevels/" + id)
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    FetechDepartmentBaseOnSelectedApplicationId = async ({ ...data }) => {
        const id = data.id;
        try {
           const response = await api.get("/api/v1/collections/getdepartments/" + id)
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    saveRegistration = async ({ ...data }) => {
        try {
            await api.post("/auth/register",JSON.stringify(data.data),{
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', 
            }).then((result) => {
                if (result.status == 200) {
                    $('#AppRegistration').hide();
                    $('.errormsgContainer').hide();
                    $('.msgSuccess').empty();
                    $('.msgSuccess').html(result.data.message+"<br/><br/><span> Click here to verify short way,<br/><br/> <a href='"+result.data.verificationLink+"' class='btn btn-sm buttonResendEmail' target='_blank'>Verify Now</a></span>")
                    $('#messagediv').show()
                }
            }).catch((error) => {
                $('#messagediv').hide()
                $('.msgSuccess').empty();
                $('.error').show()
                $('.errormsgContainer').html(error.response.data.error);
            })
        } catch (error) {
            console.log(error);
        }
    }

    auth = async ({ ...data }) => {
       try {
            await api.post("/auth/login",JSON.stringify(data),{
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', 
            }).then((result) => {
                if (result.status == 200) {
                    $('.error').show()
                    $('.errormsgContainer').hide()
                    // set the user as logged in and store the token in local storage
                    const token  =  result.data.token;
                    const name = result.data.name;
                    const uid = result.data.id;
                // Apply setCookie
               this.setCookie('jwt', token, 30);
                this.setAppDataToLocalStorage(token, name, uid)
                    setTimeout(function () {
                        window.location.replace("/");
                    }, 0);
                }
            }).catch((error) => {
                $('.error').show()
                $('.errormsgContainer').html(error.response.data.error);
            })
        } catch (error) {
           console.error('Authentication failed', error);
        }
    }

    setCookie=(cName, cValue, expDays)=> {
        let date = new Date();
        date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
    }

    setAppDataToLocalStorage = (token, name, uid) => {
        // Set an item in localStorage
        sessionStorage.setItem('jwt', token);
        const appData = {
            "user": {
                "id": uid,
                "authUser": name,
                "_jwt_": {
                    "iot_pack": token,
                }
            },
        };
         // Convert the object to a JSON string
        const appDataString = JSON.stringify(appData);
      // Store the string in localStorage
      localStorage.setItem('appData', appDataString);
      localStorage.setItem('jwt', token);
      sessionStorage.setItem('application_', appDataString)
    }

    clearCookie = (name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    };

    logout = async () => {
        api.get("auth/logout",)
        .then((success) => {
            window.location = '/';  
            localStorage.clear();
            sessionStorage.clear();
            this.clearCookie('jwt');
            if ($.cookie("jwt") != null) {
                $.cookie("jwt", null, { path: '/' });
                $.removeCookie('jwt', { path: '/' });
            }
        }).catch((error) => {
            console.log(error);
        })
    }
}

export default new Services();