import { useState } from "react"
import {useRouter} from 'next/router'
import { doAuth, getToken } from '../auth'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState('')
    const router = useRouter()

    if(typeof window !== 'undefined' && getToken()) router.push('/')

    return <body style={{"background": "black"}}>
        <section style={{'backgroundColor': "black", height: "100vh"}}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-xl-10">
                    <div className="card" style={{"borderRadius": "1rem", "borderColor": "white", "background": "black", "color": "whitesmoke"}}>
                    <div className="row g-0">
                        <div className="col-md-6 col-lg-5 d-none d-md-block">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                            alt="login form" className="img-fluid" style={{"borderRdius": "1rem 0 0 1rem"}} />
                        </div>
                        <div className="col-md-6 col-lg-7 d-flex align-items-center">
                        <div className="card-body p-4 p-lg-5 text-black">

                            <form>

                            <div className="d-flex align-items-center mb-3 pb-1">
                                <i className="fas fa-cubes fa-2x me-3" style={{"color": "#ff6219"}}></i>
                                <span className="h1 fw-bold mb-0">Ready Hand</span>
                            </div>

                            <h5 className="fw-normal mb-3 pb-3" style={{"letterSpacing": "1px"}}>Sign into your account</h5>

                            <div className="form-outline mb-4">
                                <input type="email" id="form2Example17" className="form-control form-control-lg" value={email} name="email" onInput={e => setEmail(e.target.value)} />
                                <label className="form-label" for="form2Example17">Email address</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="password" id="form2Example27" className="form-control form-control-lg" value={password} name="password" onInput={e => setPassword(e.target.value)} />
                                <label className="form-label" for="form2Example27">Password</label>
                            </div>
                            {
                                err ? <div className="row">
                                    <small style={{color: "red"}}>{err}</small>
                                </div> : <p></p>
                            }
                            <div className="pt-1 mb-4">
                                <button className="btn btn-dark btn-lg btn-block" style={{ "background": "black", "border": "1px solid white", "borderRadius": "5px" }} type="button" onClick={() => {
                                    fetch('http://localhost:5000/admin/account/login', {
                                            method: 'POST',
                                            body: JSON.stringify({ email, password }),
                                            headers: {'Content-Type': 'application/json'},
                                        })
                                        .then(data => data.json())
                                        .then(res => {
                                            console.log(res)
                                            if(!res.data.userId) {
                                                setErr("Invalid Credantials")
                                                return console.log(res.data)
                                            }
                                            localStorage.setItem('token', res.data.token)
                                            router.push('/')
                                        })
                                        .catch(err => console.log("err =>", err))
                                }}>Login</button>
                            </div>

                            {/* <a className="small text-muted" href="#!">Forgot password?</a>
                            <p className="mb-5 pb-lg-2" style={{color: "#393f81"}}>Don't have an account? <a href="#!"
                                style={{color: "#393f81"}}>Register here</a></p>
                            <a href="#!" className="small text-muted">Terms of use.</a>
                            <a href="#!" className="small text-muted">Privacy policy</a> */}
                            </form>

                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    </body>
    // <div>
    //     <input type="text" value={email} name="email" onInput={e => setEmail(e.target.value)}/>
    //     <br/>
    //     <input type="text" value={password} name="password" onInput={e => setPassword(e.target.value)}/>
    //     <br/>
    //     <button onClick={() => {
    //         fetch('http://localhost:5000/admin/account/login', {
    //                 method: 'POST',
    //                 body: JSON.stringify({ email, password }),
    //                 headers: {'Content-Type': 'application/json'},
    //             })
    //             .then(data => data.json())
    //             .then(res => {
    //                 console.log(res.data)
    //                 localStorage.setItem('token', res.data.token)
    //                 router.push('/')
    //             })
    //     }}>Login</button>
    // </div>
}