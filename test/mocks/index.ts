const newUser = {
  id: "useruuidtest",
  verified: true,
  filtered: () => ({
    username: "test",
    email: "test@dev.com",
    photo: "http://cdn.com/profile-pic.jpg",
    isAdmin: false,
    verified: true
  }),
  save: async() => newUser,
  validatePassword: () => true,
  createRefreshToken: async() => accessToken,
  getRefreshTokens: async() => [{value: accessToken.split(' ')[1]}],
  createNews: async() => newPost,
  update: async() => newUser
};

const unverifiedUser = {
  id: "useruuidtest",
  filtered: () => ({
    username: "test",
    email: "test@dev.com",
    photo: "http://cdn.com/profile-pic.jpg",
    isAdmin: false,
    verified: false
  }),
  validatePassword: () => true
};

const userObj = {
  username: "test",
  email: "test@dev.com",
  password: "testpassword"
};

const accessToken =
  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJteW5ld3Nub2RlYXBpIiwiaWF0IjoxNTgyMTE0MDE5LCJleHAiOjE2MTM2NTAwMTksImF1ZCI6Ind3dy5leGFtcGxlLmNvbSIsInN1YiI6InRlc3RAZGV2LmNvbSJ9.77A04EStR_nvfvMGyyIKhMs5wc6rlp9DDIQXqXUuCi8";

const newPost = {
  title: "Test post title",
  description: "This is the description",
  content: "Content in this test post is very short",
  tags: ["testing"],
  filtered: () => newPost
  }
export { newUser, userObj, accessToken, unverifiedUser, newPost };
