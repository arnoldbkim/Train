$(document).ready(function(){
  var config = {
    apiKey: "AIzaSyDvh8WCdigk7KSubyI4OsKLK0g16XwLoHA",
    authDomain: "train-545f6.firebaseapp.com",
    databaseURL: "https://train-545f6.firebaseio.com",
    projectId: "train-545f6",
    storageBucket: "train-545f6.appspot.com",
    messagingSenderId: "132530367152"
  }; 

firebase.initializeApp(config);
var trainData = firebase.database();

	
	$("#addTrainBtn").on("click", function(){

            var trainName = $("#trainName").val().trim();
            var destination = $("#destination").val().trim();
            var firstTrain = $("#trainTime").val().trim();
            var frequency = $("#frequency").val().trim();
        
           
            var newTrain = {
                name: trainName,
                destination: destination,
                firstTrain: firstTrain,
                frequency: frequency
            }
        
            trainData.push(newTrain);

            $("#trainName").val("");
            $("#destination").val("");
            $("#trainTime").val("");
            $("#frequency").val("");
        
            return false;
        });
        
        trainData.on("child_added", function(childSnapshot) {
        
            var data = childSnapshot.val();
            var trainName = childSnapshot.val().name;
            var destination = childSnapshot.val().destination;
            var frequency = childSnapshot.val().frequency;
            var firstTrain = childSnapshot.val().trainTime;
           
            let remainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
            let minutes = frequency - remainder;
            let arrival = moment().add(minutes, "m").format("hh:mm A");
        
            $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");
        
        });
    });