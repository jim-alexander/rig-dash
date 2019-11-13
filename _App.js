import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { AppProvider } from './components/context'

// import ControlBar from './components/ControlBar'
import GridChart from './components/GridChart'

export default () => {
  return (
    <AppProvider value={{ rpm, litres, tonne, psi }}>
      <View style={styles.body}>
        <GridChart value={rpm.value} title="RPM" data={rpmData.data} color="rgba(192, 57, 43,1.0)" />
        <GridChart value={litres.value} title="L/s" data={litreData.data} color="rgba(41, 128, 185,1.0)" />
        <GridChart value={tonne.value} title="Tonne" data={weightData.data} color="rgba(39, 174, 96,1.0)" />
        <GridChart value={psi.value} title="PSI" data={psiData.data} color="rgba(52, 73, 94, 1.0)" />
        {/* <ControlBar /> */}
      </View>
    </AppProvider>
  )
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
