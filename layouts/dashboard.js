import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { doAuth, doLogout } from '../auth'
import { useRouter } from 'next/router'
const { Emitter } = require('../emitter')

const emitter = Emitter.get()

export default function Layout(title, menuItems, content) {
  const [user, setUser] = useState({})
  const [refresh, setRefresh] = useState(false)
  const [isOpen, setIsopen] = useState(false)
  const router = useRouter()

  const userRefList = []

  const ToggleSidebar = () => setIsopen(!isOpen)
  let first = true
  useEffect(
    () => {
      doAuth().then(user => {
        setUser(user)
        if(!user._id) router.push('/login')
      })
      
    }, [refresh])

    useEffect(() => { emitter.emit('user', user) }, [user])

    useEffect(
        () => {
            if(first) {
                const f = () => {
                    doLogout(setUser)
                    setRefresh(!refresh)
                    router.push('/login')
                }
                emitter.on('logout', f)
                if(first) setRefresh(!refresh)
            }
            first = false
        },
        []
    )

  return <div className='container-fluid' style={{background: "black", paddingLeft: 0, paddingRight: 0, minHeight: "100vh", width: "100vw", color: "whitesmoke"}}>
    <div className="container-fluid" style={{padding: 0}}>
        <nav className="navbar navbar-expand-lg navbar-light shadow-md" style={{borderRadius: "0", background: "#333", color: "white"}}>
            <div className="container-fluid p-2">
                <div className="form-inline mr-0">
                    <div className="btn" onClick={ToggleSidebar} >
                        <img src='/menu.png'/>
                    </div>
                </div>
                <div className="navbar-brand text-white ml-auto">
                    <div className='d-flex justify-content-center align-items-center'>
                        <img src={user.profilePicture} className="rounded-circle" style={{width: "50px", "height": "50px"}}/>
                        <div className='m-2'></div>
                        <div>{user.fullname}</div>
                    </div>
                </div>
            </div>
        </nav>
        <div className={`sidebar ${isOpen == true ? 'active' : ''}`} style={{background: "#333"}}>
            <div className="sd-header">
                <div className="row" style={{width: "100%"}}>
                    <div className="d-flex justify-content-center" style={{width: "100%"}}>
                        <img className='rounded-circle' src={user.profilePicture} style={{width: "120px", height: "120px"}}/>
                    </div>
                    <div className='m-2'></div>
                    <div className="d-flex justify-content-center" style={{width: "100%"}}>{user.fullname}</div>
                    <div className='m-2'></div>
                    <div className="d-flex justify-content-center" style={{width: "100%"}}>
                        <button className='btn btn-danger' onClick={() => emitter.emit('logout')}>Logout</button>
                    </div>
                </div>
            </div>
            <div className="sd-body">
                <ul>
                    {
                        menuItems.map(item => <li>
                            <button onClick={() => router.push(item.link)} className="sd-link">{item.text}</button>
                        </li>)
                    }
                </ul>
            </div>
        </div>
        <div className={`sidebar-overlay ${isOpen == true ? 'active' : ''}`} onClick={ToggleSidebar}></div>
       </div>
    {/* <div className="row" style={{width: "100vw", height: "10%", background: "#333", justifyContent: "end"}}>
        <div className="d-flex" style={{width: "50%", alignItems: "center"}}>
            <img src='/menu.png'/>
            <div class="m-2"></div>
            <h3>{title}</h3>
        </div>
        <div className='d-flex' style={{width: "50%", justifyContent: "end", alignItems: "center", alignContent: "center"}}>
            <img className='rounded-circle' style={{width: "50px", height: "50px"}} src={user.profilePicture}></img>
            <div className='m-2'></div>
            <div>{user.fullname}</div>
        </div>
    </div> */}
    <br/>
    {content}
  </div>
}