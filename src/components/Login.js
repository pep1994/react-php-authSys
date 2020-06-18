import React, { Component, Fragment } from 'react'
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
            loggedIn: loggedIn,
            error: false,
            errorMsg: ""
        }
    } 

    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async fetchLogin ()  {
       const url = "http://localhost:8888/login.php";
       const options = {
           mode: 'cors',
           method: "POST",
           headers: {
                'Accept': 'application/json',
               "Content-Type": "application/json"
           },
           body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
           })
       }
        const rawData = await fetch(url, options);
        const data = await rawData.json();
        console.log(rawData);
        console.log(data)  
        return data;  
    }

    submitForm = ()=> {
        let username = this.state.username;
        let password = this.state.password;
        this.fetchLogin().then(res => {
            if (res.error) {
                this.setState({
                    error: true,
                    errorMsg: res.data
                })
            } else {
                this.setState({
                    loggedIn: true
                })
                localStorage.setItem('token', res.data);
                console.log(localStorage);
                
            }
        }
        )
        // if(username === 'a' && password === 'b'){
        //     localStorage.setItem('token', 'ajdhaòuhòfis');
        //     this.setState({
        //         loggedIn: true
        //     })
        // }
    }
        
    render() {
        if (this.state.loggedIn) {
            return <Redirect to="/profile"/>
        } else {
            return (
                <Fragment>
                {this.state.error &&  <p style={{ color: 'red' }}>{this.state.errorMsg}</p>}
                
                <form >
                    <div className="form-group">
                        <input type="text" name="username" placeholder="Inserisci Username" value={this.state.username} onChange={this.changeInput} />
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" placeholder="Inserisci Password" value={this.state.password} onChange={this.changeInput} />
                    </div>
                    <div className="form-group">
                        <input onClick={this.submitForm} type="button" className="btn btn-info" />
                    </div>
                </form>
                </Fragment>
            )
        }
    }
}

export default Login
