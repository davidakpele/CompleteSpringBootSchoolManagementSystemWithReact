import '../../../../../../assets/css/admin/assets/library/bootstrap-5/bootstrap.min.css'
import '../../../../../../assets/css/admin/assets/dist/css/mystyle.css'
import '../../../../../../assets/css/styles.css'
import '../../../../../../assets/css/font-awesome/css/font-awesome.min.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import  ApiServices from '../../../../../../services/ApiServices'
  
const NavScroll = () => {
  const logout = (event) => {
    event.preventDefault()
    ApiServices.logout()
  }
  
  return (
    <>
   <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand><Link to={'/admin'}>React-Bootstrap</Link> </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link to={'/admin/students'}>Students</Link>
            <Link to={'/admin/professors'}>Professors</Link>
            <Link to={'/admin/application'}>Category</Link>
            <Link to={'/admin/faculties'}>Faculty</Link>
            <Link to={'/admin/department'}>Department</Link>
            <Link to={'/admin/class'}>Classes</Link>
            <Link to={'/admin/semester'}>Semester</Link>
            <Link to={'/admin/course'}>Course</Link>
            <Link to={'/admin/subject'}>Subject</Link>
          
          </Nav>
          <Nav>
            <Link to={'/Users'}>More deets</Link>
            <Link onClick={logout}>
              Logout
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default NavScroll
