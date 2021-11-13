export const validateEmail = (email) => {
    if(email.length > 0) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }else {
        return false;
    }
}

export const isObjectEmpty = (obj) => {
    for(let key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export const dateToString = (date) => {
    const dateFormatOptions = { year: 'numeric', month: 'long'};

    return new Date(date).toLocaleDateString('en-US', dateFormatOptions)
}