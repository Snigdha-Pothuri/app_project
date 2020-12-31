import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import{Card,Header,Icon} from 'react-native-elements';
import firebase from 'firebase';

import db from '../config.js';

export default class DonorDetailsScreen extends Component{
  constructor(props){
    super(props);
    this.state={
      userId          : firebase.auth().currentUser.email,
      userName        : "",
      donorId   : this.props.navigation.getParam('details')["user_id"],
      requestId       : this.props.navigation.getParam('details')["request_id"],
      petAge     : this.props.navigation.getParam('details')["petAge"],
      petBreed   : this.props.navigation.getParam('details')["pet_breed"],
     donorName    : '',
     donorContact : '',
    donorAddress : '',
     donorRequestDocId : ''
    }
  }



  getdonorDetails(){
    db.collection('users').where('email_id','==',this.state.donorId).get()
    .then(snapshot=>{
      snapshot.forEach(doc=>{
        this.setState({
          donorName    : doc.data().first_name,
          donorContact : doc.data().contact,
          donorAddress : doc.data().address,
        })
      })
    });

    db.collection('donatePet').where('request_id','==',this.state.requestId).get()
    .then(snapshot=>{
      snapshot.forEach(doc => {
        this.setState({donorRequestDocId:doc.id})
     })
  })}


  getUserDetails=(userId)=>{
    db.collection("users").where('email_id','==', userId).get()
    .then((snapshot)=>{
      snapshot.forEach((doc) => {
        this.setState({
          userName  :doc.data().first_name + " " + doc.data().last_name
        })
      })
    })
  }

  updatePetStatus=()=>{
    db.collection('all_adoptions').add({
      "petAge"           : this.state.petAge,
      "request_id"          : this.state.requestId,
      "donated_by"        : this.state.donorName,
      "adoptor_id"            : this.state.userId,
      "request_status"      :  "Donor Interested",
      "pet_breed" : this.state.petBreed
    })
  }


  addNotification=()=>{
    var message = this.state.userName + " has shown interest in adopting your pet"
    db.collection("all_notifications").add({
      "targeted_user_id"    : this.state.donorId,
      "adoptor_id"            : this.state.userId,
      "request_id"          : this.state.requestId,
      "petAge"           : this.state.petAge,
      "date"                : firebase.firestore.FieldValue.serverTimestamp(),
      "notification_status" : "unread",
      "message"             : message,
      "pet_breed" : this.state.petBreed
        })
  }

  componentDidMount(){
    this.getdonorDetails()
    this.getUserDetails(this.state.userId)
  }


    render(){
      return(
        <View style={styles.container}>
          <View style={{flex:0.1}}>
            <Header
              leftComponent ={<Icon name='arrow-left' type='feather' color='#696969'  onPress={() => this.props.navigation.navigate("Home")}/>}
              centerComponent={{ text:"Donate Books", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
              backgroundColor = "#eaf8fe"
            />
          </View>
          <View style={{flex:0.3}}>
            <Card
                title={"Pet Information"}
                titleStyle= {{fontSize : 20}}
              >
              <Card >
                <Text style={{fontWeight:'bold'}}>Pet Age : {this.state.petAge}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'bold'}}>Breed : {this.state.petBreed}</Text>
              </Card>
            </Card>
          </View>
          <View style={{flex:0.3}}>
            <Card
              title={"donor Information"}
              titleStyle= {{fontSize : 20}}
              >
              <Card>
                <Text style={{fontWeight:'bold'}}>Name: {this.state.donorName}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'bold'}}>Contact: {this.state.donorContact}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'bold'}}>Address: {this.state.donorAddress}</Text>
              </Card>
            </Card>
          </View>
          <View style={styles.buttonContainer}>
            {
              this.state.donorId !== this.state.userId
              ?(
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{
                      this.updatePetStatus()
                      this.addNotification()
                      this.props.navigation.navigate('Home')
                    }}>
                  <Text>I want to Adopt</Text>
                </TouchableOpacity>
              )
              : null
            }
          </View>
        </View>
      )
    }

}


const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  buttonContainer : {
    flex:0.3,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:200,
    height:50,
    justifyContent:'center',
    alignItems : 'center',
    borderRadius: 10,
    backgroundColor: 'orange',
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
    elevation : 16
  }
})