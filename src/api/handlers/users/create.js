import Joi from "@hapi/joi";
import bcrypt from "bcryptjs";

const schema = Joi.object({
  username: Joi.string().min(4).max(20).required().messages({
    "string.min": "Username should be more than 4 characters",
    "string.max": "Username should be under 20 characters",
    "string.empty": "Username is required",
    "any.required": "Username is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(4).required().messages({
    "string.min": "Password should be more than 4 characters",
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});

export default async function create(req, res) {
  const { db } = req.state;
  const { email, username, password } = req.body;

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400);
    res.json({
      error: {
        message: error.message,
      },
    });
    return;
  }

  const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
  const passwordHash = await bcrypt.hash(password, salt);

  let user;
  try {
    [user] = await db("users")
      .insert({
        email,
        username,
        password: passwordHash,
      })
      .returning("*");
  } catch (error) {
    if (error.code === "23505") {
      if (error.constraint.endsWith("email_unique")) {
        res.status(400);
        res.json({
          error: {
            message: "Email already used",
          },
        });
        return;
      } else if (error.constraint.endsWith("username_unique")) {
        res.status(400);
        res.json({
          error: {
            message: "Username already used",
          },
        });
        return;
      }
    }

    throw error;
  }

  delete user.password;

  res.json({
    data: user,
  });
}
