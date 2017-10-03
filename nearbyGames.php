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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
<body class="container-fluid padding_unset body_black">
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
              FB.api('/me?fields=name,email,picture.width(800).height(800)', function(response){
                if(response && !response.error){
                  console.log(response);
                  sendFacebookData(response).then(response=>{processFacebookData(response)}, errorHandler);
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
    <div class="header-scroll row padding_unset">
            <!--header starts here-->
            <div class="col-sm-12 col-md-12">
                <div class="topnav margin_bottom col-sm-12 col-md-12" id="myTopnav">
                    <a href="/" id="home" class="">Home</a>
                    <a href="/profile.html" id="profile" class="">Profile</a>
                    <a href="/about" id="about" class="">About</a>
                    <a href="/blog" id="blog" class="">Blog</a>
                    <a href="/contact_us.html" id="contact" class="">Contact</a>
                </div>
                <!--title and logo-->
                <div class="title_box col-sm-12 col-md-12">
                    <div class="hidden-xs hidden-sm visible-md visible-lg col-md-2">
                        <img class="temp_logo display-inline" src="./imgs/temp logo.png"/>
                    </div>
                    <!--mobile title-->
                    <div class="margin_bottom visible-xs visible-sm hidden-md col-sm-12">
                        <h1 class="font_rg">Board Game Scout</h1>
                        <h3 class ="font_rg">Scroll Down for Game Map and Apply!</h3>
                    </div>
                    <!--desktop title-->
                    <div class="margin_bottom hidden-sm visible-md visible-lg col-md-8">
                        <h1 class="font_lg">Board Game Scout</h1>
                    </div>
                    <!--button_container-->
                    <div class="button_container col-sm-12 col-md-11">
                        <!--facebook_login_button-->
                        <div class="col-sm-12 col-md-2 col-md-offset-10">
                            <!--this was the previous fb button that was not working. kept for comparison purpose-->
                            <!--<fb:login-button class="fb-login-button col-md-1" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="false" scope="public_profile,email,picture" onlogin="checkLoginState();">-->
                            <!--</fb:login-button>-->
                            <!--this button works!!!!!-->
                            <fb:login-button class="fb-login-button col-lg-2 fb_iframe_widget" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="false" scope="public_profile,email" onlogin="checkLoginState();" login_text="
                        " fb-xfbml-state="rendered" fb-iframe-plugin-query="app_id=133764540588384&amp;auto_logout_link=true&amp;button_type=continue_with&amp;container_width=279&amp;locale=en_US&amp;login_text=%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20&amp;max_rows=1&amp;scope=public_profile%2Cemail&amp;sdk=joey&amp;show_faces=false&amp;size=large&amp;use_continue_as=false"><span style="vertical-align: bottom; width: 171px; height: 40px;"><iframe name="f1c8511f428535c" width="1000px" height="1000px" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no" title="fb:login_button Facebook Social Plugin" src="https://www.facebook.com/v2.10/plugins/login_button.php?app_id=133764540588384&amp;auto_logout_link=true&amp;button_type=continue_with&amp;channel=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2FZ2duorNoYeF.js%3Fversion%3D42%23cb%3Df1f0d3420b5872c%26domain%3Ddev.boardgamescout.com%26origin%3Dhttps%253A%252F%252Fdev.boardgamescout.com%252Ff33a7e53affa3fc%26relation%3Dparent.parent&amp;container_width=279&amp;locale=en_US&amp;login_text=%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20&amp;max_rows=1&amp;scope=public_profile%2Cemail&amp;sdk=joey&amp;show_faces=false&amp;size=large&amp;use_continue_as=false" style="border: none; visibility: visible; width: 171px; height: 40px;" class=""></iframe></span></fb:login-button>
                        </div>
                    </div>
                </div>
                    <!--map and info column for DESK-TOP-->
                    <div class="info-and-map col-sm-12 col-md-12">
                        <div class="info-column-div col-sm-12 col-md-2">
                            <h2 class="text-center green">Games Near You:</h2>
                            <div class="gamesContainer column_height col-sm-12 col-md-12">
                                <h2 class="containerTitle">Loading...</h2>
                                <!-- <div class="game col-xs-12">
                                    <div class="gameName truncate col-xs-12" index="0">Monopoly</div>
                                </div> -->
                            </div>
                        </div>
                        <!--mobile info div-->
                        <div class="info-column-div visible-sm visible-xs hidden-md hidden-lg col-xs-12 col-sm-12">
                            <h2 class="text-center green">Games Info:</h2>
                            <div class="eventInfo">
                                <!-- <div class="date col-xs-12">Date: 2017-10-28</div>
                                <div class="time col-xs-12">Time: 5:00 PM</div>
                                <div class="details col-xs-12">Details: experienced players preferred, college students preferred, parking available, food provided</div>
                                <button class="btn btn-success apply" index="0">Apply</button> -->
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-8" id="map"></div>
                        <!--desktop info div-->
                        <div class="info-column-div hidden-sm hidden-xs col-sm-12 col-md-2">
                            <div class="info-column-div column_height col-sm-12 col-md-12">
                                <h1 class="text-center green">Games Info:</h1>
                                <div class="eventInfo">
                                    <!-- <div class="date col-xs-12">Date: 2017-10-28</div>
                                    <div class="time col-xs-12">Time: 5:00 PM</div>
                                    <div class="details col-xs-12">Details: experienced players preferred, college students preferred, parking available, food provided</div>
                                    <button class="btn btn-success apply" index="0">Apply</button> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        <!--footer-->
        <div class="footer col-md-12">
            <!--paypal_button-->
            <div class="col-sm-12 col-md-12">
                <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                    <input type="hidden" name="cmd" value="_s-xclick">
                    <input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----
                    ">
                    <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
                    <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
                </form>
            </div>
        </div>
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