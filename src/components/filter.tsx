import * as React from "react";
import {TASK_STATUS} from "../const";
import '../style/filter.css';


export interface FilterPropsTypes {
    activeFilter: string,
    onFilterClick: (status: string) =>  void,
};


const Filter: React.FC<FilterPropsTypes> = (props) => {
    const {activeFilter, onFilterClick} = props;
    const allStatus = Object.values(TASK_STATUS);

    return (
        <ul className="filter">
            {allStatus.map((status) => {
                return (
                    <li key={status} className={status === activeFilter ? "filter-item-checked" : "filter-item"}>
                        <a className="link" href="#" onClick={() => onFilterClick(status)}>{status}</a>
                    </li>
                )
            })
            }
        </ul>

    )
};

export default Filter;
