const ValidateUtil = () => {}

ValidateUtil.isEmail = (email) => {
    try {
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (regexEmail.test(email)) {
            return true; 
        }
        return false;
    } catch (error) {
        return false;
    }
}

module.exports = ValidateUtil