import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import SickButton from './styles/SickButton';

const ADD_TO_CART_MUTATION = gql`
    mutation ADD_TO_CART_MUTATION($id: ID!){
        addToCart(id: $id){
            id
            quantity
        }
    }
`;

export default class AddToCart extends Component {
  render() {
    const { id } = this.props;
    return (
        <Mutation refetchQueries={[{query : CURRENT_USER_QUERY}]} mutation= { ADD_TO_CART_MUTATION } variables={{ id }}>
            {(addToCart,{ loading }) => (
                <>
                <SickButton disabled={loading} onClick={addToCart}>Agrega{ !loading && 'r' }{ loading && 'ndo' } a Carrito</SickButton>
                </>
            )}
        </Mutation>
    )
  }
}

export { ADD_TO_CART_MUTATION };
