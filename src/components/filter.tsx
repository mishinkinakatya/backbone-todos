import * as React from "react";
import {TASK_STATUS} from "../const";


interface PropsTypes {
    onFilterClick: (status: string) =>  void,
};


const Filter: React.FC<PropsTypes> = (props) => {
    const {onFilterClick} = props;
    const allStatus = Object.values(TASK_STATUS);

    return (
        <ul>
            {allStatus.map((status) => {
                return (
                    <li key={status}>
                        <a href="#" onClick={() => onFilterClick(status)}>{status}</a>
                    </li>
                )
            })
            }
        </ul>

    )
};

export default Filter;
