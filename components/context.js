import React, { useState, useEffect, useContext } from 'react'

export const AppContext = React.createContext()
const Provider = AppContext.Provider
const Consumer = AppContext.Consumer

export const AppProvider = ({ children }) => {
  const [connection, setConnection] = useState(false)

  const [rpm, setRpm] = useState({ value: 0, data: [] })
  const [litres, setLitres] = useState({ value: 0, data: [] })
  const [tonne, setTonne] = useState({ value: 0, data: [] })
  const [psi, setPsi] = useState({ value: 0, data: [] })

  const [duration, setDuration] = useState({ min: 50, max: 500, increment: 50, value: 50 })

  const ws = new WebSocket('ws://192.168.4.1:1880/data')

  useEffect(() => {
    ws.onopen = () => {
      setConnection(true)
      ws.onmessage = msg => setRpm({ ...rpm, value: msg.data })
      ws.onerror = err => console.warn(err)
      ws.onclose = () => setConnection(false)
    }
  }, [ws])

  const changeDuration = dir => {
    if (duration.value >= duration.min)
      dir &&
        !(duration.value >= duration.max) &&
        setDuration({ ...duration, value: duration.value + duration.increment })
    if (duration.value <= duration.max)
      !dir &&
        !(duration.value <= duration.min) &&
        setDuration({ ...duration, value: duration.value - duration.increment })
  }

  const data = { rpm, litres, tonne, psi }

  return <Provider value={{ data, connection, duration, setDuration, changeDuration }}>{children}</Provider>
}

export const withData = Component => props => <Consumer>{contexts => <Component {...props} {...contexts} />}</Consumer>
