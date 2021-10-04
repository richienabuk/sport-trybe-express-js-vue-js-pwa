export function signIn(data) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch('/api/v1/auth/login', requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('userToken', JSON.stringify(user?.token));
            return user;
        });
}

export function logOut() {
    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };

    return fetch('/api/v1/auth/logout', requestOptions)
        .then(handleResponse)
        .then(() => localStorage.removeItem('userToken'));
}

export function meData() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/v1/auth/me', requestOptions).then(handleResponse);
}

export function profileData() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/v1/auth/profile', requestOptions).then(handleResponse);
}

export function signUp(data) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch('/api/v1/auth/signup', requestOptions).then(handleResponse);
}

export function updateProfile(data) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };

    return fetch('/api/v1/auth/update', requestOptions).then(handleResponse);
}

export function updatePassword(data) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };

    return fetch('/api/v1/auth/change-password', requestOptions).then(handleResponse);
}

export function loadAllSports() {
    return fetch('/api/v1/sports').then(handleResponse);
}

export function accountVerification(data) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch('/api/v1/auth/verification', requestOptions)
        .then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                localStorage.removeItem('userToken');
                location.reload(true);
            }

            const error = (data && data.error) || response.statusText;
            return Promise.reject(error);
        }

        return data.data;
    });
}

function authHeader() {
    // return authorization header with jwt token
    let token = JSON.parse(localStorage.getItem('userToken'));

    if (token) {
        return { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' };
    } else {
        return {};
    }
}
