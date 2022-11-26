import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { doAuth, doLogout, getToken } from '../auth'
import {useRouter} from 'next/router'
import Dashboard from '../layouts/main'
import Table from '../layouts/table'
import { Emitter } from '../emitter'
import env from '../env'

const emitter = Emitter.get()

const DisputeList = () => {

  const [disputes, setDisputes] = useState([])
  let user = null

  useEffect(() => {
    fetch(`${env.url}/admin/account/user/disputes`)
      .then(res => res.json())
      .then(disputes => setDisputes(disputes.data))
    emitter.on('user', u => console.log("()>", user = u))
  }, [])

  return <div><p>{}</p>
    {Table("Vendors", disputes, ["Service", "Sender", "Sender Phone", "Reciever", "Reciever Phone", "Cancel Dispute", "Refund"], [
        a => a.service.title, 
        a => a.sender.fullname, 
        a => a.sender.phone,
        a => a.reciever.fullname,
        a => a.reciever.phone, 
        a => <button className='btn btn-danger' onClick={() =>
            fetch(`${env.url}/admin/account/handled/${a._id}`, { method: "POST", headers: { Authorization: getToken() } })
                .then(_ => emitter.emit('filter', dis => dis._id != a._id))
        }>Cancel</button>,
        a => <button className='btn btn-danger' onClick={() =>
            fetch(`${env.url}/provider/service/refund/${a._id}`, { method: "POST", headers: { Authorization: getToken() } })
                .then(_ => emitter.emit('filter', dis => dis._id != a._id))
        }>Refund</button>
    ])}
  </div>
}

export default function Home() {
  return Dashboard("New", <DisputeList/>)
}