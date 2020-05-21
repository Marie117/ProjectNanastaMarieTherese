import React from 'react';
import { 
  StyleSheet,
  View, 
  Dimensions, 
  FlatList, 
 }
  from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import ListeRow from './ListeRow';



var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const actions = [
  {
    text: "Add",
    icon: require("./assets/add_white.png"),
    name: "btn_add",
    position: 1
  }
];

export default class Liste extends React.Component {

  
  constructor(props){
    super(props);
    this.navigation = props.navigation;
    this.state = {
      liste: [],
    }
    
  }
  
  componentDidMount(){
    fetch("https://demo1782275.mockable.io/")
    .then(response => response.json())
    .then((responseJson)=> {
      console.log('We are here');
      this.setState({
        liste: responseJson,
      })
    })
    .catch(error => console.log(error)) //to catch the errors if any
  }

  
  
  render() { 
   return (
      <View style={styles.container}>
        <FlatList 
          style={styles.list}
          data={this.state.liste}
          renderItem={
            ({ item  }) => 
              <ListeRow
                name={item.name}
                lieu={item.lieu}
                date={item.date}
                heure={item.heure}
                participant={item.Participant}
                image_url={item.image_url}
                navigation={this.navigation}
              />
            }
          >  
        </FlatList>
        <FloatingAction
          actions={actions}
          onPressItem={name => {
            if(name === 'btn_add'){
              this.navigation.navigate('Add');
            }
          }}
        />
      </View>
     
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'column'
  },
  list: {
     
  },
});