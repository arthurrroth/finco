import "./LoadingAnimation.css"
import logoLeft from "../../icon/logoLeft.png"
import logoCircle from "../../icon/logoCircle.png"
import logoRight from "../../icon/logoRight.png"

const LoadingAnimation = () => {
    return ( 
        <main className="loading">
          <div className="container">
            <img className="logo-left" src={logoLeft} alt="logo" />
            <img className="logo-circle" src={logoCircle} alt="logo" />
            <img className="logo-right" src={logoRight} alt="logo" />
          </div>
        </main>
     );
}
 
export default LoadingAnimation;