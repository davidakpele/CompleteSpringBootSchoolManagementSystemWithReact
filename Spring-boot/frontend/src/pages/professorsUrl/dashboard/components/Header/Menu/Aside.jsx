import { Link } from "react-router-dom"

const Aside = () => {
  return (
    <>
      <aside className="main-sidebar sidebar-dark-primary bg-navy elevation-4 sidebar-no-expand">
      <Link to={'/admin'} className="brand-link bg-primary text-sm">
        <img src="http://localhost/purchase_order/uploads/1631064180_sample_compaby_logo.jpg" alt="Store Logo" className="brand-image img-circle elevation-3" style={{ width: "1.7rem", height: " 1.7rem", maxHeight: "unset" }} />
      <span className="brand-text font-weight-light">POMS-PHP</span>
      </Link>
      <div className="sidebar os-host os-theme-light os-host-overflow os-host-overflow-y os-host-resize-disabled os-host-transition os-host-scrollbar-horizontal-hidden">
        <div className="os-resize-observer-host observed">
          <div className="os-resize-observer" style={{ left: "0px", right: "auto" }}></div>
        </div>
        <div className="os-size-auto-observer observed" style={{height: "calc(100% + 1px)", float: "left"}}>
          <div className="os-resize-observer"></div>
        </div>
        <div className="os-content-glue" style={{ margin: " 0px -8px", width: "249px", height: "646px" }}></div>
        <div className="os-padding">
          <div className="os-viewport os-viewport-native-scrollbars-invisible" style={{overflowY: "scroll"}}>
            <div className="os-content" style={{padding:"0px 8px",  height:"100%", width: "100%"}}>
              <div className="clearfix"></div>
              <nav className="mt-4">
                  <ul className="nav nav-pills nav-sidebar flex-column text-sm nav-compact nav-flat nav-child-indent nav-collapse-hide-child" data-widget="treeview" role="menu" data-accordion="false">
                  <li className="nav-item dropdown">
                    <Link to={'/admin'} className="nav-link nav-home">
                      <i className="nav-icon fas fa-tachometer-alt"></i>
                      <p>Dashboard</p>
                    </Link>
                  </li> 
                  <li className="nav-item dropdown">
                    <Link to={'/admin/professors'} className="nav-link nav-suppliers">
                      <i className="nav-icon fas fa-truck-loading"></i>
                      <p>Professors</p>
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link to={'/admin/students'} className="nav-link nav-items">
                      <i className="nav-icon fas fa-boxes"></i>
                      <p>Students</p>
                    </Link>
                  </li>
                 
                 <li className="nav-header text-center">Maintenance</li>
                 <li className="nav-item dropdown">
                   <Link to={'/admin/application'} className="nav-link nav-purchase_orders">
                      <i className="nav-icon fas fa-file-invoice"></i>
                      <p>Category</p>
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link to={'/admin/faculties'} className="nav-link nav-user_list">
                      <i className="nav-icon fas fa-users"></i>
                      <p>Faculty</p>
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link to={'/admin/department'} className="nav-link nav-system_info">
                      <i className="nav-icon fas fa-cogs"></i>
                      <p>Department</p>
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link to={'/admin/class'} className="nav-link nav-system_info">
                      <i className="nav-icon fas fa-cogs"></i>
                      <p>Class</p>
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link to={'/admin/semester'} className="nav-link nav-system_info">
                      <i className="nav-icon fas fa-cogs"></i>
                      <p>Semester</p>
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link  to={'/admin/course'} className="nav-link nav-system_info">
                      <i className="nav-icon fas fa-cogs"></i>
                      <p>Course</p>
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link to={'/admin/subject'} className="nav-link nav-system_info">
                      <i className="nav-icon fas fa-cogs"></i>
                      <p>Subject</p>
                    </Link>
                  </li>
                  
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="os-scrollbar os-scrollbar-horizontal os-scrollbar-unusable os-scrollbar-auto-hidden">
          <div className="os-scrollbar-track">
            <div className="os-scrollbar-handle" style={{ width: "100%", transform: "translate(0px, 0px)" }}></div>
          </div>
        </div>
        <div className="os-scrollbar os-scrollbar-vertical os-scrollbar-auto-hidden">
          <div className="os-scrollbar-track">
            <div className="os-scrollbar-handle" style={{ height: "55.017%", transform: "translate(0px, 0px)" }}></div>
          </div>
        </div>
        <div className="os-scrollbar-corner"></div>
      </div>
    </aside>
    </>
  )
}

export default Aside
