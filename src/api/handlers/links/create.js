import Joi from "@hapi/joi";

const schema = Joi.object({
  slug: Joi.string().min(6).max(20).messages({
    "string.min": "Slug should be more than 6 characters",
    "string.max": "Slug should be under 20 characters",
    "string.empty": "Slug is required",
    "any.required": "Slug is required",
  }),
  url: Joi.string().uri().required().messages({
    "string.uri": "Please provide a valid URL",
    "string.empty": "URL is required",
    "any.required": "URL is required",
  }),
});

export default async function create(req, res) {
  const { db, user } = req.state;
  const { url } = req.body;

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

  let isSlugUnique = true;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const slug = isSlugUnique
      ? req.body.slug || generateSlug()
      : generateSlug();

    let link;
    try {
      [link] = await db("links")
        .insert({
          slug,
          url,
          user_id: user?.id,
        })
        .returning("*");
    } catch (error) {
      if (error.code === "23505") {
        if (error.constraint.endsWith("slug_unique")) {
          isSlugUnique = false;
          continue;
        }
      }

      throw error;
    }

    res.json({
      data: link,
    });
    return;
  }
}

function generateSlug() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let result = "";
  for (var i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}
