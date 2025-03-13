export const Card = ({label,onClick, className})=>{
    return (
      <div className={`${className}`}>
        <section  className={`${className} card`} onClick={onClick}>
          <div className="card-img">
            <div className="card-label">
              <h2>{label}</h2>
            </div>
          </div>
        </section>
      </div>
    );
}