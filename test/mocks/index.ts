const newUser = {
  id: "useruuidtest",
  filtered: () => ({
    username: "test",
    email: "test@dev.com",
    photo: "http://cdn.com/profile-pic.jpg",
    isAdmin: false
  })
};

const userObj = {
  username: "test",
  email: "test@dev.com",
  password: "testpassword"
};

export { newUser, userObj };
