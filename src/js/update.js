import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import {ref as databaseRef, get, update} from 'firebase/database';
import {db, storage} from './libs/firebase/firebaseConfig';

async function pageInit(){
  const key = sessionStorage.getItem('key')

  const ref = databaseRef(db, 'glasses/' + key);
  const refSnapshot = await get(ref)
  const data = refSnapshot.val();

  document.querySelector('#productTitle').value = data.title
  document.querySelector('#productDescription').value = data.description
  document.querySelector('#productPrice').value = data.price
  document.querySelector('.display').src = data.glassesImage

  document.querySelector("#productImage").addEventListener("change", onImageSelected)
  document.forms["glassesForm"].addEventListener("submit", onUpdateGlasses);

  function onUpdateGlasses(e) {
    e.preventDefault();
    updateGlasses();
  }

  function onImageSelected(e) {
    let file = e.target.files[0];
    document.querySelector(".display").src = URL.createObjectURL(file)
  }

  async function updateGlasses() {
    const title = document.querySelector('#productTitle').value.trim()
    const description = document.querySelector('#productDescription').value.trim()
    const price = document.querySelector('#productPrice').value.trim()
    const file = document.querySelector('#productImage').files[0]

    let imagePathUpdate, path, imageRef, uploadResult;


    if (file == null) {
      imagePathUpdate = data.imagePath
      path = data.glassesImage
    } else {
      imageRef = storageRef(storage, `images/${key}/${file.name}`);
      uploadResult = await uploadBytes(imageRef, file);
      path =  await getDownloadURL(imageRef)
      imagePathUpdate = uploadResult.metadata.fullPath;
    }

    let dataRef = databaseRef(db, 'glasses')

    const updateData = {
      key: key,
      sku:`spg${key}`,
      imagePath: imagePathUpdate,
      glassesImage: path,
      title: title,
      description: description,
      price: price
    };

    const updates = {};
    updates[key] = updateData;

    update(dataRef, updates)
    onReturn()
  }

  document.querySelector('#return').addEventListener('click', onReturn)

  function onReturn() {
    window.location.assign('manage.html')
  }
}

pageInit()