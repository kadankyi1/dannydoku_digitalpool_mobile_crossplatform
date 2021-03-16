
/*
// Dom7
var $$ = Dom7;
var CONFIG = "http://app.dannydoku.com/";

// isCordova helper
var isCordova = !!window.cordova;

// Init App
var app = new Framework7({
  id: 'io.framework7.testapp',
  root: '#app',
  theme: 'auto',
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  routes: routes,
  vi: {
    placementId: 'pltd4o7ibb9rc653x14',
  },
});


$(function(){
  var $refreshButton = $('#refresh');
  var $results = $('#css_result');
  
  function refresh(){
    var css = $('style.cp-pen-styles').text();
    $results.html(css);
  }

  refresh();
  $refreshButton.click(refresh);
  
  // Select all the contents when clicked
  $results.click(function(){
    $(this).select();
  });
});
*/



// Dom7
var $ = Dom7;
var CONFIG = "http://app.dannydoku.com/";

var isCordova = !!window.cordova;

// Theme
var theme = 'ios';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}

// Init App
var app = new Framework7({
  id: 'io.framework7.testapp',
  root: '#app',
  theme: theme,
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  routes: routes,
  vi: {
    placementId: 'pltd4o7ibb9rc653x14',
  },
 view: {
    pushState: true,
  }
});


$(function(){
  var $refreshButton = $('#refresh');
  var $results = $('#css_result');
  
  function refresh(){
    var css = $('style.cp-pen-styles').text();
    $results.html(css);
  }

  refresh();
  $refreshButton.click(refresh);
  
  // Select all the contents when clicked
  $results.click(function(){
    $(this).select();
  });
});


// Init Framework7 App
if (isCordova) {
    $(document).on('deviceready', app.init);
    console.log("here 1");
}
else {
    console.log("here 2");
    app.init();
}



var my_user_sys_id =localStorage.getItem("user_sys_id");
var my_e_password = localStorage.getItem("e_pass");
var my_full_name =localStorage.getItem("c_name");
var c_phone = localStorage.getItem("c_phone");
var last_news_sku_videos = 0;
var last_news_sku_audios = 0;
var last_news_sku_favorites_videos = 0;
var last_news_sku_favorites_audios = 0;
var current_page = "signup";
var current_playing = "";
var audio_player = document.getElementById('audio_player');
var reset_system_id = "";

function signMeOut(){

      my_user_sys_id = "";
      my_e_password = "";
      my_full_name = "";
      my_phone = "";

      localStorage.removeItem('user_sys_id');
      localStorage.removeItem('e_pass');
      localStorage.removeItem('c_name');
      localStorage.removeItem('c_phone');

      localStorage.removeItem('favoriteVideosPath');
      localStorage.removeItem('favoriteVideosPosterPath');
      localStorage.removeItem('favoriteVideostitle');
      localStorage.removeItem('favoriteVideosDate');

      localStorage.removeItem('favoriteVideosPathDownloads');
      localStorage.removeItem('favoriteVideosPosterPathDownloads');
      localStorage.removeItem('favoriteVideostitleDownloads');
      localStorage.removeItem('favoriteVideosDateDownloads');

      localStorage.removeItem('favoriteAudiosPath');
      localStorage.removeItem('favoriteAudiosPosterPath');
      localStorage.removeItem('favoriteAudiostitle');
      localStorage.removeItem('favoriteAudiosDate');


      localStorage.removeItem('favoriteAudiosPathDownloads');
      localStorage.removeItem('favoriteAudiosPosterPathDownloads');
      localStorage.removeItem('favoriteAudiostitleDownloads');
      localStorage.removeItem('favoriteAudiosDateDownloads');


}

function checkIfSignedIn(){

    var my_user_sys_id =localStorage.getItem("user_sys_id");
    var my_e_password =localStorage.getItem("e_pass");
    var my_full_name =localStorage.getItem("c_name");
    var my_phone =localStorage.getItem("c_phone");

    if(my_user_sys_id == null  || my_e_password == null  || my_full_name == null  || my_phone == null){

          // AUTO SIGN-OUT
          signMeOut();

    } else {

      if(my_user_sys_id.trim() != "" && my_e_password.trim() != "" && 
        my_phone.trim() != "" && my_full_name.trim() != "" ){

          $('#bodymain').append('<a id="success_signup" style="display : none;" href="/main/">success</a>');
          app.preloader.hide();
          current_page = "audios_option";
          console.log("RIGHT HERE");
          $('#success_signup').click();


      } else {

          signMeOut();
      }

    }

}

function checkLogin() {

    var disUsername = document.getElementById("dis_username").value;
    var disPassword = document.getElementById("dis_password").value;

var toastBottom = app.toast.create({
  text: 'All Fields Must Be Completed',
  closeTimeout: 2000,
});

var toastnot = app.toast.create({
  text: 'Account Not Found',
  closeTimeout: 2000,
})


    if(disUsername.trim() == "" || disPassword.trim() == "" ){

        toastBottom.open();

    } else if (disUsername.trim() != "" || disPassword.trim() != ""){

      //alert("Validating...");
       var url_real = CONFIG + "/inc/login.php";
       var loginData = {
          curr_username : disUsername,
          curr_password : disPassword
      };

      app.preloader.show();
        app.request({
          url: url_real,
          type: "POST",
          data: loginData,
          success: function(response){
          
              var loginResponse = JSON.parse(response);

              if(loginResponse["status"] == "yes"){

                localStorage.setItem("user_sys_id", loginResponse["system_id"]);
                localStorage.setItem("e_pass", loginResponse["key"]);
                localStorage.setItem("c_name", loginResponse["signup_name"]);
                localStorage.setItem("c_phone", loginResponse["signup_phone"]);
                $('#lgr').append('<a id="success_signup" style="display : none;" href="/main/">success</a>');
                my_user_sys_id = loginResponse["system_id"];
                my_e_password = loginResponse["key"];

                app.preloader.hide();
                current_page = "audios_option";
                $('#success_signup').click();
                fetchNews("audios_option", "");


              } else {

                var this_message = loginResponse["error"];
                var toastError = app.toast.create({
                  text: this_message,
                  closeTimeout: 2000,
                });
                toastError.open();

              }
              app.preloader.hide();

          },

          error: function(XMLHttpRequest, textStatus, errorThrown) {

                var this_message = "Something went awry";
                var toastError = app.toast.create({
                  text: this_message,
                  closeTimeout: 2000,
                });
                toastError.open();
              app.preloader.hide();
          }
        });
    } else {


    app.dialog.alert("Something went awry", "Error");

    }


}


function checkSignup() {

    var disSignupName = document.getElementById("signup_name").value;
    var disSignupEmail = document.getElementById("signup_email").value;
    var disSignupEmailReal = document.getElementById("signup_email_real").value;
    var disSignupPassword = document.getElementById("signup_password").value;
    var disSignupPasswordRepeat = document.getElementById("signup_password_repeat").value;

var toastBottom = app.toast.create({
  text: 'All Fields Must Be Completed',
  closeTimeout: 2000,
});

var toastPasswordsDontMatch = app.toast.create({
  text: 'Passwords do not match',
  closeTimeout: 2000,
});

var toastConnectionError = app.toast.create({
  text: 'Something went awry',
  closeTimeout: 2000,
});


    if(disSignupName.trim() == "" || disSignupEmail.trim() == "" || disSignupPassword.trim() != disSignupPasswordRepeat ){

      if(disSignupPassword.trim() != disSignupPasswordRepeat.trim()){
        
        // PASSWORDS DON'T MATCH
        toastPasswordsDontMatch.open();

      } else {

        toastBottom.open();

      }

    

    } else if (disSignupName.trim() != ""
     && disSignupEmail.trim() != "" && disSignupPassword.trim() != "" 
     && disSignupPasswordRepeat.trim() != "" && disSignupPassword.trim() == disSignupPasswordRepeat.trim()){

       var url_real = CONFIG + "/inc/signup.php";

       var loginData = {
          signup_name : disSignupName,
          signup_email : disSignupEmail,
          signup_email_real : disSignupEmailReal,
          signup_password : disSignupPassword
      };

      app.preloader.show();

        app.request({
          url: url_real,
          type: "POST",
          data: loginData,
          success: function(response){
          
              var loginResponse = JSON.parse(response);

              if(loginResponse["status"] == "yes"){

                localStorage.setItem("user_sys_id", loginResponse["system_id"]);
                localStorage.setItem("e_pass", loginResponse["key"]);
                localStorage.setItem("c_name", loginResponse["signup_name"]);
                localStorage.setItem("c_phone", loginResponse["signup_phone"]);
                $('#next_step').append('<a id="success_signup" style="display : none;" href="/main/">success</a>');
                my_user_sys_id = loginResponse["system_id"];
                my_e_password = loginResponse["key"];

                app.preloader.hide();
                current_page = "audios_option";
                $('#success_signup').click();
                fetchNews("audios_option",  "");


              } else {

                var this_message = loginResponse["error"];
                var toastError = app.toast.create({
                  text: this_message,
                  closeTimeout: 2000,
                });
                toastError.open();

              }
              app.preloader.hide();

          },

          error: function(XMLHttpRequest, textStatus, errorThrown) {

                var this_message = "Something went awry";
                var toastError = app.toast.create({
                  text: this_message,
                  closeTimeout: 2000,
                });
                toastError.open();
              app.preloader.hide();
          }
        });

    } else {


      app.dialog.alert("Something went awry", "Error");

    }


}

function pauseOtherPlayers(thisplayingid){

  if(current_playing != null && current_playing != "" && current_playing != thisplayingid){
    var old_player = document.getElementById(current_playing);
    if(old_player != null && old_player != undefined){
        old_player.pause();
    }
    

    var this_playicon = document.getElementById("icon_" + current_playing);
    if(this_playicon != null && this_playicon != undefined){

      this_playicon.style.display = "";

    }

    var new_playicon = document.getElementById("icon_" + thisplayingid);
    if(new_playicon != null && new_playicon != undefined){

      new_playicon.style.display = "none";

    }

  }
    var new_playicon = document.getElementById("icon_" + thisplayingid);
    if(new_playicon != null && new_playicon != undefined){

      new_playicon.style.display = "none";

    }

  current_playing = thisplayingid;

}

function pauseVideo(thisplayingid){

    var new_playicon = document.getElementById("icon_" + thisplayingid);
    if(new_playicon != null && new_playicon != undefined){

      new_playicon.style.display = "";

    }

}

function playPauseThisVideo(this_video_id){

  var this_video = document.getElementById(this_video_id);
  var this_playicon = document.getElementById("icon_" + this_video_id);

  if(this_video.paused){

    this_playicon.style.display = "none";
    this_video.play();

  } else {

    this_video.pause();
    this_playicon.style.display = "";

  }

}


function fetchNews(option, this_last_news_sku){
  checkIfSignedIn();
  current_page = option;

      app.preloader.show();
        if(option == "videos_option"){
///////////////////////////////////////////////////////////////
          var url_real = CONFIG + 'inc/get_videos.php';
          var append_id = "video_list";
          last_news_sku = last_news_sku_videos;
///////////////////////////////////////////////////////////////
        } else if (option == "audios_option"){
///////////////////////////////////////////////////////////////
          var url_real = CONFIG + 'inc/get_audios.php';
          var append_id = "audio_list";
          last_news_sku = last_news_sku_audios;
///////////////////////////////////////////////////////////////       
        } else if (option == "favorites_videos_option"){
///////////////////////////////////////////////////////////////
          var url_real = CONFIG + 'inc/get_favorites_videos.php';
          var append_id = "favorites_videos";
          last_news_sku = last_news_sku_favorites_videos;
///////////////////////////////////////////////////////////////
        } else if (option == "favorites_audio_option"){
///////////////////////////////////////////////////////////////
          var url_real = CONFIG + 'inc/get_favorites_audio.php';
          var append_id = "favorites_audio";
          last_news_sku = last_news_sku_favorites_audios;
///////////////////////////////////////////////////////////////
        } else {
///////////////////////////////////////////////////////////////
          var url_real = CONFIG + 'inc/get_videos.php';
          option = "videos_option";
          var append_id = "video_list";
          last_news_sku = last_news_sku_videos;
///////////////////////////////////////////////////////////////
        }

        if(my_user_sys_id.trim() == "" || my_e_password.trim() == ""){

                my_user_sys_id = localStorage.getItem("user_sys_id");
                my_e_password = localStorage.getItem("e_pass");
        }
        if(this_last_news_sku.trim() != ""){
            last_news_sku = this_last_news_sku;
        }

          var loginData = {
              myid : my_user_sys_id,
              mypass : my_e_password,
              news_sku : last_news_sku
          };  

        app.request({
          type: "POST",
          url: url_real,
          data: loginData,

          success: function(response){

            app.preloader.hide();
            var newsResponse = JSON.parse(response);
            var total_news_num = Object.keys(newsResponse["hits"]).length;

            if(total_news_num <= 0){

                var this_message = "No more content";
                var toastError = app.toast.create({
                  text: this_message,
                  closeTimeout: 2000,
                });
                toastError.open();



            } else {

                if(this_last_news_sku.trim() != ""){
                    document.getElementById(append_id).innerHTML = "";
                }

                var favoriteVideosPath = localStorage.getItem("favoriteVideosPath");
                var favoriteVideosPosterPath = localStorage.getItem("favoriteVideosPosterPath");
                if(favoriteVideosPath == null || favoriteVideosPosterPath == null){

                        var nofavorites = "yes";

                } else {

                  favoriteVideosPath = JSON.parse(favoriteVideosPath);
                  favoriteVideosPosterPath = JSON.parse(favoriteVideosPosterPath);
                  var total_fav_num = Object.keys(favoriteVideosPath).length;
                  var nofavorites = "no";

                }

                for (var i = 0; i < total_news_num; i++) {

                        this_current_time = Math.floor((Math.random() * 999999) + 100000);
                        var this_title = newsResponse["hits"][i]["title"];
                        var this_poster_path = newsResponse["hits"][i]["poster_path"];
                        var this_path = newsResponse["hits"][i]["path"];
                        var this_date = newsResponse["hits"][i]["date"];
                        var this_sku = newsResponse["hits"][i]["sku"];
                        var this_id = this_sku + this_current_time;

                        if(nofavorites == "yes"){

                                var fav_color = "";

                        } else {

                            for(j=0; j < total_fav_num; j++){

                              if(favoriteVideosPath[j] == this_path){
                                var fav_color = "red";
                                break;
                              } else {
                                var fav_color = "";
                              }

                            }



                        }

                        if(option == "videos_option"){
                ///////////////////////////////////////////////////////////////
                        var category = newsResponse["hits"][i]["category"];
                            if(category == "Teachings"){

                              append_id = "video_list_teachings";

                            } else if(category == "Prophetic"){

                              append_id = "video_list_prophetic";

                            } else {

                              append_id = "video_list_miraculous";

                            }

                            $('#'+append_id).append($('<li><a href="#" class="item-content"><div class="item-inner"><div class="item-title-row"></div>  <video onclick="playPauseThisVideo(' + this_id +  ')" id="'  + this_id + '" onplay="pauseOtherPlayers(' + this_id +  ')" onpause = "pauseVideo(' + this_id +  ')" class="myVideo" controls controlsList="nodownload" preload="auto" style="width: 115%; margin-left: -20px;" poster="' + this_poster_path + '" data-setup="{}"><source src="' + this_path + '" type="video/mp4"><source src="' + this_path + '" type="video/webm"></video><div id="icon_' + this_id + '" onclick="playPauseThisVideo(' + this_id +  ')" class="playpause"></div><div class="item-title-row"><div class="item-title" style="color: black; font-weight : bolder">' + this_title + '</div></div><div class="item-subtitle" style="color: grey;">' + this_date + '</div><div  class="item-subtitle" style="color: grey; float: right;"><!--<i class="icon f7-icons ios-only " style="padding-right: 30px;">download</i>--><i style="padding-right: 50px;" data-posterpath = " ' + this_poster_path + '" data-videotitle = " ' + this_title + '" data-videopath = "' + this_path + '" data-videodate = "' + this_date + '" onclick="downloadVideo(this);" class="icon material-icons md-only">get_app</i><i style = "color : ' + fav_color + '" class="icon f7-icons ios-only " data-posterpath = " ' + this_poster_path + '" data-videotitle = " ' + this_title + '" data-videopath = "' + this_path + '" data-videodate = "' + this_date + '" onclick="addToVideosFavorties(this);">heart_fill</i><i  data-posterpath = " ' + this_poster_path + '" data-videotitle = " ' + this_title + '" data-videopath = "' + this_path + '" data-videodate = "' + this_date + '" onclick="addToVideosFavorties(this);" class="icon material-icons md-only"  style = "color : ' + fav_color + '" >favorite</i></div></div></a></li>')); 

                            if(i == total_news_num-1){
                              last_news_sku_videos = newsResponse["hits"][i]["sku"];
                              
                              
                            }
                ///////////////////////////////////////////////////////////////
                        } else if (option == "audios_option"){
                ///////////////////////////////////////////////////////////////
                        this_current_time = Math.floor((Math.random() * 999999) + 100000);
                        i = i + 1;
                        if(i < total_news_num){
                            var this_title_2 = newsResponse["hits"][i]["title"];
                            var this_poster_path_2 = newsResponse["hits"][i]["poster_path"];
                            var this_path_2 = newsResponse["hits"][i]["path"];
                            var this_date_2 = newsResponse["hits"][i]["date"];
                            var this_sku_2 = newsResponse["hits"][i]["sku"];
                            var this_id_2 = this_sku + this_current_time;

                            if(nofavorites == "yes"){

                                    var fav_color_2 = "";

                            } else {

                                for(j=0; j < total_fav_num; j++){

                                  if(favoriteVideosPath[j] == this_path){
                                    var fav_color_2 = "red";
                                    break;
                                  } else {
                                    var fav_color_2 = "";
                                  }

                                }



                            }
                            var display_style = "";

                        } else {
                            last_news_sku_audios = newsResponse["hits"][i-1]["sku"];
                            //break;
                            var this_title_2 = "N/A";
                            var this_poster_path_2 = "N/A";
                            var this_path_2 = "N/A";
                            var this_date_2 = "N/A";
                            var this_sku_2 = "N/A";
                            var this_id_2 = "N/A" + this_current_time;
                            var fav_color = "";
                            var display_style = "none";

                        }
                                if(this_poster_path.trim() == "" || this_poster_path.trim() == "http://app.dannydoku.com"){

                                      this_poster_path = "img/logo.png";

                                }
     
                                if(this_poster_path_2.trim() == "" || this_poster_path_2.trim() == "http://app.dannydoku.com"){

                                      this_poster_path_2 = "img/logo.png";

                                }
     
                            //$('#'+append_id).append($('<li><a href="#" class="item-link item-content popup-open"  data-popup = ".demo-aud" data-posterpath = " ' + this_poster_path + '" data-audiotitle = " ' + this_title + '" data-audiopath = "' + this_path + '" data-audiodate = "' + this_date + '"  onclick="setCurrentAudioToPlayer(this);"><div class="item-media"><img src="' + this_poster_path + '" width="44"/></div><div class="item-inner"><div class="item-title-row"><div class="item-title">' + this_title + '</div></div><div class="item-subtitle">' + this_date + '</div></div></a></li>')); 
                            $('#'+append_id).append($('<div class="row" style = "margin-bottom : 10px;"><div class="col popup-open" data-popup = ".demo-aud" data-posterpath = " ' + this_poster_path + '" data-audiotitle = " ' + this_title + '" data-audiopath = "' + this_path + '" data-audiodate = "' + this_date + '"  onclick="setCurrentAudioToPlayer(this);" style=" cursor : pointer ;border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"><img src="' + this_poster_path + '" width="100%" style="height: 70%; border-top-right-radius: 5px; border-top-left-radius: 5px; background-color: grey;" /><div class="item-title" style="margin: 10px;">' + this_title + '</div></div><div class="col popup-open" data-popup = ".demo-aud" data-posterpath = " ' + this_poster_path_2 + '" data-audiotitle = " ' + this_title_2 + '" data-audiopath = "' + this_path_2 + '" data-audiodate = "' + this_date_2 + '"  onclick="setCurrentAudioToPlayer(this);"  style=" display : ' + display_style +  ' ; cursor : pointer ;border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"><img src="' + this_poster_path_2 + '" width="100%" style="height: 70%; border-top-right-radius: 5px; border-top-left-radius: 5px; background-color: grey;" /><div class="item-title" style="margin: 10px;">' + this_title_2 + '</div></div></div>')); 
                            if(i == total_news_num-1){

                              last_news_sku_audios = newsResponse["hits"][i]["sku"];

                            }
                ///////////////////////////////////////////////////////////////
                        } else if (option == "favorites_videos_option"){
                ///////////////////////////////////////////////////////////////
                            $('#'+append_id).append($('<li><a href="#" class="item-content"><div class="item-inner"><div class="item-title-row"></div>  <video  id="'  + this_id + '" onplay="pauseOtherPlayers(' + this_id +  ')"  class="video-js" controls controlsList="nodownload" preload="auto" style="width: 150%;" poster="' + this_poster_path + '" data-setup="{}"><source src="' + this_path + '" type="video/mp4"><source src="' + this_path + '" type="video/webm"></video><div class="item-title-row"><div class="item-title" style="color: black; font-weight : bolder">' + this_title + '</div></div><div class="item-subtitle" style="color: grey;">' + this_date + '</div><div  class="item-subtitle" style="color: grey; float: right;"><i style = "color : ' + fav_color + '" class="icon f7-icons ios-only " data-posterpath = " ' + this_poster_path + '" data-videotitle = " ' + this_title + '" data-videopath = "' + this_path + '" data-videodate = "' + this_date + '" onclick="addToVideosFavorties(this);">heart_fill</i><i  data-posterpath = " ' + this_poster_path + '" data-videotitle = " ' + this_title + '" data-videopath = "' + this_path + '" data-videodate = "' + this_date + '" onclick="addToVideosFavorties(this);" class="icon material-icons md-only"  style = "color : ' + fav_color + '" >favorite</i></div></div></a></li>')); 
                            if(i == 0){

                              last_news_sku_favorites_videos = newsResponse["hits"][i]["sku"];

                            }
                ///////////////////////////////////////////////////////////////
                        } else if (option == "favorites_audio_option"){
                ///////////////////////////////////////////////////////////////
                                if(this_poster_path.trim() == "" || this_poster_path.trim() == "http://app.dannydoku.com"){

                                      this_poster_path = "img/logo.png";

                                }
                            $('#'+append_id).append($('<li><a href="#" class="item-link item-content popup-open"  data-popup = ".demo-aud" data-posterpath = " ' + this_poster_path + '" data-audiotitle = " ' + this_title + '" data-audiopath = "' + this_path + '" data-audiodate = "' + this_date + '"  onclick="setCurrentAudioToPlayer(this);"><div class="item-media"><img src="' + this_poster_path + '" width="44"/></div><div class="item-inner"><div class="item-title-row"><div class="item-title">' + this_title + '</div></div><div class="item-subtitle">' + this_date + '</div></div></a></li>')); 
                            if(i == 0){

                              last_news_sku_favorites_audios = newsResponse["hits"][i]["sku"];

                            }
                ///////////////////////////////////////////////////////////////
                        } else {
                ///////////////////////////////////////////////////////////////
                        var category = newsResponse["hits"][i]["category"];
                            if(category == "Teachings"){

                              append_id = "video_list_teachings";

                            } else if(category == "Prophetic"){

                              append_id = "video_list_prophetic";

                            } else {

                              append_id = "video_list_miraculous";

                            }

                            $('#'+append_id).append($('<li><a href="#" class="item-content"><div class="item-inner"><div class="item-title-row"></div>  <video onclick="playPauseThisVideo(' + this_id +  ')" id="'  + this_id + '" onplay="pauseOtherPlayers(' + this_id +  ')" onpause = "pauseVideo(' + this_id +  ')" class="myVideo" controls controlsList="nodownload" preload="auto" style="width: 115%; margin-left: -20px;" poster="' + this_poster_path + '" data-setup="{}"><source src="' + this_path + '" type="video/mp4"><source src="' + this_path + '" type="video/webm"></video><div id="icon_' + this_id + '" onclick="playPauseThisVideo(' + this_id +  ')" class="playpause"></div><div class="item-title-row"><div class="item-title" style="color: black; font-weight : bolder">' + this_title + '</div></div><div class="item-subtitle" style="color: grey;">' + this_date + '</div><div  class="item-subtitle" style="color: grey; float: right;"><i style = "color : ' + fav_color + '" class="icon f7-icons ios-only " data-posterpath = " ' + this_poster_path + '" data-videotitle = " ' + this_title + '" data-videopath = "' + this_path + '" data-videodate = "' + this_date + '" onclick="addToVideosFavorties(this);">heart_fill</i><i  data-posterpath = " ' + this_poster_path + '" data-videotitle = " ' + this_title + '" data-videopath = "' + this_path + '" data-videodate = "' + this_date + '" onclick="addToVideosFavorties(this);" class="icon material-icons md-only"  style = "color : ' + fav_color + '" >favorite</i></div></div></a></li>')); 
                            if(i == total_news_num-1){
                              last_news_sku_videos = newsResponse["hits"][i]["sku"];
                              
                            }
                ///////////////////////////////////////////////////////////////
                        }

                }
                

                //setNews(total_news_num, newsResponse);
            }
          },

          error: function(XMLHttpRequest, textStatus, errorThrown) {
                var this_message = "Something went awry";
                var toastError = app.toast.create({
                  text: this_message,
                  closeTimeout: 2000,
                });
                toastError.open();
            app.preloader.hide();
          }
        });
}
// onSuccess Callback
// This method accepts a JSON object, which contains the
// message response
//
function addToDownloadedVideos(poster_path, video_path, video_title, video_date){

  //poster_path = x.getAttribute("data-posterpath");
  //video_path = x.getAttribute("data-videopath");
  //video_title = x.getAttribute("data-videotitle");
  //video_date = x.getAttribute("data-videodate");

  var favoriteVideosPathDownloads = localStorage.getItem("favoriteVideosPathDownloads");
  var favoriteVideosPosterPathDownloads = localStorage.getItem("favoriteVideosPosterPathDownloads");
  var favoriteVideostitleDownloads = localStorage.getItem("favoriteVideostitleDownloads");
  var favoriteVideosDateDownloads = localStorage.getItem("favoriteVideosDateDownloads");

  if(favoriteVideosPathDownloads == null || favoriteVideosPosterPathDownloads == null){

      var favoriteVideosPathDownloads = [];
      var favoriteVideosPosterPathDownloads = [];
      var favoriteVideostitleDownloads = [];
      var favoriteVideosDateDownloads = [];
      favoriteVideosPathDownloads[0] = video_path;
      favoriteVideosPosterPathDownloads[0] = poster_path;
      favoriteVideostitleDownloads[0] = video_title;
      favoriteVideosDateDownloads[0] = video_date;
      localStorage.setItem("favoriteVideosPathDownloads", JSON.stringify(favoriteVideosPathDownloads));
      localStorage.setItem("favoriteVideosPosterPathDownloads", JSON.stringify(favoriteVideosPosterPathDownloads));
      localStorage.setItem("favoriteVideostitleDownloads", JSON.stringify(favoriteVideostitleDownloads));
      localStorage.setItem("favoriteVideosDateDownloads", JSON.stringify(favoriteVideosDateDownloads));

      var toastResponse = app.toast.create({
        text: "Added to download videos",
        closeTimeout: 2000,
      });
      toastResponse.open();

  } else {

      favoriteVideosPathDownloads = JSON.parse(favoriteVideosPathDownloads);
      favoriteVideosPosterPathDownloads = JSON.parse(favoriteVideosPosterPathDownloads);
      favoriteVideostitleDownloads = JSON.parse(favoriteVideostitleDownloads);
      favoriteVideosDateDownloads = JSON.parse(favoriteVideosDateDownloads);
      
      var total_fav_num = Object.keys(favoriteVideosPathDownloads).length;
      var already_added = 0;
      for(i=0; i < total_fav_num; i++){

        if(favoriteVideosPathDownloads[i] == video_path){
          already_added = 1;
          break;
        } else {
          already_added = 0;
        }

      }

      if(already_added == 0){

          favoriteVideosPathDownloads.push(video_path);
          favoriteVideosPosterPathDownloads.push(poster_path);
          favoriteVideostitleDownloads.push(video_title);
          favoriteVideosDateDownloads.push(video_date);

          localStorage.setItem("favoriteVideosPathDownloads", JSON.stringify(favoriteVideosPathDownloads));
          localStorage.setItem("favoriteVideosPosterPathDownloads", JSON.stringify(favoriteVideosPosterPathDownloads));
          localStorage.setItem("favoriteVideostitleDownloads", JSON.stringify(favoriteVideostitleDownloads));
          localStorage.setItem("favoriteVideosDateDownloads", JSON.stringify(favoriteVideosDateDownloads));
          var toastResponse = app.toast.create({
            text: "Added to download videos",
            closeTimeout: 2000,
          });
          toastResponse.open();
      } else {
          var toastResponse = app.toast.create({
            text: "This video exits in downloads",
            closeTimeout: 2000,
          });
          toastResponse.open();
      }

  }

}

function addToDownloadedAudios(poster_path, video_path, video_title, video_date){


  var favoriteAudiosPathDownloads = localStorage.getItem("favoriteAudiosPathDownloads");
  var favoriteAudiosPosterPathDownloads = localStorage.getItem("favoriteAudiosPosterPathDownloads");
  var favoriteAudiostitleDownloads = localStorage.getItem("favoriteAudiostitleDownloads");
  var favoriteAudiosDateDownloads = localStorage.getItem("favoriteAudiosDateDownloads");

  if(favoriteAudiosPathDownloads == null || favoriteAudiosPosterPathDownloads == null){

      var favoriteAudiosPathDownloads = [];
      var favoriteAudiosPosterPathDownloads = [];
      var favoriteAudiostitleDownloads = [];
      var favoriteAudiosDateDownloads = [];

      favoriteAudiosPathDownloads[0] = video_path;
      favoriteAudiosPosterPathDownloads[0] = poster_path;
      favoriteAudiostitleDownloads[0] = video_title;
      favoriteAudiosDateDownloads[0] = video_date;

      localStorage.setItem("favoriteAudiosPathDownloads", JSON.stringify(favoriteAudiosPathDownloads));
      localStorage.setItem("favoriteAudiosPosterPathDownloads", JSON.stringify(favoriteAudiosPosterPathDownloads));
      localStorage.setItem("favoriteAudiostitleDownloads", JSON.stringify(favoriteAudiostitleDownloads));
      localStorage.setItem("favoriteAudiosDateDownloads", JSON.stringify(favoriteAudiosDateDownloads));

      var toastResponse = app.toast.create({
        text: "Added to download audios",
        closeTimeout: 2000,
      });
      toastResponse.open();

  } else {

      favoriteAudiosPathDownloads = JSON.parse(favoriteAudiosPathDownloads);
      favoriteAudiosPosterPathDownloads = JSON.parse(favoriteAudiosPosterPathDownloads);
      favoriteAudiostitleDownloads = JSON.parse(favoriteAudiostitleDownloads);
      favoriteAudiosDateDownloads = JSON.parse(favoriteAudiosDateDownloads);
      
      var total_fav_num = Object.keys(favoriteAudiosPathDownloads).length;
      var already_added = 0;
      for(i=0; i < total_fav_num; i++){
        if(favoriteAudiosPathDownloads[i] == video_path){
          already_added = 1;
          break;
        } else {
          already_added = 0;
        }

      }

      if(already_added == 0){

          favoriteAudiosPathDownloads.push(video_path);
          favoriteAudiosPosterPathDownloads.push(poster_path);
          favoriteAudiostitleDownloads.push(video_title);
          favoriteAudiosDateDownloads.push(video_date);

          localStorage.setItem("favoriteAudiosPathDownloads", JSON.stringify(favoriteAudiosPathDownloads));
          localStorage.setItem("favoriteAudiosPosterPathDownloads", JSON.stringify(favoriteAudiosPosterPathDownloads));
          localStorage.setItem("favoriteAudiostitleDownloads", JSON.stringify(favoriteAudiostitleDownloads));
          localStorage.setItem("favoriteAudiosDateDownloads", JSON.stringify(favoriteAudiosDateDownloads));
          var toastResponse = app.toast.create({
            text: "Added to download audios",
            closeTimeout: 2000,
          });
          toastResponse.open();
          document.getElementById("part_of_audios").value = "1";
      } else {
          var toastResponse = app.toast.create({
            text: "This audio is already part of your downloads",
            closeTimeout: 2000,
          });
          toastResponse.open();

      }

  }

}



var onSuccess = function(data) {

    app.dialog.alert("Download Complete", "Download");

};


function onError(error) {
    //alert('error: ' + error.message);
    app.dialog.alert("Download Error. Please make sure you have enough space and the application has storage permission to save to your device", "Error");
    //alert('Video Download Error Occurred');
}

function downloadVideo(x){


  app.dialog.alert("Saving offline. Find offline media at the Download Section. Click The Download Button Icon that appears after the clicking the button on right lower corner ", "Download");

  this_posterpath = x.getAttribute("data-posterpath");
  this_videotitle = x.getAttribute("data-videotitle");
  this_video_path = x.getAttribute("data-videopath");
  this_videodate = x.getAttribute("data-videodate");

///////////////////////////////////////////////////////////

addToDownloadedVideos(this_posterpath, this_video_path, this_videotitle, this_videodate);
//window.cordova.plugins.FileOpener.openFile(this_video_path, onSuccess, onError);
Downloader.download(this_video_path, success, error);


///////////////////////////////////////////////////////////

}

function success(message){

}

function error(message){

    app.dialog.alert("Download Error. Please make sure you have enough space and the application has storage permission to save to your device", "Error");

}



function downloadAudio(x){

  app.dialog.alert("Saving offline. Find offline media at the Download Section. Click The Download Button Icon that appears after the clicking the button on right lower corner ", "Download");

  //var toastError = app.toast.create({
  //  text: "Downloading Audio",
  //  closeTimeout: 2000,
  //});
  //toastError.open();

  this_audio_path = document.getElementById("audio_player").src;


  poster_path = document.getElementById("this_posterpath").value;
  video_path = document.getElementById("this_audiopath").value;
  video_title = document.getElementById("this_audiotitle").value;
  video_date = document.getElementById("this_audiodate").value;
  //url = "http://yourcompany.com/abc.apk";
  addToDownloadedAudios("img/offline.jpg", video_path, video_title, video_date);

  Downloader.download(this_audio_path, success, error);
  //console.log("3 this_audio_path : " + this_audio_path);
}


function sendMessage() {

    var disMessageText = document.getElementById("thismessage").value;

var toastBottom = app.toast.create({
  text: 'You message cannot be empty',
  closeTimeout: 2000,
});


    if(disMessageText.trim() == ""){

        toastBottom.open();

    } else if (disMessageText.trim() != ""){

       var url_real = CONFIG + "/inc/contact_ddn.php";
         var loginData = {
            myid : my_user_sys_id,
            mypass : my_e_password,
            info : disMessageText
        };  

      app.preloader.show();
        app.request({
          url: url_real,
          type: "POST",
          data: loginData,
          success: function(response){
                var toastResponse = app.toast.create({
                  text: response,
                  closeTimeout: 2000,
                });
              toastResponse.open();
                document.getElementById("thismessage").value = "";
                app.preloader.hide();

          },

          error: function(XMLHttpRequest, textStatus, errorThrown) {

                var this_message = "Poor network connection. Try again later";
                var toastError = app.toast.create({
                  text: this_message,
                  closeTimeout: 2000,
                });
                toastError.open();
              app.preloader.hide();
          }
        });
    } else {


    app.dialog.alert("Something went awry", "Error");

    }


}

function addToVideosFavorties(x){

  poster_path = x.getAttribute("data-posterpath");
  video_path = x.getAttribute("data-videopath");
  video_title = x.getAttribute("data-videotitle");
  video_date = x.getAttribute("data-videodate");

  var favoriteVideosPath = localStorage.getItem("favoriteVideosPath");
  var favoriteVideosPosterPath = localStorage.getItem("favoriteVideosPosterPath");
  var favoriteVideostitle = localStorage.getItem("favoriteVideostitle");
  var favoriteVideosDate = localStorage.getItem("favoriteVideosDate");

  if(favoriteVideosPath == null || favoriteVideosPosterPath == null){

      var favoriteVideosPath = [];
      var favoriteVideosPosterPath = [];
      var favoriteVideostitle = [];
      var favoriteVideosDate = [];
      favoriteVideosPath[0] = video_path;
      favoriteVideosPosterPath[0] = poster_path;
      favoriteVideostitle[0] = video_title;
      favoriteVideosDate[0] = video_date;
      localStorage.setItem("favoriteVideosPath", JSON.stringify(favoriteVideosPath));
      localStorage.setItem("favoriteVideosPosterPath", JSON.stringify(favoriteVideosPosterPath));
      localStorage.setItem("favoriteVideostitle", JSON.stringify(favoriteVideostitle));
      localStorage.setItem("favoriteVideosDate", JSON.stringify(favoriteVideosDate));


      x.style.color = "red";
      var toastResponse = app.toast.create({
        text: "Added to favorites videos",
        closeTimeout: 2000,
      });
      toastResponse.open();

  } else {

      favoriteVideosPath = JSON.parse(favoriteVideosPath);
      favoriteVideosPosterPath = JSON.parse(favoriteVideosPosterPath);
      favoriteVideostitle = JSON.parse(favoriteVideostitle);
      favoriteVideosDate = JSON.parse(favoriteVideosDate);
      
      var total_fav_num = Object.keys(favoriteVideosPath).length;
      var already_added = 0;

      for(i=0; i < total_fav_num; i++){

        if(favoriteVideosPath[i] == video_path){
          already_added = 1;
          break;
        } else {
          already_added = 0;
        }

      }

      if(already_added == 0){

          favoriteVideosPath.push(video_path);
          favoriteVideosPosterPath.push(poster_path);
          favoriteVideostitle.push(video_title);
          favoriteVideosDate.push(video_date);
          x.style.color = "red";
          localStorage.setItem("favoriteVideosPath", JSON.stringify(favoriteVideosPath));
          localStorage.setItem("favoriteVideosPosterPath", JSON.stringify(favoriteVideosPosterPath));
          localStorage.setItem("favoriteVideostitle", JSON.stringify(favoriteVideostitle));
          localStorage.setItem("favoriteVideosDate", JSON.stringify(favoriteVideosDate));
          var toastResponse = app.toast.create({
            text: "Added to favorites videos",
            closeTimeout: 2000,
          });
          toastResponse.open();
      } else {

        removeFavoriteVideo(x);

      }

  }

}

function addToAudiosFavorties(x){


  x = document.getElementById("fav_audio_icon");
  poster_path = document.getElementById("this_posterpath").value;
  video_path = document.getElementById("this_audiopath").value;
  video_title = document.getElementById("this_audiotitle").value;
  video_date = document.getElementById("this_audiodate").value;

  var favoriteAudiosPath = localStorage.getItem("favoriteAudiosPath");
  var favoriteAudiosPosterPath = localStorage.getItem("favoriteAudiosPosterPath");
  var favoriteAudiostitle = localStorage.getItem("favoriteAudiostitle");
  var favoriteAudiosDate = localStorage.getItem("favoriteAudiosDate");

  if(favoriteAudiosPath == null || favoriteAudiosPosterPath == null){

      var favoriteAudiosPath = [];
      var favoriteAudiosPosterPath = [];
      var favoriteAudiostitle = [];
      var favoriteAudiosDate = [];

      favoriteAudiosPath[0] = video_path;
      favoriteAudiosPosterPath[0] = poster_path;
      favoriteAudiostitle[0] = video_title;
      favoriteAudiosDate[0] = video_date;

      localStorage.setItem("favoriteAudiosPath", JSON.stringify(favoriteAudiosPath));
      localStorage.setItem("favoriteAudiosPosterPath", JSON.stringify(favoriteAudiosPosterPath));
      localStorage.setItem("favoriteAudiostitle", JSON.stringify(favoriteAudiostitle));
      localStorage.setItem("favoriteAudiosDate", JSON.stringify(favoriteAudiosDate));

      document.getElementById("part_of_audios").value = "1";
      x.style.color = "red";
      var toastResponse = app.toast.create({
        text: "Added to favorites audios",
        closeTimeout: 2000,
      });
      toastResponse.open();

  } else {

      favoriteAudiosPath = JSON.parse(favoriteAudiosPath);
      favoriteAudiosPosterPath = JSON.parse(favoriteAudiosPosterPath);
      favoriteAudiostitle = JSON.parse(favoriteAudiostitle);
      favoriteAudiosDate = JSON.parse(favoriteAudiosDate);
      
      var total_fav_num = Object.keys(favoriteAudiosPath).length;
      var already_added = 0;
      for(i=0; i < total_fav_num; i++){

        if(favoriteAudiosPath[i] == video_path){
          already_added = 1;
          break;
        } else {
          already_added = 0;
        }

      }

      if(already_added == 0){

          favoriteAudiosPath.push(video_path);
          favoriteAudiosPosterPath.push(poster_path);
          favoriteAudiostitle.push(video_title);
          favoriteAudiosDate.push(video_date);

          x.style.color = "red";
          localStorage.setItem("favoriteAudiosPath", JSON.stringify(favoriteAudiosPath));
          localStorage.setItem("favoriteAudiosPosterPath", JSON.stringify(favoriteAudiosPosterPath));
          localStorage.setItem("favoriteAudiostitle", JSON.stringify(favoriteAudiostitle));
          localStorage.setItem("favoriteAudiosDate", JSON.stringify(favoriteAudiosDate));
          var toastResponse = app.toast.create({
            text: "Added to favorites audios",
            closeTimeout: 2000,
          });
          toastResponse.open();
          document.getElementById("part_of_audios").value = "1";
      } else {
          var toastResponse = app.toast.create({
            text: "This audio is already part of your favorites",
            closeTimeout: 2000,
          });
          toastResponse.open();

      }

  }

}


function removeFavoriteAudios(x){

  var remove_video_path = x;

  console.log("remove_audio_path : " + remove_video_path);

  var favoriteAudiosPath = localStorage.getItem("favoriteAudiosPath");
  var favoriteAudiosPosterPath = localStorage.getItem("favoriteAudiosPosterPath");
  var favoriteAudiostitle = localStorage.getItem("favoriteAudiostitle");
  var favoriteAudiosDate = localStorage.getItem("favoriteAudiosDate");

  if(favoriteAudiosPath == null || favoriteAudiosPosterPath == null || 
    favoriteAudiostitle == null|| favoriteAudiosDate == null){

          var toastResponse = app.toast.create({
            text: "No favorite audios",
            closeTimeout: 2000,
          });
          toastResponse.open();

  } else {

    favoriteAudiosPath = JSON.parse(favoriteAudiosPath);
    favoriteAudiosPosterPath = JSON.parse(favoriteAudiosPosterPath);
    favoriteAudiostitle = JSON.parse(favoriteAudiostitle);
    favoriteAudiosDate = JSON.parse(favoriteAudiosDate);

    console.log("2- OLD favoriteAudiosPath");
    console.log(favoriteAudiosPath);

    for(j=0; j < Object.keys(favoriteAudiosPath).length; j++){

      this_path = favoriteAudiosPath[j];
      this_poster_path = favoriteAudiosPosterPath[j];
      this_title = favoriteAudiostitle[j];
      this_date = favoriteAudiosDate[j];

      if(this_path.trim() == remove_video_path.trim() || encodeURI(this_path) == remove_video_path.trim()){
        console.log("500 - " + this_title);
        favoriteAudiosPath.splice(j, 1);
        favoriteAudiosPosterPath.splice(j, 1);
        favoriteAudiostitle.splice(j, 1);
        favoriteAudiosDate.splice(j, 1);
          var toastResponse = app.toast.create({
            text: "Removed from favorite audios",
            closeTimeout: 2000,
          });
          toastResponse.open();
          document.getElementById("part_of_audios").value = "0";
          document.getElementById("fav_audio_icon").style.color = "white";
          break;
      }


    }

    localStorage.setItem("favoriteAudiosPath", JSON.stringify(favoriteAudiosPath));
    localStorage.setItem("favoriteAudiosPosterPath", JSON.stringify(favoriteAudiosPosterPath));
    localStorage.setItem("favoriteAudiostitle", JSON.stringify(favoriteAudiostitle));
    localStorage.setItem("favoriteAudiosDate", JSON.stringify(favoriteAudiosDate));

    console.log("2- NEW favoriteAudiosPath");
    console.log(favoriteAudiosPath);
  }



}



function removeFavoriteVideo(x){

  var remove_video_path = x.getAttribute("data-videopath");

  var favoriteVideosPath = localStorage.getItem("favoriteVideosPath");
  var favoriteVideosPosterPath = localStorage.getItem("favoriteVideosPosterPath");
  var favoriteVideostitle = localStorage.getItem("favoriteVideostitle");
  var favoriteVideosDate = localStorage.getItem("favoriteVideosDate");

  if(favoriteVideosPath == null || favoriteVideosPosterPath == null || 
    favoriteVideostitle == null|| favoriteVideosDate == null){


  } else {

    favoriteVideosPath = JSON.parse(favoriteVideosPath);
    favoriteVideosPosterPath = JSON.parse(favoriteVideosPosterPath);
    favoriteVideostitle = JSON.parse(favoriteVideostitle);
    favoriteVideosDate = JSON.parse(favoriteVideosDate);

    console.log("OLD favoriteVideosPath");
    console.log(favoriteVideosPath);

    for(j=0; j < Object.keys(favoriteVideosPath).length; j++){

      this_path = favoriteVideosPath[j];
      this_poster_path = favoriteVideosPosterPath[j];
      this_title = favoriteVideostitle[j];
      this_date = favoriteVideosDate[j];

      if(this_path.trim() == remove_video_path.trim()){

        console.log("500 - " + this_title);
        favoriteVideosPath.splice(j, 1);
        favoriteVideosPosterPath.splice(j, 1);
        favoriteVideostitle.splice(j, 1);
        favoriteVideosDate.splice(j, 1);
        var toastResponse = app.toast.create({
          text: "Removed from favorite videos",
          closeTimeout: 2000,
        });
        toastResponse.open();
        x.style.color = "grey";
        break;

      }

    }
      localStorage.setItem("favoriteVideosPath", JSON.stringify(favoriteVideosPath));
      localStorage.setItem("favoriteVideosPosterPath", JSON.stringify(favoriteVideosPosterPath));
      localStorage.setItem("favoriteVideostitle", JSON.stringify(favoriteVideostitle));
      localStorage.setItem("favoriteVideosDate", JSON.stringify(favoriteVideosDate));

      console.log("NEW favoriteVideosPath");
      console.log(favoriteVideosPath);
  }
}

function reload(){
  if(current_page == "videos_option" || current_page == "audios_option" ){

        fetchNews(current_page, "0");

  }

}

function setDownloadAudios(){

  app.preloader.hide();
  document.getElementById("audio_list_downloads").innerHTML = "";

  var favoriteAudiosPathDownloads = localStorage.getItem("favoriteAudiosPathDownloads");
  var favoriteAudiosPosterPathDownloads = localStorage.getItem("favoriteAudiosPosterPathDownloads");
  var favoriteAudiostitleDownloads = localStorage.getItem("favoriteAudiostitleDownloads");
  var favoriteAudiosDateDownloads = localStorage.getItem("favoriteAudiosDateDownloads");

  if(favoriteAudiosPathDownloads == null || favoriteAudiosPosterPathDownloads == null || 
    favoriteAudiostitleDownloads == null|| favoriteAudiosDateDownloads == null){

          var toastResponse = app.toast.create({
            text: "You have no downloaded audios",
            closeTimeout: 2000,
          });
          toastResponse.open();

  } else {

    favoriteAudiosPathDownloads = JSON.parse(favoriteAudiosPathDownloads);
    favoriteAudiosPosterPathDownloads = JSON.parse(favoriteAudiosPosterPathDownloads);
    favoriteAudiostitleDownloads = JSON.parse(favoriteAudiostitleDownloads);
    favoriteAudiosDateDownloads = JSON.parse(favoriteAudiosDateDownloads);

    this_current_time = Math.floor((Math.random() * 99999999) + 10000000);
    var this_id = this_current_time;
    //this_id = String(this_id);


    var total_fav_num = Object.keys(favoriteAudiosPathDownloads).length;

    for(j=0; j < total_fav_num; j++){

      this_path = favoriteAudiosPathDownloads[j];
      this_poster_path = favoriteAudiosPosterPathDownloads[j];
      this_title = favoriteAudiostitleDownloads[j];
      this_date = favoriteAudiosDateDownloads[j];
  ///////////////////////////////////////////////////////////////
          this_current_time = Math.floor((Math.random() * 999999) + 100000);
          j = j + 1;
          if(j < total_fav_num){

              this_path_2 = favoriteAudiosPathDownloads[j];
              this_poster_path_2 = favoriteAudiosPosterPathDownloads[j];
              this_title_2 = favoriteAudiostitleDownloads[j];
              this_date_2 = favoriteAudiosDateDownloads[j];
              var fav_color_2 = "red";
              var display_style = "";

          } else {
              //break;
              var this_title_2 = "N/A";
              var this_poster_path_2 = "N/A";
              var this_path_2 = "N/A";
              var this_date_2 = "N/A";
              var this_sku_2 = "N/A";
              var this_id_2 = "N/A" + this_current_time;
              var fav_color = "";
              var display_style = "none";

          }
                  if(this_poster_path.trim() == "" || this_poster_path.trim() == "http://app.dannydoku.com"){

                        this_poster_path = "img/logo.png";

                  }

                  if(this_poster_path_2.trim() == "" || this_poster_path_2.trim() == "http://app.dannydoku.com"){

                        this_poster_path_2 = "img/logo.png";

                  }

      if(this_path != "" && this_title != ""){

          //$('#favorites_audio').append($('<li><a href="#" class="item-link item-content popup-open"  data-popup = ".demo-aud" data-posterpath = " ' + this_poster_path + '" data-audiotitle = " ' + this_title + '" data-audiopath = "' + this_path + '" data-audiodate = "' + this_date + '"  onclick="pauseOtherPlayers(' + this_id +  '); setCurrentAudioToPlayer(this);"  id="'  + this_id + '"><div class="item-media"><img src="' + this_poster_path + '" width="44"/></div><div class="item-inner"><div class="item-title-row"><div class="item-title">' + this_title + '</div></div></div></a></li>')); 
          $('#audio_list_downloads').append($('<div class="row" style = "margin-bottom : 10px;"><div class="col" data-posterpath = " ' + this_poster_path + '" data-audiotitle = " ' + this_title + '" data-audiopath = "' + this_path + '" data-audiodate = "' + this_date + '" data-mime = "audio/mpeg"  onclick="openDownloadedFile(this);" style=" cursor : pointer ;border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"><img src="' + this_poster_path + '" width="100%" style="height: 70%; border-top-right-radius: 5px; border-top-left-radius: 5px; background-color: grey;" /><div class="item-title" style="margin: 10px;">' + this_title + '</div></div><div class="col" data-posterpath = " ' + this_poster_path_2 + '" data-audiotitle = " ' + this_title_2 + '" data-audiopath = "' + this_path_2 + '" data-audiodate = "' + this_date_2 + '"  data-mime = "audio/mpeg"  onclick="openDownloadedFile(this);"  style=" display : ' + display_style +  ' ; cursor : pointer ;border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"><img src="' + this_poster_path_2 + '" width="100%" style="height: 70%; border-top-right-radius: 5px; border-top-left-radius: 5px; background-color: grey;" /><div class="item-title" style="margin: 10px;">' + this_title_2 + '</div></div></div>')); 
      
      }


    }
  }
  app.preloader.hide();


}

function setDownloadVideos(){

  console.log("preloader");
  document.getElementById("video_list_downloads").innerHTML = "";

  var favoriteVideosPathDownloads = localStorage.getItem("favoriteVideosPathDownloads");
  var favoriteVideosPosterPathDownloads = localStorage.getItem("favoriteVideosPosterPathDownloads");
  var favoriteVideostitleDownloads = localStorage.getItem("favoriteVideostitleDownloads");
  var favoriteVideosDateDownloads = localStorage.getItem("favoriteVideosDateDownloads");

  if(favoriteVideosPathDownloads == null || favoriteVideosPosterPathDownloads == null || 
    favoriteVideostitleDownloads == null|| favoriteVideosDateDownloads == null){

          var toastResponse = app.toast.create({
            text: "You have no downloaded videos",
            closeTimeout: 2000,
          });
          toastResponse.open();

  } else {

    favoriteVideosPathDownloads = JSON.parse(favoriteVideosPathDownloads);
    favoriteVideosPosterPathDownloads = JSON.parse(favoriteVideosPosterPathDownloads);
    favoriteVideostitleDownloads = JSON.parse(favoriteVideostitleDownloads);
    favoriteVideosDateDownloads = JSON.parse(favoriteVideosDateDownloads);

    var total_fav_num = Object.keys(favoriteVideosPathDownloads).length;


    for(j=0; j < total_fav_num; j++){

      this_path = favoriteVideosPathDownloads[j];
      this_poster_path = favoriteVideosPosterPathDownloads[j];
      this_title = favoriteVideostitleDownloads[j];
      this_date = favoriteVideosDateDownloads[j];

    this_current_time = Math.floor((Math.random() * 99999999) + 10000000);
    var this_id = this_current_time;
    //this_id = String(this_id);

      if(this_path != "" && this_title != ""){
          $('#video_list_downloads').append($('<li><a href="#" class="item-content"><div class="item-inner"><div class="item-title-row"></div>  <video  onclick="playPauseThisVideo(' + this_id +  ')" id="'  + this_id + '"  data-audiopath = "' + this_path + '" data-mime ="video/mp4" onplay="openDownloadedFile(this);" class="myVideo" controls controlsList="nodownload" preload="auto" style="width: 115%; margin-left: -20px;" poster="img/offlinevid.jpg" data-setup="{}"><source src="" type="video/mp4"><source src="" type="video/webm"></video><div id="icon_' + this_id + '" data-audiopath = "' + this_path + '" data-mime ="video/mp4" onclick="openDownloadedFile(this)" class="playpause"></div><div class="item-title-row"><div class="item-title" style="color: black; font-weight : bolder">' + this_title + '</div></div><div class="item-subtitle" style="color: grey;">' + this_date + '</div><div  class="item-subtitle" style="color: grey; float: right; display : none;"><i style = "color : red;" class="icon f7-icons ios-only " data-posterpath = " ' + this_poster_path + '" data-videotitle = " ' + this_title + '" data-videopath = "' + this_path + '" data-videodate = "' + this_date + '" onclick="removeFavoriteVideo(this);">favorite</i><i  data-posterpath = " ' + this_poster_path + '" data-videotitle = " ' + this_title + '" data-videopath = "' + this_path + '" data-videodate = "' + this_date + '" onclick="addToVideosFavorties(this);" class="icon material-icons md-only"  style = "color : red" >favorite</i></div></div></a></li>')); 
          if(j == total_fav_num-1){

          }
      }


    }
  }


}



function startDownloadPage(){

  setTimeout(function () {

    setDownloadAudios();
    setDownloadVideos();

  }, 2000);

}

function setFavoriteVideos(){
  app.preloader.show();
  console.log("preloader");

  document.getElementById("favorites_videos").innerHTML = "";
  var favoriteVideosPath = localStorage.getItem("favoriteVideosPath");
  var favoriteVideosPosterPath = localStorage.getItem("favoriteVideosPosterPath");
  var favoriteVideostitle = localStorage.getItem("favoriteVideostitle");
  var favoriteVideosDate = localStorage.getItem("favoriteVideosDate");

  if(favoriteVideosPath == null || favoriteVideosPosterPath == null || 
    favoriteVideostitle == null|| favoriteVideosDate == null){

          var toastResponse = app.toast.create({
            text: "You have no favorite videos",
            closeTimeout: 2000,
          });
          toastResponse.open();

  } else {

    favoriteVideosPath = JSON.parse(favoriteVideosPath);
    favoriteVideosPosterPath = JSON.parse(favoriteVideosPosterPath);
    favoriteVideostitle = JSON.parse(favoriteVideostitle);
    favoriteVideosDate = JSON.parse(favoriteVideosDate);
    var total_fav_num = Object.keys(favoriteVideosPath).length;


    for(j=0; j < total_fav_num; j++){

      this_path = favoriteVideosPath[j];
      this_poster_path = favoriteVideosPosterPath[j];
      this_title = favoriteVideostitle[j];
      this_date = favoriteVideosDate[j];

    this_current_time = Math.floor((Math.random() * 99999999) + 10000000);
    var this_id = this_current_time;
    //this_id = String(this_id);

      if(this_path != "" && this_title != ""){
          $('#favorites_videos').append($('<li><a href="#" class="item-content"><div class="item-inner"><div class="item-title-row"></div>  <video  onclick="playPauseThisVideo(' + this_id +  ')" id="'  + this_id + '" onplay="pauseOtherPlayers(' + this_id +  ')" class="myVideo" controls controlsList="nodownload" preload="auto" style="width: 115%; margin-left: -20px;" poster="' + this_poster_path + '" data-setup="{}"><source src="' + this_path + '" type="video/mp4"><source src="' + this_path + '" type="video/webm"></video><div id="icon_' + this_id + '" onclick="playPauseThisVideo(' + this_id +  ')" class="playpause"></div><div class="item-title-row"><div class="item-title" style="color: black; font-weight : bolder">' + this_title + '</div></div><div class="item-subtitle" style="color: grey;">' + this_date + '</div><div  class="item-subtitle" style="color: grey; float: right;"><i style = "color : red" class="icon f7-icons ios-only " data-posterpath = " ' + this_poster_path + '" data-videotitle = " ' + this_title + '" data-videopath = "' + this_path + '" data-videodate = "' + this_date + '" onclick="removeFavoriteVideo(this);">favorite</i><i  data-posterpath = " ' + this_poster_path + '" data-videotitle = " ' + this_title + '" data-videopath = "' + this_path + '" data-videodate = "' + this_date + '" onclick="addToVideosFavorties(this);" class="icon material-icons md-only"  style = "color : red" >favorite</i></div></div></a></li>')); 
          if(j == total_fav_num-1){

          }
      }


    }
  }
  //app.preloader.hide();
  setFavoriteAudios();
}

function UrlExists(url){
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}

function setFavoriteAudios(){

  document.getElementById("favorites_audio").innerHTML = "";
  var favoriteAudiosPath = localStorage.getItem("favoriteAudiosPath");
  var favoriteAudiosPosterPath = localStorage.getItem("favoriteAudiosPosterPath");
  var favoriteAudiostitle = localStorage.getItem("favoriteAudiostitle");
  var favoriteAudiosDate = localStorage.getItem("favoriteAudiosDate");

  if(favoriteAudiosPath == null || favoriteAudiosPosterPath == null || 
    favoriteAudiostitle == null|| favoriteAudiosDate == null){

          var toastResponse = app.toast.create({
            text: "You have no favorite audios",
            closeTimeout: 2000,
          });
          toastResponse.open();

  } else {

    favoriteAudiosPath = JSON.parse(favoriteAudiosPath);
    favoriteAudiosPosterPath = JSON.parse(favoriteAudiosPosterPath);
    favoriteAudiostitle = JSON.parse(favoriteAudiostitle);
    favoriteAudiosDate = JSON.parse(favoriteAudiosDate);

    this_current_time = Math.floor((Math.random() * 99999999) + 10000000);
    var this_id = this_current_time;
    //this_id = String(this_id);


    var total_fav_num = Object.keys(favoriteAudiosPath).length;

    for(j=0; j < total_fav_num; j++){

      this_path = favoriteAudiosPath[j];
      this_poster_path = favoriteAudiosPosterPath[j];
      this_title = favoriteAudiostitle[j];
      this_date = favoriteAudiosDate[j];
  ///////////////////////////////////////////////////////////////
          this_current_time = Math.floor((Math.random() * 999999) + 100000);
          j = j + 1;
          if(j < total_fav_num){
              this_path_2 = favoriteAudiosPath[j];
              this_poster_path_2 = favoriteAudiosPosterPath[j];
              this_title_2 = favoriteAudiostitle[j];
              this_date_2 = favoriteAudiosDate[j];
              var fav_color_2 = "red";
              var display_style = "";

          } else {
              //break;
              var this_title_2 = "N/A";
              var this_poster_path_2 = "N/A";
              var this_path_2 = "N/A";
              var this_date_2 = "N/A";
              var this_sku_2 = "N/A";
              var this_id_2 = "N/A" + this_current_time;
              var fav_color = "";
              var display_style = "none";

          }
                  if(this_poster_path.trim() == "" || this_poster_path.trim() == "http://app.dannydoku.com"){

                        this_poster_path = "img/logo.png";

                  }

                  if(this_poster_path_2.trim() == "" || this_poster_path_2.trim() == "http://app.dannydoku.com"){

                        this_poster_path_2 = "img/logo.png";

                  }

      if(this_path != "" && this_title != ""){

          //$('#favorites_audio').append($('<li><a href="#" class="item-link item-content popup-open"  data-popup = ".demo-aud" data-posterpath = " ' + this_poster_path + '" data-audiotitle = " ' + this_title + '" data-audiopath = "' + this_path + '" data-audiodate = "' + this_date + '"  onclick="pauseOtherPlayers(' + this_id +  '); setCurrentAudioToPlayer(this);"  id="'  + this_id + '"><div class="item-media"><img src="' + this_poster_path + '" width="44"/></div><div class="item-inner"><div class="item-title-row"><div class="item-title">' + this_title + '</div></div></div></a></li>')); 
          $('#favorites_audio').append($('<div class="row" style = "margin-bottom : 10px;"><div class="col popup-open" data-popup = ".demo-aud" data-posterpath = " ' + this_poster_path + '" data-audiotitle = " ' + this_title + '" data-audiopath = "' + this_path + '" data-audiodate = "' + this_date + '"  onclick="setCurrentAudioToPlayer(this);" style=" cursor : pointer ;border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"><img src="' + this_poster_path + '" width="100%" style="height: 70%; border-top-right-radius: 5px; border-top-left-radius: 5px; background-color: grey;" /><div class="item-title" style="margin: 10px;">' + this_title + '</div></div><div class="col popup-open" data-popup = ".demo-aud" data-posterpath = " ' + this_poster_path_2 + '" data-audiotitle = " ' + this_title_2 + '" data-audiopath = "' + this_path_2 + '" data-audiodate = "' + this_date_2 + '"  onclick="setCurrentAudioToPlayer(this);"  style=" display : ' + display_style +  ' ; cursor : pointer ;border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"><img src="' + this_poster_path_2 + '" width="100%" style="height: 70%; border-top-right-radius: 5px; border-top-left-radius: 5px; background-color: grey;" /><div class="item-title" style="margin: 10px;">' + this_title_2 + '</div></div></div>')); 
      
      }


    }
  }
  app.preloader.hide();

}

function removeDeletedFavoritesAudios(){

  var favoriteAudiosPath = localStorage.getItem("favoriteAudiosPath");
  var favoriteAudiosPosterPath = localStorage.getItem("favoriteAudiosPosterPath");
  var favoriteAudiostitle = localStorage.getItem("favoriteAudiostitle");
  var favoriteAudiosDate = localStorage.getItem("favoriteAudiosDate");

  if(favoriteAudiosPath == null || favoriteAudiosPosterPath == null || 
    favoriteAudiostitle == null|| favoriteAudiosDate == null){


  } else {

    favoriteAudiosPath = JSON.parse(favoriteAudiosPath);
    favoriteAudiosPosterPath = JSON.parse(favoriteAudiosPosterPath);
    favoriteAudiostitle = JSON.parse(favoriteAudiostitle);
    favoriteAudiosDate = JSON.parse(favoriteAudiosDate);

    for(j=0; j < Object.keys(favoriteAudiosPath).length; j++){

      this_path = favoriteAudiosPath[j];
      this_poster_path = favoriteAudiosPosterPath[j];
      this_title = favoriteAudiostitle[j];
      this_date = favoriteAudiosDate[j];

      if(UrlExists(this_path) != true || UrlExists(this_poster_path) != true){
        console.log("500 - " + this_title);
        favoriteAudiosPath.splice(j, 1);
        favoriteAudiosPosterPath.splice(j, 1);
        favoriteAudiostitle.splice(j, 1);
        favoriteAudiosDate.splice(j, 1);
      
      }


    }

          localStorage.setItem("favoriteAudiosPath", JSON.stringify(favoriteAudiosPath));
          localStorage.setItem("favoriteAudiosPosterPath", JSON.stringify(favoriteAudiosPosterPath));
          localStorage.setItem("favoriteAudiostitle", JSON.stringify(favoriteAudiostitle));
          localStorage.setItem("favoriteAudiosDate", JSON.stringify(favoriteAudiosDate));
  }

}

function checkIfAudioExistsInFavorites(audio_path){

  var favoriteAudiosPath = localStorage.getItem("favoriteAudiosPath");
  var favoriteAudiosPosterPath = localStorage.getItem("favoriteAudiosPosterPath");
  var favoriteAudiostitle = localStorage.getItem("favoriteAudiostitle");
  var favoriteAudiosDate = localStorage.getItem("favoriteAudiosDate");

  if(favoriteAudiosPath == null || favoriteAudiosPosterPath == null || 
    favoriteAudiostitle == null|| favoriteAudiosDate == null){

    return 0;

  } else {

    favoriteAudiosPath = JSON.parse(favoriteAudiosPath);
    favoriteAudiosPosterPath = JSON.parse(favoriteAudiosPosterPath);
    favoriteAudiostitle = JSON.parse(favoriteAudiostitle);
    favoriteAudiosDate = JSON.parse(favoriteAudiosDate);

    part = 0;      
    for(j=0; j < Object.keys(favoriteAudiosPath).length; j++){

      this_path = favoriteAudiosPath[j];
      this_poster_path = favoriteAudiosPosterPath[j];
      this_title = favoriteAudiostitle[j];
      this_date = favoriteAudiosDate[j];

      if(this_path.trim() == audio_path.trim()){
          part = 1;      
      }


    }

      return part;
  }


}

function removeDeletedFavoritesVideos(){

  var favoriteVideosPath = localStorage.getItem("favoriteVideosPath");
  var favoriteVideosPosterPath = localStorage.getItem("favoriteVideosPosterPath");
  var favoriteVideostitle = localStorage.getItem("favoriteVideostitle");
  var favoriteVideosDate = localStorage.getItem("favoriteVideosDate");

  if(favoriteVideosPath == null || favoriteVideosPosterPath == null || 
    favoriteVideostitle == null|| favoriteVideosDate == null){


  } else {

    favoriteVideosPath = JSON.parse(favoriteVideosPath);
    favoriteVideosPosterPath = JSON.parse(favoriteVideosPosterPath);
    favoriteVideostitle = JSON.parse(favoriteVideostitle);
    favoriteVideosDate = JSON.parse(favoriteVideosDate);

    console.log("OLD favoriteVideosPath");
    console.log(favoriteVideosPath);

    for(j=0; j < Object.keys(favoriteVideosPath).length; j++){

      this_path = favoriteVideosPath[j];
      this_poster_path = favoriteVideosPosterPath[j];
      this_title = favoriteVideostitle[j];
      this_date = favoriteVideosDate[j];

      if(UrlExists(this_path) != true || UrlExists(this_poster_path) != true){
        console.log("500 - " + this_title);
        favoriteVideosPath.splice(j, 1);
        favoriteVideosPosterPath.splice(j, 1);
        favoriteVideostitle.splice(j, 1);
        favoriteVideosDate.splice(j, 1);
      
      }

    }
      localStorage.setItem("favoriteVideosPath", JSON.stringify(favoriteVideosPath));
      localStorage.setItem("favoriteVideosPosterPath", JSON.stringify(favoriteVideosPosterPath));
      localStorage.setItem("favoriteVideostitle", JSON.stringify(favoriteVideostitle));
      localStorage.setItem("favoriteVideosDate", JSON.stringify(favoriteVideosDate));

      console.log("NEW favoriteVideosPath");
      console.log(favoriteVideosPath);
  }

}

function addToAudiosFavortiesOrNot(){

  var partofaudiocurr = document.getElementById("part_of_audios").value.toString();
  var x = document.getElementById("audio_player").src;
  console.log("partofaudiocurr : " + partofaudiocurr);
  console.log("x : " + x);
  if(partofaudiocurr.trim() == "1"){

    removeFavoriteAudios(x);
  } else {
    addToAudiosFavorties(x);
  }


}

function setCurrentAudioToPlayer(x){

  old_audio = document.getElementById("audio_player").src;

document.getElementById('progress-bar').addEventListener('click', function (e) {
    var x = e.pageX - this.offsetLeft, // or e.offsetX (less support, though)
        y = e.pageY - this.offsetTop,  // or e.offsetY
        clickedValue_percentage = Math.ceil(x * this.max / this.offsetWidth);
        clickedValue_decimal = clickedValue_percentage/100;
        //console.log(x, y);
        song = document.getElementById("audio_player");
        duration = song.duration;
        current_audio_seek_time = Math.ceil(clickedValue_decimal * duration);

        console.log("song duration : " + duration);
        console.log("clickedValue_percentage : " + clickedValue_percentage + "%");
        console.log("clickedValue_decimal : " + clickedValue_decimal);
        console.log("current_audio_seek_time : " + current_audio_seek_time);
        audio_player = document.getElementById("audio_player");
        audio_player.play();
        document.getElementById("play_icon").style.display = "none";
        document.getElementById("pause_icon").style.display = "";

        audio_player.addEventListener('timeupdate', updateProgressBar, false);
        audio_player.addEventListener('ended', pauseAudio, false);
        audio_player.currentTime = current_audio_seek_time; // jumps to 29th secs
        e.value = current_audio_seek_time;
});



  poster_path = x.getAttribute("data-posterpath");
  audio_path = x.getAttribute("data-audiopath");
  audio_title = x.getAttribute("data-audiotitle");
  audio_date = x.getAttribute("data-audiodate");
  console.log("audio_title : " + audio_title);
  document.getElementById("audio_player_title").innerHTML = audio_title;
  var dl_aud_plyr_titl = document.getElementById("audio_player_title2");

  if(dl_aud_plyr_titl != null && dl_aud_plyr_titl != undefined){

    dl_aud_plyr_titl.innerHTML = audio_title;
  }

  var partofaudio = checkIfAudioExistsInFavorites(audio_path);
  document.getElementById("part_of_audios").value = partofaudio;
  //console.log("part_of_audios INPUT" + document.getElementById("part_of_audios").value);

  if( partofaudio == 0){
    document.getElementById("fav_audio_icon").style.color = "white";
  } else {
    document.getElementById("fav_audio_icon").style.color = "red";
  }

/*
    if(document.getElementById("fav_audio_icon") != null){

      if( partofaudio == 0){
        document.getElementById("fav_audio_icon").style.color = "white";
      } else {
        document.getElementById("fav_audio_icon").style.color = "red";
      }

    }

*/


  if(old_audio.trim() == audio_path.trim()){

      //document.getElementById('audio_player').play();

  } else {

  
      var progressBar  = document.getElementById('progress-bar');
      progressBar.value = 0;  

      document.getElementById('play_icon').style.display='';
      document.getElementById('pause_icon').style.display='none';

      if(poster_path ==  null || poster_path == undefined || poster_path.trim() == ""  || poster_path.trim() == "http://app.dannydoku.com"){

        document.getElementById("audio_player_img").src = "img/poster.jpg";

      } else {

        document.getElementById("audio_player_img").src = poster_path;

      }

        document.getElementById("audio_player").src = audio_path;

        document.getElementById("this_posterpath").value = poster_path;
        document.getElementById("this_audiopath").value = audio_path;
        document.getElementById("this_audiotitle").value = audio_title;
        document.getElementById("this_audiodate").value = audio_date;


  }
}

function playAudio(){

  document.getElementById('audio_player').play();
  document.getElementById('play_icon').style.display='none';
  document.getElementById('pause_icon').style.display='';
  console.log("audio_player.src : " + audio_player.src);
  audio_player.addEventListener('timeupdate', updateProgressBar, false);
  audio_player.addEventListener('ended', pauseAudio, false);

}

function pauseAudio(){
  document.getElementById('audio_player').pause();
  document.getElementById('pause_icon').style.display='none';
  document.getElementById('play_icon').style.display='';
}

function loadMoreContentBelow(){
  
    fetchNews(current_page, "");

}
// Update the progress bar
function updateProgressBar() {

  var progressBar  = document.getElementById('progress-bar');
  // Work out how much of the media has played via the duration and currentTime parameters
  var percentage = Math.floor((100 / audio_player.duration) * audio_player.currentTime);
  // Update the progress bar's value
  console.log(percentage);
  if(percentage >= 0 || percentage <= 100){

    progressBar.value = percentage;
    // Update the progress bar's text (for browsers that don't support the progress element)
    progressBar.innerHTML = progressBar.title = percentage + '% played';

  }
}

function openDownloadedFile(x){

  var fileName = x.getAttribute("data-audiopath");
  var mimetype = x.getAttribute("data-mime").trim();

  var filenamelength = fileName.length;
  fileName = fileName.substring(29, filenamelength);
  fileName = '/storage/emulated/0/Download/' + fileName;
  if(mimetype != "audio/mpeg"){
    var ext_var = filenamelength - 3;
    ext = fileName.substring(ext_var, filenamelength);
    //console.log("ext : " + ext);
    if(ext.trim() != "mp4"){
      mimetype = "video/x-" + ext;
    } else {
      mimetype = "video/" + ext;
    }
  }
  console.log("fileName : " + fileName);
  console.log("mimetype : " + mimetype);


  cordova.plugins.fileOpener2.open(
      fileName, // You can also use a Cordova-style file uri: cdvfile://localhost/persistent/Download/starwars.pdf
      mimetype, 
      { 
          error : function(e) { 

                app.dialog.alert("Error", e.message);
              //alert('Error status: ' + e.status + ' - Error message: ' + e.message);
          },
          success : function () {
              //alert('file opened successfully');        
          }
      }
  );


}


function sendResetCode() {

    var disForgotPhone = document.getElementById("forgot_phone").value;
    var disForgotEmail = document.getElementById("forgot_email").value;

var toastBottom = app.toast.create({
  text: 'All Fields Must Be Completed',
  closeTimeout: 2000,
});

var toastConnectionError = app.toast.create({
  text: 'Something went awry',
  closeTimeout: 2000,
});


    if(disForgotPhone.trim() == "" || disForgotEmail.trim() == ""){

        toastBottom.open();

    } else if (disForgotPhone.trim() != "" && disForgotEmail.trim() != ""){

       var url_real = CONFIG + "inc/forgot.php";

       var loginData = {
          forgot_phone : disForgotPhone,
          forgot_email : disForgotEmail
      };

      console.log("loginData");
      console.log(loginData);

      app.preloader.show();

        app.request({
          url: url_real,
          type: "POST",
          data: loginData,
          success: function(response){
          
              console.log("response");
              console.log(response);
              var loginResponse = JSON.parse(response);

              if(loginResponse["status"] == "yes"){
                reset_system_id = loginResponse["sys_id"];
                $('#forgot_next_step').append('<a id="success_forgot" style="display : none;" href="/reset/">success</a>');
                app.preloader.hide();
                current_page = "audios_option";
                $('#success_forgot').click();

              } else {

                var this_message = loginResponse["error"];
                var toastError = app.toast.create({
                  text: this_message,
                  closeTimeout: 2000,
                });
                toastError.open();

              }
              app.preloader.hide();

          },

          error: function(XMLHttpRequest, textStatus, errorThrown) {

                var this_message = "Something went awry";
                var toastError = app.toast.create({
                  text: this_message,
                  closeTimeout: 2000,
                });
                toastError.open();
              app.preloader.hide();
          }
        });

    } else {


      app.dialog.alert("Something went awry", "Error");

    }


}

function resetPassword() {

    var disResetCode = document.getElementById("reset_code").value;
    var disResetPassword = document.getElementById("reset_password").value;
    var disResetRetypedPassword = document.getElementById("reset_password_repeat").value;

var toastBottom = app.toast.create({
  text: 'All Fields Must Be Completed',
  closeTimeout: 2000,
});

var toastBottom1 = app.toast.create({
  text: 'Insufficient reset information. Please restart the process to get a new reset code',
  closeTimeout: 4000,
});

var toastBottom2 = app.toast.create({
  text: 'Passwords do not match',
  closeTimeout: 2000,
});

var toastConnectionError = app.toast.create({
  text: 'Something went awry',
  closeTimeout: 2000,
});

    if(reset_system_id.trim() == ""){

        toastBottom1.open();

    } else if(disResetCode.trim() == "" || disResetPassword.trim() == "" || disResetRetypedPassword.trim() == ""){

        toastBottom.open();

    }  else if(disResetPassword.trim() != disResetRetypedPassword.trim()){

        toastBottom2.open();

    } else if (reset_system_id.trim() != "" && disResetCode.trim() != "" && disResetPassword.trim() != "" 
      && disResetRetypedPassword.trim() != "" && disResetPassword.trim() == disResetRetypedPassword.trim()){

       var url_real = CONFIG + "inc/reset.php";

       var loginData = {
          reset_sys_id : reset_system_id,
          reset_code : disResetCode,
          reset_new_password : disResetPassword
      };

      console.log("loginData");
      console.log(loginData);

      app.preloader.show();

        app.request({
          url: url_real,
          type: "POST",
          data: loginData,
          success: function(response){
          
              console.log("response");
              console.log(response);
              var loginResponse = JSON.parse(response);

              if(loginResponse["status"] == "yes"){

                $('#reset_next_step').append('<a id="success_reset" style="display : none;" href="/login/">success</a>');
                app.preloader.hide();
                $('#success_reset').click();

              } else {

                var this_message = loginResponse["error"];
                var toastError = app.toast.create({
                  text: this_message,
                  closeTimeout: 2000,
                });
                toastError.open();

              }
              app.preloader.hide();

          },

          error: function(XMLHttpRequest, textStatus, errorThrown) {

                var this_message = "Something went awry";
                var toastError = app.toast.create({
                  text: this_message,
                  closeTimeout: 2000,
                });
                toastError.open();
              app.preloader.hide();
          }
        });

    } else {


      app.dialog.alert("Something went awry", "Error");

    }


}


/*********************************************************************************************************************************

                                                                  FUNCTIONS END 

 /******************************************************************************************************************************/

checkIfSignedIn();
signMeOut();

if(current_page == "videos_option" || current_page == "audios_option" || 
  current_page == "favorites_audio"   ||  current_page == "favorites_videos"  ){

  fetchNews(current_page, "");
  console.log("About to remove");
  removeDeletedFavoritesVideos();
  removeDeletedFavoritesAudios();

}


$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() == $(document).height()) {
       //alert("bottom!");
   }
});

/*
var songs = ['Yellow Submarine', 'Dont Stop Me Now', 'Billie Jean', 'Californication'];
var authors = ['Beatles', 'Queen', 'Michael Jackson', 'Red Hot Chili Peppers'];
// Pull to refresh content
var $ptrContent = $('.ptr-content');
// Add 'refresh' listener on it
$ptrContent.on('ptr:refresh', function (e) {
  // Emulate 2s loading
  setTimeout(function () {
    var picURL = 'http://lorempixel.com/88/88/abstract/' + Math.round(Math.random() * 10);
    var song = songs[Math.floor(Math.random() * songs.length)];
    var author = authors[Math.floor(Math.random() * authors.length)];
    var itemHTML =
      '<li class="item-content">' +
        '<div class="item-media"><img src="' + picURL + '" width="44"/></div>' +
        '<div class="item-inner">' +
          '<div class="item-title-row">' +
            '<div class="item-title">' + song + '</div>' +
          '</div>' +
          '<div class="item-subtitle">' + author + '</div>' +
        '</div>' +
      '</li>';
    // Prepend new list element
    $ptrContent.find('ul').prepend(itemHTML);
    // When loading done, we need to reset it
    app.ptr.done(); // or e.detail();
  }, 2000);
});

*/

