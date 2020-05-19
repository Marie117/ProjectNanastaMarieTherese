import React, {Component} from 'react';
import { StyleSheet, 
    Text, View, 
    TextInput, TouchableOpacity, 
    Dimensions, 
    } from 'react-native';



var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state={
            login : "",
            password : ""
        }
    }

    validate_field=()=>{
        const { login, password } = this.state
        if(login == ""){
            alert("Your Login Please!")
            return false
        }else if(password == ""){
            alert("Your password Please!")
            return false
        }
        return true
    }

    making_call=()=>{
        if(this.validate_field()){
            alert("Successfully login!")
            this.props.navigation.navigate('Liste')
          }
    }
    
   render(){
     return (
             <View style={styles.container}>
                    <Text style={styles.home}>Welcome To Our Meeting App</Text>
                        <View>
                            <TextInput style={styles.input} 
                                    onChangeText={(value)=> this.setState({login : value})}
                                    placeholder="Login"
                                    placeholderTextColor = "#ffffff"
                                />

                            <TextInput style={styles.input} 
                                    onChangeText={(value)=> this.setState({password : value})}
                                    placeholder="Password"
                                    secureTextEntry={true}
                                    placeholderTextColor = "#ffffff"
                                />
                                
                            <TouchableOpacity style={styles.button} 
                            onPress={() =>
                                  this.making_call()}>
                                <Text style={styles.buttonText}>Login</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={styles.signUp}>
                            <Text style={styles.signUpTxt}>You have to login first!</Text>
                            <Text style={styles.signUpButton}>Login</Text>
                        </View>
            </View>
         
        
        )
    }
    
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  home: {
      fontSize: 22,
      marginVertical: 55,
      color: '#000000'
  },
  input: {
      backgroundColor: '#1A24A4',
      marginVertical: 25,
      width: 300,
      borderRadius: 25,
      paddingVertical: 12,
      paddingHorizontal: 16,
      color: '#ffffff',
      fontSize: 18,
  },
  buttonText: {
      fontSize: 18,
      fontWeight: '500',
      color: '#ffffff',
      textAlign: 'center'
  },
  button: {
    width: 300,
    borderRadius: 25,
    marginVertical: 45,
    paddingVertical: 12,
    backgroundColor:'#15226D'
  },
  signUp: {
    flexGrow:  1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  signUpTxt: {
    marginVertical: 45,
    fontWeight: '500',
      fontSize: 18
  },
  signUpButton: {
    color:'#004C8C',
    fontSize: 16,
    marginVertical: 45,
}
});
