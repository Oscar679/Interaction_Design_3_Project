
class LocalStorage {
    static instance;

    setItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getItem(key) {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    }
}

export default LocalStorage;