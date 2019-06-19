import React from 'react'
import { StyleSheet, View } from 'react-native'

import ControlBar from './components/ControlBar'
import GridChart from './components/GridChart'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      wifiStatus: false,
      rpm: 0,
      litres: 0,
      tonne: 0,
      psi: 0,
      rpmData: [],
      litreData: [],
      weightData: [],
      psiData: [],
      modalVisible: false,
      chartLength: 200,
      main: null
    }
    this.ws = new WebSocket('ws://192.168.4.1:3000')
  }
  componentDidMount() {
    this.ws.onopen = () => {
      this.setState({ wifiStatus: true })
      this.state.litreData.length = this.state.chartLength
      this.state.psiData.length = this.state.chartLength
      console.log('💻️: Connected')
    }
    this.ws.onclose = () => {
      this.setState({ wifiStatus: false })
      console.log('💻️: Disconnected')
    }
    this.ws.onmessage = msg => this.gotData(msg.data)
  }
  gotData = data => {
    let inputs = data.split(' ')
    let p0 = (parseFloat(inputs[0]) - 105) * 0.21
    let p1 = parseFloat(inputs[1])
    if (p0 >= 0 && p1 >= 0) {
      this.setState({
        psi: p0.toFixed(0),
        psiData: [...this.state.psiData, p0]
      })
    }
    this.state.psiData.length >= this.state.chartLength ? this.state.psiData.shift() : null
    this.state.litreData.length >= this.state.chartLength ? this.state.litreData.shift() : null
  }

  changeMain = val => (this.state.main === val ? this.setState({ main: null }) : this.setState({ main: val }))

  chartLength = type => {
    if (type === 'plus') {
      if (this.state.chartLength < 500) {
        this.setState({ chartLength: this.state.chartLength + 50 }, () => {
          for (let i = 0; i < 50; i++) {
            this.state.psiData.unshift()
          }
        })
      }
    } else if (type === 'minus') {
      if (this.state.chartLength > 50) {
        this.setState({ chartLength: this.state.chartLength - 50 }, () => {
          for (let i = 0; i < 50; i++) {
            this.state.psiData.shift()
          }
        })
      }
    }
  }
  render() {
    const { rpm, rpmData, litres, litreData, tonne, weightData, psi, psiData, wifiStatus, main } = this.state
    return (
      <View style={styles.body}>
        <GridChart
          value={rpm}
          title="RPM"
          data={rpmData}
          color="rgba(192, 57, 43,1.0)"
          main={main}
          changeMain={this.changeMain}
        />
        <GridChart
          value={litres}
          title="L/s"
          data={litreData}
          color="rgba(41, 128, 185,1.0)"
          main={main}
          changeMain={this.changeMain}
        />
        <GridChart
          value={tonne}
          title="Tonne"
          data={weightData}
          color="rgba(39, 174, 96,1.0)"
          main={main}
          changeMain={this.changeMain}
        />
        <GridChart
          value={psi}
          title="PSI"
          data={psiData}
          color="rgba(52, 73, 94, 1.0)"
          main={main}
          changeMain={this.changeMain}
        />
        <ControlBar wifiStatus={wifiStatus} chartLength={this.chartLength} chartLengthNum={this.state.chartLength} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: '#ecf0f1',
    paddingTop: 18,
    padding: 5
  }
})
