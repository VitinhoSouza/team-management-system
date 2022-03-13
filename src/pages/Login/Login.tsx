import logoGoogle from '../../assets/logo-google.svg'
import field3 from '../../assets/field3.jpg'
import ball from '../../assets/soccer-ball.svg'

import './Login.scss'

export function Login(){

    return(
        <div className='pageLogin'>
            <img className="img-ball" src={ball} alt="" />
            <img className="img-ball2" src={ball} alt="" />
            <img className="photoField" src={field3} alt="" />
            <div className='content'>
                <div className='texts'>
                    <h1>Team Management System</h1>
                    <h2>Manage players and teams with this platform and have fun!</h2>
                </div>
                
                <button className='buttonGoogle'>
                    <img src={logoGoogle} alt="" />
                    <span>
                        Entre com sua conta Google
                    </span>
                    
                </button>
            </div>
            
        </div>
    )
}