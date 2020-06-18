import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'


export class Logout extends Component {
    constructor(props){
        super(props);
        localStorage.removeItem('token');
    }
    render() {
        return (
            <div>
                <h1>Hai fatto il logout</h1>
                <Redirect to="/"/>
            </div>
        )
    }
}

export default Logout
