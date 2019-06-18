import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Chart from './components/Chart'
import ModalWindow from './components/Modal'
import * as shape from 'd3-shape'

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
      chartLength: 200
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
    let pin_0 = (parseFloat(inputs[0]) - 105) * 0.21
    let pin_1 = parseFloat(inputs[1])
    if (pin_0 >= 0 && pin_1 >= 0) {
      // console.log(pin_0)
      this.setState({
        psi: pin_0.toFixed(0),
        psiData: [...this.state.psiData, pin_0]
        // litres: pin_1,
        // litreData: [...this.state.litreData, pin_1]
      })
    }
    if (this.state.psiData.length >= this.state.chartLength) {
      this.state.psiData.shift()
    }
    if (this.state.litreData.length >= this.state.chartLength) {
      this.state.litreData.shift()
    }
  }

  render() {
    return (
      <View style={styles.body}>
        <View style={styles.row}>
          <View style={[styles.container, styles.r1]}>
            <Chart
              data={this.state.rpmData}
              color="#c0392b"
              shadowColor="rgba(231, 76, 60,0.2)"
              curveType={shape.curveBasis}
            />
          </View>
          <View style={[styles.container, styles.r2, { borderLeftColor: '#c0392b', borderLeftWidth: 3 }]}>
            <Text style={{ fontSize: 60, fontWeight: 'bold' }}>{this.state.rpm}</Text>
            <Text style={{ color: 'grey' }}>RPM</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.container, styles.r1]}>
            <Chart
              data={this.state.litreData}
              color="#2980b9"
              shadowColor="rgb(52, 152, 219, 0.2)"
              curveType={shape.curveBasis}
            />
          </View>
          <View style={[styles.container, styles.r2, { borderLeftColor: '#2980b9', borderLeftWidth: 3 }]}>
            <Text style={{ fontSize: 60, fontWeight: 'bold' }}>{this.state.litres}</Text>
            <Text style={{ color: 'grey' }}>L/s</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.container, styles.r1]}>
            <Chart
              data={this.state.weightData}
              color="#27ae60"
              shadowColor="rgba(46, 204, 113,0.2)"
              curveType={shape.curveStep}
            />
          </View>
          <View style={[styles.container, styles.r2, { borderLeftColor: '#27ae60', borderLeftWidth: 3 }]}>
            <Text style={{ fontSize: 60, fontWeight: 'bold' }}>{this.state.tonne}</Text>
            <Text style={{ color: 'grey' }}>Tonne</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.container, styles.r1]}>
            <Chart
              data={this.state.psiData}
              color="#34495e"
              shadowColor="rgba(52, 73, 94, .2)"
              // curveType={shape.curveLinear}
              curveType={shape.curveNatural}
            />
          </View>
          <View style={[styles.container, styles.r2, { borderLeftColor: '#34495e', borderLeftWidth: 3 }]}>
            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>{this.state.psi}</Text>
            <Text style={{ color: 'grey' }}>PSI</Text>
          </View>
        </View>
        <View style={[styles.controlBar]}>
          <TouchableOpacity style={[styles.container, styles.r1]}>
            <Ionicons name="ios-wifi" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.container, styles.r1]}
            onPress={() => this.setState({ rpmData: [], litreData: [], weightData: [], psiData: [] })}>
            <Ionicons name="ios-options" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.container, styles.r1]}>
            {this.state.wifiStatus ? (
              <Ionicons name="ios-checkmark-circle" size={28} color="rgba(46, 204, 113,1.0)" />
            ) : (
              <Ionicons name="ios-close-circle" size={28} color="rgba(231, 76, 60,1.0)" />
            )}
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', width: 170 }}>
            <TouchableOpacity style={[styles.container, styles.timeLine]}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.container, styles.timeLine]}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 5
  },
  container: {
    marginVertical: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 5,
    borderRadius: 4,
    margin: 5,
    justifyContent: 'center'
    // borderWidth: 1,
    // borderColor: '#bdc3c7'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  r1: {
    flexGrow: 1
  },
  r2: {
    width: 160
  },
  controlBar: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  timeLine: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
