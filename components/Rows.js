import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import Chart from './Chart'
import * as shape from 'd3-shape'
import { withData } from './context'

const charts = [
  { title: 'RPM', color: 'rgba(192, 57, 43,1.0)', id: 'rpm' },
  { title: 'L/s', color: 'rgba(41, 128, 185,1.0)', id: 'litres' },
  { title: 'Tonne', color: 'rgba(39, 174, 96,1.0)', id: 'tonne' },
  { title: 'PSI', color: 'rgba(52, 73, 94, 1.0)', id: 'psi' }
]

const val = (data, type) => {
  let value = data[type.id][data[type.id].length - 1]
  return value === -921233 ? 'err' : value
}

export default withData(({ data, duration }) =>
  charts.map(type => (
    <View style={[styles.row]} key={type.id}>
      <View style={[styles.container, styles.r1]}>
        <Chart
          data={data[type.id]}
          color={type.color}
          shadowColor={type.color.replace('1.0', '0.2')}
          curveType={shape.curveNatural}
          duration={duration.value}
        />
      </View>
      <View style={[styles.container, styles.r2, { borderLeftColor: type.color, borderLeftWidth: 3 }]}>
        <Text style={styles.value}>{val(data, type)}</Text>
        <Text style={styles.title}>{type.title}</Text>
      </View>
    </View>
  ))
)

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
