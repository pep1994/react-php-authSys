import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom';
import { auth } from './AuthLogin';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            loggedIn: false,
            error: false,
            errorMsg: "",
            id: ""
        }
        console.log(this.state.loggedIn);

    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        console.log(token);

        auth(token).then(res => {
            console.log(res)
            if (res.logged) {
                this.setState({
                    loggedIn: true,
                    id: res.data
                })
            }

        })
            .catch(err => {
                console.log(err);

            })

    }

    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async fetchLogin() {
        const url = "http://localhost:8888/login.php";
        const options = {
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
        return data;
    }

    submitForm = () => {
        this.fetchLogin().then(res => {
            console.log(res);
            if (res.error) {
                this.setState({
                    error: true,
                    errorMsg: res.data
                })
            } else {
                localStorage.setItem('token', res.data.token);
                console.log(localStorage);
                this.setState({
                    id: res.data.user_id,
                    loggedIn: true
                })

            }
        }
        )
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        if (this.state.loggedIn) {
            return <Redirect to={`/profile/${this.state.id}`} />
        } else {
            return (
                <Fragment>
                    {this.state.error && <p className="text-danger">{this.state.errorMsg}</p>}

                    <form >
                        <div className="form-group">
                            <input type="text" name="username" placeholder="Inserisci Username" value={this.state.username} onChange={this.changeInput} />
                        </div>
                        <div className="form-group">
                            <input type="password" name="password" placeholder="Inserisci Password" value={this.state.password} onChange={this.changeInput} />
                        </div>
                        <div className="form-group">
                            <input onClick={this.submitForm} type="button" className="btn btn-info" value="Login" />
                        </div>
                    </form>
                </Fragment>
            )
        }
    }
}

export default Login
