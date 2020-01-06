import React, { useState, useEffect } from 'react'

export const AppContext = React.createContext()
const Provider = AppContext.Provider
const Consumer = AppContext.Consumer

export const AppProvider = ({ children }) => {
  const [connection, setConnection] = useState(false)

  const [values, setValues] = useState({ rpm: null, litres: null, tonne: null, psi: null })
  const [data, setData] = useState({ rpm: [], litres: [], tonne: [], psi: [] })

  const [msg, setMsg] = useState(null)

  const [duration, setDuration] = useState({ min: 50, max: 500, increment: 50, value: 50 })

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
      let _values = { ...values }
      let value = () => {
        if (msg[0] === 'rpm') return mapRange(msg[1], 11940, 59581, 4, 20).toFixed(1)
        if (msg[0] === 'litres') return mapRange(msg[1], 11940, 59581, 4, 20).toFixed(1)
        if (msg[0] === 'tonne') return mapRange(msg[1], 11940, 59581, 4, 20).toFixed(1)
        if (msg[0] === 'psi') return Math.floor(mapRange(msg[1], 11940, 59581, 0, 3626))
      }
      _values[msg[0]] = value()
      setValues(_values)
    }
  }, [msg])

  // TODO : I want to save all the data but only show data depending on the duration set
  // ALSO : Set the initial length of the array to the duration to stop the scale shifting

  useEffect(() => {
    let _new = { ...data }
    Object.keys(values).map(i => {
      let temp = [...data[i]]

      values[i] && temp.push(parseInt(values[i]))
      if (temp.length >= 1000) temp.shift()
      _new[i] = temp
    })
    setData(_new)
  }, [values])

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

  return <Provider value={{ connection, values, data, duration, setDuration, changeDuration }}>{children}</Provider>
}

export const withData = Component => props => <Consumer>{contexts => <Component {...props} {...contexts} />}</Consumer>
