import React from 'react';
import CONSTANTS from 'src/App.constants';
import { isEmpty } from 'src/utils';
import { StyleSheet } from 'react-native';
import { Icon, Input, Item, Text, View } from 'native-base';

var MODE = 'search';


const SearchBox = ({ placeholder, color, style, onChangeText, onCancel }) => {

	icon = MODE;
	placeholder = isEmpty(placeholder)? 'Enter Text...' : placeholder;

    return( 
    	<Item rounded style={[styles.item, style]}>
			<Input 
				style={styles.input}
				placeholder={placeholder} 
				onChangeText={(q) => {
					if(q.length < 2){
						MODE = 'search';
						return;
					}

					MODE = 'close';

					onChangeText(q);
				}}
			/>
			<Icon active name={MODE} style={styles.icon} onPress={() => {
				if(MODE == 'close'){
					onCancel();
				}
			}}/>
		</Item>
    );
};

const styles = StyleSheet.create({
	item: {
	    height: 40,
	    paddingHorizontal: 10,
		backgroundColor: '#fff',
    },

    shadow: {
    	shadowOffset: { width: 0, height: 1 },
	    shadowOpacity: 0.6,
	    shadowRadius: 4,
	    elevation: 1,
	    shadowColor: '#000',
    },

    input: {
    	fontSize: 14,
    },

    icon: {
    	fontSize: 14,
    	color: '#A8A8A8'
    }
});

export default SearchBox