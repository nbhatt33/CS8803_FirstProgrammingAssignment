import { StyleSheet, View, TextInput, Button, Modal} from 'react-native'
import {useState} from 'react'

function GoalInput(props){
    const [enteredGoalText, setEnteredGoalText] = useState('');

    function goalInputHandler(textEntered) {
        setEnteredGoalText(textEntered);
    }
    function addGoalHandler() {
        props.onAddGoal(enteredGoalText);
        setEnteredGoalText('');
    }

    return (

        <View style={styles.inputContainer}>
            <TextInput
                style={styles.textInput} 
                placeholder='Your Course Goal' 
                onChangeText={goalInputHandler}
                value={enteredGoalText}
            />  
            <Button
                title="Add Goal" 
                onPress={addGoalHandler}
            />
        </View>

    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
      },
      textInput: {
        borderWidth: 1,
        borderColor: '#cccccc',
        width:'70%', 
        marginRight: 8,
        padding: 8
      }

})
export default GoalInput;