import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { message } from "antd";
import { AuthContext } from "../context/AuthProvider";
import googleIcon from "../assets/imgs/google.png";
import facebookIcon from "../assets/imgs/facebook.png";
import "./Account.css";

const Account = () => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await login(formData);

      if (!data) {
        message.error("Login failed please try again!");
        return;
      }

      message.success("Login successful.");

      if (data?.user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log("Something went wrong with login!", error);
    }
  };

  const loginWithGoogle = () => {
    window.open("http://localhost:4000/api/auth/google", "_self");
  };

  return (
    <section className="account">
      <div className="container">
        <div className="account-all">
          <div className="account-left">
            <div className="account-wrapper">
              <div className="account-login-register">
                <div className="account-login">
                  <h1 className="login-title">Login</h1>
                  <p className="login-desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                    quisquam sint nobis esse.
                  </p>
                </div>
              </div>
              <div className="account-form-wrapper">
                <div className="account-personal-information">
                  <div className="account-name-last-name">
                    <p className="personal-information-title">E-Mail *</p>
                    <form onSubmit={handleLogin}>
                      <input
                        type="text"
                        name="email"
                        onChange={handleInputChange}
                      />
                    </form>
                  </div>
                  <div className="personal-subject">
                    <p className="personal-information-title">Password *</p>
                    <form onSubmit={handleLogin}>
                      <input
                        type="password"
                        name="password"
                        onChange={handleInputChange}
                      />
                    </form>
                  </div>
                  {/* <p className="remember-me">
                    <label>
                      <input type="checkbox" />
                      <span>Remember Me</span>{" "}
                    </label>{" "}
                  </p> */}
                  <form onSubmit={handleLogin}>
                    <div className="login-button">
                      <button>Login</button>
                    </div>
                  </form>
                  <a href="#" className="account-lost">
                    Lost your password?
                  </a>
                </div>
              </div>

              <div className="socialMediaLoginButton">
                <button onClick={loginWithGoogle}>
                  {" "}
                  <img src={googleIcon} alt="googleicon" /> Continue with google
                </button>
                <button>
                  {" "}
                  <img src={facebookIcon} alt="facebookIcon" />
                  Continue with facebook
                </button>
              </div>
            </div>
          </div>
          <div className="account-right">
            <div className="account-wrapper">
              <div className="account-login-register">
                <div className="account-login">
                  <h1 className="login-title">Not Registered Yet?</h1>
                  <p className="login-desc">
                    By creating an account with our store, you will be able to
                    move through the checkout process faster, store multiple
                    shipping addresses, view and track your orders in your
                    account and more.
                  </p>
                </div>
                <div className="register-button login-button">
                  <Link to={"/accountRegister"}>
                    <button>Register</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Account;
