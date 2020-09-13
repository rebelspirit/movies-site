const request = async (url = '', method = 'POST', data = {}) => {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (e) {
        console.log(e.message)
    }
};

export class ServerService {
    static saveHistory(data) {
        return request('/api/auth/history', 'PUT', data);
    }
    static register(data) {
        return request('/api/auth/register', 'POST', data);
    }
    static sounds(data) {
        return request('/api/auth/sounds', 'PUT', data);
    }
    static nightMode(data) {
        return request('/api/auth/nightmode', 'PUT', data);
    }
    static parsingContent(data) {
        return request('/parser/start', 'POST');
    }
}