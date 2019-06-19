import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons, Entypo } from '@expo/vector-icons'

const ControlBar = props => (
  <View style={[styles.controlBar]}>
    <TouchableOpacity style={[styles.container, styles.r1]}>
      {props.wifiStatus ? (
        <Ionicons name="ios-checkmark-circle" size={28} color="rgba(46, 204, 113,1.0)" />
      ) : (
        <Ionicons name="ios-close-circle" size={28} color="rgba(231, 76, 60,1.0)" />
      )}
    </TouchableOpacity>
    <TouchableOpacity style={[styles.container, styles.r1]}>
      <Ionicons name="ios-options" size={28} color="black" />
    </TouchableOpacity>
    <TouchableOpacity style={[styles.container, styles.r1]}>
      <Entypo name="grid" size={28} color="black" />
    </TouchableOpacity>
    <View style={[styles.container, styles.timeLine]}>
      <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{props.chartLengthNum}</Text>
    </View>
    <View style={{ flexDirection: 'row', width: 170 }}>
      <TouchableOpacity
        style={[
          styles.container,
          styles.timeLine,
          { borderBottomColor: props.chartLengthNum === 50 ? '#fff' : '#f39c12' }
        ]}
        onPress={() => props.chartLength('minus')}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: props.chartLengthNum === 50 ? 'grey' : '#000' }}>
          -
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.container,
          styles.timeLine,
          { borderBottomColor: props.chartLengthNum >= 500 ? '#fff' : '#f39c12' }
        ]}
        onPress={() => props.chartLength('plus')}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: props.chartLengthNum === 500 ? 'grey' : '#000' }}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  </View>
)

const styles = StyleSheet.create({
  controlBar: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    width: '100%'
  },
  timeLine: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#f39c12',
    borderBottomWidth: 2
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

export default ControlBar
