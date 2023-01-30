import { ChangeEvent, FC } from 'react';

import { IStyle } from "../../../types/style.types";
import styles from './TextArea.module.scss';

interface Props {
    title?: string;
    value?: string;
    onChangeValueCallback?: (newValue: string) => void;
    fullWidth?: boolean;
    marginBottom?: number;
}

const TextArea:FC<Props> = ({title,value,onChangeValueCallback,fullWidth, marginBottom}) => {
    const createStyle = ():IStyle => ({
        marginBottom: `${marginBottom ?? 0}px`,
        width: fullWidth ? '100%' : 'auto',
    });

    const onChangeValueHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let value = e.target.value;
        if (onChangeValueCallback) {
            onChangeValueCallback(value)
        }
    }

    return (
        <div className={styles.root} style={createStyle()}>
            <label>
                {title && <div className={styles.title}>
                    {title}
                </div>}
                <textarea value={value} onChange={onChangeValueHandler}/>
            </label>
        </div>
    );
};

export default TextArea;