const { Schema, model } = require("mongoose");

const articleSchema = Schema({
  title: String,
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  currentStatus: {
    type: String,
    enum: {
      values: ["draft", "published"],
      message: "{VALUE} inconnue",
    },
  }
});

let Article;

module.exports = Article = model("Article", articleSchema);

/*async function test() {
  const articles = await Article.find().populate({
    path: "user",
    select: "-password",
    match: { name: /ben/i },
  });
  console.log(articles.filter((article) => article.user));
}

test();*/

// async function test() {
//   new Article({
//     'title': 'l\'incroyable histoire de Billy',
//     'content': 'bla bla bla bla bla',
//     'user': '64ff1b9d7d07a55096ac810f',
//     'currentStatus': 'draft'
//   }).save()

// }

// test();