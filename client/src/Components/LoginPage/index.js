import * as React from 'react';
import './style.css';
import Footer from "../Footer/index";
import API from "../../Utils/api";
import Auth from "../../Utils/AUTH";

export class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            emailid: '',
            password: ''
        };
        
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleEmailChange(event) {
        this.setState({ emailid: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    login = (event) => {
        event.preventDefault();
        // alert('here is value ' + this.state.password + this.state.email);
        API.loginUser(this.state).then(res => {
            // Auth.setToken(res.data.token);
            console.log('res: ', res);
            this.setState({username: res.data.username});
            //the route below will depend on the res.data.isTeacher(boolean) in the db.
            this.props.history.push({pathname: '/', state: {username: res.data.username}});
        }).catch(err => console.log(err));
    }

    logout = (event) => {
        event.preventDefault();
        alert('you are trying to log out ' + this.state.password + this.state.emailid);
        API.logoutUser(this.state).then(res => {
            Auth.destroyToken(res.data.token);
            this.setState({username: res.data.username});
            //the route below will depend on the res.data.isTeacher(boolean) in the db.
            this.props.history.push({pathname: '/login', state: {username: res.data.username}});
        }).catch(err => console.log(err));

    }


    render () {
        return (
        <>
            <div className="d-flex justify-content-center">
                <div className="brand_logo_container">
                    <p>Welcome to MyTutor</p>
                    <form onSubmit={this.logout}>
                        <div className="d-flex justify-content-center mt-3 login_container">
                            <button 
                                type="submit" 
                                name="button" 
                                className="btn login_btn" 
                                value="logout">
                                Logout
                            </button>
                        </div>
                    </form>
                    <img src="./images/teacherOwl.png" className="brand_logo" alt="Logo"/>
                </div>
            </div>

            <div className="d-flex justify-content-center form_container">
                <form onSubmit={this.login}>
                    <div >
                        <label>
                            Email:
                            <input 
                                className="form-control input_user"
                                type="text" 
                                name="email" 
                                value={this.state.emailid} 
                                placeholder="email"
                                onChange={this.handleEmailChange}
                            />
                        </label>
                    </div>
                    <div >
                        <label>
                            Password:
                            <input 
                                className="form-control input_pass"
                                type="password" 
                                name="password" 
                                value={this.state.password}
                                placeholder="password"
                                onChange={this.handlePasswordChange}
                            />
                        </label>
                    </div>
                    <div className="d-flex justify-content-center mt-3 login_container">
                        <button 
                            type="submit" 
                            name="button" 
                            className="btn login_btn" 
                            value="Sign In">
                            Sign In
                        </button>
                    </div>
                </form>
            </div>

            <div className="center-div">
                Don't have an account?
                <div><a href="/student-registration">Register as new student</a></div> 
                <div><a href="/teacher-registration">Register as new teacher</a></div> 
            </div>
            <Footer/>
        </>
        )
    }
};
