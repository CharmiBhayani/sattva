export const helloController = (req, res) => {
  res.send("Hi Charm! From Controller");
};

export const timeController = (req, res) => {
  res.json({
    time: new Date().toISOString()
  });
};

export const poseController = (req, res) => {
  const name = req.params.name;
  res.send("Your pose is: " + name);
};
