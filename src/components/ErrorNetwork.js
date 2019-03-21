import React from 'react';
import CONSTANTS from 'src/App.constants';
import { isEmpty } from 'src/utils';
import { Image, StyleSheet } from 'react-native';
import { Button, Text, View } from 'native-base';


const ErrorNetwork = ({ title, subtitle, style, onPress, showFooter = true }) => {

	title = isEmpty(title)? 'Oh, No Network!' : title;
	subtitle = isEmpty(subtitle)? 'You would still be able to do some things though' : subtitle;

    return( 
    	<View style={[styles.content, style]}>

    		<View style={styles.imageContainer}>
	    		<Image
                    style={styles.image}
                    source={require('src/assets/images/no-network.png')}
                />
	        </View>  

			<View style={styles.titleContainer}>
	    		<Text style={styles.title}>{title}</Text>
	    		<Text style={styles.subtitle}>{subtitle}</Text>
	        </View>  

	        {showFooter && 
                <View style={styles.footer}>
    	    		<Button primary transparent style={styles.button} onPress={onPress}>
    	            	<Text>Retry</Text>
    	         	</Button>
    	        </View>
            }
		</View>
    );
};

const styles = StyleSheet.create({
	content: {
        paddingTop: 30,
        paddingBottom: 10,
    	paddingHorizontal: 20,
    	backgroundColor: '#fff',
    },

    imageContainer: {
    	marginTop: 10,
    	marginBottom: 20,
    	alignItems: 'center',
    	justifyContent: 'center'
    },

    image: {

    },

    titleContainer: {
    	marginBottom: 10,
    	alignItems: 'center',
    	justifyContent: 'center'
    },

    title: {
    	fontSize: 18,
        color: '#000',
        marginBottom: 10,
    },

    subtitle: {
        fontSize: 14,
    	color: '#ccc',
        textAlign: 'center'
    },

    footer: {
        marginTop: 15,
        marginBottom: 10,
    },

    button: {
    	alignSelf: 'center',
    }
});

export default ErrorNetwork