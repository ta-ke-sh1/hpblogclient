import React, { useState } from "react"
import axios from "axios";
import { host_url } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { decodeToken } from "../utils/utils";
import { Grid, TextField } from "@mui/material";
import thumbImage from '../images/DSC_0694.jpg';

export default function LoginPage() {

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isFetching, setFetch] = useState(false);
    // const [isLoggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();

    // useEffect(() => {
    //     checkToken();
    // }, []);

    const relocate = async (roles) => {
        navigate("/");
    }

    // const checkToken = async () => {
    //     console.log(isLoggedIn)
    //     const token = localStorage.getItem('access_token');
    //     if (!token) {
    //         setLoggedIn(true);
    //         return;
    //     }

    //     const decodedToken = decodeToken(token);
    //     if (decodedToken.exp < Date.now()) {
    //         relocate(decodedToken.role);
    //     } else {
    //         setLoggedIn(true);
    //     }
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFetching) {
            setFetch(true);
            var res = await axios.post(
                host_url + "/login",
                {
                    username: username,
                    password: password,
                },
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            if (res.status === 200) {
                var roles = [];
                localStorage.setItem("access_token", res.data.accessToken);
                localStorage.setItem("refresh_token", res.data.refreshToken);
                const decodedToken = decodeToken(res.data.accessToken);

                roles = decodedToken.role;
                auth.token = res.data.accessToken;
                auth.refresh_token = res.data.refreshToken;

                relocate(roles);
                setFetch(false);
            } else {
                // Validation message
                setFetch(false);
            }
        } else return;
    };

    return (
        <>
            <Grid container style={{
                width: '100vw',
                position: 'absolute',
                left: '50%',
                top: '50%',
                padding: '1vw',
                transform: 'translate(-50%, -50%)'
            }}>
                <Grid item xs={12} md={6} >
                    <div className="login-image-container">
                        <div style={{
                            backgroundImage: `url(${thumbImage})`,
                        }} className="login-image" />
                    </div>
                </Grid>
                <Grid item xs={12} md={6}  >
                    <div className="relative">
                        <div className="login-form">
                            <h1>Welcome back, <br /> <span className="display-font primary-color">Phuong</span> </h1>
                            <p >How was your day?</p>

                            <form onSubmit={handleSubmit}>
                                <TextField variant="standard" fullWidth label="Your Username" type="text" value={username} onChange={(e) =>
                                    setUserName(
                                        e.target.value
                                    )} />
                                <TextField variant="standard" style={{
                                    marginTop: '20px',
                                    marginBottom: '20px'
                                }} fullWidth label="And Password" type="password" value={password} onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )} />
                                <button
                                    className="btn btn-dark btn-lg my-btn"
                                    type="submit"
                                >
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}