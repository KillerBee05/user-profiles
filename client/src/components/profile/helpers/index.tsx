// Determines users per page by screen size
export const getPerPage = () => {
    if (window.innerWidth < 900) {
      return 1;
    } else if(window.innerWidth < 1200){
      return 2
    } else {
      return 3;
    }
  };
  