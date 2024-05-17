import { Link, useNavigate } from "react-router-dom";
import "./AccountRegister.css";
import { useState } from "react";
import { message } from "antd";

const AccountRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
  });
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BASE_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/api/v1/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        message.success("Registration successfull.");
        navigate("/account");
      } else {
        message.error(data?.error);
      }
    } catch (error) {
      console.log("Somthing went wrong with registration!", error);
    }
  };

  return (
    <section className="account-register">
      <div className="container">
        <div className="account-register-all">
          <div className="account-register-left">
            <div className="account-register-wrapper">
              <div className="account-register-login-register">
                <div className="account-register-login">
                  <h1 className="login-title">Register</h1>

                  <p className="login-desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                    quisquam sint nobis esse.
                  </p>
                </div>
              </div>
              <div className="account-register-form-wrapper">
                <div className="account-register-personal-information">
                  <form onSubmit={handleRegister}>
                    <div className="account-register-name-last-name">
                      <p className="personal-information-title name-register">
                        Name *
                      </p>
                      <form onSubmit={handleRegister}>
                        <input
                          required
                          type="text"
                          onChange={handleInputChange}
                          name="name"
                        />
                      </form>
                    </div>
                    <div className="personal-subject">
                      <p className="personal-information-title email-register">
                        E-Mail *
                      </p>
                      <form onSubmit={handleRegister}>
                        <input
                          required
                          type="email"
                          onChange={handleInputChange}
                          name="email"
                        />
                      </form>
                    </div>
                    <div className="personal-subject">
                      <p className="personal-information-title password-register">
                        Password *
                      </p>
                      <form onSubmit={handleRegister}>
                        <input
                          required
                          type="password"
                          onChange={handleInputChange}
                          name="password"
                        />
                      </form>
                    </div>
                    <div className="register-button">
                      <button type="submit">Register</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="account-register-right">
            <div className="account-register-wrapper">
              <div className="account-register-login-register">
                <div className="account-register-login">
                  <h1 className="login-title">Already have an account?</h1>
                  <p className="login-desc">
                    By creating an account with our store, you will be able to
                    move through the checkout process faster, store multiple
                    shipping addresses, view and track your orders in your
                    account and more.
                  </p>
                </div>
                <div className="register-button">
                  <Link to={"/Account"}>
                    <button>Login</button>
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

export default AccountRegister;
