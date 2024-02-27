import './style.scss'

function CardSkeleton() {
 
    return (
        <div className="card is-loading">
        <div className="image"></div>
        <div className="content">
          <h2></h2>
          <p></p>
        </div>
      </div>
    )
}

export default CardSkeleton