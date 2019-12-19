import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { AppProvider } from './components/context'

import ControlBar from './components/ControlBar'
import Rows from './components/Rows'

export default () => (
  <AppProvider>
    <View style={styles.body}>
      <Rows />
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
