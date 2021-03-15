const app = Vue.createApp({ 
    data(){
        return{
            image_name:"name",
            vedio_name:"name",
            user_now: 0,
            course_now:-1,
            lecture_now:null,
            first_time:false,
            courses:[
                {
                    uid: 0,
                    instructors_id: 1,
                    name: "Machine Learning",
                    objectives: "Machine Learning Machine Learning Machine Learning Machine Learning",
                    pic: "course_1.jpg",
                    state: false,
                    vedio: "1. Course Welcome and Introduction.mp4",
                    lectures: [
                    {
                    Lecture_Material: "introintrointrointrointrointrointro",
                    Lecture_Name: "intro",
                    Lecture_Video: "1. Course Welcome and Introduction.mp4",
                    Lecture_indix: "1",}],
                },
                    {
                        uid: 1,
                    instructors_id: 0,
                    name: "Web Programming",
                    objectives: "",
                    pic: "course_2.jpg",
                    state: true,
                    vedio: "",
                    lectures: [
                    {
                    Lecture_Material: "",
                    Lecture_Name: "",
                    Lecture_Video: "",
                    Lecture_indix: "1",}],
                },
                {
                    uid: 2,
                    instructors_id: 0,
                    name: "C# Crash Course",
                    objectives: "",
                    pic: "course_2.jpg",
                    state: false,
                    vedio: "",
                    lectures: [
                    {
                    Lecture_Material: "",
                    Lecture_Name: "",
                    Lecture_Video: "",
                    Lecture_indix: "1",}],
                    
                },
                {
                    uid: 3,
                    instructors_id: 0,
                    name: "C# Crash Course",
                    objectives: "",
                    pic: "course_2.jpg",
                    state: true,
                    vedio: "",
                    lectures: [
                    {
                    Lecture_Material: "",
                    Lecture_Name: "",
                    Lecture_Video: "",
                    Lecture_indix: "1",}],
                    
                },
                   
        
                   
        
        ],


            instructors:[
             {
                uid: 0,
                email: "email@imail.com",
                password:"123qwe",
                firstName: "Omar",
                lastName: "Ismail",
                displayName: 'Omar Ismail',
                avatar: "1-profile.jpg",
                introductoryVideo: "2. Intro To Bootstrap.mp4",
                biography: "love programmers",
                intrests: "intrests",
                achievments: "doctor in achievments",
                education: "education uni",
                specilizations: "mobile",
                courses: [{id:0},{id:1},{id:3},],
            },
            {
                uid: 1,
                email: "email2@imail.com",
                password:"123qwe",
                firstName: "Omar2",
                lastName: "Ismail2",
                displayName: 'Omar2 Ismail2',
                avatar: "1-profile.jpg",
                introductoryVideo: "2. Intro To Bootstrap.mp4",
                biography: "love programmers",
                intrests: "intrests",
                achievments: "doctor in achievments",
                education: "education uni",
                specilizations: "mobile",
                courses: [{id:0},{id:1},{id:3},],
            },
            
            ]
        }
    },
    created() {
        console.log('Component has been created!');
        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        console.log(window.location.href);

        console.log(this.getCookie("uid"));
        if(this.getCookie("uid")==""){
            this.setCookie("uid",-1,5);
            window.location.href = './';
        }else if (this.getCookie("uid")!=-1){
            this.user_now=this.getCookie("uid");
            if( window.location.href == 'http://localhost/fyp/')
            {
            window.location.href = './homepage.html?';}
        }
        const course_id = urlParams.get('course_id');
        if(course_id != null){
      this.course_now=course_id}
      },
    methods: {

         number_of_scrolling:function () {
          
        },
        image_function:function(){
    
var fullPath = document.getElementById('image_import').value;
this.image_name = fullPath;
 fullPath = document.getElementById('vedio_import').value;
this.vedio_name = fullPath;
        },
        create_a_course : function(instructors_id,course_name,course_id,course_image,course_vedio,course_objectives,state,price,keywords){
            //        this.create_a_course(instructorUid,name,courseId,courseImage,introductoryVideo,course_objectives,state,price);

            var data={
                uid:course_id,
                name: course_name,
                courseImage:course_image,
                introductoryVideo:course_vedio,
                state:state,
                objectives:course_objectives,
                instructorUid:instructors_id,
                price:price,
                lectures:[],
                keywords:keywords,
                rating:-1
            }
            this.courses.push(data);
            console.log(data);
            console.log(this.courses);
            this.course_now=course_id;
            console.log("course_now:" + this.course_now)
            console.log("2"+state);

            var xmlhttp = new XMLHttpRequest(); 
     
              xmlhttp.open("GET", "?uid="+course_id+"&name="+course_name+"&courseImage="+course_image+"&introductoryVideo="+course_vedio+"&state="+state+
              "&objectives="+course_objectives+"&instructorUid="+instructors_id+ "&price="+price+"&keywords="+keywords, true); 
                xmlhttp.send(); 

        },
        to_create_a_course : function(){
            console.log(this.courses);
/*

const data = {
    instructorUid: instructorUid,
    subjectUid: subjectUid,
    name: name,
    courseImage:courseImage,
    introductoryVideo: introductoryVideo,
    price: price,
    courseObjectives: courseObjectives,
    keywords: keywords,
    rating: rating,
    lectures:[],
    state:false,

  };
*/
            instructorUid= this.user_now;

            var name=document.getElementById('course_name').value;
            var courseId = this.courses[this.courses.length-1].uid +1;
            var courseImage =document.getElementById('image_import').value;
            var introductoryVideo = document.getElementById('vedio_import').value;
            var course_objectives =  document.getElementById('course_objectives').value;
            if((document.getElementById('course_state').checked)==true)
            var state =  true;
            else 
            var state =  false;
            var price =  document.getElementById('course_Price').value;
            var keywords =  document.getElementById('keywords').value;

           /* const data = {
                courseId:courseId,
                instructorUid: instructorUid,
                subjectUid: subjectUid,
                name: name,
                courseImage:courseImage,
                introductoryVideo: introductoryVideo,
                price: price,
                courseObjectives: courseObjectives,
                keywords: keywords,
                rating: null,
                lectures:[],
                state:false,};*/
        this.create_a_course(instructorUid,name,courseId,courseImage,introductoryVideo,course_objectives,state,price,keywords);
           //here we should call exports.createCourse insted of  this.create_a_course
         /*  this.courses.push(data);
           console.log(data);
           console.log(this.courses);
           this.course_now=courseId;
           console.log("course_now:" + this.course_now);*/

        },
        add_a_lecture:function(course_id,Lecture_Name,Lecture_indix,Lecture_Video,Lecture_Material){
            const foundObj = this.courses.find(courses => courses.uid == course_id);


            lecture_submit={
                Lecture_Name:Lecture_Name,
                Lecture_indix:Lecture_indix,
                Lecture_Video:Lecture_Video,
                Lecture_Material:Lecture_Material
            };
            foundObj.lectures.push(lecture_submit);
            console.log("---------------------------------------")
           console.log(foundObj);
           console.log("---------------------------------------")
           console.log(this.courses);
           document.getElementById("myForm").style.display = "none";
           
           var xmlhttp = new XMLHttpRequest(); 
     
           xmlhttp.open("GET", "?uid="+course_id+"&Lecture_Name="+Lecture_Name+"&Lecture_indix="+Lecture_indix+"&Lecture_Video="+Lecture_Video+"&Lecture_Material="+Lecture_Material, true); 
             xmlhttp.send(); 


        },
        to_add_a_lecture:function(){

            var Lecture_Name=document.getElementById('lecture_name').value;
            var Lecture_indix=document.getElementById('lecture_index').value;
            var Lecture_Video=document.getElementById('vedio_import_lecture').value;
            var Lecture_Material=document.getElementById('Lecture_Material').value;

        
            this.add_a_lecture(this.course_now,Lecture_Name,Lecture_indix,Lecture_Video,Lecture_Material);
            document.getElementById('lecture_name').value=document.getElementById('Lecture_Material').value="";

        },
        openForm:function(lecture_index){
            document.getElementById("myForm").style.display = "block";
            const foundObj = this.courses.find(courses => courses.uid == this.course_now);
            const foundObj2 = foundObj.lectures.find(lectures=>lectures.Lecture_indix==lecture_index);

            this.lecture_now=foundObj2;
            console.log("============================");
            console.log(lecture_index);

            console.log(foundObj2);
        },
        close_lecture:function(){
            document.getElementById("myForm").style.display = "none";

        },
        update_course:function(){
            
            const foundObj = this.courses.find(courses => courses.uid == this.course_now);

            var name =foundObj.name=document.getElementById('course_name_update').value;
           var courseImage= foundObj.courseImage =document.getElementById('image_import_update').value;
           var introductoryVideo= foundObj.introductoryVideo = document.getElementById('vedio_import_update').value;
           var objectives= foundObj.objectives =  document.getElementById('course_objectives_update').value;
           var price= foundObj.price =  document.getElementById('course_Price_update').value;
           var keywords= foundObj.keywords =  document.getElementById('keywords_update').value;
            if((document.getElementById('course_state_update_1').checked)==true  )
           var state= foundObj.state =  true;
            else 
           var state= foundObj.state =  false;            
            console.log("foundObj");

            console.log(foundObj);
            console.log("courses");
            console.log(this.courses);

            var xmlhttp = new XMLHttpRequest(); 
     
              xmlhttp.open("GET", "?uid="+this.course_now+"&name="+name+"&courseImage="+ courseImage+"&introductoryVideo="+introductoryVideo+"&state="+state+
              "&objectives="+objectives+ "&price="+price+"&keywords="+keywords, true); 
                xmlhttp.send(); 

        },
        update_lecture:function(Lecture_indix){
            console.log(Lecture_indix);
            this.openForm(Lecture_indix);
          

        },
        update_lecture_btn:function(){


            Lecture_Name= this.lecture_now.Lecture_Name=document.getElementById('lecture_name_update').value;
            Lecture_indix= this.lecture_now.Lecture_indix=document.getElementById('lecture_index_update').value;
            Lecture_Video= this.lecture_now.Lecture_Video=document.getElementById('vedio_import_lecture_update').value;
            Lecture_Material= this.lecture_now.Lecture_Material=document.getElementById('Lecture_Material_update').value;
            var xmlhttp = new XMLHttpRequest(); 
     
            xmlhttp.open("GET", "?uid="+this.course_now+"&Lecture_Name="+Lecture_Name+"&Lecture_indix="+Lecture_indix+"&Lecture_Video="+Lecture_Video+"&Lecture_Material="+Lecture_Material, true); 
              xmlhttp.send(); 

            lecture_now=null;
            document.getElementById('lecture_name_update').value=document.getElementById('Lecture_Material_update').value="";
            document.getElementById("myForm").style.display = "none";

            
            
        },
        see_function:function () {
            const queryString = window.location.search;
            console.log(queryString);
            const urlParams = new URLSearchParams(queryString);
            const uid = urlParams.get('uid');
            console.log(uid);
            this.user_now= uid;
            const foundObj = this.instructors.find(instructors => instructors.uid ==uid);
            if(foundObj == null){
                window.alert("you are new here \n you can create a new course");
this.first_time =true;
            }
return true;
        },
        createInstructor:function(){
            const foundObj = this.instructors.find(instructors => instructors.email == document.getElementById('email').value);

            console.log(foundObj);
            if(foundObj != null){
                window.alert("email exest");

            }
            else {

            if(document.getElementById('firstName').value=="" || document.getElementById('lastName').value=="" || document.getElementById('email').value=="" || document.getElementById('password').value=="")
            window.alert("fill every thing");

            else{
            if(document.getElementById('password').value == document.getElementById('password-confirm').value){
            const firstName =document.getElementById('firstName').value; 
            const lastName = document.getElementById('lastName').value; 
            const email = document.getElementById('email').value;  
            const password = document.getElementById('password').value;  
                const uid = Math.floor(Math.random() * 1000) + 100;;
            const data = {
                uid:uid,
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                displayName: `${firstName} ${lastName}`,
              };
              console.log(data);
           var xmlhttp = new XMLHttpRequest(); 
     
              //xmlhttp.open("GET", "https://us-central1-upskill-7fb59.cloudfunctions.net/addSubject?name="+firstName+"&image="+lastName, true); 
                          xmlhttp.open("GET", "?firstName="+firstName+"&lastName="+lastName+"&email="+email+"&password="+password, true); 

              var res=  xmlhttp.send(); 
              console.log(res);
                this.setCookie("uid",uid,5);
               // window.location.href = './homepage.html';
            }
              else
              window.alert("confirm password");
            }
        }
       
    },signInstructor:function(){
        const foundObj = this.instructors.find(instructors => instructors.email == document.getElementById('signInEmail').value);

        if(foundObj != null){
            if(foundObj.password==document.getElementById('signInpassword').value){
            window.alert("welcom " + foundObj.displayName);
            console.log(foundObj.displayName);
            
            var xmlhttp = new XMLHttpRequest(); 
     
            xmlhttp.open("GET", "?email="+document.getElementById('signInEmail').value+"&password="+document.getElementById('signInpassword').value, true); 
              xmlhttp.send(); 

              window.location.href = './homepage.html';
              this.setCookie("uid",foundObj.uid,5);

        }else 
                window.alert("chick email ");

    }else
        window.alert("chick email ");


        
    }
    ,setCookie:function(cname, cvalue, exdays){
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }, getCookie:function(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      },go_to_created_course:function(id){
        window.location.href = './create_a_course.html?course_id='+id+'#';

      }

    }
});
