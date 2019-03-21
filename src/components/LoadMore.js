import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Spinner = require('react-native-spinkit');

const ITEM_COLOR = '#A8A8A8';

const LoadMore = ({ style, isLoading = false, onPress }) => {

    return( 
    	<TouchableOpacity onPress={onPress}>
	    	<View style={[styles.item, style]}>
                {isLoading? (
                    <Spinner style={styles.spinner} color={ITEM_COLOR} type="ThreeBounce" />
                ) : (
                    <Text style={styles.text}>Load more</Text>
                )}
	    	</View> 
	    </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5
    },

    text: {
        fontSize: 14,
        paddingTop: 12,
        color: ITEM_COLOR,
    },

    spinner: {
        alignItems: 'center'
    }
});

export default LoadMore