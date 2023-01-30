import { FC, useEffect, useState } from 'react';
import styles from './Select.module.scss';
import collapseIcon from '../../../assets/images/collpase.svg';
import { ISelectOption } from "../../../types/form.select.types";

interface Props {
    options: ISelectOption[];
    defaultValue: string;
    fullWidth?: boolean;
    changeCallback?: any;

    value?: string;
}

const Select:FC<Props> = ({defaultValue,fullWidth,options,changeCallback,value}) => {

    const [isCollapsed, setIsCollapsed] = useState(false);

    const [selectedOption, setSelectedOption] = useState<ISelectOption | null>(null);

    const chooseOptionHandler = (option: ISelectOption) => {
        setSelectedOption(option);
        setIsCollapsed(false);
        changeCallback(option.value);
    }

    useEffect(() => {
        if (value) {
            let option = options.find(item => item.value === value);
            if (option) {
                setSelectedOption(option);
            }
        }
    },[value]);

    return (
        <div className={styles.root} onClick={() => setIsCollapsed(!isCollapsed)}>

            <div className={styles.select}>
                <div className={styles.input} dangerouslySetInnerHTML={{__html: selectedOption?.text ?? defaultValue}}/>

                <button>
                    <img src={collapseIcon} style={{marginRight: 0}} alt="Collapse icon"/>
                </button>
            </div>

            {isCollapsed && !options || !(options?.length && options.length > 0) && (
                <div className={`${styles.list} ${styles.listWithoutOptions}`}>
                    No options
                </div>
            )}

            {isCollapsed && (options?.length && options?.length > 0) && <div className={`${styles.list}`}>
                {
                    options?.map((option, idx) => {
                        return (
                            <div key={option.id}
                                    className={styles.option}
                                    onClick={() => chooseOptionHandler(option) }
                                    dangerouslySetInnerHTML={{__html: option.text}}
                            />
                        )
                })
              }
            </div>}
        </div>
    );
};

export default Select;