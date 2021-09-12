import React from "react";
import "./assets/bootstrap/css/bootstrap.min.css";
import "./assets/fonts/fontawesome5-overrides.min.css";
import GoogleLogin from "react-google-login";
import scriptjs from "scriptjs";
import $ from "jquery";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: "",
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
    document.body.className = "bg-gradient-primary";
  }

  async onSuccess(googleUser) {
    let profile = googleUser.getBasicProfile();
    for (var key in googleUser) {
      if (googleUser[key].access_token !== undefined) {
        localStorage.setItem("access_token", googleUser[key].access_token);
      }
    }
    let response = await fetch("https://retale.saivedagiri.com/googleSignIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: profile.getEmail(),
        name: profile.getName(),
      }),
    }).catch((err) => console.log(err));
    let json = await response.json();
    sessionStorage.setItem("firstName", json.firstname);
    sessionStorage.setItem("lastName", json.lastname);
    sessionStorage.setItem("email", profile.getEmail());
    sessionStorage.setItem("userkey", json.userkey);
    window.location = "landing";
  }

  onFailure(error) {
    console.log(error);
  }

  async signInEmail(e) {
    e.preventDefault();
    let email = this.state.email.toLowerCase();
    let response = await fetch("https://retale.saivedagiri.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: this.state.password,
      }),
    }).catch((err) => console.log(err));
    let json = await response.json();
    if (json.data != "Valid") {
      this.setState({ errorMessage: json.data });
    } else {
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("firstName", json.firstname);
      sessionStorage.setItem("lastName", json.lastname);
      sessionStorage.setItem("userkey", json.id);
      window.location = "landing";
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-9 col-lg-12 col-xl-10">
              <div className="card shadow-lg o-hidden border-0 my-5">
                <div className="card-body p-0">
                  <div className="row d-lg-flex justify-content-lg-center">
                    <div className="col-lg-10">
                      <div className="p-5">
                        <div className="text-center">
                          <h3 className="text-dark mb-4">
                            Welcome Back to ReTale!
                          </h3>
                        </div>
                        <form className="user">
                          <div className="form-group">
                            <div className="text-center">
                              <h4 className="text-dark mb-4">
                                {this.state.errorMessage}
                              </h4>
                            </div>
                            <input
                              className="form-control form-control-user"
                              type="email"
                              id="exampleInputEmail"
                              aria-describedby="emailHelp"
                              placeholder="Enter Email Address..."
                              name="email"
                              onChange={(event) => {
                                this.setState({ email: event.target.value });
                              }}
                            ></input>
                          </div>
                          <div className="form-group">
                            <input
                              className="form-control form-control-user"
                              type="password"
                              id="exampleInputPassword"
                              placeholder="Password"
                              name="password"
                              onChange={(event) => {
                                this.setState({ password: event.target.value });
                              }}
                            ></input>
                          </div>
                          <button
                            className="btn btn-primary btn-block text-white btn-user"
                            onClick={this.signInEmail.bind(this)}
                          >
                            Login
                          </button>
                          <hr></hr>
                          <GoogleLogin
                            className="btn btn-primary btn-block text-white btn-user"
                            icon="false"
                            clientId="517262660824-uccs409ut0jdvubtn1l4cn0n7cctd8aq.apps.googleusercontent.com"
                            buttonText="Login with Google"
                            onSuccess={this.onSuccess}
                            onFailure={this.onFailure}
                            cookiePolicy={"single_host_origin"}
                            render={(renderProps) => (
                              <button
                                className="btn btn-primary btn-block text-white btn-google btn-user"
                                onClick={renderProps.onClick}
                              >
                                <i className="fab fa-google"></i>&nbsp; Login
                                with Google
                              </button>
                            )}
                          />
                          <hr></hr>
                        </form>
                        {/* <div className="text-center"><a className="small" href="forgot-password">Forgot Password?</a></div> */}
                        <div className="text-center">
                          <a className="small" href="register">
                            Create an Account!
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
