import {ref as dataRef, get} from 'firebase/database';
import {db} from './libs/firebase/firebaseConfig';
import {glassesCard} from './templates/glassesCard'

async function pageInit(){
  const glassesRef = dataRef(db, 'glasses/');
  const glassesSnapShot = await get(glassesRef)
  const data = glassesSnapShot.val();

  Object.values(data).map(glasses=>{
    const card = glassesCard(glasses)
    document.querySelector('.cards').appendChild(card)
    return card
  })
}

pageInit()