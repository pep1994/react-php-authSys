import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'


export class Profile extends Component {
    constructor(props){
        super(props);
        const token = localStorage.getItem('token');
        let loggedIn = false;
        if (token != null) {
             loggedIn = true;
             console.log(localStorage);           
        }         
        this.state = {
            loggedIn: loggedIn
        }
    }
    render() {
        if (this.state.loggedIn) {
            return (
                <div>
                    <h1>Questo è il mio profilo</h1>
                    <Link to="/logout">Logout</Link>
                </div>
            )
        } else {
            return (
            <Redirect to="/"/>
            )
        }
    }
}

export default Profile
