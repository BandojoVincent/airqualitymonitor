// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDQfBFrCfPCTqAr30eCr-CH2EzyXt_8Tyg",
    authDomain: "login-68c28.firebaseapp.com",
    projectId: "login-68c28",
    storageBucket: "login-68c28.appspot.com",
    messagingSenderId: "98884605146",
    appId: "1:98884605146:web:b2cb0b7a9621878b5781e3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  firebase.auth.Auth.Persistence.LOCAL;

  //variables
  const auth = firebase.auth()
  const database = firebase.database()



  //function of login button
  function login(){
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value

    //verifying input fields
    if (email == 0 || password == 0) {
      alert('Please Fill all the input field')
      return
    }
    
    auth.signInWithEmailAndPassword(email, password)
    .then(function(){
      user = auth.currentUser
        if (user) {
          window.location="home.html";
        }
    })
    
    .catch(function(error){
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message)
    })
  }

  //signup button function
  function register () {

    var username = document.getElementById('username').value
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value 
    var field = password,email,username
  
    if (validate_field(username) == 0 || validate_field(password) == 0 || validate_field(email)== 0) {
      alert('Please fill all the input field')
      return
    }
    if (validate_email(email) == false) {
      alert('Incorrect email format')
      return 
    }
    if (validate_password(password) == false) {
      alert('Incorrect password format')
      return 
    }

    //creating user in firebase database
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(){

      var user = auth.currentUser
      var database_ref = database.ref()
      var user_data = {
        username : username,
        email : email,
        password : password
      }

      database_ref.child('users/' + user.uid).set(user_data)
      
      alert('User Created!!')
    })
    .catch(function(error){
      var error_code = error.code
      var error_message = error.message

      alert(error_message)
    })
  }

  //function of logout button
  $("#button_out").click(function(){
    firebase.auth().signOut();
  });

  //function for validating email format
  function validate_email(email) {
   expression = /^[^@]+@\w+(\.\w+)+\w$/
   if (expression.test(email) == true) {
      return true
   }
   else{
      return false
   }
  }

  //function for validating password format
  function validate_password(password) {
    if (password < 6 ) {
      return false
    }
    else{
      return true
    }
  }

  //function for validating field
  function validate_field(field) {
    if (field == null) {
      return false
    }

    if (field.length <= 0 ) {
      return false
    }
    else{
      return true
    }
  }

//function for edit buttons
  $("#edit_user").click(function(){
    document.getElementById('username').disabled = false;

  //when the button is clicked the save button will be displayed
    document.getElementById('button_save').style.display = "block";
  });
  $("#edit_email").click(function(){
    document.getElementById('email').disabled = false;

  //when the button is clicked the save button will be displayed
    document.getElementById('button_save').style.display = "block";
  });
  $("#edit_password").click(function(){
    document.getElementById('password').disabled = false;

  //when the button is clicked the save button will be displayed
    document.getElementById('button_save').style.display = "block";
  });

//function for save button
  function button_saved(){
    var username = document.getElementById('username').value
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    var user = auth.currentUser

    var user_data = {
      username : username,
      email : email,
      password : password
    }

  //when the button is clicked the info of user would be updated in firebase
    database.ref('users/' + user.uid).update(user_data)
    alert("User Profile Updated!");

  //when the save button is clicked it will disable the textbox again
    document.getElementById('username').disabled = true;
    document.getElementById('email').disabled = true;
    document.getElementById('password').disabled = true;

  //the save button will be hidden
    document.getElementById('button_save').style.display = "none";
  }