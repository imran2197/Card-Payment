import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "../styles/Form.css";
import Master from "../images/Master.png";
import AmericanExpress from "../images/AmericanExpress.png";
import Discover from "../images/Discover.png";
import PayPal from "../images/PayPal.png";

const Form = () => {
    const [cardNumber, setCardNumber] = useState();
    const [expiryDate, setExpiryDate] = useState("");
    const [cvCode, setCvCode] = useState();
    const [cardOwner, setCardOwner] = useState("");

    const [cardError, setCardError] = useState("");
    const [cvError, setCvError] = useState("");
    const [validateForm, setValidateForm] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setValidateForm("");
        axios.post("/CardPayment", {
            cardNumber,
            expiryDate,
            cvCode,
            cardOwner
        })
        .then((response) => setSuccess(response.data.message))
        .catch(({response}) => setValidateForm(response.data.message));

        setCardNumber("");
        setExpiryDate("");
        setCvCode("");
        setCardOwner("");
    }

    useEffect(() => {
        if(cardNumber && cardNumber.toString().length !== 16){
            setCardError("card Number should be 16 digits");
        }
        if(cardNumber && cardNumber.toString().length === 16){
            setCardError("");
        }
    }, [cardNumber])

    useEffect(() => {
        if(cvCode && cvCode.toString().length !== 3){
            setCvError("CVV Should be 3 digits");
        }
        if(cvCode && cvCode.toString().length === 3){
            setCvError("");
        }
    }, [cvCode]);

    return (
        <>
            <form>
                <div className="header">
                    <p className="payment-text">Payment Details</p>
                    <div className="images">
                        <img src={Master} alt="MasterCard" id="master" />
                        <img src={Discover} alt="Discover" id="discover" />
                        <img src={PayPal} alt="PayPal" id="paypal" />
                        <img src={AmericanExpress} alt="AmericanExpress" id="american" />
                    </div>
                </div>
                <div className="main">
                    <div className="cardNumber">
                        <label>CARD NUMBER</label>
                        <div className="inputNumber">
                            <input type="number" name="card_number" placeholder="Valid Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} maxLength={16} />
                            <i class="fa fa-credit-card" id="icon"></i>
                        </div>
                        <p>{cardError}</p>
                    </div>
                    <div className="expiry">
                        <div className="labels">
                            <label>EXPIRATION DATE</label>
                            <label id="CVlabel">CV CODE</label>
                        </div>
                        <div className="inputs">
                        <input type="text" name="expiry_date" placeholder="MM/YY" id="expiry" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                        <input type="number" name="cv_code" placeholder="CVC" id="cvc" value={cvCode} onChange={(e) => setCvCode(e.target.value)} maxLength={3} />
                        </div>
                    </div>
                    <p>{cvError}</p>
                    <div className="cardOwner">
                        <label>CARD OWNER</label>
                        <input type="text" name="card_owner" placeholder="Card Owner Name" id="cardOwner" value={cardOwner} onChange={(e) => setCardOwner(e.target.value)} />
                    </div>
                    <p>{validateForm}</p>
                    <h5 id="success">{success}</h5>
                </div>
                <div className="footer">
                    <div className="button">
                        <button onClick={handleSubmit} >Confirm Payment</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Form
