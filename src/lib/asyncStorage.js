const asyncStorage = {
    getItem(key, defaultValue) {
        const item = window.localStorage.getItem(key);
        if (item === null) {
            return new Promise((resolve, reject) => {
                if (defaultValue) {
                    resolve(defaultValue);
                } else {
                    reject(null);
                }
            });
        } else {
            return new Promise((resolve, reject) => {
                let parsed;
                try {
                    parsed = JSON.parse(item);
                } catch (e) {
                    return reject(e);
                }

                resolve(parsed);
            });
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