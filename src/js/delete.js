import {ref as databaseRef, get} from 'firebase/database';
import {db} from './libs/firebase/firebaseConfig';
import {deleteCard} from './templates/deleteCard'

async function pageInit(){
    const key = sessionStorage.getItem('key')
    const ref = databaseRef(db, 'glasses/' + key);
    const snapshot = await get(ref)
    const data = snapshot.val()

    const card = deleteCard(data, ref)
    document.querySelector('main .container').appendChild(card)
    return card
  }
  
  pageInit()