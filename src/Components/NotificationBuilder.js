export const currentTime = () => {
    const date = new Date();
    const getMonth = () => {
      const month = date.getMonth();
      switch (month) {
        case 1:
          return "Jan";
        case 2:
          return "Feb";
        case 3:
          return "Mar";
        case 4:
          return "Apr";
        case 5:
          return "May";
        case 6:
          return "Jun";
        case 7:
          return "Jul";
        case 8:
          return "Aug";
        case 9:
          return "Sep";
        case 10:
          return "Oct";
        case 11:
          return "Nov";
        case 12:
          return "Dec";
        default:
          return null;
      }
    };
    return `${getMonth()} ${date.getDay()}, ${date.getHours()}:${date.getMinutes()}`;
  };
  

  export const setMessage = (type) => {
    switch (type) {
      case "login":
        return "New login to app";
      case "logout":
        return "Logout from app";
      case "add":
        return "Movie added to favourites";
      case "remove":
        return "Movie removed from favourites";
      default:
        return null;
    }
  };


