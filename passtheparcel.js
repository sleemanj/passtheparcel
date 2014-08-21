// ==UserScript==
// @name       Pass The Parcel Address Highlighter
// @namespace  http://github.com/sleemanj/passtheparcel
// @version    0.1
// @description Highlights possible incorrect address when sending Trademe Parcel with Pass THe Parcel
// @match      https://secure.passtheparcel.co.nz/TradeMe/Send/*
// @copyright  2014+, James Sleeman
// ==/UserScript==

(function(){
  if($('.hide-amend .instructions').length)
  {
    var found = $('.hide-amend .instructions')[0].innerText.replace(/^We recognise this address as being in /,'').replace(/, /, ',').split(',');
    var dm    = $('.trademe-delivery-map div')[0];
    var dmt   = dm.innerText.toLowerCase();
    var dme   = document.createElement('div');
      
    for(var i = 0; i < found.length; i++)
    {
      if(!dmt.match(found[i].toLowerCase()))
      {
        var d = document.createElement('p');
        d.style.color = 'red';
        d.style.fontWeight = 'bold';
        d.style.marginBottom = '0px';
        d.innerText = found[i] + ' (?)';
        dme.appendChild(d);
      }
      else
      {
        dm.innerHTML = dm.innerHTML.replace(found[i], '<span style="color:green;font-weight:bold;">'+found[i]+'</span>');
      }
    }
      
    dm.appendChild(dme);
  }
    
  // Default to drop-off
  //---------------------------------------------------------
  $('.pickup-address-link').trigger('click');    
    window.setTimeout(function(){  
        document.getElementById("pDropOff").checked  = true;   		
        pickupDropOff(document.getElementById("pDropOff")); 
    }, 500);
  //---------------------------------------------------------
    
})();
