import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { auth } from './AuthLogin';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: true,
            username: "",
            name: ""
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
            const id = this.props.match.params.id;
          
            fetch(`http://localhost:8888/getName.php?id=${id}`)
            .then( res => res.json())
            .then( data => {
                this.setState({
                    username: data.data.username,
                    name: data.data.name
                })
            }
            )
        })
            .catch(err => {
                console.log(err);

            })
    }
    render() {
        if (this.state.loggedIn) {
            return (
                <div>
                    <h1>Benvenuto {this.state.username}</h1>
                    <Link to="/logout">Logout</Link>
                </div>
            )
        } else {
            return (
                <Redirect to="/" />
            )
        }
    }
}

export default Profile
