import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import {ref as databaseRef, push, set} from 'firebase/database'
import { db, storage  } from "./libs/firebase/firebaseConfig";

document.querySelector("#productImage").addEventListener("change", onImageSelected);
document.forms["glassesForm"].addEventListener("submit", onAddGlasses); 

function onAddGlasses(e) {
  e.preventDefault();
  uploadNewGlasses();
}

function onImageSelected(e) {
  let file = e.target.files[0];
  document.querySelector(".display").src = URL.createObjectURL(file);
}

async function uploadNewGlasses() {
  const title = document.querySelector('#productTitle').value.trim()
  const description = document.querySelector('#productDescription').value.trim()
  const price = document.querySelector('#productPrice').value.trim()
  const file = document.querySelector('#productImage').files[0]

  const dataRef = databaseRef(db, 'glasses')
  const itemRef = await push(dataRef)
  const imageRef = storageRef(storage, `images/${itemRef.key}/${file.name}`);

  const uploadResult = await uploadBytes(imageRef, file);
  const path =  await getDownloadURL(imageRef)
  const imagePath = uploadResult.metadata.fullPath;
  
  set(itemRef,{
    key:itemRef.key,
    sku:`spg${itemRef.key}`,
    imagePath,
    glassesImage:path,
    title,
    description,
    price
  })

  onReturn()
}

function onReturn() {
  window.location.assign('manage.html')
}