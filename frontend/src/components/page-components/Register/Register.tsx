import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UsersApi } from "../../../api/users.api";

import ButtonPrimary from "../../ui-items/Buttons/ButtonPrimary/ButtonPrimary";
import Input from "../../ui-items/Input/Input";
import ButtonLight from "../../ui-items/Buttons/ButtonLight/ButtonLight";

import styles from './Register.module.scss';
import googleIcon from '../../../assets/images/google.svg';
import { IFormInput } from "../../../types/form.input.types";
import { REGISTER_INPUTS } from "../../../data/register.fields.data";

interface Props { }

const Register:FC<Props> = () => {
    const navigator = useNavigate();

    const [isValid, setIsValid] = useState(false);
    const [sendError, setSendError] = useState('');

    const [values, setValues] = useState<{email: string, password: string} | any>({
        email: '',
        password: ''
    });

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    const onRegisterHandler = async (e: FormEvent<HTMLFormElement> & {target: any}) => {
        e.preventDefault();

        try {
            const user: any = await UsersApi.registerUser(values);

            if (user && user.token) {
                setSendError('');
                localStorage.setItem('token', user.token);
                navigator('/dashboard');
            }
        }

        catch (err: any) {
            console.log('err: ', err);
            setSendError(err.message || 'Sign up error');
        }
    }

    useEffect(() => {
        if (values.email?.length > 0 || values.password?.length > 0) {
            setSendError('');

            let names = Object.keys(values);

            let isChecked:boolean[] = [];

            names.forEach((name) => {
                let item = REGISTER_INPUTS.find(item => item.name === name);
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
                    Register
                </div>
                <div className={styles.subtitle}>
                    Welcome, please create your account
                </div>

                <form className={styles.form} onSubmit={onRegisterHandler}>

                    <div className={styles.fieldset}>

                        {REGISTER_INPUTS.map((input: IFormInput, idx) => (
                            <Input
                                key={idx}
                                {...input}
                                value={values[input.name]}
                                onChange={onChange}
                            />
                        ))}

                    </div>

                    <div className={styles.buttons}>
                        <ButtonPrimary
                            fullWidth
                            type="submit"
                            disabled={!isValid}
                        >
                            Register
                        </ButtonPrimary>
                    </div>

                </form>

                {sendError && <div className={styles.error}>
                    {sendError}
                </div>}

                <div className={`${styles.subtitle} ${styles.textCenter}`}>
                    Already have an account? <Link to="/login">Sign in</Link>
                </div>

                <div className={styles.buttons}>
                    <ButtonLight fullWidth>
                        <img src={googleIcon} alt="Google icon"/>
                        <span>Register with Google</span>
                    </ButtonLight>
                </div>

            </div>

        </div>
    );
};

export default Register;