import Image from './Image';

const Card = ({url, alt, title, text}) => {
    return (
        <div className="card">
            <Image url={url} alt={alt}/>
            <h4>{title}</h4>
            <span>{text}</span>
        </div>
    )
}

export default Card;