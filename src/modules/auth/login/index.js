import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../store';
import View from './View';

const mapStateToProps = state => {
	
	return {
		firstName: state.AuthStateReducer.firstName,
		lastName: state.AuthStateReducer.lastName,
		email: state.AuthStateReducer.email,
		phone: state.AuthStateReducer.phone,
		role: state.AuthStateReducer.role
	};
};

export default connect(mapStateToProps, { updateUser })(View);