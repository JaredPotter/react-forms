import React from 'react';
import './RegistrationForm.css'

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                username: '',
                firstName: '',
                firstLast: '',
                dateOfBirth: '',
                email: '',
                password: '',
                passwordConfirmation: '',
            },
            formErrors: {
                username: '',
                firstName: '',
                firstLast: '',
                dateOfBirth: '',
                email: '',
                password: '',
                passwordConfirmation: '',
            },
            isFormValid: '',
            errorMessage: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(field, event) {
        const value = event.target.value;
        const formClone = Object.assign({}, this.state.form);
        formClone[field] = value;

        this.setState({
            form: formClone
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        // Reset Errors:
        const originalFormErrors = {
            username: '',
            firstName: '',
            firstLast: '',
            dateOfBirth: '',
            email: '',
            password: '',
            passwordConfirmation: '',
        };
        
        this.setState({
            formErrors: originalFormErrors,
            isFormValid: true
        });

        // Validate all fields.
        const form = this.state.form;

        let formErrors = {};

        if(!form.username || form.username.length < 8) {
            formErrors.username = 'Username is missing or is less then 8 characters long';
        }

        if(!form.password || form.password.length < 8) {
            formErrors.password = 'Password is missing or is less then 8 characters long';
        }

        if(!form.passwordConfirmation || form.passwordConfirmation.length < 8) {
            formErrors.passwordConfirmation = 'Password Confirmation is missing or is less then 8 characters long';
        }

        if(form.password !== form.passwordConfirmation) {
            formErrors.password = 'Password and Password Confirmation do not match';
            formErrors.passwordConfirmation = 'Password and Password Confirmation do not match';
        }
        
        debugger;
        if(Object.keys(formErrors).length > 0) {
            debugger;
            this.setState({
                formErrors: formErrors,
                isFormValid: false
            });        

            return;
        }

        // Submit to Server
        alert('Successfully Registerd!');
    }

    render() {
        return (
            <div className="registration-form-container">
                <h1>Registration Form</h1>
                { this.state.isFormValid === false ? <span className="red">Form Validation Error(s)</span> : '' }
                <form onSubmit={ this.handleSubmit }>
                    <div className="field">
                        <label>
                            <span>
                                Username<span className="red">*</span>:
                            </span>
                            <input 
                                type="text" 
                                // required
                                // minLength="8"
                                value={ this.state.form.username } 
                                onChange={ (e) =>this.handleInputChange('username', e) }
                                className={ this.state.formErrors.username ? 'error' : '' }
                                />
                        </label>
                        { this.state.formErrors.username ? <span className="red">Error: { this.state.formErrors.username }</span> : ''} 
                    </div>
                    <div className="field">
                        <label>
                            <span>
                                Password<span className="red">*</span>:
                            </span>
                            <input
                                type="password"
                                // required
                                // minLength="8"
                                value={ this.state.form.password } 
                                onChange={ this.handleInputChange }
                                onChange={ (e) => this.handleInputChange('password', e) }
                            />
                        </label>
                        { this.state.formErrors.password ? <span className="red">Error: { this.state.formErrors.password }</span> : ''} 
                    </div>
                    <div className="field">
                        <label>
                            <span>
                                Password Confirmation<span className="red">*</span>:
                            </span>
                            <input
                                type="password"
                                // required
                                // minLength="8"
                                value={ this.state.form.passwordConfirmation } 
                                onChange={ (e) =>this.handleInputChange('passwordConfirmation', e) }                            
                            />
                        </label>
                        { this.state.formErrors.passwordConfirmation ? <span className="red">Error: { this.state.formErrors.passwordConfirmation }</span> : ''} 
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default RegistrationForm;