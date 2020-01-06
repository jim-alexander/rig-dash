import React from 'react'
import { LineChart, Grid, Path, XAxis, YAxis } from 'react-native-svg-charts'
import { View, StyleSheet } from 'react-native'

export default ({ data, shadowColor, color, curveType, duration }) => {
  const Shadow = ({ line }) => <Path key={'shadow'} y={2} d={line} fill={'none'} strokeWidth={4} stroke={shadowColor} />
  const axesSvg = { fontSize: 10, fill: 'grey' }
  const verticalContentInset = { top: 10, bottom: 10 }
  let min = data.length - duration > 0 ? data.length - duration : 0
  let _data = data.slice(min, data.length)
  return (
    <View style={{ height: '100%', paddingHorizontal: 5, flexDirection: 'row' }}>
      {/* TODO : Click to show number at that time */}

      <View style={{ flex: 1, marginLeft: 10 }}>
        <LineChart
          style={{ flex: 1 }}
          data={_data}
          svg={{ stroke: color, strokeWidth: 1.5 }}
          contentInset={{ top: 20, bottom: 20 }}
          curve={curveType}>
          <Grid />
          <Shadow />
        </LineChart>
        {/* <XAxis
          style={{ marginHorizontal: -10, height: 30 }}
          data={[3, 15, 20]}
          // formatLabel={(value, index) => value}
          contentInset={{ left: 10, right: 10 }}
          svg={axesSvg}
        /> */}
      </View>

      <YAxis
        data={_data}
        numberOfTicks={5}
        formatLabel={value => value}
        style={{ marginLeft: 5 }} // marginBottom: xAxisHeight,
        contentInset={verticalContentInset}
        svg={axesSvg}
      />
    </View>
  )
}
// const styles = StyleSheet.create({
//   selected: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     backgroundColor: '#f3f3f3',
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     zIndex: 50,
//     borderRadius: 4
//   }
// })
