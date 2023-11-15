const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const { verifyToken, signToken } = require("./middleware");
//commit first from 11.1
//commit second from 11.1
//commit third from 11.1





async function createUri() {
  const mongoServer = await MongoMemoryServer.create();

  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, { dbName: "testingdb" });
}

createUri();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");
const { User, Post } = require("./models");

const port = 8000;

const app = express();
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = new User({
      name,
      email,
      password,
    });

    const data = await user.save();
    return res.status(200).send({
      success: true,
      data,
      message: "User added successfully",
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email, password });

    if (!user) {
      return res.status(200).send({
        success: false,
        message: "User not found",
      });
    }

    const token = signToken(user);

    return res.status(200).send({
      success: true,
      user,
      token,
      message: "User login successfully",
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/profile", verifyToken, async (req, res) => {
  try {
    const { user } = req;

    return res.status(200).send({
      success: true,
      user,
      message: "get profile successfully",
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/create-post", verifyToken, async (req, res) => {
  try {
    const { user } = req;
    const { name, description, image } = req.body;

    let post = new Post({
      userId: user._id,
      name,
      description,
      image,
    });

    const data = await post.save();

    return res.status(200).send({
      success: true,
      data,
      message: "post created successfully",
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/get-aggregate-posts", verifyToken, async (req, res) => {
  try {
    const { user } = req;

    const userPost = await User.aggregate([
      {
        $match: {
          _id: user._id,
          isDeleted: false,
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "userId",
          as: "posts",
        },
      },
    ]);

    if (!userPost.length) {
      return res.status(200).send({
        success: false,
        message: "user not found",
      });
    }

    if (userPost.length && !userPost[0].posts.length) {
      return res.status(200).send({
        success: false,
        message: "please create post",
      });
    }

    return res.status(200).send({
      success: true,
      data: userPost.length && userPost[0].posts,
      message: "Get post successfully",
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});
