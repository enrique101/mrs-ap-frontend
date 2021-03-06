import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION(
        $email: String!
    ){
        requestReset(
            email:$email   
        ){
            message
        }
    }
`;

class RequestReset extends Component {
    state = {
        email: ''
    };
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    render() {
        return (
            <Mutation mutation={REQUEST_RESET_MUTATION}
                      variables={this.state}>
                {(requestReset, { error, loading, called }) => (
                    <Form
                    data-test="form"
                    method="post"
                    onSubmit={async e => {
                      e.preventDefault();
                      await requestReset();
                      this.setState({ email: '' });
                    }}
                  >
                        <fieldset disabled={loading} aria-busy={loading}>
                            <h2>Recuperar Contraseña</h2>
                            <Error error={error}/>
                            {!error && !loading && called && <p>Revisa tu correo para restaurar tu contraseña</p>}
                            <label htmlFor="email">
                                Correo
        <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required name="email" placeholder="Correo" value={this.state.email} onChange={this.handleChange} />
                            </label>
                            <button type="submit">Recuperar</button>
                        </fieldset>
                    </Form>
                    )
                }
            </Mutation>
        );
    }
}
export default RequestReset;
export { REQUEST_RESET_MUTATION };