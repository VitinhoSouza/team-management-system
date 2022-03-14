import {useDispatch, useSelector} from 'react-redux';

import { PlayerCard } from "../../components/PlayerCard/PlayerCard";
import { RootState } from '../../store/storeConfig';

import plusIcon from '../../assets/plus.svg'

import './Home.scss';

export function Home(){
    const dispatch = useDispatch();
    const authState:any = useSelector<RootState>(state => state.auth);
    
    return(
        <div className="homeContainer">
            <div className="playerCards">
                
                <PlayerCard age={22} level={4} name='Vitinho' position="MC" 
                    imgUrl="http://4.bp.blogspot.com/_i-KuDcuQjJE/TL2j2aCHpXI/AAAAAAAAAeg/e7e8GF2gy38/s1600/vitinho_picnik.jpg"/>
                
                <PlayerCard age={30} level={5} name='Neymar Jr' position="PE" 
                    imgUrl="https://www.ofutebolero.com.br/__export/1623535297137/sites/elfutboleromx/img/2021/06/12/neymar-brasil-argentina-16-10-2018_16iqsksvwzw5w107ek63d4fnst.jpg_1720385577.jpg" />

                <PlayerCard age={30} level={5} name='Neymar Jr' position="PE" 
                    imgUrl="https://www.ofutebolero.com.br/__export/1623535297137/sites/elfutboleromx/img/2021/06/12/neymar-brasil-argentina-16-10-2018_16iqsksvwzw5w107ek63d4fnst.jpg_1720385577.jpg" />
                
                <PlayerCard age={30} level={5} name='Neymar Jr' position="PE" 
                    imgUrl="https://www.ofutebolero.com.br/__export/1623535297137/sites/elfutboleromx/img/2021/06/12/neymar-brasil-argentina-16-10-2018_16iqsksvwzw5w107ek63d4fnst.jpg_1720385577.jpg" />
                
                <button className="button-addPlayer">
                    Adicionar mais um jogador
                    <img src={plusIcon} alt="" />
                </button>

            </div>
            
        </div>
    )
}