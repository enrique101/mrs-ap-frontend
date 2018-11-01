import React from 'react';
import { Query } from 'react-apollo';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import styled from 'styled-components';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import formatMoney from '../lib/formatMoney';
import OrderItemStyles from './styles/OrderItemStyles';
import SearchOrders from './SearchOrders';

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    orders(orderBy: createdAt_DESC) {
      id
      tracking
      totalCost
      status
      createdAt
      items {
        id
        title
        price
        description
        quantity
        image
      }
    }
  }
`;

const OrderUl = styled.ul`

  .order-meta{
    display: grid;
    grid-gap: 1rem;
    grid-template-areas: "title title title title" 
                         "info1 info2 info3 info4";
    align-items: center;
    p{
      background-color: transparent;
      .title{
        grid-area: title;
      }
      .items{
        grid-area: info1;
      }
      .qty{
        grid-area: info2;
      }
      .date{
        grid-area: info3;
      }
      .total{
        grid-area: info4;
      }
    }
  }
`;

class OrderList extends React.Component {
  render() {
    return (
      <Query query={USER_ORDERS_QUERY}>
        {({ data: { orders }, loading, error }) => {
          if (loading) return <p>loading...</p>;
          if (error) return <Error erorr={error} />;
          return (
            <div>
              <h2>Tienes {orders.length} ordenes</h2>
              <SearchOrders></SearchOrders>
              <OrderUl>
                {orders.map(order => (
                  <OrderItemStyles key={order.id}>
                    <Link
                      href={{
                        pathname: '/order',
                        query: { id: order.id },
                      }}
                    >
                      <a>
                        <div className="order-meta">
                          <p className="title">Número de orden {order.tracking}</p>
                          <p className="items">{order.items.reduce((a, b) => a + b.quantity, 0)} artículo(s)</p>
                          <p className="qty">{order.items.length} Producto{order.items.length > 1 && 's'}</p>
                          <p className="date">{formatDistance(order.createdAt, new Date())}</p>
                          <p className="total">{formatMoney(order.totalCost)}</p>
                          <p className="Estado">{order.status}</p>
                        </div>
                      </a>
                    </Link>
                  </OrderItemStyles>
                ))}
              </OrderUl>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default OrderList;
export { USER_ORDERS_QUERY };
