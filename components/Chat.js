import React from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { View, Platform, KeyboardAvoidingView, StyleSheet, } from 'react-native';

//Added this to connect/import firestore database
const firebase = require('firebase');
require('firebase/firestore');

//Added constructor to set up empty array of messages
export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };

    //refereces the collection 'messages'
    this.referenceChatMessages = firebase.firestore().collection('messages');
  }

//mounting the state of messages
  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: 'You have entered the chat',
          createdAt: new Date(),
          system: true,        
        }
      ],
    });
  }

//takes the previous state of messages and adds new sate "onSend"
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

//passes the color black to the renderBubble (the sender from the right)
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000',
          },
        }}
      />
    );
  }

  render() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    return (
      <View style={styles.container}>
      <GiftedChat
        renderBubble={this.renderBubble.bind(this)}
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    );
  }
}

//StyleSheet down below
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});



//api key
apiKey: "AIzaSyBStt1FgerxbrWP-0GKjIoRYpmQIF78sXY",
authDomain: "test-5f148.firebaseapp.com",
projectId: "test-5f148",
storageBucket: "test-5f148.appspot.com",
messagingSenderId: "1009579266152",
appId: "1:1009579266152:web:63296623ec90f757c7ebdd",
measurementId: "G-MLJNF1EVD6"