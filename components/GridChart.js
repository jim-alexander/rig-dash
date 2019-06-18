import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import Chart from './Chart'
import * as shape from 'd3-shape'

export default class GridChart extends Component {
  
  render() {
    return (
      <TouchableOpacity
        style={[styles.row, { flex: this.props.main === this.props.title ? 3 : 1 }]}
        onPress={() => this.props.changeMain(this.props.title)}>
        <View style={[styles.container, styles.r1]}>
          <Chart
            data={this.props.data}
            color={this.props.color}
            shadowColor={this.props.color.replace('1.0', '0.2')}
            curveType={shape.curveNatural}
          />
        </View>
        <View style={[styles.container, styles.r2, { borderLeftColor: this.props.color, borderLeftWidth: 3 }]}>
          <Text style={{ fontSize: 50, fontWeight: 'bold' }}>{this.props.value}</Text>
          <Text style={{ color: 'grey' }}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

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
