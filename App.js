import React , {useState} from 'react';
import type {Node} from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  Alert
} from 'react-native';


const App = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');
  const handlePress = (id)=>{
    setTodos([...todos.filter(i => i.id != id)]);
  };
  const handleTextChange = (text)=>{
    setTodo(text);
  };

  const handlePressBtn = ()=>{
    if(todo.trim().length>3){
      setTodos([{id: Math.random().toString().slice(2,8),text: todo},...todos]);
      setTodo('')
    } else {
      Alert.alert('Falid!', 'Your todo must be more than 3 characters.', ['OK']);
    }
  };

  const renderingTodos = todos.length ? (
    <FlatList
      style={styles.todosContainer}
      data={todos}
      renderItem={({item})=>(
        <TouchableOpacity key={item.id} onPress={()=>{handlePress(item.id)}} >
          <Text style={styles.todo}>{item.text}</Text>
        </TouchableOpacity>
      )}
    />
  ) :
  (
  <View style={styles.todosContainer}>
      <Text style={styles.todo}>Your todo list is empty...</Text>
  </View>
  );


  return(
    <View>
      <TextInput onChangeText={text => handleTextChange(text)} value={todo} style={styles.input }/>
      <View style={styles.btn}>
        <Button title="Add!" onPress={handlePressBtn}/>
      </View>

      {renderingTodos}

    </View>
    )

};

const styles = StyleSheet.create({
  input:{
    borderWidth: 2,
    borderColor: '#ccc',
    fontSize: 20,
    marginVertical: 10,
    marginHorizontal: 5
  },
  btn:{
    marginVertical: 10,
    marginHorizontal: 5
  },
  todosContainer:{
    margin: 5,
  },
  todo:{
    fontSize: 20,
    color: '#222',
    padding: 5,
    marginVertical: 5,
    backgroundColor: '#eee'
  }
});

export default App;
