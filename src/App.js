import React from "react";
import moment from "moment";

import logo from "./logo.svg";
import "./App.css";
import Api from "./api.js";
import Utils from "./utils.js";

const bookingWindow = 96;

class App extends React.Component {
  constructor() {
    super();
    this.state = { events: [] };
  }

  componentDidMount() {
    Api.authenticate();
    this._getEvents();
  }

  _getEvents = () => {
    Api.getEvents(events =>
      this.setState({ events: events }, () => console.log(this.state.events))
    );
  };

  _addDates = reservations => {
    let output = [];
    const today = moment().format("ddd DD MMM");
    let currentDate = today;
    const addDate = date => output.push({ dateLine: date });
    const formatDate = date => moment(date).format("ddd DD MMM");
    reservations.forEach((reservation, idx) => {
      const first = !idx;
      if (first || formatDate(reservation.start.dateTime) !== currentDate) {
        currentDate = formatDate(reservation.start.dateTime);
        addDate(currentDate);
      }
      output.push(reservation);
    });
    return output;
  };

  _renderEvent = event =>
    event.dateLine ? (
      <p className="date-title">{event.dateLine}</p>
    ) : (
      <div
        onClick={() => {
          console.log(event);
          // Api.deleteEvent(event.id);
        }}
        className={`list-card ${
          moment(event.created).isSameOrAfter(
            moment(event.start.dateTime).subtract(bookingWindow, "hours")
          )
            ? ""
            : "delinquent"
        }`}
      >
        <div className="row">
          <p className="first-row text">{event.summary}</p>
          <p className="first-row text">
            {moment(event.start.dateTime).format("h:mm A")}
          </p>
        </div>
        <div className="row">
          <p className="text">{this._getAttendeeEmail(event)}</p>
        </div>
        <div className="row">
          <p className="text">
            Booked {moment(event.created).format("DD MMM, h:mm A")} ({moment(
              event.start.dateTime
            ).diff(moment(event.created), "hours")}{" "}
            hours early)
          </p>
        </div>
      </div>
    );

  _getAttendeeEmail = event => {
    let output = "< No email >";
    if (event.attendees) {
      event.attendees.forEach(attendee => {
        if (attendee.email !== "jon@montrealoutrigger.com") {
          output = attendee.email;
        }
      });
    }
    return output;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="button" onClick={this._getEvents}>
            Refresh list
          </div>
          <div
            className="button"
            onClick={() => {
              const delinquents = Utils.getAllGunJumpers(this.state.events);
              delinquents.forEach(event => {
                Api.deleteEvent(event.id);
              });
            }}
          >
            Delete Delinquents
          </div>
          <div className="events">
            {this.state.events
              ? this._addDates(this.state.events).map(this._renderEvent)
              : null}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
