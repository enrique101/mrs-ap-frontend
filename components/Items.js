import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from './Item';
import Pagination from './Pagination';
import { perPage } from '../config';
import User from './User';
import { hasPermissions, AppPermissions } from '../lib/utils';

const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY($skip : Int = 0, $first: Int = ${perPage}) {
        items(
            first: $first,
            skip: $skip
            orderBy: createdAt_DESC
        ){
            id
            title
            price
            description
            image
            largeImage
        }
    }
`;

const Center = styled.div`
    text-align: center;
`;

const ItemsList = styled.div`
    display: grid;
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
    text-align:left;
    @media screen and (min-width: ${props => props.theme.desKBrk}) {
        grid-template-columns: repeat(3,1fr) ;
        grid-gap: 2rem;
    }
`;

class Items extends Component {
    render() {
        return (
            <Center>
                <Pagination page={this.props.page} />
                    <Query query={ALL_ITEMS_QUERY} variables={{
                        skip: this.props.page * perPage - perPage,
                    }}>
                        {({data:dataItem, error,loading}) =>{
                            if(loading) return <p>Loading...</p>
                            if(error) return <p>Error: {error.message}</p>
                            return <User>
                                {({data:{me: dataUser}})=>{
                                    let canUpdate = false;
                                    let canDelete = false;
                                    let canBuy = false;
                                    if(dataUser){
                                        canBuy =  hasPermissions(dataUser.permissions,[AppPermissions.admin,AppPermissions.user]);
                                        canDelete = hasPermissions(dataUser.permissions,[AppPermissions.admin,AppPermissions.itemDelete]);
                                        canUpdate = hasPermissions(dataUser.permissions,[AppPermissions.admin,AppPermissions.itemUpdate]);
                                    }
                                    return(
                                        <ItemsList>
                                            {dataItem.items.map(item=><Item key={item.id} buttons={{canBuy,canUpdate,canDelete}} item={item}></Item>)}
                                        </ItemsList>
                                    );
                                }}
                            </User>;
                        }}
                    </Query>
                <Pagination page={this.props.page} />
            </Center>
        );
    }
}

export default Items;
export { ALL_ITEMS_QUERY };