import $$ from 'dom7';
import Framework7 from './framework7-custom.js';

// Import F7 Styles
import '../css/framework7-custom.less';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/custom-fonts.css';
import '../css/app.less';

// Import Cordova APIs
import cordovaApp from './cordova-app.js';

// Import Routes
import routes from './routes.js';

//APP Configurations File
import appConfig from './app-config.js';

//APP Core Functionality File
import cordovaAddon from './cordova-addon.js';

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
}
var app = new Framework7({
  root: '#app', // App root element
  id: appConfig.app_id, // App bundle ID
  name: appConfig.app_name, // App name
  web_url: appConfig.web_url, //APP API URL site(Jobcareer Theme installed)

  // App root data
  data: function () {
    return {
    };
  },
  // App root methods
  methods: {
    //Shortlisting Method for the Job listings
    shortlistJob: function (thisObj, app, isTransition = 'true') {
      var job_id = thisObj.data('job_id');
      var is_loggedin = localStorage.getItem("is_loggedin");

      if (is_loggedin == 'true') {
        app.request.post(app.params.API_URL + '/mark_favourite', { 'user_id': 6, 'job_id': job_id }, (data) => {
          var data = JSON.parse(data);
          if (data.status == true) {
            localStorage.setItem("reLoadTab_joblistingsID", 'true');

            var total_shortlisted = parseInt($$('.myjobs-tabs .badge').html());
            total_shortlisted = parseInt(total_shortlisted) + 1;
            $$('.myjobs-tabs .badge').html(total_shortlisted);


            //Saving into User Shortlisted Storage
            var user_shortlisted = localStorage.getItem("user_shortlisted");
            user_shortlisted = (user_shortlisted == null) ? [] : JSON.parse(user_shortlisted);
            user_shortlisted.push(job_id);
            localStorage.setItem("user_shortlisted", JSON.stringify(user_shortlisted));


            //Shortlist Animation

            thisObj.html('<i class="icon f7-icons">heart_fill</i>');
            thisObj.addClass('active');

            if (isTransition == 'true') {
              /* list to my Job Transition Function Start */
              var item_data_layout = thisObj.closest('li');
              var tab_badge_postion = $$("#joblistingsIDTab");
              if (item_data_layout) {
                var item_data_layout_clone = item_data_layout;
                $$(item_data_layout_clone).insertBefore($$(thisObj.closest('li')));
                $$(item_data_layout_clone).css({
                  'position': 'relative',
                  'transition': 'all 1s ease',
                  'z-index': '5004'
                });
                $$(item_data_layout_clone).offset({
                  top: item_data_layout_clone.offset().top + 100,
                  left: item_data_layout_clone.offset().left - 100
                });
                $$(item_data_layout_clone).animate({
                  'top': tab_badge_postion.offset().top + 100,
                  'left': tab_badge_postion.offset().left - 100,
                }, 1000, 'easeInOutExpo');
                setTimeout(function () {
                  tab_badge_postion.addClass("active");
                }, 100);
                tab_badge_postion.removeClass("active");
                setTimeout(function () {
                  $$(item_data_layout_clone).addClass("moveblaster");
                }, 300);

              }
              /* list to my Job Transition Function End */
              setTimeout(() => {
                thisObj.closest('li').remove();
              }, 1250);
            }

          }
        });
      } else {
        var shortlisted_jobs = localStorage.getItem("shortlisted_jobs");
        shortlisted_jobs = (shortlisted_jobs == null) ? [] : JSON.parse(shortlisted_jobs);

        //Inserting into array
        shortlisted_jobs.push(job_id);
        //Saving in storage
        localStorage.setItem("shortlisted_jobs", JSON.stringify(shortlisted_jobs));

        //Saving into User Shortlisted Storage
        var user_shortlisted = localStorage.getItem("user_shortlisted");
        user_shortlisted = (user_shortlisted == null) ? [] : JSON.parse(user_shortlisted);
        user_shortlisted.push(job_id);
        localStorage.setItem("user_shortlisted", JSON.stringify(user_shortlisted));


        localStorage.setItem("reLoadTab_joblistingsID", 'true');
        thisObj.html('<i class="icon f7-icons">heart_fill</i>');
        thisObj.addClass('active');

        if (isTransition == 'true') {
          /* list to my Job Transition Function Start */
          var item_data_layout = thisObj.closest('li');
          var tab_badge_postion = $$("#joblistingsIDTab");
          if (item_data_layout) {
            var item_data_layout_clone = item_data_layout;
            $$(item_data_layout_clone).insertBefore($$(thisObj.closest('li')));
            $$(item_data_layout_clone).css({
              'position': 'relative',
              'transition': 'all 1s ease',
              'z-index': '5004'
            });
            $$(item_data_layout_clone).offset({
              top: item_data_layout_clone.offset().top + 100,
              left: item_data_layout_clone.offset().left - 100
            });
            $$(item_data_layout_clone).animate({
              'top': tab_badge_postion.offset().top + 100,
              'left': tab_badge_postion.offset().left - 100,
            }, 1000, 'easeInOutExpo');
            setTimeout(function () {
              tab_badge_postion.addClass("active");
            }, 100);
            tab_badge_postion.removeClass("active");
            setTimeout(function () {
              $$(item_data_layout_clone).addClass("moveblaster");
            }, 300);

          }
          /* list to my Job Transition Function End */
          setTimeout(() => {
            thisObj.closest('li').remove();
          }, 1250);
        }

        var total_shortlisted = parseInt($$('.myjobs-tabs .badge').html());
        total_shortlisted = parseInt(total_shortlisted) + 1;
        $$('.myjobs-tabs .badge').html(total_shortlisted);
      }
    },
  },
  // App routes
  routes: routes,
  // Enable panel left visibility breakpoint
  panel: {
    leftBreakpoint: 960,
  },
  // Input settings
  input: {
    scrollIntoViewOnFocus: Framework7.device.cordova && !Framework7.device.electron,
    scrollIntoViewCentered: Framework7.device.cordova && !Framework7.device.electron,
  },
  // Cordova Statusbar settings
  statusbar: {
    overlay: Framework7.device.cordova && Framework7.device.ios || 'auto',
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
    androidTextColor: "white",
    androidBackgroundColor: "#0047ae",
  },
  on: {
    init: function () {
      var f7 = this;
      cordovaAddon(f7);
      var reload_data = 'false';
      f7.request.get(f7.params.API_URL + '/app_configuration', (data) => {
        var dataObj = JSON.parse(data);
        dataObj = dataObj.data;
        reload_data = dataObj.reload_data;
        reload_data = 'true';
        if (reload_data == 'true') {
          localStorage.setItem('app_config', JSON.stringify(dataObj));
        }
        if (localStorage.getItem("app_strings") == '' || localStorage.getItem("app_strings") == undefined || localStorage.getItem("app_strings") == null) {
          localStorage.setItem('app_strings', JSON.stringify(dataObj.app_strings));
          localStorage.setItem('app_config', JSON.stringify(dataObj));
          window.location.reload(true / false);
        }

      });
      cordovaApp.init(f7);
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }
    },
    pageInit: function (page) {
    }
  },
});


$$('#jobfiltersID').on('tab:show', function (data) {
  var refresh_check = localStorage.getItem("reLoadTab_jobfiltersID");
  if (refresh_check == 'true') {
    app.view[1].router.refreshPage();
    localStorage.removeItem('reLoadTab_jobfiltersID');
  }
});

$$('#joblistingsID').on('tab:show', function (data) {
  var refresh_check = localStorage.getItem("reLoadTab_joblistingsID");
  if (refresh_check == 'true') {
    app.views.main.router.refreshPage();
    localStorage.removeItem('reLoadTab_joblistingsID');
  }
});


var app_msg = localStorage.getItem('app_msg');
if (app_msg != '') {
  var toastTop = app.toast.create({
    text: app_msg,
    position: 'top',
    closeTimeout: 2000,
  });
  toastTop.open();

  localStorage.setItem('app_msg', '');
}