import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Router from "next/router";
import Error from './ErrorMessage';
import {CURRENT_USER_QUERY } from './User';
import SickButton from './styles/SickButton';

import Form from './styles/Form';

const CONFIRM_USER = gql`

    mutation CONFIRM_USER(
        $id: ID!
    ){
        confirmUser(
            id:$id   
        ){
            message
        }
    }
`;

class ConfirmUser extends React.Component {
    update = (cache, payload) => {
        Router.push({
            pathname: '/',
        });
      };
    render(){
        return (
            <Mutation mutation={CONFIRM_USER} 
                variables={{ id: this.props.id }} 
                update={this.update}
                refetchQueries={[
                    { query: CURRENT_USER_QUERY },
                ]}
                >
                {(confirmUser,{ data, loading, error }) =>{ return(
                    <>
                    <Error error={error}/>
                    <form
                    data-test="form"
                    method="post"
                    onSubmit={async e => {
                            e.preventDefault();
                            await confirmUser();
                    }}
                    >
                        <SickButton type="submit">Presiona aquí para confirmar tu cuenta</SickButton>
                    </form>
                    
                    </>
                )}}
            </Mutation>
        )
    }
}

export default ConfirmUser;