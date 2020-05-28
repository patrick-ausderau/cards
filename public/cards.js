'use strict';
// local user sit south. other players counterclockwise positions relative to that.
const me = 3; //position will come from socket
const positions = ['players', 'playere', 'playern', 'playerw'];
const relativePosition = (nbplayers, myposition, playerpos) => {
  // local player always sit south
  if (myposition == playerpos) return 'players';
  if (nbplayers == 2) return 'playern';
  //todo: if more than 4 players, fix the positions
  if (myposition < playerpos) return positions[playerpos - myposition];
  return positions[playerpos - myposition + nbplayers];
};

const drawBack = (element, player, vertical) => {
  const amountBack = player.backface || 0;
  const amountHide = player.hidden || 0;
  //todo: switch to optional chaining when better browser support
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
  const amountVisi = player.public && player.public.length || 0;
  console.log('player', player, amountVisi);
  const amount = amountBack + amountHide + amountVisi;
  //todo: find the space after hidden and private...
  element.innerHTML = `(${amount} cards${amount > 0 ? `: ${amountBack > 0 ? `${vertical ? '<br>' : ''}${amountBack} private${amountHide + amountVisi > 0 ? `, ${vertical ? '<br>' : ''}` : ''}` : ''} ${amountHide > 0 ? `${amountHide} hidden${amountVisi > 0 ? `, ${vertical ? '<br>' : ''}` : ''}` : ''} ${amountVisi > 0 ? `${amountVisi} visible` : ''}` : ''})<br>`;
  for(let i = 0; i < player.backface; i++) {
    //todo draggable?
    //todo span back
    element.innerHTML += '🂠';
    if(vertical) element.innerHTML += '<br>';
  }
  player.public && player.public.forEach(card => {
    //todo draggable?
    //todo span red?
    element.innerHTML += card;
    if(vertical) element.innerHTML += '<br>';
  });
};

const drawPlayable = (parentContainer, cards) => {
  cards.forEach((card, pos) => {
    const element = document.createElement('span');
    element.id = pos + card;
    element.draggable = true;
    element.className = 'visible';
    if(card.codePointAt(0) >= '🂱'.codePointAt(0) && card.codePointAt(0) <= '🃎'.codePointAt(0)) element.className += ' red';
    element.innerHTML = card;
    parentContainer.appendChild(element);
  });
};

//const initGame; // start a new game, match socre to 0, eventually change player position,...
const initMatch = (players) => {
  players.forEach(player => {
      const element = document.getElementById(relativePosition(players.length, me, player.position));
      const username = element.querySelector('h2');
    username.innerHTML = player.username;
    if(player.position == me) {
      username.innerHTML += ' (ME):';
      // show my playable cards
      drawPlayable(element.querySelector('.card #private'), player.private);
      drawPlayable(element.querySelector('.card #public'), player.public);
      //todo: draw hidden
    } else {
      username.innerHTML += ':';
      drawBack(element.querySelector('.card'), player, element.id != 'playern');
    }
  });
};
// dummy test data
const testplayers = [
  {
    username: 'Mary',
    position: 1,
    backface: 7,
    hidden: 2,
  },
  {
    username: 'Bob',
    position: 2,
    backface: 9,
  },
  {
    username: 'John',
    position: 3,
    private: ['🂨', '🂺', '🂻', '🂾','🃖', '🃚', '🃞', '🃍',],
    public: ['🃁', ],
    hidden: 2,
  },
  {
    username: 'Alice',
    position: 4,
    backface: 6,
    public: ['🂩', '🂪', '🂫'],
  },
];
initMatch(testplayers);

// Drag and drop
//todo: drag and drop for stock, discard, trick and hidden
const mime = 'text/plain';
const dragStart = (event) => {
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData(mime, event.target.id);
};

const dragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};

const dragDrop = (event) => {
  event.preventDefault();
  const transferElement = document.getElementById(event.dataTransfer.getData(mime));
  const targetId = event.target instanceof HTMLSpanElement ? event.target.parentNode.id : event.target.id;
  console.log('drop target',targetId, event);
  transferElement.style.position =  targetId == 'board' ? 'absolute' : 'relative';
  //todo: if already card on right of, move by x*em
  transferElement.style.left = targetId == 'board' ? (event.target instanceof HTMLSpanElement ? `calc(${event.target.style.left} + 0.55em)` : event.layerX + 'px') : 0;
  transferElement.style.top = targetId == 'board' ? (event.target instanceof HTMLSpanElement ? event.target.style.top : event.layerY + 'px') : 0;
  if(targetId == 'board') {
    document.getElementById('board').appendChild(transferElement);
  } else if (event.target instanceof HTMLSpanElement) {
    event.target.after(transferElement);
  } else {
    event.target.appendChild(transferElement);
  }
};

const privateArea = document.getElementById('private');
const publicArea = document.getElementById('public');
const board =  document.getElementById('board');
privateArea.ondragstart = dragStart;
privateArea.ondragover = dragOver;
privateArea.ondrop = dragDrop;
publicArea.ondragstart = dragStart;
publicArea.ondragover = dragOver;
publicArea.ondrop = dragDrop;
board.ondragstart = dragStart;
board.ondragover = dragOver;
board.ondrop = dragDrop;
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
// U1F0E0       U1F0E1         U1F0E2         U1F0E3
// 🃠     🃡       🃢       🃣
// U1F0E4       U1F0E5         U1F0E6         U1F0E7
// 🃤     🃥       🃦       🃧
// U1F0E8       U1F0E9         U1F0EA         U1F0EB
// 🃨     🃩       🃪       🃫
// U1F0EC       U1F0ED         U1F0EE         U1F0EF
// 🃬     🃭       🃮       🃯
// U1F0F0       U1F0F1         U1F0F2         U1F0F3
// 🃰     🃱       🃲       🃳
// U1F0F4       U1F0F5
// 🃴     🃵
