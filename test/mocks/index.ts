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

const accessToken =
  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJteW5ld3Nub2RlYXBpIiwiaWF0IjoxNTgyMTE0MDE5LCJleHAiOjE2MTM2NTAwMTksImF1ZCI6Ind3dy5leGFtcGxlLmNvbSIsInN1YiI6InRlc3RAZGV2LmNvbSJ9.77A04EStR_nvfvMGyyIKhMs5wc6rlp9DDIQXqXUuCi8";

export { newUser, userObj, accessToken };
