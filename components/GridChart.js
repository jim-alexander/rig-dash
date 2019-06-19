import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import Chart from './Chart'
import * as shape from 'd3-shape'

let mainChecker = (main, title, type) => {
  if (main === null) {
    return type === 'font' ? 50 : 1
  }
  if (main === title) {
    return type === 'font' ? 55 : 4
  } else {
    return type === 'font' ? 25 : 1
  }
}

const GridChart = props => (
  <TouchableOpacity
    style={[styles.row, { flex: mainChecker(props.main, props.title, 'flex') }]}
    onPress={() => props.changeMain(props.title)}>
    <View style={[styles.container, styles.r1]}>
      <Chart
        data={props.data}
        color={props.color}
        shadowColor={props.color.replace('1.0', '0.2')}
        curveType={shape.curveNatural}
      />
    </View>
    <View style={[styles.container, styles.r2, { borderLeftColor: props.color, borderLeftWidth: 3 }]}>
      <Text style={{ fontSize: mainChecker(props.main, props.title, 'font'), fontWeight: 'bold' }}>{props.value}</Text>
      <Text style={{ color: 'grey' }}>{props.title}</Text>
    </View>
  </TouchableOpacity>
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
  }
})

export default GridChart
