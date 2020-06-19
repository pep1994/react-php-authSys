import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';

export class Admin extends Component {
    constructor(props){
        super(props);
        // const token = localStorage.getItem('token');
        // let loggedIn = false;
        // if (token != null) {
        //      loggedIn = true;
        // }         
        // this.state = {
        //     loggedIn: loggedIn
        // }
    }
    render() {
        if (this.state.loggedIn) {
            return <Redirect to = "/profile"/>
        } else {
            return (
                <form action="<?php  echo $_SERVER['PHP_SELF']; ?>" method="post">
                    <div className="form-group">
                        <input type="text" name="uname" className="form-control" placeholder="Username" />
                    </div>
                    <div className="form-group">
                        <input type="password" name="pwd" className="form-control" placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <input type="password" name="re_pwd" className="form-control" placeholder="RePassword" />
                    </div>
                    <div className="form-group">
                        <input type="text" name="nome" className="form-control" placeholder="Nome" />
                    </div>
                    <div className="form-group">
                        <input type="email" name="email" className="form-control" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Invia" className="btn btn-info" />
                    </div>
                </form>
            )
        }
    }
}

export default Admin;
