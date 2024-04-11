const isLogged = () => {
    return JSON.parse(localStorage.getItem('logged_user'))
}

export default isLogged;