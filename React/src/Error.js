import React from "react";
import "./assets/bootstrap/css/bootstrap.min.css";
import "./assets/fonts/fontawesome5-overrides.min.css";
import Logo1 from "./assets/img/app-logo.png";
import Footer from "./Footer";

class Error extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const link1 = document.createElement("link");
    const link2 = document.createElement("link");
    const link3 = document.createElement("link");
    link1.rel = "stylesheet";
    link1.href =
      "https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i";
    link2.rel = "stylesheet";
    link2.href = "https://use.fontawesome.com/releases/v5.12.0/css/all.css";
    link3.rel = "stylesheet";
    link3.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";

    document.body.appendChild(link1);
    document.body.appendChild(link2);
    document.body.appendChild(link3);
  }
  render() {
    return (
      <div id="wrapper">
        <nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0 toggled">
          <div className="container-fluid d-flex flex-column p-0">
            <a
              className="navbar-brand d-flex justify-content-center align-items-center justify-content-lg-center sidebar-brand m-0"
              href="#"
            >
              <div className="sidebar-brand-icon rotate-n-15"></div>
              <img src={Logo1} style={{ width: "51px" }}></img>
              <div className="sidebar-brand-text mx-3"></div>
            </a>
            <hr className="sidebar-divider my-0"></hr>
            <ul className="nav navbar-nav text-light" id="accordionSidebar">
              <li className="nav-item">
                <a className="nav-link" href="./">
                  <i className="far fa-user-circle"></i>
                  <span>Sign In</span>
                </a>
              </li>
              <li className="nav-item"></li>
            </ul>
            
          </div>
        </nav>
        <div className="d-flex flex-column" id="content-wrapper">
          <div id="content">
            <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
              <div className="container-fluid">
                <button
                  className="btn btn-link d-md-none rounded-circle mr-3"
                  id="sidebarToggleTop"
                  type="button"
                >
                  <i className="fas fa-bars"></i>
                </button>
              </div>
            </nav>
            <div className="container-fluid">
              <div className="text-center mt-5">
                <div className="error mx-auto" data-text="404">
                  <p className="m-0">404</p>
                </div>
                <p className="text-dark mb-5 lead">Page Not Found</p>
                <p className="text-black-50 mb-0">
                  It looks like you found a glitch in the matrix...
                </p>
                <a href="/">??? Back to Login</a>
              </div>
            </div>
          </div>
          <Footer/>
        </div>
        <a className="border rounded d-inline scroll-to-top" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a>
      </div>
    );
  }
}

export default Error;
