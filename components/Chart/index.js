import React from 'react'
import { LineChart, Grid, Path, XAxis, YAxis } from 'react-native-svg-charts'
import { View } from 'react-native'

export default class Chart extends React.PureComponent {

  render() {
    const Shadow = ({ line }) => (
      <Path
        key={'shadow'}
        y={2}
        d={line}
        fill={'none'}
        strokeWidth={4}
        stroke={this.props.shadowColor}
      />
    )
    const axesSvg = { fontSize: 10, fill: 'grey' };
    const verticalContentInset = { top: 10, bottom: 10 }
    const xAxisHeight = 30

    return (
      <View style={{ height: '100%', padding: 10, flexDirection: 'row' }}>

        <View style={{ flex: 1, marginLeft: 10 }}>
          <LineChart
            style={{ flex: 1 }}
            data={this.props.data}
            svg={{ stroke: this.props.color, strokeWidth: 1.5 }}
            contentInset={{ top: 20, bottom: 20 }}
            curve={this.props.curveType} 
            // animate={true}
          >
            <Grid />
            <Shadow />

          </LineChart>
          {/* <XAxis
            style={{ marginHorizontal: -10, height: xAxisHeight }}
            data={this.props.data}
            formatLabel={(value, index) => index}
            contentInset={{ left: 10, right: 10 }}
            svg={axesSvg}
          /> */}
        </View>

        <YAxis
          data={this.props.data}
          style={{ marginLeft: 5 }} // marginBottom: xAxisHeight,
          contentInset={verticalContentInset}
          svg={axesSvg}
        />
      </View>
    )
  }

}