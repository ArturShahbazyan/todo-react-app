import {DropdownButton, Dropdown, Form, Button} from 'react-bootstrap';
import styles from './search.module.css';
import DatePicker from 'react-datepicker';

const Search = () => {
    return (
        <div className="mb-3">
            <h1 className="text-center">Search</h1>
            <div className={styles.searchSection}>
                <div>
                    <Form.Control
                        name="title"
                        type="text"
                        placeholder="Search"
                        style={{width: "60%", margin: "0 auto"}}
                    />
                </div>
                <div className="d-flex my-5 row">
                    <div className="d-flex col-xl-6 col-md-6 col-12 justify-content-md-start justify-content-center">
                        <DropdownButton id="dropdown-basic-button" variant="secondary" title="Status">
                            <Dropdown.Item>Done</Dropdown.Item>
                            <Dropdown.Item>Active</Dropdown.Item>
                        </DropdownButton>

                        <DropdownButton id="dropdown-basic-button" title="Sort" variant="secondary" className="ml-3">
                            <Dropdown.Item>A-Z</Dropdown.Item>
                            <Dropdown.Item>Z-A</Dropdown.Item>
                            <Dropdown.Item>creation_date_oldest</Dropdown.Item>
                            <Dropdown.Item>creation_date_newest</Dropdown.Item>
                            <Dropdown.Item>completion_date_oldest</Dropdown.Item>
                            <Dropdown.Item>completion_date_newest</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <div className="d-flex col-xl-6 col-md-6 col-12 mt-4 mt-sm-0">
                        <div className="mr-3">
                            <div className={styles.datePicker_label}>create_lte:</div>
                            <div className={styles.datePicker_label}>create_gte:</div>
                            <div className={styles.datePicker_label}>complete_lte:</div>
                            <div className={styles.datePicker_label}>complete_gte:</div>
                        </div>
                        <div>
                            <div className={styles.datePicker_row}>
                                <DatePicker className={styles.datePicker} selected={new Date()}/>
                            </div>
                            <div className={styles.datePicker_row}>
                                <DatePicker className={styles.datePicker} selected={new Date()}/>
                            </div>
                            <div className={styles.datePicker_row}>
                                <DatePicker className={styles.datePicker} selected={new Date()}/>
                            </div>
                            <div className={styles.datePicker_row}>
                                <DatePicker className={styles.datePicker} selected={new Date()}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <Button variant="info mt-3">Search</Button>
                </div>

            </div>
        </div>
    );
}

export default Search;