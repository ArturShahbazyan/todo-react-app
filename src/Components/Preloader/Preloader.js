import s from "./preloader.module.css"

const Preloader = () => {
    return (
        <div className={s.loading_wrapper}>
            <div className={s.loader}></div>
        </div>
    )
}

export default Preloader;