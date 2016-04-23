//index.html
//=====================
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.6&appId=267351013600997";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

<div class="fb-login-button" data-max-rows="1" data-size="medium" data-show-faces="false" data-auto-logout-link="true"></div>

<div class="fb-login-button" data-max-rows="1" data-size="xlarge" data-show-faces="false" data-auto-logout-link="true"></div>
//=====================

FB.getLoginStatus(function(response) {
  if (response.status === 'connected') {
  console.log('success', response);
  var uid = response.authResponse.userID;
  var accessToken = response.authResponse.accessToken;
  } else if (response.status === 'not_authorized') {
  console.log('not auth', response);
  } else {
  console.log('not logged in', response);
  }
});