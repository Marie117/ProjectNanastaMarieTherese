import React from 'react'
import { View, Text, Image, StyleSheet, Alert } from 'react-native'
import { Icon } from 'react-native-elements'



export default class ListeRow extends React.Component{ 
  
  render(){
    return (
          <View style={styles.row}>
              <Image style={styles.picture} source={{ uri: this.props.image_url }} />
              <View style={{width: 250}} >
                <Text style={styles.primaryText}>
                {this.props.name}
                </Text>
                <Text style={styles.secondaryText}>
                {this.props.participant}
                </Text>
                <Text style={styles.secondaryText}>
                {this.props.lieu}
                </Text>
                <Text style={styles.secondaryText}>
                {this.props.date}
                </Text>
                <Text style={styles.secondaryText}>
                {this.props.heure}
                </Text>
              </View>
              <View>
                <Icon
                  name='delete'
                  type='material'
                  color='#0A0A73' 
                  onPress={() => 
                  Alert.alert(
                  'Delete',
                  'Are you sure want to delete this row ?',
                  [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => 
                    this.deleteListe}
                  ],
                  { cancelable: true }
                  )
                  }
                />  
              </View>
      </View>
    )
  }
}  

const styles = StyleSheet.create({
  row: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 12 ,
    borderBottomWidth:1,
    borderBottomColor:'#1A24A4',
  },
  picture: {
     width: 50, 
     height: 50, 
     borderRadius: 25, 
     marginRight: 18 
    },
  primaryText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
    marginBottom: 4,
  },
  secondaryText: { 
    color: '#132959' ,
    fontSize: 18
},
})