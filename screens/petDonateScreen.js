import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import {Avatar,Icon} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default class PetDonateScreen extends Component{
  constructor(){
    super();
    this.state ={
      userId : firebase.auth().currentUser.email,
      petBreed:"",
      description : "",
     petAge:"",
     image : "#",
     docId : ""
    }
  }

  createUniqueId(){
    return Math.random().toString(36).substring(7);
  }



  addRequest =(petBreed,description,petAge)=>{
    var userId = this.state.userId
    var randomRequestId = this.createUniqueId()
    db.collection('donatePet').add({
        "user_id": userId,
        "pet_breed":petBreed,
        "description":description,
    "petAge" : petAge,
        "request_id"  : randomRequestId,
        "image" : this.state.image
    })

    this.setState({
        petBreed :'',
        description : '',
        petAge : ""
    })

    return alert("Pet Registered For Donation Successfully")
  }

  selectPicture = async () => {
    const {cancelled,uri} = await ImagePicker.launchImageLibraryAsync({
      mediaTypes : ImagePicker.MediaTypeOptions.All,
      allowsEditing : true,
      aspect : [4,3],
      quality : 1
    })
    if( ! cancelled){
      this.uploadImage(uri,this.state.userId)
    }
  }
  uploadImage = async (uri,image) => {
    var response = await fetch(uri)
    var imageName = image + this.createUniqueId()
    var blob = await response.blob()
    var ref = firebase.storage().ref().child("user_profiles/"+imageName)
    return ref.put(blob).then((response)=>{
      this.fetchImage(imageName)
    })
  } 
  fetchImage = (imageName) => {
  var storageRef =  firebase.storage().ref().child("user_profiles/"+imageName)
  storageRef.getDownloadURL().then((url)=> {
    this.setState({
      image:url
    })
  }) 
  .catch((error)=>{
    this.setState({
      image : "#"
    })
  })
  } 

  componentDidMount () {
    this.fetchImage(this.state.userId);
  }

  render(){
    return(
        <View style={{flex:1}}>
          <MyHeader title="Donate A Pet"/>
            <KeyboardAvoidingView style={styles.keyBoardStyle}>
            <Avatar
                 rounded 
                 source = {{uri:this.state.image}}
                 size = "medium"
                 onPress = {()=>{this.selectPicture()}}
                 containerStyle = {styles.imageContainer}
                 showEditButton 
              />
              <TextInput
                style ={styles.formTextInput}
                placeholder={"enter pet breed"}
                onChangeText={(text)=>{
                    this.setState({
                        petBreed:text
                    })
                }}
                value={this.state.petBreed}
               />
                <TextInput
                style ={[styles.formTextInput,{height:300}]}
                placeholder={"pet age"}
                onChangeText ={(text)=>{
                    this.setState({
                       petAge:text
                    })
                }}
                value ={this.state.petAge}
              />
              <TextInput
                style ={[styles.formTextInput,{height:300}]}
                multiline
                numberOfLines ={10}
                placeholder={"write something about the pet you want to donate"}
                onChangeText ={(text)=>{
                    this.setState({
                        description:text
                    })
                }}
                value ={this.state.description}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={()=>{this.addRequest(this.state.petBreed,this.state.description,this.state.petAge)}}
                >
                <Text> Donate </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  keyBoardStyle : {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10,
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20
    },
    imageContainer:{
        width:"40%",
        height:"40%",
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:40,
        flex:0.75,
        borderWidth:1,
        marginTop:20,
        marginLeft : 20,
        padding:10
      }
  }
)