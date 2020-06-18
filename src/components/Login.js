import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

export class Login extends Component {
    constructor(props){
        super(props);
        const token = localStorage.getItem('token');
        let loggedIn = false;
        if (token != null) {
             loggedIn = true;
             console.log(localStorage);      
        }         
    
        this.state = {
            username: "",
            password: "",
            loggedIn: loggedIn
        }
    }

    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitForm = ()=> {
        let username = this.state.username;
        let password = this.state.password;
        if(username === 'a' && password === 'b'){
            localStorage.setItem('token', 'ajdhaòuhòfis');
            this.setState({
                loggedIn: true
            })
        }
    }
        
    render() {
        if (this.state.loggedIn) {
            return <Redirect to="/profile"/>
        } else {
            return (
                <form onSubmit={this.submitForm}>
                    <div className="form-group">
                        <input type="text" name="username" placeholder="Inserisci Username" value={this.state.username} onChange={this.changeInput} />
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" placeholder="Inserisci Password" value={this.state.password} onChange={this.changeInput} />
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btn btn-info" />
                    </div>
                </form>
            )
        }
    }
}

export default Login
