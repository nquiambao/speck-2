import {ref as dataRef, get} from 'firebase/database';
import {db} from './libs/firebase/firebaseConfig';
import {manageCard} from './templates/manageCard'

async function pageInit(){
  const glassesRef = dataRef(db, 'glasses/');
  const glassesSnapShot = await get(glassesRef)
  const data = glassesSnapShot.val();

  Object.values(data).map(glasses=>{
    const card = manageCard(glasses)
    document.querySelector('.cards').appendChild(card)
    return card
  })
}

pageInit()