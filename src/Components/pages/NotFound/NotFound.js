import notFound404 from "../../../assets/images/404.png";

const NotFound = () => {
    return(
        <div className="d-flex justify-content-center mt-5">
            <img src={notFound404} alt="404"/>
        </div>
    )
}

export default NotFound;