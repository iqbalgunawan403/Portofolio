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

  var db=firebase.firestore()

  var tvKabKot=document.getElementById('tvKabKot')
  var tvProv=document.getElementById('tvProvinsi')
  var comboJenis=document.getElementById('comboJenis')
  var idWilayah=document.getElementById('idWilayah')
  var jlhPenduduk=document.getElementById('jlhPenduduk')
  var dataWilayah=document.getElementById('dataWilayah')

  tvKabKot.disabled=true
  tvProv.disabled=true
  function doJenis(){
      if(comboJenis.value==0){
        tvKabKot.disabled=true
        tvProv.disabled=false
      }
      else if(comboJenis.value==1){
          tvKabKot.disabled=false
          tvProv.disabled=false
      }
  }

  var statusKode=true
  function addWilayah(){
      if(comboJenis.value==0){
          if(tvProv.value!="" && jlhPenduduk.value!="" && idWilayah.value!=""){
            db.collection('wilayah').get()
            .then(snapshot=>{
                snapshot.forEach(data=>{
                    if(data.data()['id_wilayah']==idWilayah.value){
                        statusKode=false
                    }
                })
                if(statusKode==true){
                    db.collection('wilayah').doc(idWilayah.value)
          .set({
              id_wilayah: idWilayah.value,
              jlh_penduduk: parseInt(jlhPenduduk.value),
              nama:tvProv.value
          })
          .then(()=>{
              alert("Data berhasil ditambahkan!")
              })
              .catch(error=>{
                console.error(error)
          })
                }else{
                    alert("Proses Gagal!!! Kode wilayah sudah terdaftar.")
                }
            })
          }else{
              alert("Harap isi seluruh form!!!")
          }
      }
      else if(comboJenis.value==1){
        if(tvProv.value!="" && tvKabKot.value!="" && jlhPenduduk.value!="" && idWilayah.value!=""){
            var idProvBaru=""
            db.collection('wilayah').where('nama','==',tvProv.value).get()
            .then(snapshot=>{
                snapshot.forEach(data=>{
                    idProvBaru=data.id
                })
                if(idProvBaru!=""){
                    db.collection('wilayah').doc(idProvBaru).collection('kabupaten_kota')
                    .get().then(snapshot=>{
                        snapshot.forEach(data=>{
                            if(data.data()['id_wilayah']==idWilayah.value){
                                statusKode=false
                            }
                        })
                        if(statusKode==true){
                            db.collection('wilayah').doc(idProvBaru).collection('kabupaten_kota')
            .doc(idWilayah.value).set({
              id_wilayah: idWilayah.value,
              jlh_penduduk: parseInt(jlhPenduduk.value),
              nama:tvKabKot.value
          })
          .then(()=>{
              alert("Data berhasil ditambahkan!")
              })
              .catch(error=>{
                console.error(error)
          })
                        }else{
                            alert("Proses Gagal!!! Kode wilayah sudah terdaftar.")
                        }
                    })
                }else{
                    alert("Nama Provinsi tidak ditemukan!!!")
                }
            })
          }else{
              alert("Harap isi seluruh form!!!")
          }
      }else{
          alert("Harap pilih jenis wilayah dahulu!!!")
      }
  }

  //function untuk membaca isi wilayah
  function readWilayah(){
      if(comboJenis.value=="0"){
          if(tvProv.value!=""){
            db.collection('wilayah').where('nama','==',tvProv.value).get()
          .then(snapshot=>{
              var cek=false
            snapshot.forEach(data=>{
                cek=true
                idWilayah.value=data.id
                jlhPenduduk.value=data.data()['jlh_penduduk']

            })
            if(cek==false){
                alert("Nama provinsi tidak ditemukan!!!")
                dataWilayah.innerHTML=""
            }  
          }).catch(error=>{
              console.log(error)
          })
          }else{
              alert("Harap isi nama provinsi!!!")
          }   
      }
      else if(comboJenis.value=="1"){
        if(tvProv.value!="" && tvKabKot.value!=""){
            db.collection('wilayah').where('nama','==',tvProv.value)
            .get().then(snapshot=>{
                var cekProv=false
                var idProv=""
                snapshot.forEach(docs=>{
                    cekProv=true
                    idProv=docs.id
                })
                if(cekProv==false){
                    alert('Nama provinsi tidak ditemukan!!!')
                }else{
                    db.collection('wilayah').doc(idProv).collection('kabupaten_kota')
                    .where('nama','==',tvKabKot.value).get()
                    .then(doc=>{
                        var cekdata=false
                        doc.forEach(data=>{
                            cekdata=true
                            idWilayah.value=data.id
                            jlhPenduduk.value=data.data()['jlh_penduduk']
                       })
                        if(cekdata==false){
                            alert('Nama kabupaten/kota tidak ditemukan!!!')
                        }                            
                    })
                }
            })
        }else{
            alert("Harap isi nama provinsi dan kabupaten!!!")
        }
      }else{
          alert("Harap pilih jenis wilayah!!")
      }
  }

  //function untuk update wilayah, dibaca berdasarkan idwilayah
  function updateWilayah(){
    if(comboJenis.value==0){
        if(tvProv.value!="" && jlhPenduduk.value!="" && idWilayah.value!=""){
            db.collection('wilayah').doc(idWilayah.value).get()
          .then(snapshot=>{
              if(snapshot.exists==true){
                db.collection('wilayah').doc(idWilayah.value).set({
                    id_wilayah:idWilayah.value,
                    nama:tvProv.value,
                    jlh_penduduk:jlhPenduduk.value
                }).then(()=>{
                  statusAda=true
                  alert("Berhasil memperbarui data.")
                })
              }else{
                  alert("Kode wilayah tidak terdaftar!!!")
              }
          })
        }else{
            alert("Harap isi seluruh form!!!")
        }
    }
    else if(comboJenis.value==1){
      if(tvProv.value!="" && tvKabKot.value!="" && jlhPenduduk.value!="" && idWilayah.value!=""){
          var idProvBaru=""
          db.collection('wilayah').where('nama','==',tvProv.value).get()
          .then(snapshot=>{
              snapshot.forEach(data=>{
                  idProvBaru=data.id
              })
              if(idProvBaru!=""){
                  db.collection('wilayah').doc(idProvBaru).collection('kabupaten_kota')
                  .doc(idWilayah.value).get().then(documents=>{
                      if(documents.exists==true){
                          db.collection('wilayah').doc(idProvBaru).collection('kabupaten_kota')
          .doc(idWilayah.value).set({
            id_wilayah: idWilayah.value,
            jlh_penduduk: parseInt(jlhPenduduk.value),
            nama:tvKabKot.value
        })
        .then(()=>{
            alert("Data berhasil ditambahkan!")
            })
            .catch(error=>{
              console.error(error)
        })
                      }else{
                          alert("Proses Gagal!!! Kode wilayah sudah terdaftar.")
                      }
                  })
              }else{
                  alert("Nama Provinsi tidak ditemukan!!!")
              }
          })
          
        }else{
            alert("Harap isi seluruh form!!!")
        }
    }else{
        alert("Harap pilih jenis wilayah dahulu!!!")
    }
  }
  
  //function untuk hapus wilayah berdasarkan idWilayah
  function removeWilayah(){
    if(comboJenis.value==0){
        if(tvProv.value!="" && idWilayah.value!=""){
            db.collection('wilayah').doc(idWilayah.value).get()
            .then(doc=>{
                if(doc.exists){
                    db.collection('wilayah').doc(idWilayah.value).delete()
                    .then(function(){
                        alert("Data berhasil dihapus!!!")
                    })
                }else{
                    alert("Kode wilayah tidak terdaftar!!!")
                }
            })
        }else{
            alert("Harap isi nama provinsi dan kode wilayah!!!")
        }
    }
    else if(comboJenis.value==1){
      if(tvProv.value!="" && tvKabKot.value!="" && idWilayah.value!=""){
          var idProvBaru=""
          db.collection('wilayah').where('nama','==',tvProv.value).get()
          .then(snapshot=>{
              snapshot.forEach(data=>{
                  idProvBaru=data.id
              })
              if(idProvBaru!=""){
                  db.collection('wilayah').doc(idProvBaru).collection('kabupaten_kota')
                  .doc(idWilayah.value).get().then(documents=>{
                      if(documents.exists==true){
                          db.collection('wilayah').doc(idProvBaru).collection('kabupaten_kota')
          .doc(idWilayah.value).delete()
        .then(()=>{
            alert("Data berhasil dihapus!!!")
            })
            .catch(error=>{
              console.error(error)
        })
                      }else{
                          alert("Proses Gagal!!! Kode wilayah tidak terdaftar.")
                      }
                  })
              }else{
                  alert("Nama Provinsi tidak ditemukan!!!")
              }
          })
          
        }else{
            alert("Harap isi seluruh form!!!")
        }
    }else{
        alert("Harap pilih jenis wilayah dahulu!!!")
    }
  }
