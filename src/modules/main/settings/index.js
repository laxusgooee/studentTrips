import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearUser } from '../store';
import View from './View';

const mapStateToProps = state => {
	return {
		user: {
			email: state.MainStateReducer.email,
			first_name: state.MainStateReducer.first_name,
        	last_name: state.MainStateReducer.last_name,
        	photo: state.MainStateReducer.photo,
        }
	};
};

export default connect(mapStateToProps, {clearUser})(View);