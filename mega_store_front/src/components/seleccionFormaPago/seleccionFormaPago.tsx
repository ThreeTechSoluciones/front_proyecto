import styled from 'styled-components';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

const SeleccionFormaPago = () => {
return (
    <StyledWrapper>
    <div className="radio-inputs">
        <label>
        <input className="radio-input" type="radio" name="engine" />
        <span className="radio-tile">
            <span className="radio-icon">
                <AttachMoneyIcon fontSize="large" />
            </span>
            <span className="radio-label">Efectivo</span>
        </span>
        </label>
        <label>
        <input defaultChecked className="radio-input" type="radio" name="engine" />
        <span className="radio-tile">
            <span className="radio-icon">
                <PhoneAndroidIcon fontSize="large" />
            </span>
            <span className="radio-label">Transferencia</span>
        </span>
        </label>
        <label>
        <input className="radio-input" type="radio" name="engine" />
        <span className="radio-tile">
            <span className="radio-icon">
                <CreditCardIcon fontSize="large" />
            </span>
            <span className="radio-label">Tarjeta de Crédito</span>
        </span>
        </label>
        <label>
        <input className="radio-input" type="radio" name="engine" />
        <span className="radio-tile">
            <span className="radio-icon">
                <AccountBalanceIcon fontSize="large" />
            </span>
            <span className="radio-label">Tarjeta de Débito</span>
        </span>
        </label>
    </div>
    </StyledWrapper>
);
}

const StyledWrapper = styled.div`
.radio-inputs {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 350px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

  .radio-inputs > * {
    margin: 6px;
}

.radio-input:checked + .radio-tile {
    border-color: #b598ed;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    color: #b598ed;
}

.radio-input:checked + .radio-tile:before {
    transform: scale(1);
    opacity: 1;
    background-color: #b598ed;
    border-color: #b598ed;
}

.radio-input:checked + .radio-tile .radio-icon svg {
    fill: #b598ed;
}

.radio-input:checked + .radio-tile .radio-label {
    color: #b598ed;
}

.radio-input:focus + .radio-tile {
    border-color: #b598ed;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1), 0 0 0 4px rgba(129, 95, 208, 0.28);
}

.radio-input:focus + .radio-tile:before {
    transform: scale(1);
    opacity: 1;
}

.radio-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80px;
    min-height: 80px;
    border-radius: 0.5rem;
    border: 2px solid #b5bfd9;
    background-color: #fff;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    transition: 0.15s ease;
    cursor: pointer;
    position: relative;
}

.radio-tile:before {
    content: "";
    position: absolute;
    display: block;
    width: 0.75rem;
    height: 0.75rem;
    border: 2px solid #b598ed;
    background-color: #fff;
    border-radius: 50%;
    top: 0.25rem;
    left: 0.25rem;
    opacity: 0;
    transform: scale(0);
    transition: 0.25s ease;
}

.radio-tile:hover {
    border-color: #b598ed;
}

.radio-tile:hover:before {
    transform: scale(1);
    opacity: 1;
}

.radio-icon svg {
    width: 2rem;
    height: 2rem;
    fill: #494949;
}

.radio-label {
    color: #707070;
    transition: 0.375s ease;
    text-align: center;
    font-size: 13px;
}

.radio-input {
    clip: rect(0 0 0 0);
    -webkit-clip-path: inset(100%);
    clip-path: inset(100%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
}`;

export default SeleccionFormaPago;
