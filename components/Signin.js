import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import {CURRENT_USER_QUERY } from './User';
import {ALL_USERS_QUERY } from './Permissions';
const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION(
        $email: String!,
        $password: String!
    ){
        signin(
            email:$email, 
            password: $password    
        ){
            id
            email
            name
        }
    }
`;

class Signin extends Component {
    state = {
        email: '',
        name: '',
        password: '',
    };
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    render() {
        return (
            <Mutation mutation={SIGNIN_MUTATION}
                      variables={this.state}
                      refetchQueries={[
                          { query: CURRENT_USER_QUERY },
                      ]}>
                {(signin, { error, loading }) => (
                    <Form
                    method="post"
                    onSubmit={async e => {
                      e.preventDefault();
                      await signin();
                      this.setState({ name: '', email: '', password: '' });
                    }}
                  >
                        <fieldset disabled={loading} aria-busy={loading}>
                            <h2>Inicia Sesión</h2>
                            <Error error={error}/>
                            <label htmlFor="email">
                                Correo
        <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required name="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                            </label>
                            <label htmlFor="password">
                                Contraseña
        <input type="password" required name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                            </label>
                            <button type="submit">Iniciar Sesión</button>
                        </fieldset>
                    </Form>
                    )
                }
            </Mutation>
        );
    }
}
export default Signin;
export { SIGNIN_MUTATION };