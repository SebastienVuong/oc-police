import moment from "moment";

const bookingWindow = 96;

class Utils {
  getAllReservations = events => events;
  getAllGunJumpers = reservations =>
    reservations.filter(event =>
      moment(event.created).isBefore(
        moment(event.start.dateTime).subtract(bookingWindow, "hours")
      )
    );
  getAllRushHourHoggers = reservations => reservations;
}

export default new Utils();
