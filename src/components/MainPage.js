import React, { useEffect, useState } from 'react';

//* API
import { getCoin } from '../services/api';

//* Components
import Loader from './Loader';
import Coin from './Coin';

//! Styles
import styles from './MainPage.module.css'

const MainPage = () => {

    const [coins, setCoins] = useState([])
    const [search, setSearch] = useState('')

    
    useEffect(() => {
        const fetchAPI = async () => {
            setCoins(await getCoin())
        }
        fetchAPI()
    }, [])
    
    const searchHandler = (event) => {
        setSearch(event.target.value)
    }

    const searchedCoin = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <>
            <input className={styles.input} type='text' value={search} onChange={searchHandler} placeholder='Search'/>
            <div>
                {coins.length ?
                <div className={styles.coinContainer}>
                    {
                        searchedCoin.map(coin => 
                            <Coin
                            key={coin.name}
                            name={coin.name}
                            image={coin.image}
                            symbol={coin.symbol}
                            price={coin.current_price}
                            priceChange={coin.price_change_percentage_24h}
                            marketCap={coin.market_cap}
                    />)
                    }
                    </div> :
                <Loader/>}
            </div>
        </>
    );
};

export default MainPage;