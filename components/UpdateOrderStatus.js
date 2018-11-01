import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { SINGLE_ORDER_QUERY } from "./Order";
import SickButton from "./styles/SickButton";

const UPDATE_ORDER_STATUS_MUTATION = gql`
    mutation UPDATE_ORDER_STATUS_MUTATION($id: ID!, $status: String!){
        updateOrderStatus(id:$id, status:$status){
            message
        }
    }
`;

class UpdateOrderStatus extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
    }
    
    state = {
        id: this.props.id,
        status: this.props.status,
    };
    handleChange = e => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    };
    render() {
        return (
            <Mutation mutation={UPDATE_ORDER_STATUS_MUTATION}
                      refetchQueries={[
                          { query: SINGLE_ORDER_QUERY,
                            variables : {id: this.props.id}}
                      ]}
                      variables={this.state}>
                {(updateOrderStatus, { error, loading, called }) => (
                    <>
                        <input type="text" required name="status" placeholder="Estado" value={this.state.status} onChange={this.handleChange} />
                        <SickButton onClick={updateOrderStatus}>{ this.props.children }</SickButton>
                    </>
                    )
                }
            </Mutation>
        );
    }
}
export default UpdateOrderStatus;
export { UPDATE_ORDER_STATUS_MUTATION };