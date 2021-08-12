import './App.css';
import React, { useState, useEffect } from 'react';
import InputCurrency from './InputCurrency';

const CurrencyConverter = () => {
    const [currentCurrency, setCurrentCurrency] = useState('EUR');
    const [fxRate, setFxRate] = useState(1.1);
    const [firstValue, setFirstValue] = useState(1);
    const [secondValue, setSecondValue] = useState(parseFloat((1 / fxRate).toFixed(5)));
    const [currentUsdEur, setCurrentUsdEur] = useState(parseFloat((1 / fxRate).toFixed(5)));
    const [currentId, setCurrentId] = useState(0);
    let realTimeFxRate = fxRate;
    const [conversionList, setConversionList] = useState([
        { eur: 1, usd: 0.90, id: 0 },
        { eur: 0, usd: 0, id: 1 },
        { eur: 0, usd: 0., id: 2 },
        { eur: 0, usd: 0, id: 3 },
        { eur: 0, usd: 0, id: 4 }]);
    useEffect(() => {
        const updatePrice = () => {
            const randomVal = Math.random() - 0.5;
            let usdEur = parseFloat((currentUsdEur + randomVal).toFixed(5));
            if (usdEur < 0) {
                usdEur = -1 * usdEur;
            }
            // Update value continuously
            let eur = firstValue;
            let usd = secondValue;
            let sdValue = secondValue;
            if (currentCurrency === 'EUR') {
                const usdValue = firstValue * usdEur;
                eur = firstValue.toFixed(5);
                usd = usdValue.toFixed(5);
                sdValue = usdValue.toFixed(5);
            } else {
                const eurValue = firstValue * 1 / usdEur;
                eur = eurValue.toFixed(5);
                usd = firstValue.toFixed(5);
                sdValue = eurValue.toFixed(5);
            }
            setSecondValue(sdValue);
            let id = currentId;
            if (id === 4) {
                id = -1;
            }
            id++;
            const item = conversionList[id];
            setCurrentId(id);
            realTimeFxRate = eur / usd;
            if (item) {
                item.eur = eur;
                item.usd = usd;
                setConversionList(conversionList);
            }
            setCurrentUsdEur(usdEur);
        };
        const intervalTag = setInterval(updatePrice, 3000)
        return () => {
            clearInterval(intervalTag);
        }
    }, [conversionList, currentUsdEur, currentId])
    const onSwitchClick = () => {
        setCurrentCurrency(currentCurrency === 'USD' ? 'EUR' : 'USD');
        // setFirstValue(secondValue);
    };
    const onFirstChange = (val) => {
        setFirstValue(val);
        if (currentCurrency === 'EUR') {
            const usdValue = val * currentUsdEur;
            setSecondValue(usdValue.toFixed(5));
        } else {
            const eurValue = val * 1 / currentUsdEur;
            setSecondValue(eurValue.toFixed(5));
        }
    };
    const onFxRateChange = (val) => {
        setFxRate(val);
    };
    return (
        <div>
            <div className="row">
                <InputCurrency onChange={onFxRateChange} value={fxRate} label="FX Rate" />
                <InputCurrency onChange={onFirstChange} value={firstValue} label={currentCurrency === 'EUR' ? 'EUR' : 'USD'} />
                <div className="col-sm"><button className="btn btn-light mg-10" onClick={onSwitchClick}><i className="bi bi-arrow-left-right"></i></button></div>
                <InputCurrency value={secondValue} readOnly label={currentCurrency === 'EUR' ? 'USD' : 'EUR'} />
            </div>
            <div className="row">
                {conversionList && conversionList.length > 0 && <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>EUR</th>
                                <th>USD</th>
                            </tr>
                        </thead>
                        <tbody>
                            {conversionList.filter(cvt => cvt.eur !== 0).map(cvt => <tr key={cvt.id}>
                                <td>{cvt.eur}</td>
                                <td>{cvt.usd}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>}
            </div>
        </div>
    );
}

export default CurrencyConverter;
