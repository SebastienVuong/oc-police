(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,function(e,t){e.exports={CALENDAR_ID:"the.test.of.sin@gmail.com",GOOGLE_API_KEY:"AIzaSyAc1DHYVGZTvJ-8M3mRid7IVYJTpZVu-v0",GOOGLE_CLIENT_ID:"498483553295-pkbk9dr14ilmphfnk6cg3t6upj08iln3.apps.googleusercontent.com",SCOPES:"https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events"}},,,,,,function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},,,function(e,t,n){e.exports=n(20)},,,,,,function(e,t,n){},,function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(5),c=n.n(o),i=(n(17),n(3)),s=n(6),l=n(9),u=n(7),d=n(10),m=n(1),f=n.n(m),h=n(8),E=n.n(h),g=(n(19),n(2)),v=window.gapi,p="timeMin=".concat(f()().toISOString(),"&timeMax=").concat(f()().add(2,"w").toISOString()),w=new function e(){Object(i.a)(this,e),this.authenticate=function(){return v.load("auth2",function(){return v.auth2.init({apiKey:g.GOOGLE_API_KEY,clientId:g.GOOGLE_CLIENT_ID,scope:g.SCOPES}).then(function(){return v.auth2.getAuthInstance().signIn().then(function(e){return console.log("all",e)})})})},this.getEvents=function(e){return v.load("client:auth2",function(){return v.client.init({apiKey:g.GOOGLE_API_KEY,clientId:g.GOOGLE_CLIENT_ID,scope:g.SCOPES}).then(function(){return v.client.request({path:"".concat("https://www.googleapis.com/calendar/v3","/calendars/").concat(g.CALENDAR_ID,"/events?").concat(p)}).then(function(e){return e.result.items.filter(function(e){return"cancelled"!==e.status})}).then(function(t){e(t.sort(function(e,t){return f()(e.start.dateTime)-f()(t.start.dateTime)}))}).then(function(){return v.client.load("calendar","v3",function(){return console.log("Google Calendar loaded")})}).catch(console.error)})})},this.deleteDelinquents=function(){return null},this.deleteEvent=function(e){return v.client.calendar.events.delete({calendarId:g.CALENDAR_ID,eventId:e}).execute(function(e){console.log(e),e.error?alert("Not logged in!"):alert("Event deleted!")})}},O=new function e(){Object(i.a)(this,e),this.getAllReservations=function(e){return e},this.getAllGunJumpers=function(e){return e.filter(function(e){return f()(e.created).isBefore(f()(e.start.dateTime).subtract(96,"hours"))})},this.getAllRushHourHoggers=function(e){return e}},A=96,_=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(l.a)(this,Object(u.a)(t).call(this)))._getEvents=function(){w.getEvents(function(t){return e.setState({events:t},function(){return console.log(e.state.events)})})},e._addDates=function(e){var t=[],n=f()().format("ddd DD MMM"),a=function(e){return f()(e).format("ddd DD MMM")};return e.forEach(function(e,r){var o;(!r||a(e.start.dateTime)!==n)&&(n=a(e.start.dateTime),o=n,t.push({dateLine:o})),t.push(e)}),t},e._renderEvent=function(t){return t.dateLine?r.a.createElement("p",{className:"date-title"},t.dateLine):r.a.createElement("div",{onClick:function(){console.log(t)},className:"list-card ".concat(f()(t.created).isSameOrAfter(f()(t.start.dateTime).subtract(A,"hours"))?"":"delinquent")},r.a.createElement("div",{className:"row"},r.a.createElement("p",{className:"first-row text"},t.summary),r.a.createElement("p",{className:"first-row text"},f()(t.start.dateTime).format("h:mm A"))),r.a.createElement("div",{className:"row"},r.a.createElement("p",{className:"text"},e._getAttendeeEmail(t))),r.a.createElement("div",{className:"row"},r.a.createElement("p",{className:"text"},"Booked ",f()(t.created).format("DD MMM, h:mm A")," (",f()(t.start.dateTime).diff(f()(t.created),"hours")," ","hours early)")))},e._getAttendeeEmail=function(e){var t="< No email >";return e.attendees&&e.attendees.forEach(function(e){"jon@montrealoutrigger.com"!==e.email&&(t=e.email)}),t},e.state={events:[]},e}return Object(d.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){w.authenticate(),this._getEvents()}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("img",{src:E.a,className:"App-logo",alt:"logo"}),r.a.createElement("div",{className:"button",onClick:this._getEvents},"Refresh list"),r.a.createElement("div",{className:"button",onClick:function(){O.getAllGunJumpers(e.state.events).forEach(function(e){w.deleteEvent(e.id)})}},"Delete Delinquents"),r.a.createElement("div",{className:"events"},this.state.events?this._addDates(this.state.events).map(this._renderEvent):null)))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(_,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[11,1,2]]]);
//# sourceMappingURL=main.584411bb.chunk.js.map