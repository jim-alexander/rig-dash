import React, { Component } from 'react'
import { StyleSheet, Text, View, Modal, TouchableHighlight } from 'react-native'

export default class Status extends Component {
  render() {
    return (
      <Modal
        animationType="fade"
        transparent={false}
        visible={this.props.visible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(127, 140, 141,0.2)'
        }}>
          <View style={{
            width: 300,
            height: 300,
            backgroundColor: '#fff',
            padding: 30,
          }}>
            <Text style={styles.header}>Status</Text>
            <Text>Everything is fine.</Text>
            <View style={{flexDirection:'column', height: '80%',justifyContent: 'flex-end'}}>
              <TouchableHighlight
                onPress={() => {
                  this.props.visibleFunction(!this.props.visible);
                }}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableHighlight>
            </View>
          </View>

        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30 
  },
  closeButton: {
    backgroundColor: '#3498db',
    color: '#fff',
    borderRadius: 4,
    overflow: 'hidden',
    marginVertical: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 10
  }
})
