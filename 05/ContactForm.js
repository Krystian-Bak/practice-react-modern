import React, { useReducer, useRef } from 'react';

const myColors = {
    error: '#D92344',
    success: '#37A69B',
    primary: '#120204',
    background: '#F2EEE9',
    accent: '#43D9CA',
};

const myLabels = {
    name: 'Imię i Nazwisko',
    email: 'E-mail',
    phone: 'Telefon',
    subject: 'Temat',
    message: 'Wiadomość',
    country: 'Kraj',
    postalCode: 'Kod pocztowy (00-000)',
};

const initialState = {
    values: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        country: '',
        postalCode: '',
    },
    errors: {},
    touched: {},
};

// useReduce()

function reducer(state, action) {
    switch (action.type) {
        case 'setField':
            return {
                ...state,
                values: {
                    ...state.values,
                    [action.field]: action.value,
                },
                touched: {
                    ...state.touched,
                    [action.field]: true,
                },
            };

        case 'setErrots':
            return {
                ...state,
                errors: action.errors,
            };

        case 'reset':
            return initialState;

        default:
            return state;
    }
}

function validate(values) {
    const errors = {};

    if (!values.name.trim()) errors.name = 'X Twoje imię i nazwisko jest wymagane';

    if (!values.email.trim()) errors.email = 'X Twój e-mail jest wymagany';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Niepoprawny e-mail';

    if (values.phone && !/^\+?[0-9\s-]{7,15}$/.test(values.phone))
        errors.phone = 'X Niepoprawny numer Twojego telefonu';

    if (!values.subject.trim()) errors.subject = 'X Temat wiadmości jest wymagany';

    if (!values.message.trim()) errors.message = 'X Treść wiadomości jest wymagana';

    if (!values.country.trim()) errors.country = 'X Kraj jest wymagany';

    if (!values.postalCode.trim()) errors.postalCode = 'X Kod pocztowy jest wymagany';
    else if (!/^\d{2}-\d{3}$/.test(values.postalCode))
        errors.postalCode = 'X Niepoprawny format (00-000)';

    return errors;
}

export default function ContactForm() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const refs = {
        name: useRef(null),
        email: useRef(null),
        phone: useRef(null),
        subject: useRef(null),
        message: useRef(null),
        country: useRef(null),
        postalCode: useRef(null),
    };

    const handleChange = (e) => {
        dispatch({
            type: 'setField',
            field: e.target.name,
            value: e.target.value,
        });
    };

    // scroll to error for UX/UI
    const scrollToError = (errors) => {
        const first = Object.keys(errors)[0];
        if (refs[first]?.current) {
            refs[first].current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
            refs[first].current.focus(); // focus to key object
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = validate(state.values);
        dispatch({ type: 'setErrots', errors });

        if (Object.keys(errors).length) {
            scrollToError(errors);
            return;
        }

        window.alert('Formularz wysłany poprawnie');
        dispatch({ type: 'reset' });
    };

    const getBorderColor = (field) => {
        if (state.errors[field]) return myColors.error;
        if (state.touched[field]) return myColors.success;
        return '#ccc';
    };

    const myFields = ['name', 'email', 'phone', 'subject', 'message', 'country', 'postalCode'];

    const myStyles = {
        wrapper: {
            height: '100%',
            maxHeight: '100%',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '30px',
            margin: 'auto',
            maxWidth: '1100px',
            flexWrap: 'wrap',
        },

        title: {
            textAlign: 'left',
            margin: '.5rem 0rem',
            padding: '0px',
            color: myColors.primary,
            fontWeight: '700',
        },
        field: {
            marginBottom: '14px',
            display: 'flex',
            flexDirection: 'column',
        },
        label: {
            marginBottom: '.25rem',
            fontSize: '14px',
            fontWeight: '700',
        },
        input: {
            padding: '.5rem',
            borderRadius: '8px',
            border: `2px solid #ccc`,
            outline: 'none',
            fontFamily: "'Lato', sans-serif",
            transition: '0.2s',
        },
        textarea: {
            minHeight: '40px',
            padding: '.5rem',
            borderRadius: '8px',
            border: `2px solid #ccc`,
            fontFamily: "'Lato', sans-serif",
        },
        error: {
            color: myColors.error,
            fontSize: '12px',
            marginTop: '5px',
            fontWeight: '700',
        },
        successHint: {
            color: myColors.success,
            fontSize: '12px',
            marginTop: '5px',
        },
        button: {
            width: '100%',
            padding: '12px',
            marginTop: '.5rem',
            background: myColors.primary,
            color: '#fff',
            border: 'none',
            borderRadius: '.5rem',
            fontWeight: '700',
            cursor: 'pointer',
            transition: '0.2s',
        },

        form: {
            maxWidth: '40%',
            minWidth: '320px',
            flex: '1',
            padding: '1rem 3rem',
            borderRadius: '.5rem',
            background: myColors.background,
            fontFamily: "'Lato', sans-serif",
        },

        imageBox: {
            zIndex: '-1',
            flex: '1',
            minWidth: '400px',
            maxWidth: '500px',
            marginLeft: '-10%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },

        image: {
            width: '100%',
            borderRadius: '.5rem',
            objectFit: 'cover',
        },
    };

    return (
        <div style={myStyles.wrapper}>
            <form style={myStyles.form} onSubmit={handleSubmit} noValidate>
                <h2 style={myStyles.title}>Kontakt</h2>

                {myFields.map((field) => (
                    <div key={field} style={myStyles.field}>
                        <label htmlFor={field} style={myStyles.label}>
                            {myLabels[field]}
                        </label>{' '}
                        {/* label must be connection with input - do zmiany, mieliśmy ten sam problem w Agata */}
                        {field === 'message' ? (
                            <textarea
                                ref={refs[field]}
                                name={field}
                                value={state.values[field]}
                                onChange={handleChange}
                                style={{
                                    ...myStyles.textarea,
                                    borderColor: getBorderColor(field),
                                }}
                            />
                        ) : (
                            <input
                                id={field}
                                ref={refs[field]}
                                name={field}
                                value={state.values[field]}
                                onChange={handleChange}
                                style={{
                                    ...myStyles.input,
                                    borderColor: getBorderColor(field),
                                }}
                            />
                        )}
                        {state.errors[field] && (
                            <div style={myStyles.error}>{state.errors[field]}</div>
                        )}
                        {!state.errors[field] && state.touched[field] && state.values[field] && (
                            <div style={myStyles.successHint}>&#10004; poprawne</div>
                        )}
                    </div>
                ))}

                <button type="submit" style={myStyles.button}>
                    Wyślij
                </button>
            </form>

            <div style={myStyles.imageBox}>
                <img
                    src="https://static.agatameble.pl/cdn-cgi/image/width=816,fit=scale-down,format=auto,quality=90/media/gallery/logowanie/rejestracja-desktop.jpg"
                    alt="Agata Meble | Kontakt"
                    style={myStyles.image}
                />
            </div>
        </div>
    );
}
