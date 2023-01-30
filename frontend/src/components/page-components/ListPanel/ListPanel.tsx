import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { useSearchParams } from "react-router-dom";

import Input from "../../ui-items/Input/Input";
import ButtonLight from "../../ui-items/Buttons/ButtonLight/ButtonLight";
import Modal from "../../ui-items/Modal/Modal";
import Select from "../../ui-items/Select/Select";

import styles from "./ListPanel.module.scss";
import plusIcon from "../../../assets/images/plus.svg";
import { FILTERS, SORTS } from "../../../data/option.selects.data";
import ProjectForm from "../ProjectForm/ProjectForm";
import { useDebounce} from "../../../hooks/useDebounce";
import { IProjectDto } from "../../../types/project.types";

interface Props {
    addProjectHandler: ( {title, description, date}: IProjectDto, id?: string | undefined) => any;
}

const ListPanel:FC<Props> = ({addProjectHandler}) => {

    let [searchParams, setSearchParams] = useSearchParams();

    const [isShow, setIsShow] = useState(false);

    const [searchValue, setSearchValue] = useState('');

    const ref = useRef(false);

    useEffect(() => {
        const query = searchParams.get('query') || '';
        const sort = searchParams.get('sort') || '';
        const filter = searchParams.get('filter') || '';
        if (searchParams && !ref.current) {
            setSearchValue(query);
            onFilterChangeCallback(filter);
            onSortChangeCallback(sort);
            ref.current = true;
        }
    },[searchParams]);

    const searchProjects = useDebounce(async(value: any) => {
        const val = value;
        const filter = searchParams.get('filter') || '';
        const sort = searchParams.get('sort') || '';
        setSearchParams({query: val, sort, filter});
    }, 400);

    const onChangeSearchValueHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSearchValue(val);
        searchProjects(val);
    }

    const onFilterChangeCallback = (filterValue: string) => {
        const query = searchParams.get('query') || '';
        const sort = searchParams.get('sort') || '';
        setSearchParams({ query, sort, filter: filterValue});
    }

    const onSortChangeCallback = (sortValue: string) => {
        const filter = searchParams.get('filter') || '';
        const query = searchParams.get('query') || '';
        setSearchParams({query, sort: sortValue, filter});
    }

    return (
        <>
            <div className={styles.panel}>
                <div>
                    <Input fullWidth
                           placeholder="Search by title"
                           value={searchValue}
                           onChange={onChangeSearchValueHandler}
                    />

                    <ButtonLight width={46}
                                 onClick={() => setIsShow(!isShow)}
                    >
                        <img src={plusIcon} alt="Add icon" style={{marginRight: 0}}/>
                    </ButtonLight>
                </div>

                <div>
                    <div>
                        <Select defaultValue="Filter by"
                                options={FILTERS}
                                changeCallback={onFilterChangeCallback}
                        />
                    </div>

                    <div>
                        <Select defaultValue="Sort by"
                                options={SORTS}
                                changeCallback={onSortChangeCallback}
                        />
                    </div>
                </div>
            </div>

            {isShow && <Modal setShow={setIsShow}>
                    <ProjectForm setShow={setIsShow} actionText="Create" handler={addProjectHandler} />
                </Modal>
            }
        </>
    );
};

export default ListPanel;