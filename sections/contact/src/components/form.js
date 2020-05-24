import React, { useReducer } from 'react'
import styles from './form.module.css'

const INITIAL_STATE = {
    name: '',
    email: '',
    subject: '',
    body: '',
    status: 'PENDING'
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'updatedFieldValue':
            return { ...state, [action.field]: action.value }

        case 'updateState': 
            return { ...state, status: action.status }

        case 'reset':
        default:
            return INITIAL_STATE
    }
}

const Form = () => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

    const setStatus = status => dispatch({ type: 'updateStatus', status })

    // Currying: Instead of calling a fxn with 2 arguments, we call it with one 
    // and return a fxn which takes the second argument
    const updatedFieldValue = field => event => {
        dispatch({
            type: 'updateFieldValue',
            field,
            value: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault()

        // TODO actually send the message
        console.log(state)
    }

    if (state.status === 'SUCCESS') {
        return (
            <p className={styles.success}>
                Message sent!
                <button type="reset" onClick={() => dispatch({ type: 'reset' })}
                className={`${styles.button} ${styles.centered}`}>Reset</button>
            </p>
        )
    }

    return (
        <>
            {state.status === 'ERROR' && (
                <p className={styles.error}>Something went wrong. Please try again.</p>
            )}
        <form className={`${styles.form} ${state.status === 'PENDING' && styles.pending }`} onSubmit={handleSubmit}>
            <label className={styles.label}>
                Name
                <input 
                    className={styles.input}
                    type="text" 
                    name="name" 
                    aria-label="Name"
                    value={state.name} 
                    onChange={updatedFieldValue('name')}
                />
            </label>
            <label className={styles.label}>
                Email
                <input className={styles.input}
                    type="email" aria-label="email" name="email" value={state.email} onChange={updatedFieldValue('email')} />
            </label>
            <label className={styles.label}>
                Subject
                <input className={styles.input}
                    type="text" name="subject" aria-label="subject" value={state.subject} onChange={updatedFieldValue('subject')} />
            </label>
            <label className={styles.label}>
                Body
                <textarea className={styles.input} aria-label="body" name="body"  value={state.body} onChange={updatedFieldValue('body')}/>
            </label>
            <button className={styles.button}>Send</button>
        </form>
        </>
    )
}

export default Form