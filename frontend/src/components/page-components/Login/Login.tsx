import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { UsersApi } from "../../../api/users.api";

import { IFormInput } from "../../../types/form.input.types";
import { LOGIN_INPUTS } from "../../../data/login.fields.data";

import ButtonPrimary from "../../ui-items/Buttons/ButtonPrimary/ButtonPrimary";
import Input from "../../ui-items/Input/Input";
import ButtonLight from "../../ui-items/Buttons/ButtonLight/ButtonLight";

import styles from './Login.module.scss';
import googleIcon from '../../../assets/images/google.svg';


interface Props { }

const Login:FC<Props> = () => {
    const navigator = useNavigate();

    const [isRememberChecked, setIsRememberChecked] = useState(true);

    const [isValid, setIsValid] = useState(false);
    const [sendError, setSendError] = useState('');

    const [values, setValues] = useState<{email: string, password: string} | any>({
        email: '',
        password: ''
    });

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    const onLoginHandler = async (e: FormEvent<HTMLFormElement> & {target: any}) => {
        e.preventDefault();

        try {
            const user: any = await UsersApi.loginUser(values);

            if (user && user.token) {
                setSendError('');
                localStorage.setItem('token', user.token);

                navigator('/dashboard');
            }

        } catch (err: any) {
            console.log('err: ', err);
            setSendError(err.message || 'Sign in error');
        }
    }

    useEffect(() => {
        if (values.email?.length > 0 || values.password?.length > 0) {
            setSendError('');

            let names = Object.keys(values);

            let isChecked:boolean[] = [];

            names.forEach((name) => {
                let item = LOGIN_INPUTS.find(item => item.name === name);
                if (item) {
                    let regExp = new RegExp(item.validator);
                    isChecked.push(regExp.test(values[name]));
                }
            });

            setIsValid(
                (isChecked.filter((value:boolean) => value)).length === names.length
            );
        }
    },[values]);

    return (
        <div className={styles.container}>

            <div className={styles.content}>
                <div className={styles.title}>
                    Login
                </div>
                <div className={styles.subtitle}>
                    Welcome, please put your login credentials below
                </div>

                <form className={styles.form} onSubmit={onLoginHandler}>

                    <div className={styles.fieldset}>

                        {LOGIN_INPUTS.map((input: IFormInput, idx) => (
                            <Input
                                key={idx}
                                {...input}
                                value={values[input.name]}
                                onChange={onChange}
                            />
                        ))}

                        <div className={styles.settings}>
                            <label>
                                <div className={styles.checkbox}>
                                    <input type="checkbox" checked={isRememberChecked} onChange={() => setIsRememberChecked(!isRememberChecked)}/>
                                    <span className={styles.geekmark}></span>
                                </div>
                                <span>Remember me</span>
                            </label>

                            <a>Forgot password?</a>
                        </div>
                    </div>

                    <div className={styles.buttonsMb15}>
                        <ButtonPrimary
                            fullWidth
                            type="submit"
                            disabled={!isValid}
                        >
                            Login
                        </ButtonPrimary>
                    </div>

                </form>

                {sendError && <div className={styles.error}>
                    {sendError}
                </div>}

                <div className={`${styles.subtitle} ${styles.justifyCenter} ${styles.divider}`}>
                    <div />
                    <span>or</span>
                    <div />
                </div>

                <div className={styles.buttons}>
                    <ButtonLight
                        fullWidth
                    >
                        <img src={googleIcon} alt="Google icon"/>
                        <span>Sign in with Google</span>
                    </ButtonLight>
                </div>

            </div>

        </div>
    );
};

export default Login;