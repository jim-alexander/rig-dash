import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons, Entypo } from '@expo/vector-icons'

export default class ControlBar extends Component {
  render() {
    return (
      <View style={[styles.controlBar]}>
        <TouchableOpacity style={[styles.container, styles.r1]}>
          <Entypo name="grid" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.container, styles.r1]}>
          <Ionicons name="ios-wifi" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.container, styles.r1]}>
          <Ionicons name="ios-options" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.container, styles.r1]}>
          {this.props.wifiStatus ? (
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
    )
  }
}

const styles = StyleSheet.create({
  controlBar: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    width: '100%'
  },
  timeLine: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    marginVertical: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 5,
    borderRadius: 4,
    margin: 5,
    justifyContent: 'center'
  },
  r1: {
    flexGrow: 1
  }
})
