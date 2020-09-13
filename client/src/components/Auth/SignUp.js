import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom"
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import {NavLink} from "react-router-dom";
import {useSound} from "../../hooks/sound.hook";

export const SignUp = () => {
    const history = useHistory();
    const message = useMessage();
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        passwordSecond: ''
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

    // for REGISTER !
    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message, "success");
            await playSound('success');
            history.push("/auth/sign-in");
            console.log("Register data: ", data);
        } catch (e) {}
    };

    return (
        <div className={"auth-signUp-container"}>
            <form className={"regForm"}>
                <h4>Регистрация</h4>
                <div id={"formFirstStep"} className={"steps-container"}>
                    <label htmlFor="defaultFormUserName" className="form-control-label">
                        Ваше имя пользователя
                    </label>
                    <input type="text"
                           id="defaultFormUserName"
                           className="form-control"
                           name="username"
                           value={form.username}
                           minLength="2"
                           maxLength="16"
                           onChange={changeHandler}
                    />
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
                </div>
                <div id={"formSecondStep"} className={"steps-container"}>
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
                    <label htmlFor="defaultFormLoginPasswordExSec" className="form-control-label">
                        Повторите пароль
                    </label>
                    <input type="password"
                           id="defaultFormLoginPasswordExSec"
                           className="form-control"
                           minLength="6"
                           maxLength="16"
                           name="passwordSecond"
                           value={form.passwordSecond}
                           onChange={changeHandler}
                    />
                    <div className="form-buttons-container">
                        <button type="submit"
                                disabled={loading}
                                onClick={registerHandler}
                        >
                            Регистрация
                        </button>
                        <NavLink to={"/auth/sign-in"}>Логин</NavLink>
                    </div>
                </div>
            </form>
        </div>
    );
};