import React from 'react';
import { Text, View, FlatList, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import db from '../config'
import { ScrollView } from 'react-native-gesture-handler';
import {Avatar,ListItem,Icon} from 'react-native-elements';
import MyHeader from '../components/MyHeader';

export default class petAdoptScreen extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        allTransactions: [],
        lastVisibleTransaction: null,
        search:''
      }
    }

    fetchMoreTransactions = async ()=>{
      var text = this.state.search.toUpperCase()
      var enteredText = text.split("")

      
      if (enteredText[0].toUpperCase() === "a" || "b" || "c" || "d" || "e" || "f" || "g" || "h" || "i" || "j" || "k" || "l" || "m"){ 
      const query = await db.collection("donatePet").where('pet_breed','==',text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
      query.docs.map((doc)=>{
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction: doc
        })
      })
    }
      else if(enteredText[0].toUpperCase() === 'n' || "o" || "p" || "q" || "r" || "s" || "t" || "u" || "v" || "w" || "x" || "y" || "z" ){
        const query = await db.collection("donatePet").where('pet_breed','==',text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
        query.docs.map((doc)=>{
          this.setState({
            allTransactions: [...this.state.allTransactions, doc.data()],
            lastVisibleTransaction: doc
          })
        })
      }
  }

    searchTransactions= async(text) =>{
      var enteredText = text.split("")
      var text = text.toUpperCase()
  
      
      if (enteredText[0].toUpperCase() === "a" || "b" || "c" || "d" || "e" || "f" || "g" || "h" || "i" || "j" || "k" || "l" || "m"){
        const transaction =  await db.collection("donatePet").where('pet_breed','==',text).get()
        transaction.docs.map((doc)=>{
          this.setState({
            allTransactions:[...this.state.allTransactions,doc.data()],
            lastVisibleTransaction: doc
          })
        })
      }
      else if(enteredText[0].toUpperCase() === 'n' || "o" || "p" || "q" || "r" || "s" || "t" || "u" || "v" || "w" || "x" || "y" || "z" ){
        const transaction = await db.collection('donatePet').where('pet_breed','==',text).get()
        transaction.docs.map((doc)=>{
          this.setState({
            allTransactions:[...this.state.allTransactions,doc.data()],
            lastVisibleTransaction: doc
          })
        })
      }
    }

    componentDidMount = async ()=>{
      const query = await db.collection("donatePet").limit(10).get()
      query.docs.map((doc)=>{
        this.setState({
          allTransactions: [],
          lastVisibleTransaction: doc
        })
      })
    } 

    renderItem = ( {item, i} ) =>{
      return (
        <ListItem
          key={i}
          leftAvatar = {
            <Avatar
                 rounded 
                 source = {{uri:item.image}}
                 size = "medium"
              />
          }
          title={ "breed of the pet" + " : " + item.pet_breed}
          subtitle={ "petAge" + " : " + item.petAge + " " +  "Some info about the pet" + " : " +item.description}
          titleStyle={{ color: 'black', fontWeight: 'bold' }}
          rightElement={
              <TouchableOpacity style={styles.button}
              onPress ={()=>{
                this.props.navigation.navigate("DonorDetails",{"details": item})
              }}
              >
                <Text style={{color:"black"}}>View</Text>
              </TouchableOpacity>
            }
          bottomDivider
        />
      )
    }
    render() {
      return (
        <View style={styles.container}> 
          <MyHeader title="Adopt A Pet" navigation ={this.props.navigation}/>
          <View style={styles.searchBar}>
        <TextInput 
          style ={styles.bar}
          placeholder = "Search for any breed"
          onChangeText={(text)=>{this.setState({search:text})}}/>
          <TouchableOpacity
            style = {styles.searchButton}
            onPress={()=>{this.searchTransactions(this.state.search)}}
          >
         <Icon
           name = "search" type="font-awesome"
         />
          </TouchableOpacity>
          </View>
        <FlatList
          data={this.state.allTransactions}
          renderItem = {this.renderItem}
          keyExtractor= {(item, index)=> index.toString()}
          onEndReached ={this.fetchMoreTransactions}
          onEndReachedThreshold={0.7}
        /> 
        </View>
      );
    }
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20
    },
    searchBar:{
      flexDirection:'row',
      height:40,
      width:'auto',
      borderWidth:0.5,
      alignItems:'center',
      backgroundColor:'grey',
  
    },
    bar:{
      borderWidth:2,
      height:30,
      width:300,
      paddingLeft:10,
    },
    searchButton:{
      borderWidth:1,
      height:30,
      width:50,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'green'
    }
  })