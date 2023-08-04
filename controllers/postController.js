const unirest = require("unirest");
const postModel = require("../models/postModel");
const { default: axios } = require("axios");
const { post } = require("../routes/route");

exports.uploadPost = async (req, res) => {
  const { title, body } = req.body;
  const { user } = req;
  if (!title || !body) {
    return res.send({
      message: "Please enter all the required filleds",
      success: false,
    });
  }

  const options = {
    method: "GET",
    url: "https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/",
    headers: {
      "X-RapidAPI-Key": process.env.API_KEY,
      "X-RapidAPI-Host": "ip-geolocation-ipwhois-io.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const post = await postModel.create({
      title,
      body,
      location: {
        type: "Point",
        coordinates: [response.data.longitude, response.data.latitude],
      },
      user: user._id,
      Poststatus: "active",
    });
    if (!post) {
      return res.send({ message: "Something went wrong!", success: false });
    }
    return res.send({ message: "Post successfully!", success: true, post });
  } catch (error) {
    return res.send({
      message: "Something went wrong!",
      success: false,
      error,
    });
  }
};

exports.getPost = async (req, res) => {
  const { _id } = req.params;
  const post = await postModel.findOne({ _id });
  if (!post) {
    return res.send({
      message: "Post not found",
      success: false,
    });
  }
  return res.send({
    message: "Post",
    success: true,
    post,
  });
};

exports.deletePosts = async (req, res) => {
  const { _id } = req.params;

  const post = await postModel.findOneAndDelete({ _id });
  if (!post) {
    return res.send({
      message: "Post not found",
      success: false,
    });
  }
  return res.send({
    message: "Post delete successfully!",
    success: true,
  });
};

exports.updatePost = async (req, res) => {
  const { _id } = req.params;
  const post = await postModel.findOneAndUpdate({ _id }, req.body);
  if (!post) {
    return res.send({
      message: "Post not updated!",
      success: false,
    });
  }
  return res.send({
    message: "Post updated successfully!",
    success: true,
  });
};

exports.handlePostStatus = async(req,res) => {
    const{_id} = req.params
    const Poststatus = req.body
    const post = postModel.findByIdAndUpdate({_id}, Poststatus)
    if (!post) {
        return res.send({
          message: "Post status cannot updated!",
          success: false,
        });
      }
      return res.send({
        message: "Post status updated successfully!",
        success: true,
      });
}

exports.checkPostStatus = async(req,res) => {
    const Poststatus = "inactive"
    const post = await postModel.find({Poststatus})
    console.log(post)
    if (!post) {
        return res.send({
          message: "No post found",
          success: false,
        });
      }
      return res.send({
        message: "Active posts!",
        success: true,
        post
      });
}

exports.retrievePost = async (req, res) => {
  const lng = 103.8677444;
  const lat = 1.3553794;
  const maxDistanceInMeters = 1000;
  const result = await postModel
    .find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
          $maxDistance: maxDistanceInMeters,
        },
      },
    })
    .sort("-score");

  res.send(result);
};
