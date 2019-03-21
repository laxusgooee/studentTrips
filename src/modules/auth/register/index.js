import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from 'src/modules/main/store';
import View from './View';

const mapStateToProps = state => {
	
	return {};
};

export default connect(mapStateToProps, {setUser})(View);