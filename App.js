import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Chart from './components/Chart' 
import Status from './components/Status' 
import * as shape from 'd3-shape'

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      rpm: 0,
      litres: 0,
      tonne: 0,
      psi: 0,
      rpmData: [],
      litreData: [],
      weightData: [],
      psiData: [],
      modalVisible: false,
    }
    this.setModalVisible = this.setModalVisible.bind(this)
  }
  componentDidMount() {
    const intervalId = setInterval(() => this.randomData(), 500);
    this.setState({ intervalId })
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  componentWillUnmount() {
    // Make sure to clear the interval, on unmount
    clearInterval(this.state.intervalId);
  }
  randomData() {

    let rpm = Math.floor(Math.random() * 50) + 1;
    let litres = Math.floor(Math.random() * 10) + 1;
    let tonne = Math.floor(Math.random() * 5) + 1;
    let psi = Math.floor(Math.random() * 1000) + 1;
    this.setState({
      rpm,
      litres,
      tonne,
      psi,
      rpmData: [...this.state.rpmData, rpm],
      litreData: [...this.state.litreData, litres],
      weightData: [...this.state.weightData, tonne],
      psiData: [...this.state.psiData, psi],
    });
    if (this.state.rpmData.length >= 25) {
      this.state.rpmData.splice(0, 1)
    }
    if (this.state.litreData.length >= 25) {
      this.state.litreData.splice(0, 1)
    }
    if (this.state.weightData.length >= 25) {
      this.state.weightData.splice(0, 1)
    }
    if (this.state.psiData.length >= 25) {
      this.state.psiData.splice(0, 1)
    }
  }

  render() {
    return (
      <View style={styles.body}>
        <View style={styles.row}>
          <View style={[styles.container, styles.r1]}>
            <Chart data={this.state.rpmData} color={'#c0392b'} shadowColor={'rgba(231, 76, 60,0.2)'} curveType={shape.curveBasis} />

          </View>
          <View style={[styles.container, styles.r2, { borderLeftColor: '#c0392b', borderLeftWidth: 2 }]}>
            <Text style={{ fontSize: 60, fontWeight: 'bold' }}>{this.state.rpm}</Text>
            <Text style={{ color: 'grey' }}>RPM</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.container, styles.r1]}>
            <Chart data={this.state.litreData} color={'#2980b9'} shadowColor={'rgb(52, 152, 219, 0.2)'} curveType={shape.curveBasis} />

          </View>
          <View style={[styles.container, styles.r2, { borderLeftColor: '#2980b9', borderLeftWidth: 2 }]}>
            <Text style={{ fontSize: 60, fontWeight: 'bold' }}>{this.state.litres}</Text>
            <Text style={{ color: 'grey' }}>L/s</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.container, styles.r1]}>
            <Chart data={this.state.weightData} color={'#27ae60'} shadowColor={'rgba(46, 204, 113,0.2)'} curveType={shape.curveStep} />

          </View>
          <View style={[styles.container, styles.r2, { borderLeftColor: '#27ae60', borderLeftWidth: 2 }]}>
            <Text style={{ fontSize: 60, fontWeight: 'bold' }}>{this.state.tonne}</Text>
            <Text style={{ color: 'grey' }}>Tonne</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.r0, { flexDirection: 'column' }]}>
            <View style={[styles.container, { justifyContent: 'space-evenly', flexGrow: 1 }]}>
              <Ionicons name="ios-wifi" size={28} color="black" />
              <Ionicons name="ios-options" size={28} color="black" />
            </View>
            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(true);
              }}>
              <View style={[styles.container, { justifyContent: 'space-evenly', height: 50 }]}>
                <Ionicons name="ios-checkmark-circle" size={28} color="rgba(46, 204, 113,1.0)" />
                {/* <Ionicons name="ios-close-circle" size={28} color="rgba(231, 76, 60,1.0)" />  */}
              </View>
            </TouchableHighlight>
          </View>
          <View style={[styles.container, styles.r1]}>
            <Chart data={this.state.psiData} color={'#f39c12'} shadowColor={'rgba(241, 196, 15,0.2)'} curveType={shape.curveLinear} />
          </View>
          <View style={[styles.container, styles.r2, { borderLeftColor: '#f39c12', borderLeftWidth: 2 }]}>
            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>{this.state.psi}</Text>
            <Text style={{ color: 'grey' }}>PSI</Text>
          </View>
        </View>
        <View style={[styles.timeLine]}>
          <View style={[styles.container, styles.r1]}>
          </View>
          <View style={[styles.container, styles.r2, { flexDirection: 'row' }]}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginRight: 30 }}>-</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 30 }}>+</Text>
          </View>
        </View>
        <Status visible={this.state.modalVisible} visibleFunction={this.setModalVisible} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: '#ecf0f1',
    paddingTop: 20,
    paddingBottom: 10
  },
  container: {
    marginVertical: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 5,
    borderRadius: 4,
    marginLeft: 10,
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: '#bdc3c7'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  r0: {
    width: 65
  },
  r1: {
    flexGrow: 1,
  },
  r2: {
    width: 160,
    marginRight: 10,
  },
  timeLine: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  status: {
    // backgroundColor: '#2ecc71',
    // borderColor: '#2ecc71'
  }
});
