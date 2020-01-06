import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons, Entypo } from '@expo/vector-icons'

import { withData } from './context'

export default withData(({ connection, duration, changeDuration }) => (
  <View style={[styles.controlBar]}>
    <TouchableOpacity style={[styles.container, styles.r1]}>
      {connection ? (
        <Ionicons name='ios-checkmark-circle' size={28} color='rgba(46, 204, 113,1.0)' />
      ) : (
        <Ionicons name='ios-close-circle' size={28} color='rgba(231, 76, 60,1.0)' />
      )}
    </TouchableOpacity>
    <TouchableOpacity style={[styles.container, styles.r1]}>
      <Ionicons name='ios-options' size={28} color='black' />
    </TouchableOpacity>
    <TouchableOpacity style={[styles.container, styles.r1]}>
      <Entypo name='grid' size={28} color='black' />
    </TouchableOpacity>
    <View style={[styles.container, styles.timeLine]}>
      <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{duration.value / 60}</Text>
      <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'grey' }}>Minute{duration.value / 60 !== 1 && 's'}</Text>
    </View>
    <View style={{ flexDirection: 'row', width: 170 }}>
      <TouchableOpacity
        style={[
          styles.container,
          styles.timeLine,
          { borderBottomColor: duration.value === duration.min ? '#fff' : '#f39c12' }
        ]}
        onPress={() => changeDuration(false)}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: duration.value === duration.min ? 'grey' : '#000' }}>
          -
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.container,
          styles.timeLine,
          { borderBottomColor: duration.value >= duration.max ? '#fff' : '#f39c12' }
        ]}
        onPress={() => changeDuration(true)}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: duration.value === duration.max ? 'grey' : '#000' }}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  </View>
))

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
