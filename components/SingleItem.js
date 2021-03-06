import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Head from "next/head";
import AddToCart from './AddToCart';
import Error from "./ErrorMessage";

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
  }
  .col1 button{
      margin-left: auto;
      margin-right: auto;
      display: block;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      largeImage
      price
    }
  }
`;

export default class SingleItem extends Component {
  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ error, loading, data }) => {
          if (error) return <Error errror={error} />;
          if (loading) return <p>Loading...</p>;
          if (!data.item) return <p>No Item {this.props.id}</p>;
          const item = data.item;
          return (
            <SingleItemStyles>
              <Head>
                <title>Dell Store | Aeropost | {item.title}</title>
              </Head>
              <div className="col1">
                <img src={item.largeImage} alt={item.title} />
                <AddToCart id={item.id} />
              </div>
              <div className="details">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
            </SingleItemStyles>
          );
        }}
      </Query>
    );
  }
}

export { SINGLE_ITEM_QUERY };
