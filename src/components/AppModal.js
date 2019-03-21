import React from 'react';
import Modal from "react-native-modal";
import CONSTANTS from 'src/App.constants';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Body, Card, CardItem, Container, Content, Icon, Text, View } from 'native-base';

const styles = StyleSheet.create({
    content: {
    	borderRadius: 6,
    	paddingVertical: 20,
    	paddingHorizontal: 20,
    	backgroundColor: 'transparent',
    },

    standard: {
        paddingVertical: 10,
    },

    full: {
        backgroundColor: '#fff',
    },

    header: {
    	marginBottom: 10,
    	alignItems: 'center',
    	justifyContent: 'center'
    },

    title: {
    	color: '#000',
    	fontSize: 24
    },

    body: {
    	marginTop: 15,
        marginBottom: 10
    },

    close: {
        top: 10,
        right: 5,
        width: 30,
        height: 30,
        borderWidth: 1,
        borderRadius: 15,
        position: 'absolute',
        alignItems: 'center',
        borderColor: '#cecece',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },

    closeIcon: {
        color: '#f00',
        fontSize: 19
    },

    footer: {
    	marginTop: 15,
    },

    button: {
    	borderRadius: 8,
    }
});

const CloseButton = ({onClose}) => {
    return(
        <View style={styles.close}>
            <TouchableOpacity onPress={onClose}>
                <Icon name="close"  style={styles.closeIcon}/>
            </TouchableOpacity>
        </View>
    );
}

const standardBody = ({ children, style, showCloseButton = true, onClose }) => {
    return (
        <View style={[styles.content, styles.standard]}>
            <View style={styles.body}>
                {children}
            </View>
            {showCloseButton &&
                <CloseButton onClose={onClose} />
            }
        </View>  
    );
}

const fullBody = ({ title, children, style, onClose, onPress, showCloseButton = true, showHeader = true, showFooter = true}) => {
    return (
        <Container>  
            <Content contentContainerStyle={[styles.content, styles.full]}>
                <CloseButton onClose={onClose} />
                {showHeader && 
                    <View style={styles.header}>
                        <Text style={styles.title}>{title}</Text>
                    </View>  
                }

                <View style={styles.body}>
                    {children}
                </View>  
                {showFooter && 
                    <View style={styles.footer}>
                        <Button primary block rounded style={styles.button} onPress={onPress}>
                            <Text>Continue</Text>
                        </Button>
                    </View>
                }
            </Content> 
        </Container>
    );
}

const AppModal = (opts) => {

    body = (opts.full !== false)? fullBody(opts) : standardBody(opts);

    return( 
        <View>
			<Modal 
				animationIn="fadeIn"
				animationOut="fadeOut"
				backdropOpacity={0.4}
				isVisible={opts.isVisible}> 
				{body}
		    </Modal>
		</View>
    );
};

export default AppModal;