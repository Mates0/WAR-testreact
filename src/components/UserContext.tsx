import React, {createContext, useContext, useReducer} from 'react';

interface User {
    username: string;
}

interface UserState {
    user: User | undefined;
}

interface UserAction {
    type: 'login' | 'logout';
    payload?: User;
}

interface UserContextType extends UserState {
    login: (user: User) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType>({
    user: undefined,
    login: () => {
    },
    logout: () => {
    },
});


const userReducer = (state: UserState, action: UserAction = { type: "login" } ): UserState => {
    switch (action.type) {
        case 'login':
            return {...state, user: action.payload};
        case 'logout':
            return {...state, user: undefined};
        default:
            return state;
    }
};

const LoginForm: React.FC = () => {
    const {login} = useContext(UserContext);
    const [username, setUsername] = React.useState('');

    const handleSubmit = () => {
        login({username});
        setUsername('');
    };

    return (
        <div>
            <h1>Login To you App!</h1>
            <form onSubmit={handleSubmit}>
                <h2>Username:</h2>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <button type="submit">Log in</button>
            </form>
        </div>
    );
};

const LogoutButton: React.FC = () => {
    const {logout} = useContext(UserContext);

    return (
        <button onClick={logout}>Log out</button>
    );
};

const App: React.FC = () => {
    const [state, dispatch] = useReducer(userReducer, {user: undefined});

    const login = (user: User) => {
        dispatch({type: 'login', payload: user});
    };

    const logout = () => {
        dispatch({type: 'logout'});
    };

    return (
        <UserContext.Provider value={{user: state.user, login, logout}}>
            <div>
                {state.user && (
                    <div>
                        <p>Welcome, {state.user.username}</p>
                        <LogoutButton/>
                    </div>
                )}
                {!state.user && <LoginForm/>}
            </div>
        </UserContext.Provider>
    );
};

export default App;
