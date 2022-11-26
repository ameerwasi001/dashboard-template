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

  useEffect(() => {
    setUsers(data)
    emitter.on('filter', (f) => {
      setFilter(() => d => f(d))
    })  
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
  return <div className="d-flex justify-content-center" style={{width: "100vw"}} key={users}>
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
            users.filter(filter).map(user => {
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
}

export default function Table(listingType, data, fields, accessors) {
    return <TableView data={data} fields={fields} accessors={accessors} listingType={listingType}/>
}