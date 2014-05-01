/*! socialmedia | v1.4.1 | Jabran Rafique | MIT | https://github.com/jabranr/socialmedia.js */
/* Global object with unique identifier */
window.Socialmedia = window.Socialmedia || {};


/* Setup SDK sources */

Socialmedia.SDK = {
  facebook: '//connect.facebook.net/en_US/sdk.js',
  facebook_debug: '//connect.facebook.net/en_US/debug/sdk.js',
  twitter: '//platform.twitter.com/widgets.js',
  googleplus: '//apis.google.com/js/platform.js',
  pinterest: '//assets.pinterest.com/js/pinit.js'
};


/* Default popup method */

Socialmedia.Popup = function(url, settings) {
  var options, _popup;
  if (url == null) {
    url = 'about:blank';
  }
  if (settings == null) {
    settings = {};
  }
  options = {
    width: (settings.width != null) && settings.width || 600,
    height: (settings.height != null) && settings.height || 300,
    features: (settings.features != null) && settings.features || ['dialog', 'location', 'dependent'],
    getString: function() {
      var s;
      s = "width=" + this.width + ",height=" + this.height;
      s += ",left=" + ((window.outerWidth / 2) - (this.width / 2));
      s += ",top=" + ((window.outerHeight / 2) - (this.height / 2));
      return s += "," + (this.features.join(','));
    }
  };
  _popup = window.open(url, '_w_' + new Date().getUTCMilliseconds(), options.getString());
  return _popup.focus();
};


/* Global init method */


/* Facebook object */
Socialmedia.Facebook = function(settings) {
  this.appid = (settings.appid != null) && settings.appid || '';
  this.status = (settings.status != null) && settings.status || false;
  this.xfbml = (settings.xfbml != null) && settings.xfbml || true;
  this.cookie = (settings.cookie != null) && settings.cookie || true;
  this.requests = (settings.requests != null) && settings.requests || false;
  this.version = (settings.version != null) && settings.version || 'v2.0';
  this.debug = (settings.debug != null) && settings.debug || false;
  this.init();
};

Socialmedia.Facebook.prototype.init = function() {
  var _this;
  _this = this;
  window.fbAsyncInit = function() {
    FB.init({
      appId: _this.appid,
      status: _this.status,
      cookie: _this.cookie,
      xfbml: _this.xfbml,
      version: _this.version,
      frictionlessRequests: _this.requests
    });

    /* Setup FB SDK script source */
    _this.fbsdk = document.querySelector('#facebook-jssdk');

    /* Append app_id to fbsdk source */
    return _this.fbsdk.src += '#xfbml=1&appId=' + _this.appid;
  };

  /* Move the auto-generated fb-root DOM element to appropriate position */
  if (typeof addEventListener !== "undefined" && addEventListener !== null) {
    window.addEventListener('load', function() {
      return document.body.appendChild(document.getElementById('fb-root'));
    });
  } else if (typeof attachEvent !== "undefined" && attachEvent !== null) {
    window.attachEvent('load', function() {
      return document.body.appendChild(document.getElementById('fb-root'));
    });
  }

  /* Load the Facebook JavaScript SDK */
  return (function(doc, dev, tag, id) {
    var fbdiv, ref, sdk;
    if (doc.getElementById(id)) {
      return;
    }
    sdk = doc.createElement(tag);
    sdk.id = id;
    sdk.async = true;
    sdk.src = dev ? Socialmedia.SDK.facebook_debug : Socialmedia.SDK.facebook;
    fbdiv = doc.createElement('div');
    fbdiv.id = 'fb-root';
    ref = doc.getElementsByTagName(tag)[0];
    ref.parentNode.insertBefore(fbdiv, ref);
    ref.parentNode.insertBefore(sdk, ref);
  })(document, _this.debug, 'script', 'facebook-jssdk');
};


/* Facebook canvas setsize function */

Socialmedia.Facebook.prototype.setSize = function(settings) {
  if ((settings != null) && settings.width || settings.height) {
    return FB.Canvas.setSize({
      width: parseInt(settings.width) || 810,
      height: parseInt(settings.height) || 800
    });
  } else {
    return FB.Canvas.setSize();
  }
};


/* Facebook canvas autogrow function */

Socialmedia.Facebook.prototype.autogrow = function(settings) {
  if (settings == null) {
    settings = true;
  }
  return FB.Canvas.setAutoGrow(settings);
};


/* Facebook canvas scroll function */

Socialmedia.Facebook.prototype.scroll = function(settings) {
  var x, y;
  x = (settings != null) && (settings.x != null) ? settings.x || 0 : void 0;
  y = (settings != null) && (settings.y != null) ? settings.y || 0 : void 0;
  if (x && y) {
    return FB.Canvas.scrollTo(x, y);
  } else {
    return false;
  }
};


/* Facebook share function */

Socialmedia.Facebook.prototype.Share = function(options) {
  return FB.ui({
    method: 'feed',
    name: options && (options.title != null) && options.title || '',
    link: options && (options.link != null) && options.link || '',
    picture: options && (options.image != null) && options.image || '',
    caption: options && (options.caption != null) && options.caption || '',
    description: options && (options.description != null) && options.description || ''
  }, function(response) {
    var _ref, _ref1;
    if (response != null) {
      if (options.onSuccess != null) {
        return (_ref = options.onSuccess) != null ? _ref.call(this, response) : void 0;
      } else if (options.onFail != null) {
        return (_ref1 = options.onFail) != null ? _ref1.call(this, response) : void 0;
      }
    } else {
      return false;
    }
  });
};


/* Facebook invite function */

Socialmedia.Facebook.prototype.Invite = function(options) {
  return FB.ui({
    method: 'apprequests',
    title: options && (options.title != null) && options.title || '',
    message: options && (options.message != null) && options.message || '',
    to: options && (options.to != null) && options.to || [],
    exclude_ids: options && (options.exclude_ids != null) && options.exclude_ids || [],
    max_recipients: options && (options.max_to != null) && options.max_to || 100,
    data: options && (options.data != null) && options.data || {}
  }, function(response) {
    var _ref;
    if (response != null) {
      return (_ref = options.callback) != null ? _ref.call(this, response) : void 0;
    } else {
      return false;
    }
  });
};


/* Facebook add to page tab function */

Socialmedia.Facebook.prototype.AddToPage = function() {
  return FB.ui({
    method: 'pagetab'
  }, function() {});
};


/* Facebook add friend function */

Socialmedia.Facebook.prototype.AddFriend = function(options) {
  return FB.ui({
    method: 'friends',
    id: options && (options.id != null) && options.id || 'jabranr'
  }, function(response) {
    var _ref;
    if (response != null) {
      return (_ref = options.callback) != null ? _ref.call(this, response.action) : void 0;
    } else {
      return false;
    }
  });
};


/* Facebook send function */

Socialmedia.Facebook.prototype.Send = function(options) {
  return FB.ui({
    method: 'send',
    link: (options != null) && (options.link != null) && options.link || window.location.href
  });
};


/* Facebook pay function */

Socialmedia.Facebook.prototype.Pay = function(options) {
  return FB.ui({
    method: 'pay',
    action: 'purchaseitem',
    product: (options != null) && (options.link != null) && options.link || window.location.href
  }, function(data) {
    var _ref;
    if (data != null) {
      return (options != null) && ((_ref = options.callback) != null ? _ref.call(this, data) : void 0);
    } else {
      return false;
    }
  });
};


/* Google+ object */
Socialmedia.GooglePlus = function() {
  this.init();
};


/* Google+ init method */

Socialmedia.GooglePlus.prototype.init = function() {
  var _this;
  _this = this;
  return (function(doc, tag, id) {
    var ref, sdk;
    if (doc.getElementById(id)) {
      return;
    }
    sdk = doc.createElement(tag);
    sdk.async = true;
    sdk.src = Socialmedia.SDK.googleplus;
    sdk.id = id;
    ref = doc.getElementsByTagName(tag)[0];
    ref.parentNode.insertBefore(sdk, ref);
    _this.gpsdk = doc.querySelector('#' + id);
  })(document, 'script', 'gplus-jssdk');
};


/* Google+ share method */

Socialmedia.GooglePlus.prototype.Share = function(options) {
  var data, platformUrl;
  platformUrl = '//plus.google.com/share?';
  data = (options != null) && (options.link != null) && ("url=" + (encodeURIComponent(options.link))) || ("url=" + (encodeURIComponent(window.location.href)));
  data += (options != null) && (options.lang != null) && ("&hl=" + (encodeURIComponent(options.lang))) || "&hl=en";
  return Socialmedia.Popup.apply(this, [platformUrl + data]);
};


/* Pinterest object */
Socialmedia.Pinterest = function() {
  return this.init();
};


/* Pinterest init method */

Socialmedia.Pinterest.prototype.init = function() {
  var _this;
  _this = this;
  return (function(doc, tag, id) {
    var ref, sdk;
    if (doc.getElementById(id)) {
      return;
    }
    sdk = doc.createElement(tag);
    sdk.id = id;
    sdk.async = true;
    sdk.src = Socialmedia.SDK.pinterest;
    ref = doc.getElementsByTagName(tag)[0];
    ref.parentNode.insertBefore(sdk, ref);
    _this.pinsdk = doc.querySelector('#' + id);
  })(document, 'script', 'pinterest-jssdk');
};


/* Pinterest share method */

Socialmedia.Pinterest.prototype.Pinit = function(options) {
  var data, platformUrl;
  platformUrl = '//pinterest.com/pin/create/button/?';
  data = (options != null) && (options.link != null) && ("url=" + (encodeURIComponent(options.link))) || ("url=" + (encodeURIComponent(window.location.href)));
  data += (options != null) && (options.image != null) && ("media=" + (encodeURIComponent(options.image))) || "";
  data += (options != null) && (options.description != null) && ("description=" + (encodeURIComponent(options.description))) || ("description=" + (encodeURIComponent(document.title)));
  return Socialmedia.Popup.apply(this, [
    platformUrl + data, {
      width: 765,
      height: 325
    }
  ]);
};


/* Twitter object */
Socialmedia.Twitter = function() {
  this.init();
};


/* Twitter init method */

Socialmedia.Twitter.prototype.init = function() {
  var _this;
  _this = this;
  return (function(doc, tag, id) {
    var ref, sdk;
    if (doc.getElementById(id)) {
      return;
    }
    sdk = doc.createElement(tag);
    sdk.id = id;
    sdk.async = true;
    sdk.src = Socialmedia.SDK.twitter;
    ref = doc.getElementsByTagName(tag)[0];
    ref.parentNode.insertBefore(sdk, ref);
    _this.twttrsdk = doc.querySelector('#' + id);
  })(document, 'script', 'twitter-wjs');
};


/* Twitter share link method */

Socialmedia.Twitter.prototype.Tweet = function(options) {
  var data, intentShareUrl;
  intentShareUrl = '//twitter.com/intent/tweet?';
  data = (options != null) && options.tweet ? "text=" + (encodeURIComponent(options.tweet)) + " " : "text=" + (encodeURIComponent(document.title)) + " ";
  data += (options != null) && options.hashtag ? "&hashtags=" + (encodeURIComponent(options.hashtag)) + " " : '';
  data += (options != null) && options.recommend ? "&related=" + (encodeURIComponent(options.recommend)) + " " : '';
  data += (options != null) && options.via ? "&via=" + (encodeURIComponent(options.via)) + " " : '';
  data += (options != null) && options.link ? "&url=" + (encodeURIComponent(options.link)) + " " : "&url=" + (encodeURIComponent(window.location.href)) + " ";
  return Socialmedia.Popup.apply(this, [intentShareUrl + data]);
};


/* Twitter Follow method */

Socialmedia.Twitter.prototype.Follow = function(username) {
  var intentFollowUrl;
  if (username == null) {
    username = 'jabranr';
  }
  username.replace(/@/, '');
  intentFollowUrl = '//twitter.com/intent/follow?';
  return Socialmedia.Popup.apply(this, [
    intentFollowUrl + ("screen_name=" + username), {
      width: 700,
      height: 485
    }
  ]);
};


/*
 * Twitter Mention method
 * Supports multiple recommendations separated by commas
 */

Socialmedia.Twitter.prototype.Mention = function(options) {
  var data, intentMentionUrl;
  intentMentionUrl = '//twitter.com/intent/tweet?';
  data = (options != null) && options.username && ("screen_name=" + (encodeURIComponent(options.username.replace(/@/, '')))) || '';
  data += (options != null) && options.recommend && ("&related=" + (encodeURIComponent(options.recommend))) || '';
  data += (options != null) && options.tweet && ("&text=" + (encodeURIComponent(options.tweet))) || '';
  return Socialmedia.Popup.apply(this, [intentMentionUrl + data]);
};


/*
 * Twitter Hashtag method
 * Supports multiple recommendations separated by commas
 */

Socialmedia.Twitter.prototype.Hashtag = function(options) {
  var data, intentHashtagUrl;
  intentHashtagUrl = '//twitter.com/intent/tweet?';
  data = (options != null) && options.hashtag && ("button_hashtag=" + (encodeURIComponent(options.hashtag.replace(/#/, '')))) || '';
  data += (options != null) && options.recommend && ("&related=" + (encodeURIComponent(options.recommend))) || '';
  data += (options != null) && options.tweet && ("&text=" + (encodeURIComponent(options.tweet))) || '';
  data += (options != null) && options.link && ("&url=" + (encodeURIComponent(options.link))) || '';
  return Socialmedia.Popup.apply(this, [intentHashtagUrl + data]);
};