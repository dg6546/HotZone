import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import styles from "./ChangePassword.module.css";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import config from "../../config";

const Login = () => {
    const { register, handleSubmit, errors } = useForm();
    const [message, setMessage] = useState();
    const history = useHistory();

    const onSubmit = (data, e) => {
        setMessage({
            data: "Login is in progress...",
            type: "alert-warning",
        });
        fetch(`${config.baseUrl}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then(({ error, data }) => {
                setMessage({
                    data: error || "Logged in successfully, redirecting...",
                    type: error ? "alert-danger" : "alert-success",
                });

                !error &&
                setTimeout(() => {
                    localStorage.setItem("token", data.token);
                    // history.push("/dashboard");
                }, 3000);

                !error && e.target.reset();
            });
    };

    return (
        <div
            className={`${styles.container} container-fluid d-flex align-items-center justify-content-center`}
        >
            <div className={styles.loginFormContainer}>
                {message && (
                    <div
                        className={`alert fade show d-flex ${message.type}`}
                        role="alert"
                    >
                        {message.data}
                        <span
                            aria-hidden="true"
                            className="ml-auto cursor-pointer"
                            onClick={() => setMessage(null)}
                        >
              &times;
            </span>
                    </div>
                )}
                <fieldset className="border p-3 rounded">
                    <legend
                        className={`${styles.loginFormLegend} border rounded p-1 text-center`}
                    >
                        Change Password
                    </legend>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                        <div className="form-group">
                            <label htmlFor="inputForOldPassword">Old Password</label>
                            <span className="mandatory">*</span>
                            <input
                                id="inputForOldPassword"
                                name="oldpassword"
                                type="password"
                                className="form-control"
                                placeholder="Enter Old Password"
                                ref={register({
                                    required: {
                                        value: true,
                                        message: "Please enter your old password",
                                    },
                                })}
                            />
                            {/**
                             * we provide validation configuration for email field above
                             * error message are displayed with code below
                             */}
                            {errors.email && (
                                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.email.message}
                </span>
                            )}
                        </div>
                        <div className="form-group">
                            {/*<li>Your password can’t be too similar to your other personal information.</li>*/}
                            {/*<li>Your password must contain at least 8 characters.</li>*/}
                            {/*<li>Your password can’t be a commonly used password.</li>*/}
                            {/*<li>Your password can’t be entirely numeric.</li>*/}
                            {/*<br/>*/}
                            <label htmlFor="inputForNewPassword"> New Password</label>
                            <span className="mandatory">*</span>
                            <input
                                type="password"
                                name="newpassword"
                                className="form-control"
                                id="inputForNewPassword"
                                placeholder="Enter New Password"
                                ref={register({
                                    required: {
                                        value: true,
                                        message: "Please enter new password",
                                    },
                                })}
                            />
                            {errors.password && (
                                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.password.message}
                </span>
                            )}
                        </div>
                        <div className="form-group">

                            <label htmlFor="inputForConfirmNewPassword">Confirm New Password</label>
                            <span className="mandatory">*</span>
                            <input
                                type="password"
                                name="newconfirmpassword"
                                className="form-control"
                                id="inputForConfirmNewPassword"
                                placeholder="Confirm New Password"
                                ref={register({
                                    required: {
                                        value: true,
                                        message: "Please confirm new password",
                                    },
                                })}
                            />
                            {errors.password && (
                                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.password.message}
                </span>
                            )}
                        </div>
                        <div className="d-flex align-items-center">
                            <button type="submit" className="btn btn-outline-primary">
                                Confirm
                            </button>

                            {/*<button className="btn btn-link ml-auto">*/}
                            {/*    <Link to="#">Forgot Password</Link>*/}
                            {/*</button>*/}
                        </div>
                    </form>
                </fieldset>
            </div>
        </div>
    );
};

export default Login;