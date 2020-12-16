    var firebaseConfig = {
      apiKey: "AIzaSyA-j64EFaKgeCpQCGQuW_qsR66l9S3glAg",
      authDomain: "epilkada.firebaseapp.com",
      databaseURL: "https://epilkada.firebaseio.com",
      projectId: "epilkada",
      storageBucket: "epilkada.appspot.com",
      messagingSenderId: "1067360368312",
      appId: "1:1067360368312:web:858e4dc7b6f8ab849ea64d"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

var id_paslon = document.getElementById('id_paslon');
var nama1 = document.getElementById('nama1');
var nama2 = document.getElementById('nama2');
var nik1 = document.getElementById('nik1');
var nik2 = document.getElementById('nik2');
var nomor = document.getElementById('nomor');
var partai = document.getElementById('partai');

var addBtnpaslon = document.getElementById('addBtnpaslon');
var updateBtnpaslon = document.getElementById('updateBtnpaslon');
var readBtnpaslon = document.getElementById('readBtnpaslon');
var removeBtnpaslon = document.getElementById('removeBtnpaslon');

var database = firebase.firestore();
var paslonCollection = database.collection('paslon');

var ggwp=""
var gg=""
//digunakan untuk upload foto paslon
var loadFile = function(event) {
  var image = document.getElementById('output');
  image.src = URL.createObjectURL(event.target.files[0]);
  gg=event.target.files
};

var stringFoto=[]

//penambahan data paslon, dimulai dari id paslon yang akan menjadi primary key
addBtnpaslon.addEventListener('click', (e) => {
  e.preventDefault();
  var cekPaslon=false
  database.collection('paslon').doc(id_paslon.value).get()
  .then(snapshot=>{
    if(snapshot.exists){
      alert("Proses Gagal.\nData paslon sudah terdaftar!!!")
    }else{
      var refFoto=firebase.storage().ref("paslon/"+id_paslon.value)
    refFoto.put(gg[0]).then(function(snapshot){
      ggwp=snapshot
      snapshot.ref.getDownloadURL().then(function(downloadURL){
        stringFoto.push(downloadURL)
        database.collection('paslon').doc(id_paslon.value).set({
              id_paslon : id_paslon.value,
              nama1 : nama1.value,
              nama2 : nama2.value,
              nik1 : nik1.value,
              nik2 : nik2.value,
              nomor : parseInt(nomor.value),
              partai : partai.value,
              foto: stringFoto[0]
          })
          .then(() => {alert("Berhasil menambahkan data paslon.")})
          .catch(error => {console.error(error)});
      });
    })
    }
  })  
});

//perbarui data paslon 
updateBtnpaslon.addEventListener('click', (e) => {
  e.preventDefault();
  var cek=false
  paslonCollection.doc(id_paslon.value).get()
  .then(snapshot=>{
    if(snapshot.exists){
      cek=true
    }else{
      alert('Data paslon belum terdaftar!!!')
    }
    if(cek==true){
      paslonCollection.doc(id_paslon.value).update({
        id_paslon : id_paslon.value,
        nama1 : nama1.value,
        nama2 : nama2.value,
        nik1 : nik1.value,
        nik2 : nik2.value,
        nomor : parseInt(nomor.value),
        partai : partai.value
      })
      .then(() => {alert('Berhasil memperbarui data.')})
      .catch(error => {console.error(error)});
    }
  })
  
})

//menghapus data paslon
removeBtnpaslon.addEventListener('click', (e) => {
  e.preventDefault();
  paslonCollection.doc(id_paslon.value).delete().then(function(){
    alert('Data telah berhasil dihapus')
  }).catch(function(error){
    console.error(error)
  })
})

var paragraf=document.createElement('p')
var x=""

//pembacaan data paslon berdasarkan id
readBtnpaslon.addEventListener('click', (e) => {
  e.preventDefault();
  paslonCollection.doc(id_paslon.value).get()
  .then(snapshot => {
    if(snapshot.exists){
      x=snapshot.data()
      nama1.value=x['nama1']
      nama2.value=x['nama2']
      nik1.value=x['nik1']
      nik2.value=x['nik2']
      nomor.value=x['nomor'].toString()
      partai.value=x['partai']
    }else{
      alert('Data paslon belum terdaftar!!!')
    }
  })
  .catch(error => {
    console.error(error);
  });
});
    

