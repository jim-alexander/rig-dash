import React, { useState, useEffect, useContext } from 'react'

export const AppContext = React.createContext()
const Provider = AppContext.Provider
const Consumer = AppContext.Consumer

export const AppProvider = ({ children }) => {
  const [rpm, setRpm] = useState({ value: 0, data: [] })
  const [litres, setLitres] = useState({ value: 0, data: [] })
  const [tonne, setTonne] = useState({ value: 0, data: [] })
  const [psi, setPsi] = useState({ value: 0, data: [] })

  const ws = new WebSocket('ws://192.168.4.1:3000')

  useEffect(() => {
    ws.onopen = () => console.log('Connection established.')
    ws.onmessage = msg => console.log(msg)
    return () => {
      ws.onclose = () => console.log('Connection closed.')
    }
  }, [])

  return <Provider value={{ rpm, litres, tonne, psi }}>{children}</Provider>
}

export const withData = Component => props => <Consumer>{contexts => <Component {...props} {...contexts} />}</Consumer>
