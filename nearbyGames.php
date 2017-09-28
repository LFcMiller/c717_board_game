<html lang="en">
<head>
  <!-- Global Site Tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-106872964-1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments)};
    gtag('js', new Date());

    gtag('config', 'UA-106872964-1');
  </script>
  <script src="https://code.jquery.com/jquery-3.1.0.js"></script>      
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
  <title>Nearby Games</title>
  <link rel="stylesheet" href="style.css">

  <script src="facebook_login.js"></script>

    <?php
    if(isset($_GET['zip'])){
        $current_zip = $_GET['zip'];
        ?>
        <script>
            var currentZip = <?=$current_zip?>;
        </script>

        <?php

    } else {
        ?>
        <script>
            var currentZip = null;
        </script>
        <?php
    }
    ?>

  <script src="nearbyGames.js"></script>

</head>
<body class="body_black">
        <script>
        window.fbAsyncInit = function() {
            FB.init({
                appId            : '133764540588384',
                autoLogAppEvents : true,
                xfbml            : true,
                version          : 'v2.10'
            });

            FB.AppEvents.logPageView();
            FB.getLoginStatus(function(response) {
              console.log(response);
                statusChangeCallback(response);
            });
        };

        function statusChangeCallback(response){
          if(response.status === 'connected'){
            console.log('Logged in and authenticated');
            loggedIn=true;
            testAPI();
          }else{
            console.log('Not authenticated');
            loggedIn=false;
          }
        }

        function checkLoginState(){
          FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
          });
        }

        function testAPI(){
          FB.api('/me?fields=name,email', function(response){
            if(response && !response.error){
              console.log(response);
              sendFacebookData(response);
            }
          });
        }


        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      </script>
    <div class="create_event_background"></div>
    <div class="container-fluid padding_unset">
        <div class="col-md-12">
            <!--header starts here-->
            <div class="margin_bottom margin_top col-sm-12 col-md-12">
                <div class="topnav margin_bottom col-sm-12 col-md-12" id="myTopnav">
                    <a href="#home" class="col-md-3">Home</a>
                    <a href="#about" class="col-md-3">About</a>
                    <a href="#wordPress" class="col-md-3">WordPress</a>
                    <a href="#contact" class="col-md-3">Contact</a>
                </div>
                <!--title and logo-->
                <div class="col-md-12">
                    <div class="hidden-xs hidden-sm visible-md visible-lg col-md-2">
                        <img class="temp_logo display-inline" src="./imgs/temp logo.png"/>
                    </div>
                    <!--mobile title-->
                    <div class="margin_bottom visible-xs visible-sm hidden-md col-sm-12">
                        <h3 class="font_lg">Board Game Scout</h3>
                        <h4 class ="font_md">Meet-up App for Fellow Boarders Near You!</h4>
                    </div>
                    <!--desktop title-->
                    <div class="hidden-sm visible-md visible-lg col-md-8">
                        <h1 class="font_lg">Board Game Scout</h1>
                    </div>
                    <!--button_container-->
                    <div class="button_container col-sm-12 col-md-4 col-md-offset-8">
                        <!--facebook_login_button-->
                        <div class="col-sm-12 col-md-6 col-md-offset-3">
                            <fb:login-button class="fb-login-button col-lg-2" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="false" scope="public_profile,email" onlogin="checkLoginState();">
                        </fb:login-button>
                </div>
            </div>
            <!--map and info column for DESK-TOP-->
            <div class="info-and-map col-sm-12 col-md-12">
                <div class="info-column-div col-sm-12 col-md-2">
                    <div class="gamesContainer column_height col-sm-12 col-md-12">
                        <h1 class="text-center ">Games Near You:</h1>
                        <h2>Sorry, there are currently no games in your area.</h2>
                    </div>
                </div>
                    <div class="col-sm-12 col-md-8 " id="map"></div>
                <div class="info-column-div col-sm-12 col-md-2">
                    <div class="info-column-div column_height col-sm-12 col-md-12">
                        <h1 class="text-center ">Games Info:</h1>
                        <h2>Sorry, there are currently no games in your area.</h2>
                    </div>
                </div>
            </div>
        </div>
        <!--footer-->
        <div class="footer row col-md-12">
            <!--paypal_button-->
            <div class="col-sm-12 col-md-12">
                <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                    <input type="hidden" name="cmd" value="_s-xclick">
                    <input type="hidden" name="hosted_button_id"  value="XGJ7HXQVM8Z64">
                    <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
                    <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
                </form>
            </div>
        </div>
          <script async defer
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDxsAjsSwsaBzaz-xNaLnDUQEjr_BIsiCE&callback=initMap">
          </script>
    </div>
    <div class="shadowBox hidden">
    </div>
    <div class="loginModal hidden">
        <h1 class="modalText">Filler</h1>
    </div>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDxsAjsSwsaBzaz-xNaLnDUQEjr_BIsiCE&callback=initMap">
    </script>
</body>
</html>