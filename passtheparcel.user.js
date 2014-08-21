// ==UserScript==
// @name       Pass The Parcel Address Highlighter
// @namespace  http://github.com/sleemanj/passtheparcel
// @updateURL  https://github.com/sleemanj/passtheparcel/raw/master/passtheparcel.user.js
// @downloadURL  https://github.com/sleemanj/passtheparcel/raw/master/passtheparcel.user.js
// @version    0.1
// @description Some enhancements for the passtheparcel Trademe integration; highlights possibly mis-detected address, uses scrollable map, can default to Drop Off.
// @match      https://secure.passtheparcel.co.nz/TradeMe/Send/*
// @copyright  2014+, James Sleeman
// ==/UserScript==

(function(){
    
  // ========= CONFIGURATION ===================================================================
    
  var AlwaysDropOffByDefault = false; // Change to false if you like courier to pickup by default.
  
  // ========= END CONFIGURATION ===============================================================
    
    
  if($('.hide-amend .instructions').length && $('.hide-amend .instructions')[0].innerText.match(/^We recognise this address as being in /))
  {
    var found = $('.hide-amend .instructions')[0].innerText.replace(/^We recognise this address as being in /,'').replace(/, /, ',').split(',');
    var dm    = $('.trademe-delivery-map div')[0];
    var dmt   = dm.innerText.toLowerCase();
    var dme   = document.createElement('div');
    var matched = 0;
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
        matched++;
        dm.innerHTML = dm.innerHTML.replace(found[i], '<span style="color:green;font-weight:bold;">'+found[i]+'</span>');
      }
    }
      
    if(!matched)
    {
       var superWarning = document.createElement('div');
        superWarning.innerHTML = '<h2 style="margin-top:10px;">WARNING</h2><p>Pass The Parcel area did not match any part of address, check carefully!</p>';
       dme.appendChild(superWarning);
    }
     
      
    dm.appendChild(dme);
      
    var mp = $('.trademe-delivery-map>div>img');
    if(mp.length)
    {
        var ll = mp[0].src.replace(/^.*center=/, '').replace(/&.*$/,'');
        var ifrm = '<iframe width="420" height="480" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBYx_HcEqI1k8mVZPtvq_C14TLcKG6ZOZQ&amp;q='+ll+'&amp;zoom=10"></iframe>';
        $('.trademe-delivery-map>div')[1].innerHTML=ifrm;
    }
    var br = document.createElement('div');
    br.style.clear = 'both';
    br.innerHTML = '&nbsp;';
      
    $('.trademe-delivery-map')[0].appendChild(br);
    $('.trademe-delivery-map')[0].style.height = 'auto';
  }
    
  // Default to drop-off
  //---------------------------------------------------------
  if(AlwaysDropOffByDefault)
  {
      $('.pickup-address-link').trigger('click');    
        window.setTimeout(function(){  
            document.getElementById("pDropOff").checked  = true;   		
            pickupDropOff(document.getElementById("pDropOff")); 
        }, 500);
  }
  //---------------------------------------------------------
    
})();
