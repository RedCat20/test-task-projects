import { FC, ReactNode } from 'react';
import styles from './ButtonPrimary.module.scss';
import {IStyle} from "../../../../types/style.types";

interface Props {
    children: ReactNode;
    width?: number;
    type?: 'submit' | 'reset' | 'button' | undefined;
    fullWidth?: boolean;
    height?: number;
    onClickCallback?: () => void;

    disabled?: boolean;
}

const ButtonPrimary:FC<Props> = ({   children,
                                     disabled,
                                     width,
                                     type,
                                     fullWidth,
                                     height,
                                     onClickCallback}) => {

    const createStyle = ():IStyle => ({
        width: fullWidth ? '100%' : `${width ?? 180}px`,
        height: `${height ?? 42}px`
    });


    return (
        <button disabled={disabled}
                type={type ?? 'button'}
                className={styles.button}
                style={createStyle()}
                onClick={onClickCallback}>
            {children}
        </button>
    );
};

export default ButtonPrimary;