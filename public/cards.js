'use strict';
const cardperuser = 9; //depends on the game rules
const back = document.querySelectorAll('.back');
console.log('hello', back);
back.forEach(element => {
element.innerHTML = '';
 for(let i = 0; i < cardperuser; i++) {
   element.innerHTML += '🂠';
   if(element.parentElement.id != 'playern') element.innerHTML += '<br>';
 }
});
//♠    U2660
//♡    U2661
//♢    U2662
//♣    U2663
//♤    U2664
//♥    U2665
//♦    U2666
//♧    U2667
//
// 🂠   U1F0A0
// 🂡   U1F0A1
// 🂢   U1F0A2
// 🂣   U1F0A3
// 🂤   U1F0A4
// 🂥   U1F0A5
// 🂦   U1F0A6
// 🂧   U1F0A7
// 🂨   U1F0A8
// 🂩   U1F0A9
// 🂪   U1F0AA
// 🂫   U1F0AB
// 🂬   U1F0AC
// 🂭   U1F0AD
// 🂮   U1F0AE
// 🂱   U1F0B1
// 🂲   U1F0B2
// 🂳   U1F0B3
// 🂴   U1F0B4
// 🂵   U1F0B5
// 🂶   U1F0B6
// 🂷   U1F0B7
// 🂸   U1F0B8
// 🂹   U1F0B9
// 🂺   U1F0BA
// 🂻   U1F0BB
// 🂼   U1F0BC
// 🂽   U1F0BD
// 🂾   U1F0BE
// 🂿   U1F0BF
// 🃁   U1F0C1
// 🃂   U1F0C2
// 🃃   U1F0C3
// 🃄   U1F0C4
// 🃅   U1F0C5
// 🃆   U1F0C6
// 🃇   U1F0C7
// 🃈   U1F0C8
// 🃉   U1F0C9
// 🃊   U1F0CA
// 🃋   U1F0CB
// 🃌   U1F0CC
// 🃍   U1F0CD
// 🃎   U1F0CE
// 🃏  U1F0CF
// 🃑   U1F0D1
// 🃒   U1F0D2
// 🃓   U1F0D3
// 🃔   U1F0D4
// 🃕   U1F0D5
// 🃖   U1F0D6
// 🃗   U1F0D7
// 🃘   U1F0D8
// 🃙   U1F0D9
// 🃚   U1F0DA
// 🃛   U1F0DB
// 🃜   U1F0DC
// 🃝   U1F0DD
// 🃞   U1F0DE
// 🃟   U1F0DF
//
