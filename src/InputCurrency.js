import './App.css';
import React from 'react';

const InputCurrency = ({ label, value, onChange, readOnly }) => {
    const onValueChange = (e) => {
        let val = e.target.value;
        val = parseFloat(val);
        if (isNaN(val)) {
            return;
        }
        if (onChange) {
            onChange(val);
        }
    }
    return (
        <div className="col-sm">
            <label className="form-label">{label}</label>
            <input readOnly={readOnly} disabled={readOnly} className="form-control" type="number" value={value} onChange={onValueChange} placeholder={`Enter amount in ${label}`} />
        </div>

    );
}

export default InputCurrency;
