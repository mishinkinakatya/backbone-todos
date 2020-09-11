import * as React from "react";
import {FILTER_TYPE} from "../const";
import '../style/filter.css';


export interface FilterProps {
    activeFilter: string,
    onFilterClick: (status: string) =>  void,
};


const Filter: React.FC<FilterProps> = (props) => {
    const {activeFilter, onFilterClick} = props;
    const allStatus = Object.values(FILTER_TYPE);

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
