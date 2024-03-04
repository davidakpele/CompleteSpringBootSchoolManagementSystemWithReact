import Nav from "./components/Header/Nav/NavScroll"
import '../../../assets/css/admin/assets/dist/css/AdminLTE.min.css'
import { Link } from "react-router-dom"
import StudentImg from '../../../assets/img/student.png'
import ProfessorImg from '../../../assets/img/Professor.png'
import AdmininstratorImg from '../../../assets/img/admin.png'
import ApplicationImg from '../../../assets/img/app.png'
import FacultiesImg from '../../../assets/img/ft.png'
import DepartmentImg from '../../../assets/img/dp.png'
import CourseImg from '../../../assets/img/cs.png'
import DataAnalysis from '../../../assets/img/piedata.png'
import ExaminationImg from '../../../assets/img/exam.png'
import SettingsImg from '../../../assets/img/setting.png'
import { useEffect, useState } from 'react';
import ApiServices from "../../../services/ApiServices"
const AdminIndex = () => {
    const [apiData, setApiData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
    // Fetch data from your API and set it in the state
    const fetchData = async () => {
      try {
        const response = await ApiServices.getAllCounter();
        
        setApiData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Nav />
          {loading ? (
              <>
                <div className="spin" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="custom-loader"></div>  
                </div>
              </>
              
          ) : (
                <>
                
             <section className="content container-fluid" style={{background:'#fff'}}>		
                <div className="row">
                <div className="col-lg-3 col-xs-6">
                    <div className="small-box" style={{ backgroundColor:'#483D8B', color: '#fff' }}>
                        <div className="inner">
                        <span style={{color:'#fff !important', fontWeight:'bold', fontSize:'38px'}}>{apiData?.data?.StudentList}</span>
                        <p>Student</p>
                        </div>
                        <div className="icon">
                        <i className="">
                            <img src={StudentImg} alt="" style={{ maxWidth: '90px' }} />
                        </i>
                        </div>
                        <Link to={"/admin/students"} className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></Link>
                    </div>
                </div>
                <div className="col-lg-3 col-xs-6">
                    <div className="small-box bg-maroon">
                        <div className="inner">
                            <span style={{color:'#fff !important', fontWeight:'bold', fontSize:'38px'}}>{apiData?.data?.LecturerList}</span>
                            <p>Lecturer</p>
                        </div>
                        <div className="icon">
                            <img src={ProfessorImg} alt="" style={{ maxWidth: '90px' }}/>        
                        </div>
                        <Link to={'/admin/professors'} className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></Link>
                    </div>
                </div>
                <div className="col-lg-3 col-xs-6">
                    <div className="small-box bg-navy">
                        <div className="inner">
                           <span style={{color:'#fff !important', fontWeight:'bold', fontSize:'38px'}}>{apiData?.data?.UsersList}</span>
                            <p>Administrators</p>
                        </div>
                        <div className="icon">
                            <img src={AdmininstratorImg} alt="" style={{ maxWidth: '90px' }}/>
                        </div>
                        <Link to={'/admin/users'} className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></Link>
                    </div>
                </div>
                <div className="col-lg-3 col-xs-6">
                    <div className="small-box bg-blue">
                        <div className="inner">
                           <span style={{color:'#fff !important', fontWeight:'bold', fontSize:'38px'}}>{apiData?.data?.CategoryList}</span>
                            <p>Application</p>
                        </div>
                        <div className="icon">
                            <img src={ApplicationImg} alt="" style={{ maxWidth: '90px' }}/>
                        </div>
                        <Link to={"/admin/application"} className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i> </Link>
                    </div>
                </div>
                <div className="col-lg-3 col-xs-6">
                    <div className="small-box" style={{backgroundColor:'#8B008B', color:'#fff'}}>
                        <div className="inner">
                           <span style={{color:'#fff !important', fontWeight:'bold', fontSize:'38px'}}>{apiData?.data?.FacultyList}</span>
                            <p>Faculties</p>
                        </div>
                        <div className="icon">
                            <img src={FacultiesImg} alt="" style={{ maxWidth: '90px' }}/>
                        </div>
                        <Link to={"/admin/faculties"} className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></Link>
                    </div>
                </div>
                <div className="col-lg-3 col-xs-6">
                    <div className="small-box" style={{backgroundColor:'#B22222', color:'#fff'}}>
                        <div className="inner">
                           <span style={{color:'#fff !important', fontWeight:'bold', fontSize:'38px'}}>{apiData?.data?.DepartmentList}</span>
                            <p>Departments</p>
                        </div>
                        <div className="icon">
                            <img src={DepartmentImg} alt="" style={{ maxWidth: '90px' }}/>
                        </div>
                        <Link to={"/admin/department"} className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></Link>
                    </div>
                </div>
                <div className="col-lg-3 col-xs-6">
                    <div className="small-box bg-yellow">
                        <div className="inner">
                            <span style={{color:'#fff !important', fontWeight:'bold', fontSize:'38px'}}>151</span>
                            <p>Courses</p>
                        </div>
                        <div className="icon">
                            <img src={CourseImg} alt="" style={{ maxWidth: '90px' }}/>
                        </div>
                        <Link to={"/admin/courses"} className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></Link>
                    </div>
                </div>
                <div className="col-lg-3 col-xs-6">
                    <div className="small-box bg-purple">
                        <div className="inner">
                            <span style={{color:'#fff !important', fontWeight:'bold', fontSize:'38px'}}><br/></span>
                            <p>Data Analysis</p>
                        </div>
                        <div className="icon">
                            <img src={DataAnalysis} alt="" style={{ maxWidth: '90px' }}/>
                        </div>
                        <Link to={"/admin/analysis"} className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></Link>
                    </div>
                </div>
                    <div className="col-lg-3 col-xs-6">
                        <div className="small-box bg-orange">
                            <div className="inner">
                            <h3><br/></h3>
                            <p>Exam view</p>
                        </div>
                    <div className="icon">
                    <img src={ExaminationImg} alt="" style={{ maxWidth: '90px' }}/>
                    </div>
                    <Link to={"/admin/exam"} className="small-box-footer">
                        More info <i className="fa fa-arrow-circle-right"></i>
                    </Link>
                    </div>
                </div>

                <div className="col-lg-3 col-xs-6">
                    <div className="small-box bg-aqua">
                    <div className="inner">
                        <h3><br/></h3>
                        <p>System Users</p>
                    </div>
                    <div className="icon">
                        <img src={SettingsImg} alt="" style={{ maxWidth: '90px' }}/>
                    </div>
                    <Link to={'/users'} className="small-box-footer">
                        More info <i className="fa fa-arrow-circle-right"></i>
                    </Link>
                    </div>
                </div>
                </div>
			</section>
                </>
          )}
          
    </>
  )
}

export default AdminIndex
