import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import Chart from './Chart'
import * as shape from 'd3-shape'
import { withData } from './context'

export default withData(({ type, values, data }) => (
  <TouchableOpacity style={[styles.row]}>
    <View style={[styles.container, styles.r1]}>
      <Chart
        data={data[type.id]}
        color={type.color}
        shadowColor={type.color.replace('1.0', '0.2')}
        curveType={shape.curveNatural}
      />
    </View>
    <View style={[styles.container, styles.r2, { borderLeftColor: type.color, borderLeftWidth: 3 }]}>
      <Text style={styles.value}>{values[type.id]}</Text>
      <Text style={styles.title}>{type.title}</Text>
      <Text style={styles.index}>{values[type.id]}</Text>
    </View>
  </TouchableOpacity>
))

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 5,
    borderRadius: 4,
    margin: 5,
    justifyContent: 'center'
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
  value: {
    fontWeight: 'bold',
    fontSize: 35
  },
  index: {
    fontWeight: '600',
    fontSize: 13
  },
  title: {
    color: 'grey'
  }
})
