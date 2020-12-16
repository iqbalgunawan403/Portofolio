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

  var comboJenis=document.getElementById('selectJenis')
  var comboProv=document.getElementById('selectProv')
  var comboKabKot=document.getElementById('selectKabKot')
  var tglJadwal=document.getElementById('tgl_pelaksanaan')

  comboKabKot.disabled=true
    comboProv.disabled=true

    //function utk melakukan pemilihan jenis wilayah
    function doJenis(){
      if(comboJenis.value=="0"){
        comboProv.disabled=false
        comboKabKot.disabled=true
      }
      else if(comboJenis.value=="1"){
        comboProv.disabled=false
        comboKabKot.disabled=false
      }
      else{
        comboProv.disabled=true
        comboKabKot.disabled=true
      }
    }

    var idProv=[]
    var namaProv=[]

    var helper=0
    db.collection('wilayah').get().then(snapshot=>{
      snapshot.forEach(doc=>{
        namaProv.push(doc.data()["nama"])
        idProv.push(doc.id)
        var option=document.createElement("option");
      option.text=namaProv[helper]
      option.value=helper
      comboProv.add(option,null);
      helper++
      })
      helper=0
    })

    var namaKabKot=[]
    var idKabKot=[]
    //function untuk menentukan provinsi
    function doProv(){
      if(comboProv.selectedIndex!=0 && comboJenis.value!="0"){
        comboKabKot.length=1
        namaKabKot=[]
        idKabKot=[]
        db.collection('wilayah').doc(idProv[comboProv.value]).collection('kabupaten_kota').get()
        .then(snapshot=>{
          snapshot.forEach(data=>{
            namaKabKot.push(data.data()["nama"])
            idKabKot.push(data.data()["id_wilayah"])
            var option=document.createElement("option");
            option.text=namaKabKot[helper]
            option.value=helper
            comboKabKot.add(option,null);
            helper++
          })
        })
        helper=0
      }
    }
    var idJadwal=[]
    db.collection('jadwal').get().then(snapshot=>{
        snapshot.forEach(data=>{
            idJadwal.push(data.id)
        })
    })
    
    //function penambahan jadwal
    function addJadwal(){
        if(comboJenis.value=="0"){
            if(comboProv.selectedIndex!=0 && tglJadwal.value!=""){
                var cekData=false
                var newId=idJadwal[idJadwal.length-1]
                newId=parseInt(newId)+1
                db.collection('jadwal').where('id_wilayah','==',idProv[comboProv.value]).get()
                .then(snapshot=>{
                    snapshot.forEach(data=>{
                        cekData=true
                    })
                    if(cekData==false){
                        db.collection('jadwal').doc(newId.toString()).set({
                            id_jadwal:newId.toString(),
                            id_wilayah:idProv[comboProv.value],
                            tgl_pelaksanaan:firebase.firestore.Timestamp.fromDate(new Date(tglJadwal.value))
                        }).then(()=>{
                            alert('Berhasil menambahkan jadwal.')
                        })
                    }else{
                        alert('Wilayah sudah memiliki jadwal pemilihan!!!')
                    }
                })
            }else{
                alert('Harap isi seluruh form!!!')
            }
        }
        else if(comboJenis.value=="1"){
            if(comboProv.selectedIndex!=0 && comboKabKot.selectedIndex!=0 && tglJadwal.value!=""){
                var cekData=false
                var newId=idJadwal[idJadwal.length-1]
                newId=parseInt(newId)+1
                db.collection('jadwal').where('id_wilayah','==',idKabKot[comboKabKot.value]).get().then(snapshot=>{
                    snapshot.forEach(data=>{
                        cekData=true
                    })
                    if(cekData==false){
                        db.collection('jadwal').doc(newId.toString()).set({
                            id_jadwal:newId.toString(),
                            id_wilayah:idKabKot[comboKabKot.value],
                            tgl_pelaksanaan:firebase.firestore.Timestamp.fromDate(new Date(tglJadwal.value))
                        }).then(()=>{
                            alert('Berhasil menambahkan jadwal.')
                        })
                    }else{
                        alert('Wilayah sudah memiliki jadwal pemilihan!!!')
                    }
                })
            }else{
                alert('Harap isi seluruh form!!!')
            }
        }else{
            alert("Harap pilih jenis pemilihan!!!")
        }
    }


    //function pembacaan jadwal
    function readJadwal(){
        if(comboJenis.value=="0"){
            if(comboProv.selectedIndex!=0){
                var cekData=false
                db.collection('jadwal').where('id_wilayah','==',idProv[comboProv.value]).get()
                .then(snapshot=>{
                    snapshot.forEach(data=>{
                        var tgl=data.data()['tgl_pelaksanaan'].toDate().toLocaleDateString()
                        var splitTgl=tgl.split('/')
                        if(splitTgl[0].length==1){
                            splitTgl[0]="0"+splitTgl[0]
                        }
                        if(splitTgl[1].length==1){
                            splitTgl[1]="0"+splitTgl[1]
                        }
                        cekData=true
                        tglJadwal.value=splitTgl[2]+"-"+splitTgl[0]+"-"+splitTgl[1]
                    })
                    if(cekData==false){
                        tglJadwal.value=""
                        alert('Wilayah provinsi belum memiliki jadwal!!!')
                    }
                })
            }else{
                alert('Harap pilih wilayah provinsi!!!')
            }
        }
        else if(comboJenis.value=="1"){
            if(comboProv.selectedIndex!=0 && comboKabKot.selectedIndex!=0){
                var cekData=false
                db.collection('jadwal').where('id_wilayah','==',idKabKot[comboKabKot.value]).get()
                .then(snapshot=>{
                    snapshot.forEach(data=>{
                        var tgl=data.data()['tgl_pelaksanaan'].toDate().toLocaleDateString()
                        var splitTgl=tgl.split('/')
                        if(splitTgl[0].length==1){
                            splitTgl[0]="0"+splitTgl[0]
                        }
                        if(splitTgl[1].length==1){
                            splitTgl[1]="0"+splitTgl[1]
                        }
                        cekData=true
                        tglJadwal.value=splitTgl[2]+"-"+splitTgl[0]+"-"+splitTgl[1]
                    })
                    if(cekData==false){
                        tglJadwal.value=""
                        alert('Wilayah kabupaten/kota belum memiliki jadwal!!!')
                    }
                })
            }else{
                alert('Harap pilih wilayah kabupaten/kota!!!')
            }
        }else{
            alert('Harap pilih jenis pemilihan!!!')
        }
    }

    //function untuk melakukan update jadwal
    function updateJadwal(){
        if(comboJenis.value=="0"){
            if(comboProv.selectedIndex!=0 && tglJadwal.value!=""){
                var cekData=false
                newId=parseInt(newId)+1
                db.collection('jadwal').where('id_wilayah','==',idProv[comboProv.value]).get()
                .then(snapshot=>{
                    snapshot.forEach(data=>{
                        cekData=true
                        db.collection('jadwal').doc(data.id).set({
                            id_jadwal:data.id,
                            id_wilayah:data.data()['id_wilayah'],
                            tgl_pelaksanaan:firebase.firestore.Timestamp.fromDate(new Date(tglJadwal.value))
                        }).then(()=>{
                            alert('Berhasil memperbarui jadwal.')
                        })
                    })
                    if(cekData==false){
                        alert('Wilayah sudah memiliki jadwal pemilihan!!!')
                    }
                })
            }else{
                alert('Harap isi seluruh form!!!')
            }
        }
        else if(comboJenis.value=="1"){
            if(comboProv.selectedIndex!=0 && comboKabKot.selectedIndex!=0 && tglJadwal.value!=""){
                var cekData=false
                db.collection('jadwal').where('id_wilayah','==',idKabKot[comboKabKot.value]).get().then(snapshot=>{
                    snapshot.forEach(data=>{
                        cekData=true
                        db.collection('jadwal').doc(data.id).set({
                            id_jadwal:data.id,
                            id_wilayah:data.data()['id_wilayah'],
                            tgl_pelaksanaan:firebase.firestore.Timestamp.fromDate(new Date(tglJadwal.value))
                        }).then(()=>{
                            alert('Berhasil memperbarui jadwal.')
                        })
                    })
                    if(cekData==false){
                        alert('Wilayah sudah memiliki jadwal pemilihan!!!')
                    }
                })
            }else{
                alert('Harap isi seluruh form!!!')
            }
        }else{
            alert("Harap pilih jenis pemilihan!!!")
        }
    }

    //function untuk menghapus jadwal
    function removeJadwal(){
        if(comboJenis.value=="0"){
            if(comboProv.selectedIndex!=0){
                var cekData=false
                db.collection('jadwal').where('id_wilayah','==',idProv[comboProv.value]).get()
                .then(snapshot=>{
                    snapshot.forEach(data=>{
                        db.collection('jadwal').doc(data.id).delete()
                        .then(()=>{
                            alert('Berhasil menghapus jadwal.')
                        })
                        cekData=true
                    })
                    if(cekData==false){
                        tglJadwal.value=""
                        alert('Wilayah provinsi belum memiliki jadwal!!!')
                    }
                })
            }else{
                alert('Harap pilih wilayah provinsi!!!')
            }
        }
        else if(comboJenis.value=="1"){
            if(comboProv.selectedIndex!=0 && comboKabKot.selectedIndex!=0){
                var cekData=false
                db.collection('jadwal').where('id_wilayah','==',idKabKot[comboKabKot.value]).get()
                .then(snapshot=>{
                    snapshot.forEach(data=>{
                        db.collection('jadwal').doc(data.id).delete()
                        .then(()=>{
                            alert('Berhasil menghapus jadwal.')
                        })
                        cekData=true
                    })
                    if(cekData==false){
                        tglJadwal.value=""
                        alert('Wilayah kabupaten/kota belum memiliki jadwal!!!')
                    }
                })
            }else{
                alert('Harap pilih wilayah kabupaten/kota!!!')
            }
        }else{
            alert('Harap pilih jenis pemilihan!!!')
        }
    }