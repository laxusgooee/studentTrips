import React from 'react';
import { ucFirst } from 'src/utils';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

const Spinner = require('react-native-spinkit');

const styles = StyleSheet.create({
	item: {
        width: 40,
        height: 40,
        borderRadius: 20,
        paddingVertical: 10,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    shadow:{
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 2,
        elevation: 4,
        shadowColor: '#000',
        backgroundColor: '#fff'
    },

    text: {
        fontSize: 13, 
        color: '#cecece'
    }
});

const Loader = ({ style, onPress }) => {

	return( 
    	<TouchableWithoutFeedback onPress={onPress}>
	    	<View style={[styles.item, styles.shadow,  style]}>
                <Spinner style={styles.spinner} size={17} type="Circle" color="#69698c"/>
	    	</View> 
	    </TouchableWithoutFeedback>
    );
};

export default Loader