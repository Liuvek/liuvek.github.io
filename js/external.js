function submit(){
    alert('Submission successful!');
}

var uploader = document.getElementById("uploader");
var fileButton = document.getElementById("exampleFormControlFile1");
var holder = document.getElementById("holder");

var storage = firebase.storage();

function getImage(){
    var storageRef = firebase.storage().ref();
    var spaceRef = storageRef.child(p);
    storageRef.child(p).getDownloadURL().then(function(url) {
        var fullurl = url;
        holder.src = fullurl;
    }).catch(function(error) {
        //catch error here
    });
}

fileButton.addEventListener('change', function(e){
    alert("Was this your picture?");
    var file = e.target.files[0];
    var storageRef = firebase.storage().ref('images/'+file.name);
    var task = storageRef.put(file);
    task.on('state_changed',
        function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            uploader.value = percentage;
        },
        function error(err){
            console.log(err);
        },
        function complete(){
            alert("Upload complete!");
            getImageForPath('images/'+file.name);
        }
    );
});

