import "../../../assets/css/Login.css";
import { Link } from "react-router-dom";
import style from './Login.module.css';
import Footer from './../Footer/Footer';
import Header from './../Header/Header';
import { useEffect, useState } from 'react';
import WebServicesDriver from "../../../services/WebServices";
const Login = () => {

  const [formData, setFormData] = useState({
    matricnumber: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    matricnumber: '',
    password: '',
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    
    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };
  
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.matricnumber.trim()) {
      newErrors.matricnumber = 'Matric Number is required';
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();

    if (validateForm()) {
      await WebServicesDriver.auth(formData)
    }
  };
  useEffect(() => {
    document.title = 'Login Account';
  }, []);
  return (
    <>
      <div className={style.login_page}>
        <Header />
        <div className={style.container}>
          <h2>Application Login</h2>
        </div>
      <div className="mini-container login-widget"> 
        <div className="errormsgContainer error error-ico" style={{display:'none'}}></div>
        <form method="POST" className="form-group" onSubmit={handleSubmit} autoComplete="off">
          <div className="element">
            <label htmlFor="MatricNumber">Reference No / UTME No</label>
            <input name="matricnumber" id="MatricNumber" type="text"
            value={formData.matricnumber}
            onChange={handleChange}/>
            {errors.matricnumber && <small style={{ color: 'red', }}>{errors.matricnumber}</small>}
          </div>
          <div className="element">
                <label htmlFor="Password">Password <small>is Surname (small letter)</small></label>
              <input name="password" type="password" id="Password"
                autoComplete="off"
              value={formData.password}
              onChange={handleChange}/>
                {errors.password && <small style={{ color: 'red' }}>{errors.password}</small>}
          </div>
          <div className="element">
            <input type="submit" value="Login" className="btn btn-xs" style={{background:'#2383ad', height:'40px'}} />
          </div>
          <div className="element">
            <small>Note: Your default password is your surname in lowercase</small> 
          </div>
      </form>
        </div>
        <div className={style.Option_Contact}>
          <p>Contact the administrator <Link to={ '#' }>Support</Link></p>
        </div>
        <div className="clearfix"><br /><br /><br /><br /></div>
        <Footer/>
  </div>
    </>
  )
}

export default Login
