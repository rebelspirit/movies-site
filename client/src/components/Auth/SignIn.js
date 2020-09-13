import React, {useEffect, useState} from 'react';
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import {useAuth} from "../../hooks/auth.hook";
import {useHistory} from "react-router-dom"
import {NavLink} from "react-router-dom";
import {useSound} from "../../hooks/sound.hook";

export const SignIn = () => {
    const history = useHistory();
    const auth = useAuth();
    const message = useMessage();
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const {playSound} = useSound();

    useEffect(() => {
        message(error, "error");
        clearError()
    }, [error, message, clearError]);

    useEffect(() => {
        if (error) {
            playSound('error')
        }
    }, [error, playSound]);

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    };
    // for LOGIN !
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            await auth.login(data);
            message(data.message, "success");
            await playSound('success');
            history.push("/");
        } catch (e) {}
    };

    return (
        <div className={"auth-signIn-container"}>
            <form className={"regForm"}>
                <h4>Вход</h4>
                <label htmlFor="defaultFormLoginEmailEx" className="form-control-label">
                    Ваш E-mail
                </label>
                <input type="email"
                       id="defaultFormLoginEmailEx"
                       className="form-control"
                       name="email"
                       value={form.email}
                       onChange={changeHandler}
                />
                <label htmlFor="defaultFormLoginPasswordEx" className="form-control-label">
                    Ваш пароль
                </label>
                <input type="password"
                       id="defaultFormLoginPasswordEx"
                       className="form-control"
                       minLength="6"
                       maxLength="16"
                       name="password"
                       value={form.password}
                       onChange={changeHandler}
                />
                <div className="form-buttons-container">
                    <button type="submit"
                            disabled={loading}
                            onClick={loginHandler}
                    >
                        Логин
                    </button>
                    <NavLink to={"/auth/sign-up"}>Регистрация</NavLink>
                </div>
            </form>
        </div>
    );
};