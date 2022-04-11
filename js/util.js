// Checking the existence of user data in the database by comparing the username and email
const isUserPresent = (user) => {
  const usersDataList = JSON.parse(localStorage.getItem("usersDataList")) || [];
  return usersDataList.find(
    (userData) =>
      userData.username === user.username || userData.email === user.email
  );
};
