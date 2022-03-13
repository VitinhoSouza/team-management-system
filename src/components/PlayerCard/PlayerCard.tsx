import logoStar from '../../assets/star.svg';
import './PlayerCard.scss';

type IPlayerProps = {
    imgUrl:string
    name: string
    age: number
    position: string
    level: 1 | 2 | 3 | 4 | 5
}


export function PlayerCard({imgUrl,name,age,position,level}:IPlayerProps){

    function mountStars(){
        let aux = 0;
        let array = [];
        while(aux < level){
            array.push(aux)
            aux += 1;
        }
        return(
            array.map(star => {
                return <img src={logoStar} alt={`star${star}${name}`} key={`star${star}${name}`}/>
            })
            
        )
    }

    return(
        <div className='playerCard'>
            <img className='photoPlayer' src={imgUrl} alt="" />
            <div className='infoPlayer'>
                <h2>{name}</h2>
                <h3>{age} years</h3>
                <h3>{position}</h3>
                <h3>{mountStars()}</h3>
            </div>
            
        </div>
    )
}