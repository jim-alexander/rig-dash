import React, { useState, useEffect } from 'react'

export const AppContext = React.createContext()
const Provider = AppContext.Provider
const Consumer = AppContext.Consumer

export const AppProvider = ({ children }) => {
  const [connection, setConnection] = useState(false)

  const [rpm, setRpm] = useState([])
  const [litres, setLitres] = useState([])
  const [tonne, setTonne] = useState([])
  const [psi, setPsi] = useState([])

  const [msg, setMsg] = useState(null)

  const [duration, setDuration] = useState({ min: 60, max: 3600, increment: 60, value: 60 })

  const mapRange = (val, x_low, x_high, y_low, y_high) => ((val - x_low) * (y_high - y_low)) / (x_high - x_low) + y_low

  useEffect(() => {
    const ws = new WebSocket('ws://192.168.4.1:1880/data')
    ws.onopen = () => setConnection(true)
    ws.onmessage = resp => setMsg(resp.data.split(':'))
    ws.onerror = err => console.warn(err)
    ws.onclose = () => {
      setConnection(false)
      ws.close()
    }
    return () => {
      ws.close()
    }
  }, [])

  useEffect(() => {
    if (msg) {
      let sensors = [
        { id: 'rpm', xMin: 4, xMax: 20, decimal: true, action: setRpm, data: rpm },
        { id: 'litres', xMin: 4, xMax: 20, decimal: true, action: setLitres, data: litres },
        { id: 'tonne', xMin: 4, xMax: 20, decimal: true, action: setTonne, data: tonne },
        { id: 'psi', xMin: 0, xMax: 3626, decimal: false, action: setPsi, data: psi }
      ]
      let index = sensors.findIndex(i => i.id === msg[0])
      let value = mapRange(msg[1], 11940, 59581, sensors[index].xMin, sensors[index].xMax).toFixed(1)
      sensors[index].action([...sensors[index].data, parseInt(value)])
    }
  }, [msg])

  // TODO : I want to save all the data but only show data depending on the duration set
  // ALSO : Set the initial length of the array to the duration to stop the scale shifting

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

  let data = { rpm, litres, tonne, psi }

  return <Provider value={{ connection, data, duration, setDuration, changeDuration }}>{children}</Provider>
}

export const withData = Component => props => <Consumer>{contexts => <Component {...props} {...contexts} />}</Consumer>
