import Nav from "./components/Header/Nav/Nav"
import '../../assets/css/admin/assets/dist/css/AdminLTE.min.css'
import { Link } from "react-router-dom"
import StudentImg from '../../assets/images/student.png'
import ProfessorImg from '../../assets/images/Professor.png'
import AdmininstratorImg from '../../assets/images/admin.png'
import ApplicationImg from '../../assets/images/app.png'
import FacultiesImg from '../../assets/images/ft.png'
import DepartmentImg from '../../assets/images/dp.png'
import CourseImg from '../../assets/images/cs.png'
import DataAnalysis from '../../assets/images/piedata.png'
import ExaminationImg from '../../assets/images/exam.png'
import SettingsImg from '../../assets/images/setting.png'
import { useEffect, useState } from 'react';
import ApiServices from "../../services/ApiServices"
const Home = () => {
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
                        <h3>{apiData?.data?.StudentList}</h3>
                        <p>Student</p>
                        </div>
                        <div className="icon">
                        <i className="">
                            <img src={StudentImg} 
                            alt="" style={{ maxWidth: '90px' }} />
                        </i>
                        </div>
                        <Link to={"/students"} className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></Link>
                    </div>
                </div>
                <div className="col-lg-3 col-xs-6">
                    <div className="small-box bg-maroon">
                        <div className="inner">
                            <h3>{apiData?.data?.LecturerList}</h3>
                            <p>Lecturer</p>
                        </div>
                        <div className="icon">
                            <img src={ProfessorImg} alt="" style={{ maxWidth: '90px' }}/>        
                        </div>
                        <Link to={'/professors'} className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></Link>
                    </div>
                </div>
                <div className="col-lg-3 col-xs-6">
                    <div className="small-box bg-navy">
                        <div className="inner">
                            <h3>{apiData?.data?.UsersList}</h3>
                            <p>Administrators</p>
                        </div>
                        <div className="icon">
                            <img src={AdmininstratorImg} alt="" style={{ maxWidth: '90px' }}/>
                        </div>
                        <Link to={'/users'} className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></Link>
                    </div>
                </div>
                <div className="col-lg-3 col-xs-6">
                    <div className="small-box bg-blue">
                        <div className="inner">
                            <h3>{apiData?.data?.CategoryList}</h3>
                            <p>Application</p>
                        </div>
                        <div className="icon">
                            <img src={ApplicationImg} alt="" style={{ maxWidth: '90px' }}/>
                        </div>
                        <Link to={"/application"} className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i> </Link>
                    </div>
                </div>
                <div className="col-lg-3 col-xs-6">
                    <div className="small-box" style={{backgroundColor:'#8B008B', color:'#fff'}}>
                        <div className="inner">
                            <h3>{apiData?.data?.FacultyList}</h3>
                            <p>Faculties</p>
                        </div>
                        <div className="icon">
                            <img src={FacultiesImg} alt="" style={{ maxWidth: '90px' }}/>
                        </div>
                        <Link to={"/faculties"} className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></Link>
                    </div>
                </div>
                <div className="col-lg-3 col-xs-6">
                    <div className="small-box" style={{backgroundColor:'#B22222', color:'#fff'}}>
                        <div className="inner">
                            <h3>{apiData?.data?.DepartmentList}</h3>
                            <p>Departments</p>
                        </div>
                        <div className="icon">
                            <img src={DepartmentImg} alt="" style={{ maxWidth: '90px' }}/>
                        </div>
                        <Link to={"/department"} className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></Link>
                    </div>
                </div>
                <div className="col-lg-3 col-xs-6">
                    <div className="small-box bg-yellow">
                        <div className="inner">
                            <h3>151</h3>
                            <p>Courses</p>
                        </div>
                        <div className="icon">
                            <img src={CourseImg} alt="" style={{ maxWidth: '90px' }}/>
                        </div>
                        <Link to={"courses"} className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></Link>
                    </div>
                </div>
                <div className="col-lg-3 col-xs-6">
                    <div className="small-box bg-purple">
                        <div className="inner">
                            <h3><br/></h3>
                            <p>Data Analysis</p>
                        </div>
                        <div className="icon">
                            <img src={DataAnalysis} alt="" style={{ maxWidth: '90px' }}/>
                        </div>
                        <Link to={"/analysis"} className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></Link>
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
                    <Link to={"/exam"} className="small-box-footer">
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

export default Home
