import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Profile from './Profile';


export class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: true
        }

    }
    
    componentDidMount(){
        const token = localStorage.getItem('token');
        this.logout(token)
            .then(data => {
                console.log(data)
                if (!data.error) {
                    localStorage.removeItem('token');
                    this.setState({
                        error: false
                    })
                }
            }
            )
    }

    async logout(token) {
        const url = "http://localhost:8888/logout.php";
        const options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: token
            })
        }
        const rawData = await fetch(url, options);
        const data = await rawData.json();
        return data;
    }
    render() {
        if (this.state.error) {
            return <Profile/>
        } else {
            return (
                <div>
                    <Redirect to="/" />
                </div>
            )
        }

    }
}

export default Logout

