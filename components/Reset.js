import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';
const RESET_MUTATION = gql`
    mutation RESET_MUTATION(
        $resetToken: String!,
        $password: String!,
        $confirmPassword: String!
    ){
        resetPassword(
            resetToken: $resetToken
            password: $password
            confirmPassword: $confirmPassword
        ){
            id
            email
            name
        }
    }
`;

class Reset extends Component {
    static propTypes = {
        resetToken: PropTypes.string.isRequired,
    };
    state = {
        password: '',
        confirmPassword: '',
    };
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    render() {
        return (
            <Mutation mutation={RESET_MUTATION}
                      variables={{
                        resetToken: this.props.resetToken,
                        password: this.state.password,
                        confirmPassword: this.state.confirmPassword,
                      }}
                      refetchQueries={[
                          {query: CURRENT_USER_QUERY}
                      ]}>
                {(resetPassword, { error, loading, called }) => (
                    <Form
                    method="post"
                    onSubmit={async e => {
                      e.preventDefault();
                      await resetPassword();
                      this.setState({ password: '', confirmPassword:'' });
                    }}
                  >
                        <fieldset disabled={loading} aria-busy={loading}>
                            <h2>Restaurar Contraseña</h2>
                            <Error error={error}/>
                            <label htmlFor="password">
                                Contraseña
        <input type="password" pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$" name="password" placeholder="Mínimo 8 caracteres, mínimo una letra, un número y un caracter especial" required value={this.state.password} onChange={this.handleChange} />
                            </label>
                            <label htmlFor="password">
                                Confirma Contraseña
        <input type="password" pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$" name="confirmPassword" placeholder="Confirma Contraseña" required value={this.state.confirmPassword} onChange={this.handleChange} />
                            </label>
                            <button type="submit">Restaurar</button>
                        </fieldset>
                    </Form>
                    )
                }
            </Mutation>
        );
    }
}
export default Reset;
export { RESET_MUTATION };