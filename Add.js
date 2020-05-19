import React from 'react';
import { 
  StyleSheet,
  View, 
  TouchableOpacity, Text, Button, ScrollView,
   Image, TextInput, Dimensions, Alert, AsyncStorage}
   from 'react-native';
import { db } from './config';


var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height



export default class Add extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        listeArray: [],
        name: '',
        lieu: '',
        date: '',
        participant: ''
      };
    }
    createListe = () => {
      return new Promise((resolve, reject) => {
        const { listeArray, lieu, name, participant, date, heure } = this.state

        var d = new Date();
        const newElement = {
          'name': name,
          'lieu': lieu,
          'date':d.getFullYear()+ "/"+(d.getMonth()+1) + "/"+ d.getDate() , 
          'heure': heure,
          'participant': participant
        }

        this.setState({
           listeArray: [...listeArray, newElement ],
           name: '', 
           lieu:'',
           date: '',
           heure:'',
           participant: ''                 
        }, () => resolve(newElement)) 

      })
    }
   
    _addListeToFirebase = () => {
      const refInDatabase = db.ref('Items/001');
      this.createListe()
        .then((elementRecived) => refInDatabase.push(elementRecived))
        .then(() => console.log('inserted'))
        .catch((error) => console.log(error));
        Alert.alert('Item saved successfully');
        this.props.navigation.navigate('List')
    }
    deleteListe = (key) => {
      const { listeArray } = this.state
      this.setState({
        listeArray: listeArray.splice(key, 1) 
      })
    }  
  
    render()
    {
        return (
            <View style={styles.container}>
              <View>
              <Image
                  style={styles.image}
                  source={{
                  uri: 'https://i.pravatar.cc/200'
                          }}
                />
              </View>
                  <View>
                    <TextInput
                      placeholder='Name'
                      value={this.state.name}
                      style={styles.simpleInput}
                      onChangeText={(name)=> this.setState({name})}
                    />
                    <TextInput
                      placeholder='Lieu'
                      value={this.state.lieu}
                      style={styles.simpleInput}
                      onChangeText={(lieu)=> this.setState({lieu})}
                    />
                    <TextInput
                      placeholder='Date'
                      value={this.state.date}
                      style={styles.simpleInput}
                      onDateChange={(date) => { this.setState({ date: date }) }}
                    />
                    <TextInput
                      placeholder='Heure'
                      value={this.state.heure}
                      style={styles.simpleInput}
                      onChangeText={(heure)=> this.setState({heure})}
                    />
                    <TextInput
                      placeholder='Participant'
                      value={this.state.participant}
                      style={styles.simpleInput}
                      onChangeText={(participant)=> this.setState({participant})}
                    />
                    <TouchableOpacity style={styles.button} 
                            onPress={() =>
                              this.props.navigation.navigate('DateTime')}>
                                <Text style={styles.buttonText}>Date & Time</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} 
                               onPress={this._addListeToFirebase}
                               >
                      <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                  </View>
            </View>
        )
    }
    

  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#6565fc',
      alignItems: 'center',
      
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 50,
      paddingHorizontal: 10,
      paddingVertical: 12,
    },
    simpleInput: {
      width: width - 40,
      marginTop: 30,
      height: 40,
      borderColor: '#004058',
      paddingHorizontal: 10,
      borderWidth: 1,
      borderRadius: 25,
      fontSize: 18
    },
    button:{
      width: 300,
      borderRadius: 25,
      marginVertical: 45,
      paddingVertical: 12,
      backgroundColor:'#15226D'
    },
  buttonText: {
      fontSize: 18,
      fontWeight: '500',
      color: '#ffffff',
      textAlign: 'center'
  }
   
      
  });