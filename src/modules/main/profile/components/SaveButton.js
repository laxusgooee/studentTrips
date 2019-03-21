import React from 'react';
import CONSTANTS from 'src/App.constants';
import { Button, Text, View } from 'native-base';
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

const SaveButton = ({ style, textStyle, onPress }) => {

	return( 
    	<Button transparent light onPress={onPress} style={[styles.item, style]}>
	    	<Text style={[styles.title, textStyle]}>Save</Text>
	    </Button>
    );
};

const styles = StyleSheet.create({
	item: {
        
    },

    title: {

    }
    
});

export default SaveButton