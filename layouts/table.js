import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { doAuth, doLogout } from '../auth'
import {useRouter} from 'next/router'
import Dashboard from '../layouts/main'
import { Emitter } from '../emitter'
import { Loading } from './loading'

const emitter = Emitter.get()

export const TableView = ({listingType, fields, data, accessors}) => {
  const [filter, setFilter] = useState(() => () => true)
  const [users, setUsers] = useState(data)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setUsers(data)
    emitter.on('filter', f => setFilter(() => d => f(d))) 
  }, [])

  useEffect(() => {
    setUsers(data);
  }, [data])

  useEffect(() => {
    if(users !== null) setUsers(users.filter(filter))
  }, [filter])

  useEffect(() => {
    if(users !== null) emitter.emit('loaded')
  }, [users])

  if(users === null) return 
  return <div>
    <div className="d-flex justify-content-end align-items-center" style={{width: "90vw"}}>
      <div>Search</div>
      <div className="m-2"></div>
      <input style={{width: "20vw"}} type="text" onInput={e => setSearch(e.target.value)} value={search} className="form-control" />
    </div>
    <br/>
    <div className="d-flex justify-content-center" style={{width: "100vw"}}>
      <div className='row' style={{ background: "whitesmoke", height: "1px" , width: "80vw"}}></div>
    </div>
    <br/>
    <div className="d-flex justify-content-center" style={{width: "100vw"}} key={users}>
      <div className="table-responsive" style={{width: "80vw"}}>
        <table className="table">
          <caption style={{color: "white"}}>List of {listingType}</caption>
          <thead>
            <tr>
              {
                  fields.map(field => <th scope="col" style={{color: "white"}}>{`${field}`}</th>)
              }
            </tr>
          </thead>
          <tbody>
            {
              users.filter(filter).filter(u => {
                return JSON.stringify(u).toLowerCase().includes(search.toLowerCase())
              }).map(user => {
                  return <tr>
                  {
                      accessors.map(f => <th scope="col" style={{color: "white"}}>
                              {f(user)}
                          </th>
                      )
                  }
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  </div>
}

export default function Table(listingType, data, fields, accessors) {
    return <TableView data={data} fields={fields} accessors={accessors} listingType={listingType}/>
}