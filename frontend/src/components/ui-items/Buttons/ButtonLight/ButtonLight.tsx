import { FC, ReactNode, MouseEvent } from 'react';
import styles from './ButtonLight.module.scss';
import {IStyle} from "../../../../types/style.types";

interface Props {
    children: ReactNode;

    onClick?: (e?: MouseEvent<HTMLElement>) => void;

    width?: number;
    fullWidth?: boolean;
    height?: number;

    disabled?: boolean;
}

const ButtonLight:FC<Props> = ({   children,
                                   onClick,
                                   width,
                                   fullWidth,
                                   height,
                                   disabled}) => {

    const createStyle = ():IStyle => ({
        width: fullWidth ? '100%' : `${width ?? 'auto'}px`,
        minWidth: '46px',
        height: `${height ?? 42}px`,
    });

    return (
        <button
            className={styles.button}
            style={createStyle()}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default ButtonLight;