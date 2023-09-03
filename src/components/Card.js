import "./Card.css";

const Card = ({title, icon, value, percentage}) => {
    return ( 
        <>
        
        <div class="card">
    <div class="title">
        <span>
            {icon}
        </span>
        <p class="title-text">
            {title}
        </p>
        <p class="percent">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" fill="currentColor" height="20" width="20">
                <path d="M1408 1216q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z">
                </path>
            </svg> {percentage}%
        </p>
    </div>
    <div class="data">
        <p>
            {value}
        </p>
        
        <div class="range">
            <div class="fill"  style={{ width: `${percentage}%` }}>
            </div>
        </div>
    </div>
</div>


        </>
     );
}
 
export default Card;