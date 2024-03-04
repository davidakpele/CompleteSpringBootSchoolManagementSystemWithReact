
const SideBar = () => {
  return (
    <>
      <aside className="main-sidebar">
            <section className="sidebar">
                <div className="user-panel">
    <div className="pull-left image">
        <img src="http://localhost/Student/public/assets/assets/img/dp.jpg" className="img-circle" alt="User Image"/>
    </div>
    <div className="pull-left info">
        <p>Administrator</p>
        <small>Admin</small>
    </div>
</div> 		
                <ul className="sidebar-menu tree" data-widget="tree">
    <li className="header">MAIN MENU</li>
        <li className="active">
            <a href="http://localhost/Student/Admin/dashboard">
                <i className="fa fa-dashboard"></i> 
                <span>Dashboard</span>
            </a>
        </li>
        <li className="">
            <a href="http://localhost/Student/Admin/Application">
                <i className="fa fa-bars"></i> 
                <span>Program</span>
            </a>
        </li>
        <li className="">
            <a href="http://localhost/Student/Admin/Faculties">
                <i className="fa fa-bars"></i>
                <span>Faculties</span>
            </a>
        </li>
        <li className="">
            <a href="http://localhost/Student/Admin/Department">
                <i className="fa fa-bars"></i>
                <span>Departments</span>
            </a>
        </li>
        <li className="">
            <a href="http://localhost/Student/Admin/Professors">
                <i className="fa fa-bars"></i>
                <span>Lecturers</span>
            </a>
        </li>
        <li className="">
            <a href="http://localhost/Student/Admin/Students">
                <i className="fa fa-bars"></i>
                <span>Students</span>
            </a>
        </li>
        <li className="">
            <a href="http://localhost/Student/Admin/Class">
                <i className="fa fa-bars"></i>
                <span>Classes</span>
            </a>
        </li>
        <li className="">
            <a href="http://localhost/Student/Admin/Semester">
                <i className="fa fa-bars"></i>
                <span>Semesters</span>
            </a>
        </li>
        <li className="">
            <a href="http://localhost/Student/Admin/Courses">
                <i className="fa fa-bars"></i>
                <span>Courses</span>
            </a>
        </li>
        <li className="">
            <a href="http://localhost/Student/Admin/courses_subjects">
                <i className="fa fa-bars"></i>
                <span>Subjects</span>
            </a>
        </li> 
        <li className="treeview ">
            <a href="#"><i className="fa fa-book"></i> <span>Manage Exam</span>
                <span className="pull-right-container">
                    <i className="fa fa-angle-left pull-right"></i>
                </span>
            </a>
            <ul className="treeview-menu">
                <li className="">
                    <a href="http://localhost/Student/Admin/exam">
                        <i className="fa fa-bars"></i>
                        Exam Settings
                    </a>
                </li>
                <li className="">
                    <a href="http://localhost/Student/Admin/payment_record">
                        <i className="fa fa-bars"></i>
                        Student Payment Records
                    </a>
                </li>
            </ul>
        </li>
            <li className="header">ADMINISTRATOR</li>
                <li className="">
                    <a href="http://localhost/Student/Admin/users" rel="noopener noreferrer">
                        <i className="fa fa-users"></i> <span>User Management</span>
                    </a>
                </li>
                <li className="">
                    <a href="http://localhost/Student/Admin/settings?action=role" rel="noopener noreferrer">
                        <i className="fa fa-cogs"></i> <span>Settings</span>
                    </a>
                </li>
            
        
    </ul>
            </section>
        </aside>
    </>
  )
}

export default SideBar
