const users = [...Array(30).keys()].map((i) => ({
  id: i + 1,
  username: `User${i + 1}`,
  stats: {
    kill_count: Math.floor(Math.random() * 100),
    death_count: Math.floor(Math.random() * 50),
  },
}));

export default users;
