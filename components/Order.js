import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { format } from 'date-fns';
import Head from 'next/head';
import gql from 'graphql-tag';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import OrderStyles from './styles/OrderStyles';

const SINGLE_ORDER_QUERY = gql`
    query SINGLE_ORDER_QUERY($id : ID!){
        order(id:$id){
            id
            total
            createdAt
            user{
                id
            }
            items{
                id
                title
                description
                price
                image
                quantity
            }
        }
    }
`;

export default class componentName extends Component {
 static propTypes = {
     id: PropTypes.string.isRequired,
 }
  render() {
    return (
      <Query query= {SINGLE_ORDER_QUERY} variables={{ id : this.props.id }}>
        {({data, error, loading}) => {
            if(error) return <Error error={error} />
            if(loading) return <p>Loading...</p>
            const { order } = data;
            return(
                <OrderStyles data-test="order">
                    <Head>
                        <title>
                            Dell Store | Aeropost - Order { order.id }
                        </title>
                    </Head>
                    <p>
                        <span>Número de orden:</span>
                        <span>{this.props.id}</span>
                    </p>
                    <p>
                        <span>Fecha</span>
                        <span>{format(order.createdAt, 'MMMM d, YYYY h:mm a')}</span>
                    </p>
                    <p>
                        <span>Total</span>
                        <span>{formatMoney(order.total)}</span>
                    </p>
                    <p>
                        <span>Cantidad de Articulos</span>
                        <span>{order.items.reduce((qty,item)=> qty + item.quantity, 0)}</span>
                    </p>
                    <div className="items">
                        {order.items.map(item => (
                        <div className="order-item" key={item.id}>
                            <img src={item.image} alt={item.title} />
                            <div className="item-details">
                            <h2>{item.title}</h2>
                            <p>Cantidad: {item.quantity}</p>
                            <p>Precio unitario: {formatMoney(item.price)}</p>
                            <p>SubTotal: {formatMoney(item.price * item.quantity)}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                </OrderStyles>
            );
        }}
      </Query>
    )
  }
}

export {SINGLE_ORDER_QUERY};
