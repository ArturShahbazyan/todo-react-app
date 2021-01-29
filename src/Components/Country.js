import City from './City';

function Country() {
    const country = "Armenia";
    return (

        <div>
            <p>
                <b>Country:</b> {country}
            </p>
            <p>
                <City />
            </p>
        </div>

    )
}

export default Country;