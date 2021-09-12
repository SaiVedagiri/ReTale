import React from "react";
import "./assets/bootstrap/css/bootstrap.min.css";
import "./assets/fonts/fontawesome5-overrides.min.css";
import Logo1 from "./assets/img/app-logo.png";
import Footer from "./Footer";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 3,
      columns: 3,
      matrix: [],
    };
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

    this.runChecks();
  }

  async runChecks() {
    let response = await fetch("https://retale.saivedagiri.com/getMap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userkey: sessionStorage.getItem("userkey"),
      }),
    }).catch((err) => console.log(err));
    let json = await response.json();
    if (!json.error) {
      this.setState({
        rows: json.rows,
        columns: json.columns,
        matrix: json.matrix,
      });
    }
  }

  signOut() {
    sessionStorage.clear();
    window.location.href = "./";
  }

  render() {
    return (
      <div id="page-top">
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
                  <a className="nav-link" href="landing">
                    <i className="fas fa-users-cog"></i>
                    <span>Admin View</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link signOut"
                    onClick={this.signOut.bind(this)}
                  >
                    <i className="far fa-user-circle"></i>
                    <span>Sign Out</span>
                  </a>
                </li>
                <li className="nav-item"></li>
              </ul>
            </div>
          </nav>
          <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
              {this.state.rows != 0 ? (
                <div className="node"></div>
              ) : (
                <div
                  className="container-fluid"
                  style={{ marginLeft: "35vw", marginTop: "30vh" }}
                >
                  <h1>Initialize your store:</h1>
                  <h1>Rows:</h1>
                  <input
                    type="text"
                    id="rows"
                    onChange={(event) => {
                      this.setState({ proposedRows: event.target.value });
                    }}
                  ></input>
                  <h1>Columns:</h1>
                  <input
                    type="text"
                    id="columns"
                    onChange={(event) => {
                      this.setState({ proposedColumns: event.target.value });
                    }}
                  ></input>
                  <button
                    className="btn-primary"
                    onClick={async (event) => {
                      await fetch("https://retale.saivedagiri.com/setSize", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          userkey: sessionStorage.getItem("userkey"),
                          rows: this.state.proposedRows,
                          columns: this.state.proposedColumns,
                        }),
                      });
                      this.setState({ rows: this.state.proposedRows });
                      this.setState({ columns: this.state.proposedColumns });
                    }}
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
            <Footer />
          </div>
          <a className="border rounded d-inline scroll-to-top" href="#page-top">
            <i className="fas fa-angle-up"></i>
          </a>
        </div>
      </div>
    );
  }
}

export default Login;
