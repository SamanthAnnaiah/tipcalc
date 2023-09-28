import { useState } from 'react';
import './tipstyle.css';

function App() {
  return (
    <>
      <Logodivision />
      <Contentdivision />
    </>
  );
}

function Logodivision() {
  return (
    <div className='middler'>
      <img src="./logo.svg" alt="alternateLogo" />
    </div>
  )
}

function Contentdivision() {
  return (
    <div className='main_div'>
      <Amountdivision />
    </div>
  )
}

function Amountdivision() {

  let [tipstateamount, settipstateamount] = useState(null);
  let [customtip, setcustomtip] = useState(0);
  let [custombill, setcustombill] = useState(0);
  let [people, setpeople] = useState(1);
  let [tipperperson, settipperperson] = useState(0);
  let [tiptotal, settiptotal] = useState(0);
  let [tiperror1, settiperror1] = useState(0);
  let [tiperror2, settiperror2] = useState(0);
  let [tiperror3, settiperror3] = useState(0);
  let [emessage, setemessage] = useState(null);

  let tipsperc = [5, 10, 15, 25, 50, 60];
  let tipsform = tipsperc.map((tip, tipindex) => {
    return (<div key={tip} className={`tinp ${tip == tipstateamount ? "bg3" : "bg1"}`} onClick={() => tipputter(tip)}>{tip}%</div>)
  })
  tipsform.push(
    <div key={tipsform.length * 20}>
      <input type="text" value={customtip} placeholder='$0.00'
        className={`tinp bg2 ${tiperror2 == 0 ? "" : "berror"}`} onChange={handlecustomtip} />
    </div>
  )

  function tipputter(theirtip) {
    settipstateamount(tipstateamount !== theirtip ? tipstateamount = theirtip : tipstateamount = tipstateamount);
    setcustomtip(0);
  }

  function handlecustomtip(event) {
    if (isNaN(Number(event.target.value))) {
      alert("Please enter a number")
    }
    else {
      setcustomtip(Number(event.target.value));
      settipstateamount(0);
    }
  }

  function handlecustombill(event) {
    if (isNaN(Number(event.target.value))) {
      alert("Please enter a number")
    }
    else {
      setcustombill(Number(event.target.value));
    }
  }

  function handlesetpeople(event) {
    if (isNaN(Number(event.target.value))) {
      alert("Please enter a number")
    }
    else {
      setpeople(Number(event.target.value));
    }
  }

  function handlegeneration() {
    settiperror1(0);
    settiperror2(0);
    settiperror3(0);
    setemessage(null);
    if ((tipstateamount <= 0 && customtip <= 0) || custombill <= 0 || people <= 0) {
      setemessage("Number(s) cannot be zero")
      if (tipstateamount <= 0 && customtip <= 0) {
        settiperror2(1);
      }
      if (custombill <= 0) {
        settiperror1(1);
      }
      if (people <= 0) {
        settiperror3(1);
      }
      return;
    }
    settiperror1(0);
    settiperror2(0);
    settiperror3(0);
    var tip = 0;
    if (customtip > 0) {
      tip = customtip;
    }
    else {
      tip = (tipstateamount / 100) * custombill;
    }
    settiptotal(Number(tip.toFixed(2)));
    settipperperson(Number((tip / people).toFixed(2)));

  }

  function handleblur() {
    setemessage(null);
  }

  function handlereset() {
    settipstateamount(0);
    setcustomtip(0);
    setcustombill(0);
    setpeople(1);
    settipperperson(0);
    settiptotal(0);
    setemessage(null);
  }

  return (
    <>
      {/* First input component  */}
      <div className='sub_div'>
        <div>
          <p>Customer's bill</p>
          <p><input type="text" className={`${tiperror1 == 0 ? "" : "berror"}`} placeholder='$000.00' size={32} value={custombill} onChange={handlecustombill} onBlur={handleblur} /></p>
        </div>
        <div>
          <p>Select Tip %</p>
          <div className='listplacer'>{tipsform}</div>
        </div>
        <div>
          <p>Number of people</p>
          <p><input type="text" className={`${tiperror3 == 0 ? "" : "berror"}`} placeholder='1' size={32} value={people} onChange={handlesetpeople} /></p>
        </div>
      </div>

      {/* Second input component  */}
      <div className='sub_div bg1'>
        <div className="grid-container">
          <div className="s1 item1 row1">Tip Amount / Person</div>
          <div className="s2 item2 row1">{tipperperson}</div>
          <div className="s3 item1 row1">Total tips</div>
          <div className="s4 item2 row1">{tiptotal}</div>
          <div className="s51 item3 row2 cerror">{emessage}</div>
          <div className="s5 item3 row2 bclass" onClick={handlegeneration}>Generate</div>
          <div className="s6 item3 row2 bclass" onClick={handlereset}>RESET</div>
        </div>
      </div>
    </>
  )
}


export default App;
