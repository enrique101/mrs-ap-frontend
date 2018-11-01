import React, { Component } from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import Router from "next/router";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import debounce from "lodash.debounce";
import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown";

const SEARCH_ORDERS_QUERY = gql`
  query SEARCH_ORDERS_QUERY($searchTerm: String!){
    searchOrders( searchTerm: $searchTerm ){
      id
      tracking
    }
  }
`;

function routeToItem(order) {
  Router.push({
    pathname: '/order',
    query: {
      id: order.id,
    },
  });
}

export default class SearchOrders extends Component {
  state = {
    orders: [],
    loading: false,
  }
  onChange = debounce( async (e, client)=>{
      this.setState({ loading: true });
      const res = await client.query({
        query: SEARCH_ORDERS_QUERY,
        variables: { searchTerm: e.target.value },
      });
      this.setState({ 
        orders: res.data.searchOrders, 
        loading: false,
      });
  }, 400);
  render() {
    resetIdCounter();
    return (
      <SearchStyles>
        <Downshift onChange={routeToItem} itemToString={order =>(order === null ? '' : order.tracking)}>
          {({ getInputProps , getItemProps, isOpen, inputValue, highlightedIndex}) => (
                <div>
                    <ApolloConsumer>
                      {(client)=>(
                        <input  
                        {... getInputProps({
                          onChange: e => {
                                      e.persist();
                                      this.onChange(e, client);
                                    },
                          type: 'search',
                          placeholder: 'Buscar Orden',
                          id: 'search',
                          className: this.state.loading ? 'loading' : '',
                        })}
                        />
                      )}
                    </ApolloConsumer>
                    {isOpen && (
                      <DropDown>
                        {this.state.orders.map((order, index) => (
                          <DropDownItem
                            {...getItemProps({ item: order })}
                            key={order.id}
                            highlighted={index === highlightedIndex}
                          >
                            {order.tracking}
                          </DropDownItem>
                        ))}
                        {!this.state.orders.length &&
                          !this.state.loading && <DropDownItem> Sin Resultados {inputValue}</DropDownItem>}
                      </DropDown>
                    )}
                </div>
              )}
            </Downshift>
      </SearchStyles>
    )
  }
}

export {SEARCH_ORDERS_QUERY};