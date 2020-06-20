import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { auth } from './AuthLogin';


export class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            username: "",
            password: "",
            re_pwd: "",
            name: "",
            email: "",
            sign: false,
            error: false,
            errorMsg: "",
            successMsg: "",
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

    async fetchSign() {
        const url = "http://localhost:8888/signin.php";
        const options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                re_pwd: this.state.re_pwd,
                name: this.state.name,
                email: this.state.email,
                submit: "Invia"
            })
        }
        const rawData = await fetch(url, options);
        const data = await rawData.json();
        return data;
    }

    submitForm = () => {
        this.fetchSign().then(res => {
            console.log(res);
            if (res.sign) {
                this.setState({
                    sign: true,
                    successMsg: res.data
                })
            } else {
                this.setState({
                    error: true,
                    errorMsg: res.data
                })
            }
        })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        if (this.state.sign) {
            return (
                <div className="alert alert-success d-flex justify-content-center" role="alert">
                    {this.state.successMsg}, <Link to="/login" className="alert-link"> vai al login </Link>.
                </div>
            )
        } else if (this.state.loggedIn) {
            return <Redirect to={`/profile/${this.state.id}`} />
        } else {
            return (
                <Fragment>
                    {this.state.error && <p className="text-danger">{this.state.errorMsg}</p>}
                    <form>
                        <div className="form-group">
                            <input type="text" name="username" className="form-control" placeholder="Username" onChange={this.changeInput} value={this.state.username} />
                        </div>
                        <div className="form-group">
                            <input type="password" name="password" className="form-control" placeholder="Password" onChange={this.changeInput} value={this.state.password} />
                        </div>
                        <div className="form-group">
                            <input type="password" name="re_pwd" className="form-control" placeholder="RePassword" onChange={this.changeInput} value={this.state.re_password} />
                        </div>
                        <div className="form-group">
                            <input type="text" name="name" className="form-control" placeholder="Nome" onChange={this.changeInput} value={this.state.name} />
                        </div>
                        <div className="form-group">
                            <input type="email" name="email" className="form-control" placeholder="Email" onChange={this.changeInput} value={this.state.email} />
                        </div>
                        <div className="form-group">
                            <input type="button" className="btn btn-info" name="submit"  onClick={this.submitForm} />
                        </div>
                    </form>
                </Fragment>
            )
        }
    }
}

export default Admin;
