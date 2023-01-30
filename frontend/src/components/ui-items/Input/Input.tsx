import { ChangeEvent, FocusEvent, FC, useState, RefObject } from 'react';
import styles from './Input.module.scss';
import { IStyle } from "../../../types/style.types";

interface Props {
    refer?: RefObject<HTMLInputElement>;
    title?: string;
    name?: string;
    placeholder?: string;
    value?: string | any;
    type?: string;
    validation?: string;

    onChangeValueCallback?: (newValue: string) => void;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;

    fullWidth?: boolean;
    marginBottom?: number;

    validator?: any;
    errorMessage?: string;
}

const Input:FC<Props> = ({   onChange,
                             validator,
                             title,
                             name,
                             placeholder,
                             value,
                             type,
                             validation,
                             onChangeValueCallback,
                             fullWidth,
                             marginBottom,
                             errorMessage}) => {

    const [isValidationError, setIsValidationError] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    const createStyle = ():IStyle => ({
        marginBottom: `${marginBottom || 0}px`,
        width: fullWidth ? '100%' : 'auto',
    });

    const checkInputValue = (inputValue: string) => {
        let isCheck = true;

        let regExp = new RegExp(validator);

        if (validator) {
            isCheck = regExp.test(inputValue);
            setIsValidationError(!isCheck);
        } else {
            setIsValidationError(false);
        }
    }

    const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;

        if (onChange) {
            onChange(e);
        } else if (onChangeValueCallback) {
            onChangeValueCallback(inputValue)
        }

        if (!isDirty) return;

        checkInputValue(inputValue);
    }

    const onBlurInputHandler = (e: FocusEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;
        checkInputValue(inputValue);
        setIsDirty(true);
    }

    return (
        <div className={styles.root} style={createStyle()}>
            <label>
                {title && <div className={styles.title}>
                    {title}
                </div>}
                <input
                    autoComplete="off"
                    name={name}
                    type={type ?? 'text'}
                    value={value}
                    onChange={onChangeValueHandler}
                    onBlur={onBlurInputHandler}
                    placeholder={placeholder}
                />
            </label>

            {isValidationError &&
                <div className={styles.validationError}>
                    {errorMessage}
                </div>
            }
        </div>
    );
};

export default Input;