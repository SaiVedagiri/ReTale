(this.webpackJsonpretale=this.webpackJsonpretale||[]).push([[0],{15:function(e,t,s){},16:function(e,t,s){},31:function(e,t,s){},42:function(e,t,s){"use strict";s.r(t);var a=s(1),n=s.n(a),c=s(23),r=s.n(c),i=(s(31),s(24)),o=s(2),l=s(4),d=s.n(l),m=s(8),u=s(9),j=s(10),h=s(12),b=s(11),p=(s(15),s(16),s(17)),f=s.n(p),x=(s(21),s(22),s(0)),g=function(e){Object(h.a)(s,e);var t=Object(b.a)(s);function s(e){var a;return Object(u.a)(this,s),(a=t.call(this,e)).state={email:"",password:"",errorMessage:""},a}return Object(j.a)(s,[{key:"componentDidMount",value:function(){var e=document.createElement("link"),t=document.createElement("link"),s=document.createElement("link");e.rel="stylesheet",e.href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i",t.rel="stylesheet",t.href="https://use.fontawesome.com/releases/v5.12.0/css/all.css",s.rel="stylesheet",s.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",document.body.appendChild(e),document.body.appendChild(t),document.body.appendChild(s),document.body.className="bg-gradient-primary"}},{key:"onSuccess",value:function(){var e=Object(m.a)(d.a.mark((function e(t){var s,a,n,c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(a in s=t.getBasicProfile(),t)void 0!==t[a].access_token&&localStorage.setItem("access_token",t[a].access_token);return e.next=4,fetch("https://retale.saivedagiri.com/googleSignIn",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:s.getEmail(),name:s.getName()})}).catch((function(e){return console.log(e)}));case 4:return n=e.sent,e.next=7,n.json();case 7:c=e.sent,sessionStorage.setItem("firstName",c.firstname),sessionStorage.setItem("lastName",c.lastname),sessionStorage.setItem("email",s.getEmail()),sessionStorage.setItem("userkey",c.userkey),window.location="landing";case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"onFailure",value:function(e){console.log(e)}},{key:"signInEmail",value:function(){var e=Object(m.a)(d.a.mark((function e(t){var s,a,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),s=this.state.email.toLowerCase(),e.next=4,fetch("https://retale.saivedagiri.com/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:s,password:this.state.password})}).catch((function(e){return console.log(e)}));case 4:return a=e.sent,e.next=7,a.json();case 7:"Valid"!=(n=e.sent).data?this.setState({errorMessage:n.data}):(sessionStorage.setItem("email",s),sessionStorage.setItem("firstName",n.firstname),sessionStorage.setItem("lastName",n.lastname),sessionStorage.setItem("userkey",n.id),window.location="landing");case 9:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return Object(x.jsx)("div",{children:Object(x.jsx)("div",{className:"container",children:Object(x.jsx)("div",{className:"row justify-content-center",children:Object(x.jsx)("div",{className:"col-md-9 col-lg-12 col-xl-10",children:Object(x.jsx)("div",{className:"card shadow-lg o-hidden border-0 my-5",children:Object(x.jsx)("div",{className:"card-body p-0",children:Object(x.jsx)("div",{className:"row d-lg-flex justify-content-lg-center",children:Object(x.jsx)("div",{className:"col-lg-10",children:Object(x.jsxs)("div",{className:"p-5",children:[Object(x.jsx)("div",{className:"text-center",children:Object(x.jsx)("h3",{className:"text-dark mb-4",children:"Welcome Back to ReTale!"})}),Object(x.jsxs)("form",{className:"user",children:[Object(x.jsxs)("div",{className:"form-group",children:[Object(x.jsx)("div",{className:"text-center",children:Object(x.jsx)("h4",{className:"text-dark mb-4",children:this.state.errorMessage})}),Object(x.jsx)("input",{className:"form-control form-control-user",type:"email",id:"exampleInputEmail","aria-describedby":"emailHelp",placeholder:"Enter Email Address...",name:"email",onChange:function(t){e.setState({email:t.target.value})}})]}),Object(x.jsx)("div",{className:"form-group",children:Object(x.jsx)("input",{className:"form-control form-control-user",type:"password",id:"exampleInputPassword",placeholder:"Password",name:"password",onChange:function(t){e.setState({password:t.target.value})}})}),Object(x.jsx)("button",{className:"btn btn-primary btn-block text-white btn-user",onClick:this.signInEmail.bind(this),children:"Login"}),Object(x.jsx)("hr",{}),Object(x.jsx)(f.a,{className:"btn btn-primary btn-block text-white btn-user",icon:"false",clientId:"517262660824-uccs409ut0jdvubtn1l4cn0n7cctd8aq.apps.googleusercontent.com",buttonText:"Login with Google",onSuccess:this.onSuccess,onFailure:this.onFailure,cookiePolicy:"single_host_origin",render:function(e){return Object(x.jsxs)("button",{className:"btn btn-primary btn-block text-white btn-google btn-user",onClick:e.onClick,children:[Object(x.jsx)("i",{className:"fab fa-google"}),"\xa0 Login with Google"]})}}),Object(x.jsx)("hr",{})]}),Object(x.jsx)("div",{className:"text-center",children:Object(x.jsx)("a",{className:"small",href:"register",children:"Create an Account!"})})]})})})})})})})})})}}]),s}(n.a.Component),O=function(e){Object(h.a)(s,e);var t=Object(b.a)(s);function s(e){var a;return Object(u.a)(this,s),(a=t.call(this,e)).state={firstName:"",lastName:"",email:"",password:"",confirmPassword:"",errorMessage:""},a}return Object(j.a)(s,[{key:"componentDidMount",value:function(){var e=document.createElement("link"),t=document.createElement("link"),s=document.createElement("link");e.rel="stylesheet",e.href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i",t.rel="stylesheet",t.href="https://use.fontawesome.com/releases/v5.12.0/css/all.css",s.rel="stylesheet",s.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",document.body.appendChild(e),document.body.appendChild(t),document.body.appendChild(s),document.body.className="bg-gradient-primary"}},{key:"onSuccess",value:function(){var e=Object(m.a)(d.a.mark((function e(t){var s,a,n,c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(a in s=t.getBasicProfile(),t)void 0!==t[a].access_token&&localStorage.setItem("access_token",t[a].access_token);return e.next=4,fetch("https://retale.saivedagiri.com/googleSignIn",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:s.getEmail(),name:s.getName()})}).catch((function(e){return console.log(e)}));case 4:return n=e.sent,e.next=7,n.json();case 7:c=e.sent,sessionStorage.setItem("firstName",c.firstname),sessionStorage.setItem("lastName",c.lastname),sessionStorage.setItem("email",s.getEmail()),sessionStorage.setItem("userkey",c.userkey),window.location="landing";case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"onFailure",value:function(e){console.log(e)}},{key:"signUpEmail",value:function(){var e=Object(m.a)(d.a.mark((function e(t){var s,a,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),s=this.state.email.toLowerCase(),e.next=4,fetch("https://retale.saivedagiri.com/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:s,firstname:this.state.firstName,lastname:this.state.lastName,password:this.state.password,passwordconfirm:this.state.confirmPassword})}).catch((function(e){return console.log(e)}));case 4:return a=e.sent,e.next=7,a.json();case 7:"Valid"!=(n=e.sent).data?this.setState({errorMessage:n.data}):(sessionStorage.setItem("firstName",n.firstname),sessionStorage.setItem("lastName",n.lastname),sessionStorage.setItem("email",s),sessionStorage.setItem("userkey",n.id),window.location.href="landing");case 9:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return Object(x.jsx)("div",{children:Object(x.jsx)("div",{className:"container",children:Object(x.jsx)("div",{className:"card shadow-lg o-hidden border-0 my-5",children:Object(x.jsx)("div",{className:"card-body p-0",children:Object(x.jsx)("div",{className:"row d-lg-flex justify-content-lg-center",children:Object(x.jsx)("div",{className:"col-lg-8",children:Object(x.jsxs)("div",{className:"p-5",children:[Object(x.jsx)("div",{className:"text-center",children:Object(x.jsx)("h3",{className:"text-dark mb-4",children:"Create an Account!"})}),Object(x.jsxs)("form",{className:"user",children:[Object(x.jsx)("div",{className:"text-center",children:Object(x.jsx)("h4",{className:"text-dark mb-4",children:this.state.errorMessage})}),Object(x.jsxs)("div",{className:"form-group row",children:[Object(x.jsx)("div",{className:"text-center"}),Object(x.jsx)("div",{className:"col-sm-6 mb-3 mb-sm-0",children:Object(x.jsx)("input",{className:"form-control form-control-user",type:"text",id:"exampleFirstName",placeholder:"First Name",name:"first_name",onChange:function(t){e.setState({firstName:t.target.value})}})}),Object(x.jsx)("div",{className:"col-sm-6",children:Object(x.jsx)("input",{className:"form-control form-control-user",type:"text",id:"exampleFirstName",placeholder:"Last Name",name:"last_name",onChange:function(t){e.setState({lastName:t.target.value})}})})]}),Object(x.jsx)("div",{className:"form-group",children:Object(x.jsx)("input",{className:"form-control form-control-user",type:"email",id:"exampleInputEmail","aria-describedby":"emailHelp",placeholder:"Email Address",name:"email",onChange:function(t){e.setState({email:t.target.value})}})}),Object(x.jsxs)("div",{className:"form-group row",children:[Object(x.jsx)("div",{className:"col-sm-6 mb-3 mb-sm-0",children:Object(x.jsx)("input",{className:"form-control form-control-user",type:"password",id:"examplePasswordInput",placeholder:"Password",name:"password",onChange:function(t){e.setState({password:t.target.value})}})}),Object(x.jsx)("div",{className:"col-sm-6",children:Object(x.jsx)("input",{className:"form-control form-control-user",type:"password",id:"exampleRepeatPasswordInput",placeholder:"Repeat Password",name:"password_repeat",onChange:function(t){e.setState({confirmPassword:t.target.value})}})})]}),Object(x.jsx)("button",{className:"btn btn-primary btn-block text-white btn-user",type:"submit",onClick:this.signUpEmail.bind(this),children:"Register Account"}),Object(x.jsx)("hr",{}),Object(x.jsx)(f.a,{className:"btn btn-primary btn-block text-white btn-user",icon:"false",clientId:"517262660824-uccs409ut0jdvubtn1l4cn0n7cctd8aq.apps.googleusercontent.com",buttonText:"Login with Google",onSuccess:this.onSuccess,onFailure:this.onFailure,cookiePolicy:"single_host_origin",render:function(e){return Object(x.jsxs)("button",{className:"btn btn-primary btn-block text-white btn-google btn-user",onClick:e.onClick,children:[Object(x.jsx)("i",{className:"fab fa-google"}),"\xa0 Register with Google"]})}}),Object(x.jsx)("hr",{})]}),Object(x.jsx)("div",{className:"text-center",children:Object(x.jsx)("a",{className:"small",href:"./",children:"Already have an account? Login!"})})]})})})})})})})}}]),s}(n.a.Component),v=s.p+"static/media/app-logo.8fd419b2.png";var N=function(){return Object(x.jsx)("footer",{className:"bg-white sticky-footer",children:Object(x.jsx)("div",{className:"container my-auto",children:Object(x.jsx)("div",{className:"text-center my-auto copyright",children:Object(x.jsx)("span",{children:"Copyright \xa9 Sai Vedagiri and Shricharan K.S. 2021"})})})})},y=function(e){Object(h.a)(s,e);var t=Object(b.a)(s);function s(e){return Object(u.a)(this,s),t.call(this,e)}return Object(j.a)(s,[{key:"componentDidMount",value:function(){var e=document.createElement("link"),t=document.createElement("link"),s=document.createElement("link");e.rel="stylesheet",e.href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i",t.rel="stylesheet",t.href="https://use.fontawesome.com/releases/v5.12.0/css/all.css",s.rel="stylesheet",s.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",document.body.appendChild(e),document.body.appendChild(t),document.body.appendChild(s)}},{key:"render",value:function(){return Object(x.jsxs)("div",{id:"wrapper",children:[Object(x.jsx)("nav",{className:"navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0 toggled",children:Object(x.jsxs)("div",{className:"container-fluid d-flex flex-column p-0",children:[Object(x.jsxs)("a",{className:"navbar-brand d-flex justify-content-center align-items-center justify-content-lg-center sidebar-brand m-0",href:"#",children:[Object(x.jsx)("div",{className:"sidebar-brand-icon rotate-n-15"}),Object(x.jsx)("img",{src:v,style:{width:"51px"}}),Object(x.jsx)("div",{className:"sidebar-brand-text mx-3"})]}),Object(x.jsx)("hr",{className:"sidebar-divider my-0"}),Object(x.jsxs)("ul",{className:"nav navbar-nav text-light",id:"accordionSidebar",children:[Object(x.jsx)("li",{className:"nav-item",children:Object(x.jsxs)("a",{className:"nav-link",href:"./",children:[Object(x.jsx)("i",{className:"far fa-user-circle"}),Object(x.jsx)("span",{children:"Sign In"})]})}),Object(x.jsx)("li",{className:"nav-item"})]})]})}),Object(x.jsxs)("div",{className:"d-flex flex-column",id:"content-wrapper",children:[Object(x.jsxs)("div",{id:"content",children:[Object(x.jsx)("nav",{className:"navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top",children:Object(x.jsx)("div",{className:"container-fluid",children:Object(x.jsx)("button",{className:"btn btn-link d-md-none rounded-circle mr-3",id:"sidebarToggleTop",type:"button",children:Object(x.jsx)("i",{className:"fas fa-bars"})})})}),Object(x.jsx)("div",{className:"container-fluid",children:Object(x.jsxs)("div",{className:"text-center mt-5",children:[Object(x.jsx)("div",{className:"error mx-auto","data-text":"404",children:Object(x.jsx)("p",{className:"m-0",children:"404"})}),Object(x.jsx)("p",{className:"text-dark mb-5 lead",children:"Page Not Found"}),Object(x.jsx)("p",{className:"text-black-50 mb-0",children:"It looks like you found a glitch in the matrix..."}),Object(x.jsx)("a",{href:"/",children:"\u2190 Back to Login"})]})})]}),Object(x.jsx)(N,{})]}),Object(x.jsx)("a",{className:"border rounded d-inline scroll-to-top",href:"#page-top",children:Object(x.jsx)("i",{className:"fas fa-angle-up"})})]})}}]),s}(n.a.Component),w=function(e){Object(h.a)(s,e);var t=Object(b.a)(s);function s(e){var a;return Object(u.a)(this,s),(a=t.call(this,e)).state={rows:0,columns:0,matrix:[]},a}return Object(j.a)(s,[{key:"componentDidMount",value:function(){var e=document.createElement("link"),t=document.createElement("link"),s=document.createElement("link");e.rel="stylesheet",e.href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i",t.rel="stylesheet",t.href="https://use.fontawesome.com/releases/v5.12.0/css/all.css",s.rel="stylesheet",s.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",document.body.appendChild(e),document.body.appendChild(t),document.body.appendChild(s),this.runChecks()}},{key:"runChecks",value:function(){var e=Object(m.a)(d.a.mark((function e(){var t,s;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://retale.saivedagiri.com/getMap",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userkey:sessionStorage.getItem("userkey")})}).catch((function(e){return console.log(e)}));case 2:return t=e.sent,e.next=5,t.json();case 5:(s=e.sent).error||this.setState({rows:s.rows,columns:s.columns,matrix:s.matrix});case 7:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"signOut",value:function(){sessionStorage.clear(),window.location.href="./"}},{key:"render",value:function(){var e=this;return Object(x.jsx)("div",{id:"page-top",children:Object(x.jsxs)("div",{id:"wrapper",children:[Object(x.jsx)("nav",{className:"navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0 toggled",children:Object(x.jsxs)("div",{className:"container-fluid d-flex flex-column p-0",children:[Object(x.jsxs)("a",{className:"navbar-brand d-flex justify-content-center align-items-center justify-content-lg-center sidebar-brand m-0",href:"#",children:[Object(x.jsx)("div",{className:"sidebar-brand-icon rotate-n-15"}),Object(x.jsx)("img",{src:v,style:{width:"51px"}}),Object(x.jsx)("div",{className:"sidebar-brand-text mx-3"})]}),Object(x.jsx)("hr",{className:"sidebar-divider my-0"}),Object(x.jsxs)("ul",{className:"nav navbar-nav text-light",id:"accordionSidebar",children:[Object(x.jsx)("li",{className:"nav-item",children:Object(x.jsxs)("a",{className:"nav-link",href:"landing",children:[Object(x.jsx)("i",{className:"fas fa-users-cog"}),Object(x.jsx)("span",{children:"Admin View"})]})}),Object(x.jsx)("li",{className:"nav-item",children:Object(x.jsxs)("a",{className:"nav-link signOut",onClick:this.signOut.bind(this),children:[Object(x.jsx)("i",{className:"far fa-user-circle"}),Object(x.jsx)("span",{children:"Sign Out"})]})}),Object(x.jsx)("li",{className:"nav-item"})]})]})}),Object(x.jsxs)("div",{className:"d-flex flex-column",id:"content-wrapper",children:[Object(x.jsx)("div",{id:"content",children:0!=this.state.rows?Object(x.jsxs)("div",{children:[Object(x.jsx)("h1",{children:this.state.rows}),Object(x.jsx)("h1",{children:this.state.columns})]}):Object(x.jsxs)("div",{className:"container-fluid",style:{marginLeft:"35vw",marginTop:"30vh"},children:[Object(x.jsx)("h1",{children:"Initialize your store:"}),Object(x.jsx)("h1",{children:"Rows:"}),Object(x.jsx)("input",{type:"text",id:"rows",onChange:function(t){e.setState({proposedRows:t.target.value})}}),Object(x.jsx)("h1",{children:"Columns:"}),Object(x.jsx)("input",{type:"text",id:"columns",onChange:function(t){e.setState({proposedColumns:t.target.value})}}),Object(x.jsx)("button",{className:"btn-primary",onClick:function(){var t=Object(m.a)(d.a.mark((function t(s){return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://retale.saivedagiri.com/setSize",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userkey:sessionStorage.getItem("userkey"),rows:e.state.proposedRows,columns:e.state.proposedColumns})});case 2:e.setState({rows:e.state.proposedRows}),e.setState({columns:e.state.proposedColumns});case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),children:"Submit"})]})}),Object(x.jsx)(N,{})]}),Object(x.jsx)("a",{className:"border rounded d-inline scroll-to-top",href:"#page-top",children:Object(x.jsx)("i",{className:"fas fa-angle-up"})})]})})}}]),s}(n.a.Component);var k=function(){return Object(x.jsx)("div",{className:"App",children:Object(x.jsx)(i.a,{children:Object(x.jsxs)(o.c,{children:[Object(x.jsx)(o.a,{exact:!0,path:"/",component:g}),Object(x.jsx)(o.a,{exact:!0,path:"/register",component:O}),Object(x.jsx)(o.a,{exact:!0,path:"/landing",component:w}),Object(x.jsx)(o.a,{component:y})]})})})},S=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,43)).then((function(t){var s=t.getCLS,a=t.getFID,n=t.getFCP,c=t.getLCP,r=t.getTTFB;s(e),a(e),n(e),c(e),r(e)}))};r.a.render(Object(x.jsx)(n.a.StrictMode,{children:Object(x.jsx)(k,{})}),document.getElementById("root")),S()}},[[42,1,2]]]);
//# sourceMappingURL=main.afd2a241.chunk.js.map