import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { AppProvider } from './components/context'

import ControlBar from './components/ControlBar'
import GridChart from './components/GridChart'

const charts = [
  { title: 'RPM', color: 'rgba(192, 57, 43,1.0)', id: 'rpm' },
  { title: 'L/s', color: 'rgba(41, 128, 185,1.0)', id: 'litres' },
  { title: 'Tonne', color: 'rgba(39, 174, 96,1.0)', id: 'tonne' },
  { title: 'PSI', color: 'rgba(52, 73, 94, 1.0)', id: 'psi' }
]

export default () => (
  <AppProvider>
    <View style={styles.body}>
      {charts.map(type => (
        <GridChart type={type} key={type.id} />
      ))}

      <ControlBar />
    </View>
  </AppProvider>
)

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
