$(document).ready(function(){
  // getUsers();
  $('body').on('click', '#new-contact-toggle', newContact);
  $('body').on('click', '#new-family-toggle', newFamily);
  $('body').on('click', '#new-pension-toggle', newPension);
  $('body').on('click', '#edit-contact-toggle', editContact);
  $("form#new-contact").on("submit", addContact);
  $("form#new-family").on("submit", addFamily);
  $("form#new-pension").on("submit", addPension);
});

//SHOWS THE RELEVANT FORMS
function newContact() {
  $("#new-contact-div").slideToggle("fast");}

function newFamily() {
  $("#new-family-div").slideToggle("fast");}

function newPension() {
  $("#new-pension-div").slideToggle("fast");
}

function editContact() {
  $("#edit-contact-div").slideToggle("fast");
}


function addPension(){
  event.preventDefault();
  $.ajax({
    url:'http://localhost:3000/users',
    type:'patch',
    data: { user: 
            {financialCashflow:  
              {"pension": $("input#pension").val()}
            }}
        }).done(function(data){
        console.log("addPension data response")
        $("new-pension-div").slideToggle("slow"),
        $("input#pension").val(null)     
    });  
};

//Create a user
function addContact(){
  event.preventDefault();
  $.ajax({
    url:'http://localhost:3000/users',
    type:'patch',
    data: { user: {
      "email": $("input#email").val(),
      "name": $("input#name").val()}}
  }).done(function(data) {
    console.log(data);
    $("form#new-contact").slideToggle("slow"),
    $("input#name").val(null), 
    $("input#email").val(null)  
  });
}

//add family
function addFamily(){
  event.preventDefault();
  var id = localStorage.getItem("category");
  $.ajax({
    method: 'patch',
    url: 'http://localhost:3000/users/'+id,
    data: {
      user: {
            "married": $("input#married").val(),
            "kids": $("input#kids").val(),
            "lifeCover": $("input#lifeCover").val()
          }}
  }).done(function(user){
    console.log(user);
    localStorage.setItem("family", "done")
    $("form#new-family").slideToggle("slow"),
    $("input#married").val(null), 
    $("input#kids").val(null),
    $("input#lifeCover").val(null)
  });
}



// EDIT USER
function editUser(){
  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/users/'+$(this).data().id
  }).done(function(user){
    $("input#edit-name").val(user.name),
    $("input#edit-github").val(user.github),
    $("input#edit-bio").val(user.bio),
    $("input#edit-portfolio").val(user.portfolio)
    $('form#edit-user').slideDown()
  });
  // Bind the clicked element to our updateUser function so that the updateUser function knows what "this" refers to when the updateUser function runs
  $('#edit-user').on('submit', updateUser.bind(this));
}
var updateUser = function(){
  event.preventDefault();
  // Get the parent element of the clicked edit anchor tag
  var userDiv = $(this).parent()
  var user = {
    user:{
      name: $("input#edit-name").val(),
      bio: $("input#edit-bio").val(),
      github: $("input#edit-github").val(),
      portfolio: $("input#edit-portfolio").val()
    }
  };
  $.ajax({
    method: 'patch',
    url: 'http://localhost:3000/users/'+$(this).data().id,
    data: user
  }).done(function(updatedUser){
    // Empty the specific user div and rewrite the html with the updated user that gets returned from our server
  });
}



// ADD PROJECT

function toggleAddProject(){
  $("form#new-project").slideToggle("slow");
}

function createProject(){
  event.preventDefault();
  $.ajax({
    url:'http://localhost:3000/projects',
    type:'post',
    data: { project: {
      "title": $("input#project-title").val(),
      "description": $("input#project-description").val(),
      "github": $("input#project-github").val(),
      "website": $("input#project-website").val(),
      "user" : $('#username').html()
    }
  }
  }).done(function(project) {
    addProject(project)
    toggleAddProject();
    $("input#project-title").val(null),
    $("input#project-description").val(null),
    $("input#project-github").val(null),
    $("input#project-website").val(null)
  });
}

function addProject(project){
  $('#show').prepend("<div class='project-tile'><h2>"+ project.title +"</h2><p>"+ project.description +"</p><a href='https://github.com/"+ project.github +"'>Github</a> | <a href='"+ project.website +"'>Website</a></div>")
}


// ADD ALM

function toggleAddALM(){
  $("form#new-alm").slideToggle("slow");
}


// function getData(){

//   console.log("hello")
//   var ajax = $.get("https://api.typeform.com/v0/form/VNrOIR?key=3fa2fcb4f0bb33a6350bb8417485830bb0ffa09f&completed=true")
//   .done(function(data){
//     console.log(data)
//     });
// }

// Set up our event listeners
// $("form#new-project").on("submit", createProject);
// $("form#new-alm").on("submit", createALM);
// $("#user-form-button" ).on("click", toggleUserForm);
// $("#user-index-button" ).on("click", toggleShowUsers);
// Use event delegation to allow for dynamically created elements
// $("body").on("click", ".delete", removeUser);
// $('body').on('click', '.show', showUserProfile)
// $('body').on('click', '.edit', editUser);
// $('body').on('click', '#addProject', toggleAddProject);
// $('body').on('click', '#addALM', toggleAddALM);
// $('body').on('click', '#A-triangle', toggleAddALM);
// $('body').on('click', '#B-triangle', toggleAddALM);
// $('body').on('click', '#step1', newview);





// Use JQuery animation functions to hide/show elements 
// TOGGLE INDEX PAGE
// function newview() {
//   console.log("newview")
//   var ajax = $.get('http://localhost:3000/financialCashflow')
//   .done(function(){
//     console.log("done")   
//   });  
// }



// function toggleShowUsers(){
//   $("#show").slideUp("slow");
//   $("#projects").slideUp("slow");
//   $("#shapescontainer").slideUp("slow");
//   setTimeout(function(){
//     $("#show").html(" ");
//     $("#projects").html(" ");
//     $('#users').slideDown()
//   }, 600);
// }

// GET ALL USERS
// function getUsers(){
//   var ajax = $.get('http://localhost:3000/users')
//   .done(function(data){
//     console.log(data)
//     $.each(data, function(index, user){
//       addUser(user);
//     });
//   });
// }



// // CREATE USER
// function toggleUserForm(){
//   $("form#new-user").slideToggle("slow");
// }

// // ADD A USER TO PAGE
// function addUser(user){
//   $("#users").prepend("<div class='user-tile'><h2>" + user.name + "</h2><p> " + user.bio + "</p><a href='https://github.com/"+ user.github +"'>Github</a> | <a href='"+ user.portfolio +"'>Portfolio</a><br><a data-id='"+user._id+"' class='delete' href='#'>Delete</a> | <a data-id='"+user._id+"' class='show' href='#'>Show</a> | <a href='#' class='edit' data-id='"+user._id+"'>Edit</a></div>");
// }

// // REMOVE USER
// function removeUser(){
//   event.preventDefault();
//   var itemToRemove = $(this).parent();
//   $.ajax({
//     url:'http://localhost:3000/users/'+$(this).data().id,
//     type:'delete'
//   }).done(function() {
//     itemToRemove.remove();
//   });
//   // 
// }


// // SHOW USER
// function showUserProfile(){
//   $('#users').slideUp();
//   $("#shapescontainer").slideUp("slow");
//   $.ajax({
//     method: 'GET',
//     url: 'http://localhost:3000/users/'+$(this).data().id
//   }).done(function(user){
//     $('#show').prepend("<div class='user-tile' data-id="+ user._id +"><h2 id='username'>" + user.name + "</h2><p> " + user.bio + "</p><a href='https://github.com/"+ user.github +"'>Github</a> | <a href='"+ user.portfolio +"'>Portfolio</a></div>");
    
//     $.each(user.financialALM, function(index, alm){
//       addALM(alm)    
//     })
//     $.each(user.projects, function(index, project){
//       addProject(project)    
//     })

//     $("#projects").append("<div class='project-tile'><h2><a id='addProject' href='#'>Add a project +</a><br><a id='addALM' href='#'>Add ALM +</a></h2></div>")

//     setTimeout(function(){
//       $('#show').slideDown()
//       $('#projects').slideDown()
//     }, 600);
//   });
// }

