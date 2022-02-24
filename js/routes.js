import $$ from 'dom7';

import HomePage from '../pages/home.f7.html';
import JobDetailPage from '../pages/jobdetail.f7.html';
import JobListingsPage from '../pages/joblistings.f7.html';
import FilterListingScreenPage from '../pages/filterlistingscreen.f7.html';
import AccountSettingsPage from '../pages/accountsettings.f7.html';
import EditProfilePage from '../pages/editprofile.f7.html';
import ResumePage from '../pages/resume.f7.html';
import LoginPage from '../pages/login.f7.html';
import RegistrationPage from '../pages/registration.f7.html';
import ForgetPsswordPage from '../pages/forgetpassword.f7.html';
import ProfileSettingsPage from '../pages/profilesetting.f7.html';
import LocationSettingsPage from '../pages/locationsettings.f7.html';
import BlogMediumPage from '../pages/blogmedium.f7.html';
import BlogDetailPage from '../pages/blogdetail.f7.html';


import NotFoundPage from '../pages/404.f7.html';
import IntroScreenPage from '../pages/introscreen.f7.html';
import MyJobsPage from '../pages/myjobs.f7.html';
import EmployersPage from '../pages/employerslistings.f7.html';
import EmployerDetailPage from '../pages/employerdetail.f7.html';
import EmployerFilterScreenPage from '../pages/filteremployerscreen.f7.html';


var routes = [
  {
    path: '/home/',
    async: function (routeTo, routeFrom, resolve, reject) {
      var active_tab_id = routeTo.query.tab_id;
      active_tab_id = (active_tab_id == undefined) ? 'homeID' : active_tab_id;

      $$('.tab-link').removeClass('tab-link-active');
      $$('.view-init').removeClass('tab-active');

      $$('#' + active_tab_id + 'Tab').addClass('tab-link-active');
      $$('#' + active_tab_id).addClass('tab-active');

      resolve(
        {
          component: HomePage,
        },
      );
    }
  },
  {
    path: '/',
    async: function (routeTo, routeFrom, resolve, reject) {
    }
  },
  {
    path: '/logout/',
    async: function (routeTo, routeFrom, resolve, reject) {
      localStorage.setItem('userID', '');
      localStorage.setItem('userObj', '');
      localStorage.setItem('is_loggedin', 'false');
      localStorage.setItem('app_msg', 'You are successfully Logged out.');
      window.location.reload(true / false);
    }
  },

  {
    path: '/login/',
    async: function (routeTo, routeFrom, resolve, reject) {
      resolve(
        {
          component: LoginPage,
        },
      );
    }
  },
  {
    path: '/registration/',
    async: function (routeTo, routeFrom, resolve, reject) {
      resolve(
        {
          component: RegistrationPage,
        },
      );
    }
  },
  {
    path: '/forgetpassword/',
    component: ForgetPsswordPage,
  },
  {
    path: '/blogmedium/',
    component: BlogMediumPage,
  },
  {
    path: '/blogdetail/:blogID',
    async: function (routeTo, routeFrom, resolve, reject) {
      var blogID = routeTo.params.blogID;
      var router = this;
      var app = router.app;
      app.preloader.show();
      var app_strings = JSON.parse(localStorage.getItem("app_strings"));
      var page_strings = app_strings.job_detail;

      this.app.request.get(app.params.API_URL + '/blog_detail?blog_id=' + blogID, (data) => {
        app.preloader.hide();
        var data = JSON.parse(data);
        var data = data.data;
        resolve(
          {
            component: BlogDetailPage,
          },
          {
            context: {
              blog_id: blogID,
              title: data.title,
              blog_image: data.blog_image,
              comments_count: data.comments_count,
              comments_string: data.comments_string,
              blog_date: data.blog_date,
              blog_content: data.blog_content,
              blog_tags: data.blog_tags,
              author_name: data.author_name,
              author_img: data.author_img,
            },
          }
        );
      });
    }
  },
  {
    path: '/filterlistingscreen/',
    component: FilterListingScreenPage,
  },
  {
    path: '/introscreen/',
    component: IntroScreenPage,
  },
  {
    path: '/resume/',
    //component: ResumePage
    async: function (routeTo, routeFrom, resolve, reject) {
      var router = this;
      var app = router.app;
      app.preloader.show();
      var app_strings = JSON.parse(localStorage.getItem("app_strings"));
      var page_strings = app_strings.cv_builder;
      var userID = localStorage.getItem('userID');

      app.request.get(app.params.API_URL + '/cv_builder?user_id=' + userID, (data) => {
        app.preloader.hide();
        var responseObj = JSON.parse(data);
        var dataObj = responseObj.data;
        resolve(
          {
            component: ResumePage,
          },
          {
            context: {
              title: page_strings.title,
              upload_text: page_strings.upload_text,
              cover_title: page_strings.cover_title,
              cover_placeholder: page_strings.cover_placeholder,
              button_text: page_strings.button_text,

              cv_label: dataObj.label,
              cover_letter: dataObj.cover_letter,
              is_cv_exists: dataObj.is_cv_exists,
            },
          }
        );
      });
    }
  },
  {
    path: '/accountsettings/',
    async: function (routeTo, routeFrom, resolve, reject) {
      var router = this;
      var app = router.app;
      app.preloader.show();
      var app_strings = JSON.parse(localStorage.getItem("app_strings"));
      var page_strings = app_strings.account;
      var userID = localStorage.getItem('userID');
      this.app.request.get(this.app.params.API_URL + '/account_settings_fetching?user_id=' + userID, (data) => {
        var dataObj = JSON.parse(data);
        var dataObj = dataObj.data;
        app.preloader.hide();
        resolve(
          {
            component: AccountSettingsPage,
          },
          {
            context: {
              title: page_strings.title,
              email: page_strings.email,
              email_placeholder: page_strings.email_placeholder,
              str_password: page_strings.password,
              password_placeholder: page_strings.password_placeholder,
              confirm_pass: page_strings.confirm_pass,
              confirm_pass_placeholder: page_strings.confirm_pass_placeholder,
              button_text: page_strings.button_text,

              email_address: dataObj.user_email,
            },
          }
        );
      });
    }
  },
  {
    path: '/editprofile/',
    async: function (routeTo, routeFrom, resolve, reject) {
      var router = this;
      var app = router.app;
      app.preloader.show();
      var app_strings = JSON.parse(localStorage.getItem("app_strings"));
      var page_strings = app_strings.presonal;

      var userID = localStorage.getItem('userID');
      this.app.request.get(this.app.params.API_URL + '/user_profile_data?user_id=' + userID, (data) => {
        var dataObj = JSON.parse(data);
        var dataObj = dataObj.data;
        app.preloader.hide();
        resolve(
          {
            component: EditProfilePage,
          },
          {
            context: {
              title: page_strings.title,
              full_name_str: page_strings.full_nmae,
              full_name_placeholder: page_strings.full_name_placeholder,
              job_title_str: page_strings.job_title,
              job_title_placeholder: page_strings.job_title_placeholder,
              minim_salary: page_strings.minim_salary,
              minim_salary_placeholder: page_strings.minim_salary_placeholder,
              phone: page_strings.phone,
              phone_placeholder: page_strings.phone_placeholder,
              specialisms: page_strings.specialisms,
              button_text: page_strings.button_text,

              full_name: dataObj.full_name,
              job_title: dataObj.job_title,
              minimum_salary: dataObj.minimum_salary,
              phone_number: dataObj.phone_number,
              specialisms_list: dataObj.specialisms_list,
              user_specialisms: dataObj.specialisms,
              dataObj: dataObj,
            },
          }
        );
      });
    }
  },
  {
    path: '/joblistings/',
    component: JobListingsPage,
  },
  {
    path: '/employerslisting/',
    component: EmployersPage,
  },
  {
    path: '/filteremployerscreen/',
    component: EmployerFilterScreenPage,
  },
  {
    path: '/myjobs/',
    //component: MyJobsPage,
    async: function (routeTo, routeFrom, resolve, reject) {
      var is_loggedin = localStorage.getItem("is_loggedin");
      if (is_loggedin == 'true') {
        resolve(
          // How and what to load: template
          {
            component: MyJobsPage
          },
        );
      } else {
        resolve(
          // How and what to load: template
          {
            component: MyJobsPage
          },
        );
      }
    }
  },
  {
    path: '/profilesetting/',
    async: function (routeTo, routeFrom, resolve, reject) {
      var is_loggedin = localStorage.getItem("is_loggedin");
      if (is_loggedin == 'true') {
        var userID = localStorage.getItem('userID');

        this.app.methods.apiCall('get', '/user_settings?user_id=' + userID, {}, (data) => {
          var dataObj = data.data;
          resolve(
            {
              component: ProfileSettingsPage,
            },
            {
              context: {
                user_image_src: dataObj.user_img,
                user_full_name: dataObj.user_full_name,
                user_email: dataObj.user_email,
                allow_search: dataObj.allow_search,
              },
            }
          );
        });
      } else {
        resolve(
          // How and what to load: template
          {
            component: LoginPage
          },
        );
      }
    }
  },
  {
    path: '/locationsettings/',
    async: function (routeTo, routeFrom, resolve, reject) {
      var router = this;
      var app = router.app;
      app.preloader.show();
      var app_strings = JSON.parse(localStorage.getItem("app_strings"));
      var page_strings = app_strings.location;
      var userID = localStorage.getItem('userID');

      this.app.request.get(this.app.params.API_URL + '/user_location?user_id=' + userID, (data) => {
        var dataObj = JSON.parse(data);
        var dataObj = dataObj.data;
        app.preloader.hide();
        resolve(
          {
            component: LocationSettingsPage,
          },
          {
            context: {
              title: page_strings.title,
              country: page_strings.country,
              city: page_strings.city,
              address: page_strings.address,
              address_placeholder: page_strings.address_placeholder,
              button_text: page_strings.button_text,

              user_address: dataObj.user_address,
              countries_list: dataObj.countries_list,
              cities_list: dataObj.cities_list,
              user_city: dataObj.user_city,
              user_country: dataObj.user_country,
            },
          }
        );

      });
    }
  },
  {
    path: '/jobDetail/:jobID',
    async: function (routeTo, routeFrom, resolve, reject) {
      var jobID = routeTo.params.jobID;
      var router = this;
      var app = router.app;
      app.preloader.show();
      var app_strings = JSON.parse(localStorage.getItem("app_strings"));
      var page_strings = app_strings.job_detail;

      //Checking already shortlisted Jobs
      var user_shortlisted = localStorage.getItem("user_shortlisted");
      user_shortlisted = (user_shortlisted == null) ? [] : JSON.parse(user_shortlisted);
      var shortlisted_check = user_shortlisted.indexOf(jobID);

      //Viewd Job inset into List
      //localStorage.removeItem("viewed_jobs");
      var viewed_jobs = localStorage.getItem("viewed_jobs");
      viewed_jobs = (viewed_jobs == null) ? [] : JSON.parse(viewed_jobs);
      viewed_jobs.push(jobID);
      localStorage.setItem("viewed_jobs", JSON.stringify(viewed_jobs));
      localStorage.setItem("reLoadTab_joblistingsID", 'true');

      this.app.request.get(app.params.API_URL + '/job_detail?job_id=' + jobID, (data) => {
        app.preloader.hide();
        var data = JSON.parse(data);
        var data = data.data;
        resolve(
          {
            component: JobDetailPage,
          },
          {
            context: {
              overview_str: page_strings.overview,
              apply_btn_text: page_strings.apply_btn_text,

              job_id: jobID,
              job_title: data.job_title,
              company_name: data.company_name,
              company_logo: data.company_logo,
              job_posted_date: data.job_posted_date,
              job_description: data.job_description,
              job_location: data.job_location,
              job_type: data.job_type,
              custom_fields: data.cust_fields_list,
              is_shortlisted: (shortlisted_check < 0) ? false : true,
            },
          }
        );
      });
    }
  },

  //Employer Detail
  {
    path: '/employerdetail/:employerID',
    async: function (routeTo, routeFrom, resolve, reject) {
      var employerID = routeTo.params.employerID;
      var router = this;
      var app = router.app;
      app.preloader.show();
      var app_strings = JSON.parse(localStorage.getItem("app_strings"));
      var page_strings = app_strings.employer_detail;
      this.app.request.get(app.params.API_URL + '/employer_details?employer_id=' + employerID, (data) => {
        app.preloader.hide();
        var data = JSON.parse(data);
        var data = data.data;
        resolve(
          {
            component: EmployerDetailPage,
          },
          {
            context: {
              overview_str: page_strings.overview,

              employer_id: employerID,
              company_name: data.company_name,
              employer_address: data.employer_address,
              employer_img: data.employer_img,
              employer_specialisms: data.employer_specialisms,
              employer_description: data.employer_description,
              employer_custom_fields: data.employer_custom_fields,
              employer_jobs: data.employer_jobs,
            },
          }
        );
      });
    }
  },

  {
    path: '/jobdetail/:categoryID/:jobID',
    async: function (routeTo, routeFrom, resolve, reject) {
      var is_loggedin = localStorage.getItem("show_detail");
      var categoryID = routeTo.params.categoryID;
      var stillsaved = 'nothing saved';
      if (categoryID == 2 && is_loggedin == 'true') {

        localStorage.setItem("stillsaved", 'Storage Data Saved');
        resolve(
          {
            component: LoginPage,
          },
          {
            context: {
              stillsaved: stillsaved,
            },
          }
        );
      } else {

        var stillsaved = localStorage.getItem("stillsaved");
        resolve(
          {
            component: JobDetailPage,
          },
          {
            context: {
              stillsaved: stillsaved,
            },
          }
        );
      }
    }
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;



function htmlDecode(input) {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}