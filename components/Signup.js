import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import {CURRENT_USER_QUERY } from './User';

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION(
        $email: String!,
        $password: String!,
        $name: String!
    ){
        signup(
            email:$email, 
            name: $name, 
            password: $password    
        ){
            id
            email
            name
        }
    }
`;

class Signup extends Component {
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
            <Mutation mutation={SIGNUP_MUTATION}
                      variables={this.state}
                      refetchQueries={[
                        { query: CURRENT_USER_QUERY }
                    ]}>
                {(signup, { error, loading, called }) => (
                    <Form
                    method="post"
                    onSubmit={async e => {
                      e.preventDefault();
                      await signup();
                      this.setState({ name: '', email: '', password: '' });
                    }}
                  >
                        <fieldset disabled={loading} aria-busy={loading}>
                            <h2>Registrate</h2>
                            <Error error={error}/>
                            {!error && !loading && called && <p>Revisa tu correo para confirmar tu cuenta</p>}
                            <label htmlFor="email">
                                Correo
        <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required name="email" placeholder="Correo" value={this.state.email} onChange={this.handleChange} />
                            </label>
                            <label htmlFor="name">
                                Nombre
        <input type="text" required name="name" placeholder="Nombre" value={this.state.name} onChange={this.handleChange} />
                            </label>
                            <label htmlFor="password">
                                Contraseña
        <input type="password" pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$" required name="password" placeholder="Mínimo 8 caracteres, mínimo una letra, un número y un caracter especial" value={this.state.password} onChange={this.handleChange} />
                            </label>
                            <button type="submit">Registrar</button>
                        </fieldset>
                    </Form>
                    )
                }
            </Mutation>
        );
    }
}
export default Signup;
export { SIGNUP_MUTATION };