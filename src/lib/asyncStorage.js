const asyncStorage = {
    getItem(key, defaultValue) {
        const item = window.localStorage.getItem(key);
        if (item === null) {
            if (defaultValue) {
                return Promise.resolve(defaultValue);
            } else {
                return Promise.reject(null);
            }
        } else {
            let parsed;
            try {
                parsed = JSON.parse(item);
            } catch (e) {
                return Promise.reject(e);
            }

            return Promise.resolve(parsed);
        }
    },

    setItem(key, value) {
        let stringified;
        try {
            stringified = JSON.stringify(value);
            window.localStorage.setItem(key, stringified); // this too can give exception
        } catch (e) {
            return Promise.reject(e);
        }

        return Promise.resolve(value);
    },
};

export default asyncStorage;