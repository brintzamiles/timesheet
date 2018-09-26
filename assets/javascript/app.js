
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDJ9v4tSZ43vWLLUkVfsKXo2hURB36EczQ",
    authDomain: "fir-demo20180922.firebaseapp.com",
    databaseURL: "https://fir-demo20180922.firebaseio.com",
    projectId: "fir-demo20180922",
    storageBucket: "fir-demo20180922.appspot.com",
    messagingSenderId: "954494375323"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  // initial values
  let employeeName = "";
  let employeeRole = "";
  let startDate = "";
  let employeeRate = 0;

  $(".submit").on("click", function(event) {
      event.preventDefault();

      employeeName = $("#employee-name").val().trim();
      employeeRole = $("#employee-role").val().trim();
      startDate = $("#start-date").val().trim();
      employeeRate = $("#employee-rate").val().trim();

      database.ref('timesheet').push({
          employeeName,
          employeeRole,
          startDate,
          employeeRate,
          dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
  });

  database.ref('timesheet').on("child_added", function(snapshot){
      var sv = snapshot.val();

      console.log(sv.employeeName);
      console.log(sv.employeeRole);
      console.log(sv.startDate);
      console.log(sv.employeeRate);

      $("#employee-name").text(sv.employeeName);
      $("#employee-role").text(sv.employeeRole);
      $("#start-date").text(sv.startDate);
      $("#employee-rate").text(sv.employeeRate);
  }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
  
  });

