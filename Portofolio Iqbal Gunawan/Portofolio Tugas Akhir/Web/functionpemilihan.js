 // Your web app's Firebase configuration
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
    var db = firebase.firestore();
    
    var comboJenis=document.getElementById("selectJenis")
    var comboGub=document.getElementById("selectGubernur")
    var comboBupKot=document.getElementById("selectBupKot")
    var btnTambah=document.getElementById("btnTambah")
    var modal=document.getElementById("myModal")
    var btnCheck=document.getElementById('btnCekId')
    var btnCloseCheck=document.getElementById('btnCloseCek')
    var statusIdPaslon=false
    var modalContent=document.getElementById("modalContent")
    var jlhDukungan=document.getElementById('jlh_dukungan')
    var idPaslon=document.getElementById("id_paslon")
    var textContent=document.getElementById("textContent")
    btnCloseCheck.addEventListener('click',(e)=>{
      e.preventDefault()
      modal.style.display="none"
    })

    //function tombol check untuk memastikan nomor paslon tersedia atau tidak
    btnCheck.addEventListener('click', (e)=>{
      e.preventDefault()
      if(idPaslon.value!=""){
        db.collection('paslon').doc(idPaslon.value).get()
      .then(snapshot =>{
        if(snapshot.exists){
          var data=snapshot.data()
          textContent.innerHTML="NIK Ketua Paslon: "+data["nik1"]+"<br>"+
          "NIK Wakil Paslon: "+data["nik2"]+"<br>"+
          "Nama Ketua Paslon: "+data["nama1"]+"<br>"+
          "Nama Wakil Paslon: "+data["nama2"]+"<br>"+
          "No. Urut: "+data["nomor"]+"<br>"
          modal.style.display="block"
          statusIdPaslon=false
        }else{
          statusIdPaslon=true
          alert("Id Paslon tidak ditemukan")
        }
      })
      }else{
        alert("Id Paslon tidak boleh kosong!!!")
      }
    })
    
    var idProv=[]
    var namaProv=[]
    var dataKabKot=[]

    var helper=0
    db.collection('wilayah').get().then(snapshot=>{
      snapshot.forEach(doc=>{
        namaProv.push(doc.data()["nama"])
        idProv.push(doc.id)
        var option=document.createElement("option");
      option.text=namaProv[helper]
      option.value=helper
      comboGub.add(option,null);
      helper++
      })
      helper=0
    })
   
    comboBupKot.disabled=true
    comboGub.disabled=true

    function doJenis(){
      if(comboJenis.value=="1"){
        comboGub.disabled=false
        comboBupKot.disabled=true
      }
      else if(comboJenis.value=="2"){
        comboGub.disabled=false
        comboBupKot.disabled=false
      }
      else{
        comboGub.disabled=true
        comboBupKot.disabled=true
      }
    }

    var namaKabKot=[]
    var idKabKot=[]
    function doGub(){
      if(comboGub.selectedIndex!=0){
        comboBupKot.length=1
        db.collection('wilayah').doc(idProv[comboGub.value]).collection('kabupaten_kota').get()
        .then(snapshot=>{
          snapshot.forEach(data=>{
            namaKabKot.push(data.data()["nama"])
            idKabKot.push(data.id)
            var option=document.createElement("option");
            option.text=namaKabKot[helper]
            option.value=helper
            comboBupKot.add(option,null);
            helper++
          })
        })
      }
    }

    var idPemilihan=[]
   
    function doInputId(){
      statusIdPaslon=true
    }

    //jumlah dukungan antara range 20 - 100
    function doJumlahDukungan(){
      if(jlhDukungan.value<20 || jlhDukungan.value>100){
        alert('Jumlah dukungan harus lebih dari 20 dan kurang dari 100!!!')
        jlhDukungan.value=""
      }
    }

    var wilayahPemilihan=[]

    //function untuk menghapus pemilihan
    function removePemilihan(){
      if(statusIdPaslon==false){
        db.collection('pemilihan').get().then(snapshot=>{
          var cekPemilihan=false
          var id=""
          snapshot.forEach(data=>{
            if(data.data()['id_paslon']==idPaslon.value){
              id=data.id
              cekPemilihan=true
            }
          })
          if(cekPemilihan==true){
            db.collection('pemilihan').doc(id).delete().then(()=>{
              alert('Berhasil menghapus data.')
            })
          }else{
            alert('ID Paslon '+idPaslon.value+' belum terdaftar dalam pemilihan!!!')
          }
        })
      }else{
        alert('Harap cek id Paslon')
      }
    }
    function addPemilihan(){
      if(statusIdPaslon==false){
        var nilaiDukungan=0
        if(comboJenis.value!=0 && comboGub.selectedIndex!=0 &&comboJenis.value=="1" && idPaslon.value!="" && jlhDukungan.value!=""){
          db.collection('pemilihan').get().then(snapshot=>{
            snapshot.forEach(data=>{
              if(idPaslon.value==data.data()["id_paslon"]){
                statusIdPaslon=true
              }
              
              if(namaProv[comboGub.value].toLowerCase()==data.data()['nama_wilayah']){
                nilaiDukungan=nilaiDukungan+data.data()['jlh_dukungan']
              }
              idPemilihan.push(data.id)
            })

            var newId=parseInt(idPemilihan[idPemilihan.length-1])
            newId+=1
            newId=newId.toString()
            if(newId.length==1){
              newId="00"+newId
            }
            else if(newId.length==2){
              newId="0"+newId
            }
            //perhitungan untuk nilai jumlah dukungan
            nilaiDukungan+=parseInt(jlhDukungan.value)
            if(statusIdPaslon==false){
              if(nilaiDukungan<=100){
                db.collection('pemilihan').doc(newId).set({
                  id_paslon:idPaslon.value,
                  id_pemilihan:newId,
                  jlh_suara:0,
                  nama_wilayah:namaProv[comboGub.value].toLowerCase(),
                  jlh_dukungan:parseInt(jlhDukungan.value)
                }).then(()=>{
                  alert("Berhasil menambahkan data.")
                })
              }else{
                alert('Gagal Menambahkan Pemilihan!!!\nJumlah dukungan pada wilayah pemilihan melebihi 100%')
              }
            }else{
              alert("Pemilihan dengan ID Paslon "+idPaslon.value+" sudah terdaftar!!!")
            }
            idPemilihan=[]
          }) 
        }
        else if(comboJenis.value!=0 && comboGub.selectedIndex!=0 && comboBupKot.selectedIndex!=0 && comboJenis.value=="2" && idPaslon.value!="" && jlhDukungan.value!=""){
          db.collection('pemilihan').get().then(snapshot=>{
            snapshot.forEach(data=>{
              if(idPaslon.value==data.data()["id_paslon"]){
                statusIdPaslon=true
              }
              if(namaKabKot[comboBupKot.value].toLowerCase()==data.data()['nama_wilayah']){
                console.log(nilaiDukungan)
                nilaiDukungan=nilaiDukungan+parseInt(data.data()['jlh_dukungan'])
              }

              idPemilihan.push(data.id)
            })
            var newId=parseInt(idPemilihan[idPemilihan.length-1])
            newId+=1
            newId=newId.toString()
            if(newId.length==1){
              newId="00"+newId
            }
            else if(newId.length==2){
              newId="0"+newId
            }
            nilaiDukungan+=parseInt(jlhDukungan.value)
            console.log(nilaiDukungan)
            if(statusIdPaslon==false){
              if(nilaiDukungan<=100){
                db.collection('pemilihan').doc(newId).set({
                  id_paslon:idPaslon.value,
                  id_pemilihan:newId,
                  jlh_suara:0,
                  nama_wilayah:namaKabKot[comboBupKot.value].toLowerCase(),
                  jlh_dukungan:jlhDukungan.value
                }).then(()=>{
                  alert("Berhasil menambahkan data.")
                })
              }else{
                alert('Gagal Menambahkan Pemilihan!!!\nJumlah dukungan pada wilayah pemilihan melebihi 100%')
              }
            }else{
              alert("Pemilihan dengan ID Paslon "+idPaslon.value+" sudah terdaftar!!!")
            }
        
            idPemilihan=[]
          }) 
        }
        else{
          alert("Harap isi seluruh form!!!")
        }
      }else{
        alert("Harap cek ID Paslon!!!")
      }
    }

    //function untuk menampilkan pemilihan berdasarkan id Paslon
    function readPemilihan(){
      var checker=false
      if(idPaslon.value!=""){
        var statusProv=false
        db.collection('pemilihan').where('id_paslon','==',idPaslon.value)
        .get().then(snapshot=>{
          snapshot.forEach(data=>{
            jlhDukungan.value=data.data()['jlh_dukungan']
            var ctr=0
            namaProv.forEach(prov=>{
              if(data.data()['nama_wilayah'].toLowerCase()==prov.toLowerCase()){
                comboJenis.selectedIndex=1
                comboGub.value=ctr
                ctr++
                jlhDukungan.value=data.data()['jlh_dukungan']
                comboBupKot.selectedIndex=0
                statusProv=true
              }
            })
            if(statusProv==false){
              checker=true
              var ctr1=0
              //pembacaan data pemilihan
              idProv.forEach(id=>{
                db.collection('wilayah').doc(id).collection('kabupaten_kota').get().then(docs=>{
                  docs.forEach(item=>{
                    if(item.data()['nama'].toLowerCase()==data.data()['nama_wilayah']){
                      var option=document.createElement("option");
                      comboBupKot.length=1
                      namaKabKot=[]
      option.text=item.data()['nama']
      option.value=1
      comboBupKot.add(option,null);
      jlhDukungan.value=data.data()['jlh_dukungan']
                      comboJenis.selectedIndex=2
                      comboBupKot.value=1
                      comboGub.value=ctr1
                      namaKabKot.push(item.data()['nama'])
                      statusProv=true
                    }
                  })
                  ctr1++
                  if(ctr1==idProv.length){
                    alert("Berhasil membaca data pemilihan.")
                  }
                })  
              })

            }else{
              alert("Berhasil membaca data pemilihan.")
            }
          })
          if(statusProv==false && checker==false){
            alert('Paslon belum terdaftar dalam pemilihan!!!')
          }
        })
      }
    }

    //function untuk memperbarui pemilihan berdasarkan Ketersediaan ID pasangan paslon
    function updatePemilihan(){
      if(statusIdPaslon==false){
        var nilaiDukungan=0
        var idPemilihan=""
        if(comboJenis.value!=0 && comboGub.selectedIndex!=0 &&comboJenis.value=="1" && idPaslon.value!="" && jlhDukungan.value!=""){
          db.collection('pemilihan').get().then(snapshot=>{
            snapshot.forEach(data=>{
              
              if(namaProv[comboGub.value].toLowerCase()==data.data()['nama_wilayah'] && data.data()['id_paslon']!=idPaslon.value){
                nilaiDukungan=nilaiDukungan+data.data()['jlh_dukungan']
              }
              if(data.data()['id_paslon']==idPaslon.value){
                idPemilihan=data.id
                console.log(data.id)
              }
            })

            nilaiDukungan+=parseInt(jlhDukungan.value)
            console.log(nilaiDukungan)
            if(nilaiDukungan<=100){
              db.collection('pemilihan').doc(idPemilihan).set({
                id_paslon:idPaslon.value,
                id_pemilihan:idPemilihan,
                jlh_suara:0,
                nama_wilayah:namaProv[comboGub.value].toLowerCase(),
                jlh_dukungan:parseInt(jlhDukungan.value)
              }).then(()=>{
                alert('Berhasil memperbarui data')
              })
            }else{
              alert('Gagal Memperbarui Pemilihan!!!\nJumlah dukungan pada wilayah pemilihan melebihi 100%')
            }

          }) 
        }
        else if(comboJenis.value!=0 && comboGub.selectedIndex!=0 && comboBupKot.selectedIndex!=0 && comboJenis.value=="2" && idPaslon.value!="" && jlhDukungan.value!=""){
          db.collection('pemilihan').get().then(snapshot=>{
            var namaWil=""
            snapshot.forEach(data=>{
              if(namaKabKot.length==1){
                if(namaKabKot[0].toLowerCase()==data.data()['nama_wilayah']){
                  console.log(nilaiDukungan)
                  nilaiDukungan=nilaiDukungan+parseInt(data.data()['jlh_dukungan'])
                  namaWil=data.data()['nama_wilayah']
                }
              }else{
                if(namaKabKot[comboBupKot.value].toLowerCase()==data.data()['nama_wilayah']){
                  nilaiDukungan=nilaiDukungan+data.data()['jlh_dukungan']
                  namaWil=data.data()['nama_wilayah']
                }
              }              
              if(idPaslon.value==data.data()['id_paslon']){
                idPemilihan=data.id
              }
              
            })
            console.log(nilaiDukungan)
            nilaiDukungan+=parseInt(jlhDukungan.value)
            
            //nilai dukungan untuk mendaftarkan paslon, memiliki batas dari 100
            if(nilaiDukungan<=100){
              db.collection('pemilihan').doc(idPemilihan).set({
                id_paslon:idPaslon.value,
                id_pemilihan:idPemilihan,
                jlh_suara:0,
                nama_wilayah:namaWil,
                jlh_dukungan:parseInt(jlhDukungan.value)
              }).then(()=>{
                alert('Berhasil memperbarui data')
              })
            }else{
              alert('Gagal Menambahkan Pemilihan!!!\nJumlah dukungan pada wilayah pemilihan melebihi 100%')
            }
          }) 
        }
        else{
          alert("Harap isi seluruh form!!!")
        }
      }else{
        alert("Harap cek ID Paslon!!!")
      }
    }