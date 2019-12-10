import React, { useState, useEffect, useContext } from 'react'

export const AppContext = React.createContext()
const Provider = AppContext.Provider
const Consumer = AppContext.Consumer

export const AppProvider = ({ children }) => {
  const [connection, setConnection] = useState(false)

  const [values, setValues] = useState({ rpm: 0, litres: 0, tonne: 0, psi: 0 })
  const [data, setData] = useState({ rpm: [], litres: [], tonne: [], psi: [] })

  const [duration, setDuration] = useState({ min: 50, max: 500, increment: 50, value: 50 })

  useEffect(() => {
    const ws = new WebSocket('ws://192.168.4.1:1880/data')
    ws.onopen = () => setConnection(true)
    ws.onmessage = msg => {
      let _msg = msg.data.split(':')
      _msg && setValues({ ...values, [_msg[0]]: _msg[1] })
    }
    ws.onerror = err => console.warn(err)
    ws.onclose = () => {
      setConnection(false)
      ws.close()
    }
    return () => {
      ws.close()
    }
  }, [])

  // TODO : I want to save all the data but only show data depending on the duration set
  // ALSO : Set the initial length of the array to the duration to stop the scale shifting

  useEffect(() => {
    let _new = { ...data }
    Object.keys(values).map(i => {
      let temp = [...data[i]]
      temp.push(parseInt(values[i]))
      if (temp.length >= 100) temp.shift()
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
