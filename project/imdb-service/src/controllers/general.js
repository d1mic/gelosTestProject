const version = async (_, res) => {
  const version = {
    version: "1.0.0",
  };
  res.json(version);
};

export default { version };
