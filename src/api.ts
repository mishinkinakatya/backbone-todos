const COMMON_URL = `https://api.jsonbin.io/b/5f60b137ad23b57ef9129c5d`;

const Method = {
    GET: `GET`,
    POST: `POST`,
    PUT: `PUT`,
};

const StatusCode = {
    OK: 200,
    REDIRECT: 300,
};

const AUTHORIZATION = `$2b$10$BFuLsjA6WpghS80jECfxSeEZ6gNROexwOvtRj.RmraPBSoEhQ4MP6`;

const checkStatus = (response) => {
    if (response.status >= StatusCode.OK && response.status < StatusCode.REDIRECT) {
        return response;
    }
    throw new Error(`${response.status}: ${response.statusText}`);
};


class API {
    constructor(authorization) {
        this._authorization = authorization;
    }

    getTodoTasks() {
        return this._load({
            baseUrl: `${COMMON_URL}/latest`,
            method: Method.GET,
        })
            .then((response) => response.json());
    }

    updateTodoTasks(todoTasks) {
        return this._load({
            baseUrl: COMMON_URL,
            method: Method.PUT,
            body: JSON.stringify(todoTasks),
            headers: new Headers({"Content-Type": `application/json`})
        });
    }

    _load({baseUrl, method = Method.GET, body = null, headers = new Headers()}) {
        headers.append(`secret-key`, this._authorization);
        headers.append(`versioning`, false);

        return fetch(`${baseUrl}`, {method, body, headers})
            .then(checkStatus)
            .catch((err) => {
                throw err;
            });
    }
}

export const getApi = (): API => new API(AUTHORIZATION);
