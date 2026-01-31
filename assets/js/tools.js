
(function(){
  function money(x){
    if(!isFinite(x)) return "—";
    return x.toLocaleString('fr-FR', {maximumFractionDigits:0}) + " F CFA";
  }
  function num(id){
    const el=document.getElementById(id);
    const v=parseFloat(el.value);
    return isFinite(v)?v:0;
  }

  // ROI
  function calcROI(){
    const invest=num('roi_invest');
    const profit=num('roi_profit');
    const roi = invest>0 ? (profit/invest)*100 : 0;
    document.getElementById('roi_out').innerHTML =
      `<strong>ROI estimé : ${roi.toFixed(1)}%</strong>
       <div>Investissement : ${money(invest)} · Gain : ${money(profit)}</div>`;
  }

  // Marge
  function calcMargin(){
    const price=num('m_price');
    const cost=num('m_cost');
    const margin = price>0 ? ((price-cost)/price)*100 : 0;
    const profit = price-cost;
    document.getElementById('m_out').innerHTML =
      `<strong>Marge : ${margin.toFixed(1)}%</strong>
       <div>Bénéfice/unité : ${money(profit)}</div>`;
  }

  // Point mort (break-even)
  function calcBE(){
    const fixed=num('be_fixed');
    const price=num('be_price');
    const varcost=num('be_var');
    const contrib = price - varcost;
    const units = contrib>0 ? Math.ceil(fixed / contrib) : 0;
    const revenue = units * price;
    document.getElementById('be_out').innerHTML =
      `<strong>Point mort : ${units.toLocaleString('fr-FR')} ventes</strong>
       <div>Chiffre d’affaires pour atteindre 0 : ${money(revenue)}</div>`;
  }

  // CLV
  function calcCLV(){
    const avg=num('clv_avg');
    const freq=num('clv_freq');
    const months=num('clv_months');
    const clv = avg*freq*months;
    document.getElementById('clv_out').innerHTML =
      `<strong>Valeur client (CLV) : ${money(clv)}</strong>
       <div>${money(avg)} × ${freq} achat(s)/mois × ${months} mois</div>`;
  }

  // Cashflow projection (simple)
  function calcCash(){
    const cashin=num('c_in');
    const cashout=num('c_out');
    const months=num('c_months');
    const net = cashin - cashout;
    const total = net * months;
    document.getElementById('c_outbox').innerHTML =
      `<strong>Solde net mensuel : ${money(net)}</strong>
       <div>Projection sur ${months} mois : ${money(total)}</div>`;
  }

  // Wire up
  const handlers = [
    ['roi_invest', calcROI], ['roi_profit', calcROI],
    ['m_price', calcMargin], ['m_cost', calcMargin],
    ['be_fixed', calcBE], ['be_price', calcBE], ['be_var', calcBE],
    ['clv_avg', calcCLV], ['clv_freq', calcCLV], ['clv_months', calcCLV],
    ['c_in', calcCash], ['c_out', calcCash], ['c_months', calcCash]
  ];
  handlers.forEach(([id,fn])=>{
    const el=document.getElementById(id);
    if(el) el.addEventListener('input', fn);
  });

  // Initial compute
  calcROI(); calcMargin(); calcBE(); calcCLV(); calcCash();
})();
