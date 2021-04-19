import {DropdownButton, Dropdown, Form, Button} from 'react-bootstrap';
import s from './search.module.css';
import DatePicker from 'react-datepicker';
import {connect} from "react-redux";
import actionTypes from "../../redux/actionTypes";
import {firstLatterUpperCase} from "../../helpers/firstLatterUpperCase";
import {searchTasksThunk} from "../../redux/actions";
import dateFormatter from "../../helpers/dateFormatter";

const statusList = [
    {label: "Done", value: "done", name: "status"},
    {label: "Active", value: "active", name: "status"},
    {label: "Reset", value: "", name: "status"}
];

const sortList = [
    {label: "A-Z", value: "A-Z", name: "sort"},
    {label: "Z-A", value: "Z-A", name: "sort"},
    {label: "creation_date_oldest", value: "creation_date_oldest", name: "sort"},
    {label: "creation_date_newest", value: "creation_date_newest", name: "sort"},
    {label: "completion_date_oldest", value: "completion_date_oldest", name: "sort"},
    {label: "completion_date_newest", value: "completion_date_newest", name: "sort"},
    {label: "Reset", value: "", name: "sort"}
];

const dateList = [
    {label: "Create_lte", value: "create_lte"},
    {label: "Create_gte", value: "create_gte"},
    {label: "Complete_lte", value: "complete_lte"},
    {label: "Complete_lte", value: "complete_gte"},
];

const Search = (props) => {

    const {
        changeDropdown,
        changeSearch,
        changeDate,
        searchTasks,
        resetSearch,
        ...state
    } = props;

    const {
        search,
        status,
        sort,
    } = state;

    const handleSubmit = () => {
        const queryData = {};
        for (let key in state) {
            if (state[key])
                queryData[key] = typeof state[key] === "object" ? dateFormatter(state[key]) : state[key];
        }
        searchTasks(queryData);
    }

    return (
        <div className="mb-5">
            <div className={s.search_wrapper}>
                <div className={s.search_header}>Search</div>
                <div className={s.searchSection}>
                    <div>
                        <Form.Control
                            name="title"
                            type="text"
                            placeholder="Search"
                            style={{width: "60%", margin: "0 auto"}}
                            value={search}
                            onChange={(e) => changeSearch(e.target.value)}
                        />
                    </div>
                    <div className="d-flex my-5 row">
                        <div
                            className="d-flex col-xl-6 col-md-6 col-12 justify-content-md-start justify-content-center">
                            <DropdownButton
                                id="dropdown-basic-button"
                                variant="secondary"
                                title={!!!status ? "Status" : firstLatterUpperCase(status)}
                            >
                                {
                                    statusList.map((status, index) => {
                                        return <Dropdown.Item
                                            key={index}
                                            onClick={() => changeDropdown(status.value, status.name)}>
                                            {status.label}
                                        </Dropdown.Item>
                                    })

                                }
                            </DropdownButton>
                            <DropdownButton id="dropdown-basic-button"
                                            title={!!!sort ? "Sort" : sort.toUpperCase().replaceAll("_", " ")}
                                            variant="secondary" className="ml-3">
                                {
                                    sortList.map((sort, index) => {
                                        return <Dropdown.Item
                                            key={index}
                                            onClick={() => changeDropdown(sort.value, sort.name)}>
                                            {sort.label}
                                        </Dropdown.Item>
                                    })
                                }
                            </DropdownButton>
                        </div>
                        <div className="d-flex flex-column col-xl-6 col-md-6 col-12 mt-4 mt-md-0">
                            {
                                dateList.map((item, index) => {
                                    return <div className={`${s.datePicker_row} d-flex`} key={index}>
                                        <div className={s.datePicker_label}>{item.label}</div>
                                        <DatePicker
                                            className={s.datePicker}
                                            selected={props[item.value]}
                                            onChange={date => {
                                                changeDate(item.value, date)
                                            }}
                                        />
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <div className="text-center">
                        <Button variant="info mt-3" onClick={handleSubmit}>Search</Button>
                        <Button variant="dark mt-3 ml-3" onClick={resetSearch}>Reset</Button>
                    </div>
                </div>

            </div>

        </div>
    );
}

const mapStateToProps = (state) => {

    const {
        search,
        status,
        sort,
        create_lte,
        create_gte,
        complete_lte,
        complete_gte
    } = state.searchState;

    return {
        search,
        status,
        sort,
        create_lte,
        create_gte,
        complete_lte,
        complete_gte
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        changeDropdown: (value, dropDownType) => dispatch({type: actionTypes.SET_DROPDOWN, value, dropDownType}),
        changeSearch: (value) => dispatch({type: actionTypes.SET_SEARCH, value}),
        changeDate: (dataType, date) => dispatch({type: actionTypes.SET_DATE, dataType, date}),
        searchTasks: (queryData) => dispatch(searchTasksThunk(queryData)),
        resetSearch: () => dispatch({type: actionTypes.RESET_SEARCH}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);