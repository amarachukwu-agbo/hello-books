const validate = values => {
    const errors = {};
    if (!values.first_name || values.first_name.trim() === ''){
        errors.first_name = "First Name is required";
    }
    if (!values.last_name || values.last_name.trim() === ''){
        errors.last_name = "Last Name is required";
    }
    if (!values.email || values.email.trim() === ''){
        errors.email = "Email is required";
    }
    if (!values.password1 || values.password1.trim() === ''){
        errors.password1 = "Password is required";
    }
    if (values.password1 && values.password1.trim() !== '' && values.password1.length < 7) {
        errors.password1 = "Password must not be less than 6 characters"
    }
    if (values.password1 && values.password1.trim() !== '' && values.password1.length >= 7 
        && !new RegExp("^(?=.*[a-z])(?=.*[0-9])").test(values.password1) ) {
        errors.password1 = "Password must contain at least a letter and a number"
    }
    if (!values.password2 || values.password2.trim() === ''){
        errors.password2 = "Confirm Password is required";
    }
    if (values.password2 && values.password2.trim() !== '' 
        && values.password1 && values.password1 !== ''
        && values.password1 !== values.password2) {
            errors.password1 = "Passwords don't match";
            errors.password2 = "Passwords don't match";
        }
    return errors;
}

export default validate;