import React, { Component } from 'react';
import StripeCheckout from "react-stripe-checkout";
import { Mutation } from "react-apollo";
import Router from "next/router";
import NProgress from "nprogress";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import calcTotalPrice from "../lib/calcTotalPrice";
import Error from './ErrorMessage';
import User, { CURRENT_USER_QUERY } from "./User";

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

export default class TakeMyMoney extends Component {
    onClickHandler = async (e, createOrderRequest) => {
      debugger;
      const {receiptId:receipt, clientName:name, clientAccount:account} = this.props;
        NProgress.start();
        // manually call the mutation once we have the stripe token
        const order = await createOrderRequest({
          variables: {
            name,
            account,
            receipt,
          },
        }).catch(err => {
          alert(err.message);
        });
        Router.push({
          pathname: '/order',
          query: { id: order.data.createOrderRequest.id },
        });
      };
 render() {
    return (
      <User>
        {({ loading }) => {
          if (loading) return null;
          return (
            <Mutation
              mutation={CREATE_ORDER_MUTATION}
              refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
              {createOrderRequest => (
                <div onClick={e => this.onClickHandler(e, createOrderRequest)}>
                  {this.props.children}
                </div>
              )}
            </Mutation>
          );
        }}
      </User>
    );
  }
}

export { CREATE_ORDER_MUTATION };