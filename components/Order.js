import React, { Component } from 'react';
import { adopt } from "react-adopt";
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { format } from 'date-fns';
import Head from 'next/head';
import gql from 'graphql-tag';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import OrderStyles from './styles/OrderStyles';
import UpdateOrderStatus from './UpdateOrderStatus';
import User from "./User";
import { hasPermissions, AppPermissions } from '../lib/utils';

const SINGLE_ORDER_QUERY = gql`
    query SINGLE_ORDER_QUERY($id : ID!){
        order(id:$id){
            id
            tracking
            total
            totalCost
            status
            createdAt
            user{
                id
            }
            items{
                id
                title
                description
                price
                cost
                image
                quantity
            }
        }
    }
`;

let Composed;

export default class componentName extends Component {
 static propTypes = {
     id: PropTypes.string.isRequired,
 }
  constructor(props){
      super(props);
      Composed = adopt({
            user: ({ render }) => <User>{ render }</User>,
            singleOrderQuery: ({ render }) => <Query query= {SINGLE_ORDER_QUERY} variables={{ id : this.props.id }}>{ render }</Query>,
        });
  }
  render() {
    return (
      <Composed>
        {({user, singleOrderQuery}) => {
            const { data, loading, error } = singleOrderQuery;
            const { data: {me}} = user;
            const canUpdate = me && hasPermissions(me.permissions,[AppPermissions.admin, AppPermissions.orderUpdate]);
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
                        <span>{order.tracking}</span>
                    </p>
                    <p>
                        <span>Fecha</span>
                        <span>{format(order.createdAt, 'MMMM d, YYYY h:mm a')}</span>
                    </p>
                    <p>
                        <span>Estado</span>
                        {
                           canUpdate && (
                                <span><UpdateOrderStatus tracking={order.tracking} status={order.status} id={this.props.id}>Guardar</UpdateOrderStatus></span>
                           )
                        }
                        {
                           !canUpdate && (<span>{order.status}</span>)
                        }
                    </p>
                    <p>
                        <span>Venta Total</span>
                        <span>{formatMoney(order.total)}</span>
                    </p>
                    <p>
                        <span>Costo Total</span>
                        <span>{formatMoney(order.totalCost)}</span>
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
                            <p>Costo unitario: {formatMoney(item.cost)}</p>
                            <p>Venta SubTotal: {formatMoney(item.price * item.quantity)}</p>
                            <p>Costo SubTotal: {formatMoney(item.cost * item.quantity)}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                </OrderStyles>
            );
        }}
      </Composed>
    )
  }
}

export {SINGLE_ORDER_QUERY};
