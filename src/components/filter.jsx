import React from "react";
import {TASK_STATUS} from "../const";

const Filter = (props) => {
    const {activeFilter, onFilterClick} = props;
    const allStatus = Object.values(TASK_STATUS);

    return (
        <ul>

            {allStatus.map((status) => {
                return (
                    <li key={status} checked={status === activeFilter} >
                        <a href="#" onClick={() => onFilterClick(status)}>{status}</a>
                    </li>
                )
            })
            }
        </ul>

    )
};

export default Filter;
