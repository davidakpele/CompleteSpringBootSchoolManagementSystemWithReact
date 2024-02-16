import '../../../../../assets/css/bootstrap.min.css'
import '../../../../../assets/css/styles.css'
import '../../../../../assets/css/font-awesome.min.css'

import  { useEffect } from 'react';
import { Link } from 'react-router-dom';
const Nav = () => {
      useEffect(() => {
    // List of script URLs to load
      const scriptUrls = [
      '../src/assets/js/jquery.min.js',
    ];
    // Load each script dynamically
    scriptUrls.forEach((url) => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      document.head.appendChild(script);
    });
    // Cleanup the script tags when the component is unmounted
    return () => {
      scriptUrls.forEach((url) => {
        const script = document.querySelector(`script[src="${url}"]`);
        if (script) {
          document.head.removeChild(script);
        }
      });
    };
  }, []);
     
  useEffect(() => {
    // Add scripts to the bottom of the component
    const scriptUrls = [
      '../src/assets/js/bootstrap.bundle.min.js',
    ];

    scriptUrls.forEach((url) => {
      const script = document.createElement('script');
      script.src = url;
      document.body.appendChild(script); // Add script to the body
    });

    return () => {
      scriptUrls.forEach((url) => {
        const script = document.querySelector(`script[src="${url}"]`);
        if (script) {
          document.body.removeChild(script);
        }
      });
    };
    }, []);
    
  return (
    <>
      <div className="container-fluid px-0">
        <nav className="navbar navbar-expand-md navbar-dark bg-black px-0">
            <Link className="navbar-brand mr-5" to={"#"} id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img id="logo" src="https://i.imgur.com/K7Nwq4V.jpg" /> &nbsp;&nbsp;&nbsp;Acme Inc<span className="dropdown-toggle"></span></Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="#">Action1</a>
                    <a className="dropdown-item" href="#">Action2</a>
                    <a className="dropdown-item" href="#">Action3</a>
                    <a className="dropdown-item" href="#">Action4</a>
                </div>
                <button className="navbar-toggler mr-3" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                          <Link className="nav-link" to={"/"}><span className="fa fa-folder"></span> Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/students"}><span className="fa fa-group"></span> Students</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/unverifystudents"}><span className="fa fa-user-times"></span> Unverify Students</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/professors"}><span className="fa fa-user-o"></span>Professors</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </>
  )
}

export default Nav
