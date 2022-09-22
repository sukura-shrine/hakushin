import React, { useMemo, useState } from 'react'

import { AppState } from './components'
import { useAppsInfo } from './services'
import './style.css'

const usePathAppName = () => {
  return useMemo(() => {
    const name = location.pathname.match(/[^/#?]+/)
    return name && name[0]
  }, [location.pathname])
}

export default function App () {
  const { data, error } = useAppsInfo()
  const defaultName = usePathAppName()
  const [theAppName, setTheAppName] = useState(defaultName)

  const apps = useMemo(() => {
    if (!data) return null
    return data.map(item => {
      const { name, version, author, description, email, hakushin } = item
      return (
        <option key={name}>{name}</option>
      )
    })
  }, [data])

  const appInfo = useMemo(() => {
    if (!data) return null
    const item = data.find(item => item.name === theAppName)
    if (!item) return null
    const { version, author, description, email, hakushin } = item
    return (
      <div>
        <div>port: {hakushin?.port}</div>
        <div>author: {author}</div>
        <div>email: {email}</div>
        <div>version:{version}</div>
        <div>description: {description}</div>
      </div>
    )
  }, [theAppName, data])

  const onAppChange = (event) => {
    setTheAppName(event.target.value)
  }

  return (
    <AppState data={data} error={error}>
      <div className='micro-app-tools'>
        <select className="app-select" value={theAppName} onChange={onAppChange}>
          {apps}
        </select>
        {appInfo}
      </div>
    </AppState>
  )
}
