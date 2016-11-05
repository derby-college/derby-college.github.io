angular.module('firebaseConfig', ['firebase'])

.run(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCLCAmT-GgVpC8kD-moJpnD1xyVFjjRPlw",
    authDomain: "derby-college-1472728843549.firebaseapp.com",
    databaseURL: "https://derby-college-1472728843549.firebaseio.com",
    storageBucket: "derby-college-1472728843549.appspot.com",
  };
  firebase.initializeApp(config);

})

/*

.service("TodoExample", ["$firebaseArray", function($firebaseArray){
    var ref = firebase.database().ref().child("todos");
    var items = $firebaseArray(ref);
    var todos = {
        items: items,
        addItem: function(title){
            items.$add({
                title: title,
                finished: false
            })
        },
        setFinished: function(item, newV){
            item.finished = newV;
            items.$save(item);
        }
    }
    return todos;
}])

*/