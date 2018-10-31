import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from './User';
import Signin from './Signin';
import { hasPermissions } from '../lib/utils'


const PleaseSignIn = props => (
    <Query query= { CURRENT_USER_QUERY }>
        {({ data, loading })=>{
            if(loading) return <p>Loading...</p>
            if(!data.me || !hasPermissions(data.me.permissions, props.permissions)){
                return(
                    <>
                        <p>Please Sign In to continue</p>
                        <Signin />
                    </>
                );
            }
            return props.children;
        }}
    </Query>
);

PleaseSignIn.propTypes = {
    permissions: PropTypes.array,
}

export default PleaseSignIn;