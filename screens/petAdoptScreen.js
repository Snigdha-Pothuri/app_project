import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem , Avatar, Icon} from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class PetAdoptScreen extends Component{
  constructor(){
    super()
    this.state = {
      requestedPetsList : []
    }
  this.requestRef= null
  }

  getRequestedPetsList =()=>{
    this.requestRef = db.collection("donatePet")
    .onSnapshot((snapshot)=>{
      var requestedPetsList = snapshot.docs.map(document => document.data());
      this.setState({
        requestedPetsList : requestedPetsList
      });
    })
  }

  componentDidMount(){
    this.getrequestedPetsList()
  }

  componentWillUnmount(){
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
      <ListItem
        key={i}
        title={item.pet_breed}
        subtitle={item.description}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
            <TouchableOpacity style={styles.button}>
              <Text style={{color:'#ffff'}}>View</Text>
            </TouchableOpacity>
          }
        bottomDivider
      />
    )
  }

  render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title="Adopt A Pet"/>
        <View style={{flex:1}}>
          {
            this.state.requestedPetsList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}> List Of All Available Pets</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.requestedPetsList}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})