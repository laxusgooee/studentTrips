import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser, clearUser } from '../store';
import View from './View';

const mapStateToProps = state => {
	return {
		user: {
			email: state.MainStateReducer.email,
			phone: state.MainStateReducer.phone,
        	photo: state.MainStateReducer.photo,
			gender: state.MainStateReducer.gender,
			country: state.MainStateReducer.country,
			birthday: state.MainStateReducer.birthday,
        	last_name: state.MainStateReducer.last_name,
			first_name: state.MainStateReducer.first_name,
        	address: state.MainStateReducer.address
        }
	};
};

export default connect(mapStateToProps, { setUser, clearUser})(View);