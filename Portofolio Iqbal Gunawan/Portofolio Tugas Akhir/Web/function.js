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

var nik = document.getElementById('nik');
var nama = document.getElementById('nama');
var alamat = document.getElementById('alamat');
var gol_darah = document.getElementById('gol_darah');
var jk = document.getElementById('jk');
var kab_kota = document.getElementById('kab/kota');
var kecamatan = document.getElementById('kecamatan');
var kel_desa = document.getElementById('kel/desa');
var kewarganegaraan = document.getElementById('kewarganegaraan');
var pekerjaan = document.getElementById('pekerjaan');
var provinsi = document.getElementById('provinsi');
var rt_rw = document.getElementById('rt/rw');
var status_kawin = document.getElementById('status_kawin');
var tgl_lahir = document.getElementById('tgl_lahir');
var tempat_lahir = document.getElementById('tempat_lahir');
var status_pilbupkot = document.getElementById('status_pilbupkot');
var status_pilgub = document.getElementById('status_pilgub');

var addBtn = document.getElementById('addBtn');
var updateBtn = document.getElementById('updateBtn');
var readBtn = document.getElementById('readBtn');
var removeBtn = document.getElementById('removeBtn');

var database = firebase.firestore();
var usersCollection = database.collection('users')

var ggwp=""
var gg=""

//untuk upload foto
var loadFile = function(event) {
	var image = document.getElementById('output');
	image.src = URL.createObjectURL(event.target.files[0]);
	gg=event.target.files
};

var stringFoto=[]

//Penambahan data pemilih
addBtn.addEventListener('click', (e) => {
	e.preventDefault();
	//apabila pilgub dan pilbupkot true maka pemilih tidak akan bisa melakukan pemilihan lagi
	var cekBupKot=false
	var cekGub=false
	if(status_pilbupkot.value=="false"){
		cekBupKot=false
	}else{
		cekBupKot=true
	}
	if(status_pilgub.value=="false"){
		cekGub=false
	}else{
		cekGub=true
	}
	if(nik.value!="" && agama.value!="" && nama.value!="" && alamat.value!="" && gol_darah.value!="" && jk.value!="" && kab_kota.value!=""
	&& kecamatan.value!=null && kel_desa.value && kewarganegaraan.value!="" && pekerjaan.value!="" && provinsi.value!="" && rt_rw.value!=""
	&& status_kawin.value!="" && tgl_lahir.value!="" && tempat_lahir.value!=""){
		if(gg.length>0){
			var help=0;
	database.collection('users').doc(nik.value).get()
	.then(item=>{
		if(item.exists){
			alert('Proses Gagal.\nData pemilih sudah terdaftar!!!')
		}else{
			for(wp=0;wp<gg.length;wp++){
		var refFoto=firebase.storage().ref(nama.value+"_"+nik.value+"/"+nama.value+wp.toString())
		refFoto.put(gg[wp]).then(function(snapshot){
			ggwp=snapshot
			snapshot.ref.getDownloadURL().then(function(downloadURL){
				stringFoto.push(downloadURL)
				alert("Foto "+(help+1)+" berhasil diunggah.")
				if (help==gg.length-1) {
				var tgl=firebase.firestore.Timestamp.fromDate(new Date(tgl_lahir.value))
				database.collection('users').doc(nik.value).set({
					nik : nik.value,
					agama:agama.value,
					nama : nama.value,
					alamat : alamat.value,
					gol_darah : gol_darah.value,
					jk : jk.value,
					kab_kota : kab_kota.value,
					kecamatan : kecamatan.value,
					kel_desa : kel_desa.value,
					kewarganegaraan : kewarganegaraan.value,
					pekerjaan : pekerjaan.value,
					provinsi : provinsi.value,
					rt_rw : rt_rw.value,
					status_kawin : status_kawin.value,
					tgl_lahir : tgl,
					tempat_lahir : tempat_lahir.value,
					status_pilbupkot : cekBupKot,
					status_pilgub : cekGub,
					foto : stringFoto
	})
	.then(() => {alert('Data telah berhasil ditambahkan');})
	.catch(error => {console.error(error)});
	
	}
				help++
			});
		})
	}
		}
	})		
		}else{
			alert('Harap unggah foto pemilih!!!')
		}
	}else{
		alert('Harap isi seluruh form!!!')
	}
	
});

//function untuk melakukan perbarui data pemilih berdasarkan nik
updateBtn.addEventListener('click', (e) => {
	e.preventDefault();
	var cekBupKot=false
	var cekGub=false
	var cekAda=false

	if(status_pilbupkot.value=="false"){
		cekBupKot=false
	}else{
		cekBupKot=true
	}
	if(status_pilgub.value=="false"){
		cekGub=false
	}else{
		cekGub=true
	}
	
	var tgl=firebase.firestore.Timestamp.fromDate(new Date(tgl_lahir.value))

	usersCollection.doc(nik.value).update({
		nik:nik.value,
		agama:agama.value,
		nama : nama.value,
		alamat : alamat.value,
		gol_darah : gol_darah.value,
		jk : jk.value,
		kab_kota : kab_kota.value,
		kecamatan : kecamatan.value,
		kel_desa : kel_desa.value,
		kewarganegaraan : kewarganegaraan.value,
		pekerjaan : pekerjaan.value,
		provinsi : provinsi.value,
		rt_rw : rt_rw.value,
		status_kawin : status_kawin.value,
		tgl_lahir : tgl,
		tempat_lahir : tempat_lahir.value,
		status_pilbupkot : cekBupKot,
		status_pilgub : cekGub
	})
	.then(() => {alert('Data telah berhasil diperbarui');})
	.catch(error => {console.error(error)});
})

removeBtn.addEventListener('click', (e) => {
	e.preventDefault();
	usersCollection.doc(nik.value).delete().then(function(){
		alert('Data telah berhasil dihapus')
	}).catch(function(error){
		console.error(error)
	})
})


var paragraf=document.createElement('p')

var x=""

//function untuk membaca data pemilih
readBtn.addEventListener('click', (e) => {
	e.preventDefault();
	usersCollection.doc(nik.value).get()
	.then(snapshot => {

		if(snapshot.exists){
			var tglLahir=snapshot.data()['tgl_lahir'].toDate().toLocaleDateString()
			var splitTgl=tglLahir.split('/')
                        if(splitTgl[0].length==1){
                            splitTgl[0]="0"+splitTgl[0]
                        }
                        if(splitTgl[1].length==1){
                            splitTgl[1]="0"+splitTgl[1]
                        }
                        tgl_lahir.value=splitTgl[2]+"-"+splitTgl[0]+"-"+splitTgl[1]//tahun bulan tanggal
			x=snapshot.data()
			nama.value=x["nama"]
			alamat.value=x["alamat"]
			agama.value=x["agama"]
			gol_darah.value=x["gol_darah"]
			jk.value=x["jk"]
			kab_kota.value=x["kab_kota"]
			kecamatan.value=x["kecamatan"]
			kel_desa.value=x["kel_desa"]
			kewarganegaraan.value=x["kewarganegaraan"]
			pekerjaan.value=x["pekerjaan"]
			provinsi.value=x["provinsi"]
			rt_rw.value=x["rt_rw"]
			status_kawin.value=x["status_kawin"]
			tempat_lahir.value=x["tempat_lahir"]
		}else{
			alert('NIK tidak terdaftar!!!')
		}
	})
	.catch(error => {
		console.error(error);
	});
});

















