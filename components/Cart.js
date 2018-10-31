import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { adopt } from "react-adopt";
import Router from "next/router";
import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';
import User, { CURRENT_USER_QUERY } from "./User";
import CartItem from './CartItem';
import CartStyles from './styles/CartStyles';
import CloseButton from './styles/CloseButton';
import { USER_ORDERS_QUERY } from './OrderList';
import SickButton from './styles/SickButton';

const TOGGLE_CART_MUTATION = gql`
    mutation {
        toggleCart @client
    }
`;
const LOCAL_STATE_QUERY = gql`
    query{
        cartOpen @client
    }
`;

const CREATE_ORDER_MUTATION = gql`
  mutation createOrderRequest($name: String!, $account: String!, $receipt: String!) {
    createOrderRequest(name: $name, account:$account, receipt: $receipt) {
      id
      clientName
      clientAccount
      receiptId
      total
      items {
        id
        title
      }
    }
  }
`;

const Composed = adopt({
    user: ({ render }) => <User>{ render }</User>,
    toggleCart: ({ render }) => <Mutation mutation={TOGGLE_CART_MUTATION}>{ render }</Mutation>,
    localState: ({ render }) => <Query query={ LOCAL_STATE_QUERY }>{ render }</Query>,
    createOrderRequest: ({render}) => <Mutation mutation={CREATE_ORDER_MUTATION} 
    refetchQueries={[{ query: CURRENT_USER_QUERY },{ query: USER_ORDERS_QUERY}]} >{ render }</Mutation>
});

class Cart extends React.Component {
    state = { 
        clientName: '',
        clientAccount: '',
        receiptId: '',
    };
    handleChange = e => {e.preventDefault();this.setState({ [e.target.name]: e.target.value });}
    render() {
    return <Composed>
        {({ user, toggleCart, localState, createOrderRequest })=>{
            const me = user.data.me;
            if(!me){
                return null;
            }
            const totalItemsQty = me.cart.reduce((totalQty, item) => totalQty + item.quantity, 0);

            return(
                <CartStyles key="a1232" open={ localState.data.cartOpen }>
                    <header>
                        <CloseButton onClick={toggleCart} title="close">&times;</CloseButton>
                        {(totalItemsQty > 0 ? <p>Tienes {totalItemsQty} artículo{totalItemsQty > 1 ? 's' : ''} en tu carrito.</p> : <p>No tienes artículos en tu carrito</p>)}
                    </header>
                    <ul>
                        {me.cart.map(cartItem => <CartItem cartItem={cartItem} key={cartItem.id}></CartItem>)}
                    </ul>
                        <form
                            onSubmit={async e => {
                                e.preventDefault();
                                const order = await createOrderRequest({
                                    variables:{
                                        name: this.state.clientName,
                                        account: this.state.clientAccount,
                                        receipt: this.state.receiptId,
                                    }
                                });
                                this.setState({
                                    clientName: '',
                                    clientAccount: '',
                                    receiptId: '',
                                });
                                  Router.push({
                                      pathname: '/order',
                                      query: { id: order.data.createOrderRequest.id },
                                    });
                              }}>
                              {me.cart.length > 0 && (

                                  
                                <fieldset>
                                    <label htmlFor="clientName">
                                    <span>Nombre:</span> 
                                        <input
                                        type="text"
                                        name="clientName"
                                        placeholder="Nombre del Cliente"
                                        value={this.state.clientName}
                                        onChange={ this.handleChange }
                                        required
                                        />
                                    </label>
                                    <label htmlFor="clientAccount">
                                        <span>Casillero:</span>  
                                        <input
                                        type="text"
                                        name="clientAccount"
                                        required
                                        placeholder="Número de casillero"
                                        value={this.state.clientAccount}
                                        onChange={ this.handleChange }
                                        />
                                    </label>
                                    <label htmlFor="receiptId">
                                        <span>N° referencia: </span>
                                        <input
                                        type="text"
                                        name="receiptId"
                                        required
                                        value={this.state.receiptId}
                                        placeholder="Número de referencia"
                                        onChange={ this.handleChange }
                                        />
                                    </label>
                                <footer>

                                    <p>{ formatMoney(calcTotalPrice(me.cart)) }</p>
                                    <SickButton type="submit">Ordenar</SickButton>
                                </footer>
                            </fieldset>
                            )}
                                </form>
                                </CartStyles>
            );
        }}
    </Composed>
    }
}
export default Cart;
export {TOGGLE_CART_MUTATION, LOCAL_STATE_QUERY};