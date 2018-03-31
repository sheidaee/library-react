import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Button from './../../components/UI/Button';
import Spinner from './../../components/UI/Spinner';
import classes from './NewBook.scss';
import { axios } from '../../../utilities';
import Input from './../../components/UI/Input';
import withErrorHandler from '../../hoc/withErrorHandler';
import { bookOperations } from '../../../state/ducks/book';
import { updateObject, checkValidity } from '../../../utilities';

export class NewBook extends Component {

    state = {
        orderForm: {
            title: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Book title'
                },
                value: '',
                validation: {
                    required: true
                },
                touched: false,     
                valid: false                           
            },
            description: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Description'
                },
                value: '',
                validation: {
                    required: true
                },
                touched: false,
                valid: false
            },
            image: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Image URL'
                },
                value: '',
                validation: {
                    required: true,
                },
                touched: false,
                valid: false
            },
            year: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Year'
                },
                value: '',
                validation: {
                    required: true
                },
                touched: false,
                valid: false
            }
        },
        formIsValid: false
    }   

    static defaultProps = {
        redirectUrl: ''
    }
    
    addBookHandler = (event) => {
        event.preventDefault();

        const formData = {};

        Object.keys(this.state.orderForm).forEach( formElementIdentifier => {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        });        
        
        const book = updateObject(formData, {                        
            userId: this.props.userId       
        });
        
        this.props.onAddBook(book, this.props.token);        
    }    

    inputChangedHandler = (event, inputIdentifier) => {

        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value  : event.target.value,
            valid  : checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true
        });

        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        })

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        
        this.setState({orderForm: updatedOrderForm, formIsValid});
    }

    componentWillUnmount() {
        this.props.onSetRedirectAfterAdd('')
    }
    

    render() {
        let redirectToHome = null;
        if (this.props.redirectUrl !== '') {
            redirectToHome = <Redirect to={this.props.redirectUrl} />            
        }

        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
        <form action="" onSubmit={this.addBookHandler}>
            {formElementsArray.map(formElement => (
                <Input  
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
            ))}
            <Button btnType="Success" disabled={!this.state.formIsValid}>Add</Button>
        </form>);

        if (this.props.loading) {
            form = <Spinner />
        }
        return (            
            <div className={classes.NewBook}>
                {redirectToHome}
                <h4 className={classes.NewBookHeader}>Enter new book Data</h4>
                { form }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading    : state.book.list.loading,
        redirectUrl: state.book.list.redirectUrl,
        token      : state.auth.token,
        userId     : state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddBook            : (bookData, token) => dispatch(bookOperations.addBook(bookData, token)),
        onSetRedirectAfterAdd: (url) => dispatch(bookOperations.setRedirectAfterAdd(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(NewBook, axios));
