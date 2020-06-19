import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { auth } from './AuthLogin';

 class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedIn: true
        }
    }
    componentDidMount() {
        const token = localStorage.getItem('token');
            auth(token).then(res => {
                console.log(res)
                if (!res.logged) {
                    this.setState({
                        loggedIn: false
                    })
                }
            })
            .catch(err => {
                console.log(err);
                
            }) 
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
