
import Nav from './../components/Header/Nav/NavScroll';
import { Link } from 'react-router-dom';
const User = () => {

    const saveUpdateUserDetails = (event) => {
        event.preventDefault()
    }

    const saveUpdateUserPassword = (event) => {
        event.preventDefault()
    }
  return (
      <>
    <Nav/>
     <section className="content container">
        <div className="row">
            <div className="col-sm-12 mb-4">
                <Link to={'/'} className="btn btn-default">
                    <i className="fa fa-arrow-left"></i> Cancel
                </Link>
            </div>
            <div className="col-md-6 ">
                <div id="errorMessage" className="error invalid-feedba" style={{ display: 'none' }}></div>
                <div id="success" style={{display:'none', color:'#000'}}></div>
                <form id="user_info" method="post" acceptCharset="utf-8" onSubmit={saveUpdateUserDetails}>
                    <input type="hidden" id="id" value="5327428"/>
                    <input type="hidden" name="csrf_test_name" value="ffaba3dc06f075ce61743afbc7447b62" />                                             
                        <div className="box box-success">
                            <div className="box-header with-border">
                                <h3 className="box-title">Data User</h3>
                                <div className="box-tools pull-right">
                                    <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i></button>
                                </div>
                            </div>
                            <div className="box-body pb-0">
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" id="username" className="form-control" value="Admin"/>
                                </div>
                                <div className="row">
                                    <div className="form-group col-sm-6">
                                        <label htmlFor="first_name">First Name</label>
                                        <input type="text" id="fname" className="form-control" value="Daniel"/>
                                    </div>
                                    <div className="form-group col-sm-6">
                                        <label htmlFor="last_name">Last Name</label>
                                        <input type="text" id="lname" className="form-control" value="Mike"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" className="form-control" value="admin@admin.com"/>
                                </div>
                            </div>
                            <div className="box-footer">
                                <button type="submit" id="btn-info" className="btn btn-success">Save</button>
                            </div>
                        </div>
                    </form>    
                </div>
        <div className="col-md-6">
            <form id="isUpdataPassword" method="post" acceptCharset="utf-8" onSubmit={saveUpdateUserPassword}>
                <input type="hidden" name="id" value="5327428" />
                <div className="box box-warning">
                    <div className="box-header with-border">
                        <h3 className="box-title">Change Password</h3>
                        <div className="box-tools pull-right">
                            <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i></button>
                        </div>
                    </div>
                    <div className="box-body pb-0">
                        <div className="form-group oji1">
                            <label htmlFor="old">Current Password</label>
                            <input type="password" placeholder="Current Password" id="old" className="form-control"/>  
                            <small className="help-block1"></small>
                        </div>
                         <div className="form-group">
                            <div className="form-group oji2">
                                <label htmlFor="new">New Password</label>
                                <input type="password" placeholder="New Password" id="new" className="form-control"/>
                                <small className="help-block2"></small>
                            </div>
                            <div className="form-group oji3">
                                <label htmlFor="new_confirm">Confirmation Password</label>
                                <input type="password" placeholder="Confirmation Password" id="new_confirm" className="form-control"/>
                                <small className="help-block3"></small>
                            </div>
                        </div>
                        <div className="box-footer">
                            <button type="reset" className="btn btn-flat btn-danger"><i className="fa fa-rotate-left"></i> Reset</button>
                            <button type="submit" id="btn-pass" className="btn btn-flat btn-primary" style={{width:'auto', marginLeft:'10px'}}>Change Password</button>            
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    </section> 
    </>
  )
}

export default User
