import moment from "moment";
import {
  GOOGLE_API_KEY,
  GOOGLE_CLIENT_ID,
  CALENDAR_ID,
  SCOPES
} from "./config";

const GOOGLE_API_HOST = "https://www.googleapis.com/calendar/v3";
const gapi = window.gapi;

const eventQueryString = `timeMin=${moment().toISOString()}&timeMax=${moment()
  .add(2, "w")
  .toISOString()}`;

class Api {
  authenticate = () => {
    const init = () =>
      gapi.auth2
        .init({
          apiKey: GOOGLE_API_KEY,
          clientId: GOOGLE_CLIENT_ID,
          scope: SCOPES
        })
        .then(() =>
          gapi.auth2
            .getAuthInstance()
            .signIn()
            .then(all => console.log("all", all))
        );
    return gapi.load("auth2", init);
  };
  getEvents = storeEvents => {
    const start = () =>
      gapi.client
        .init({
          apiKey: GOOGLE_API_KEY,
          clientId: GOOGLE_CLIENT_ID,
          scope: SCOPES
        })
        .then(() =>
          gapi.client
            .request({
              path: `${GOOGLE_API_HOST}/calendars/${CALENDAR_ID}/events?${eventQueryString}`
            })
            .then(response =>
              response.result.items.filter(
                event => event.status !== "cancelled"
              )
            )
            .then(events => {
              const ascByDateTime = (a, b) =>
                moment(a.start.dateTime) - moment(b.start.dateTime);
              storeEvents(events.sort(ascByDateTime));
            })
            .then(() =>
              gapi.client.load("calendar", "v3", () =>
                console.log("Google Calendar loaded")
              )
            )
            .catch(console.error)
        );
    return gapi.load("client:auth2", start);
  };

  deleteDelinquents = () => null;

  deleteEvent = eventId => {
    const request = gapi.client.calendar.events.delete({
      calendarId: CALENDAR_ID,
      eventId: eventId
    });
    return request.execute(res => {
      console.log(res);
      if (!res.error) {
        alert("Booking deleted!");
      } else {
        alert("Not logged in!");
      }
    });
  };
}

export default new Api();
