const NotFoundError = require("../../errors/not-found");
const articlesService = require("./articles.service");

class ArticlesController {
    async getAll(req, res, next) {
      try {
        const articles = await articlesService.getAll();
        res.json(articles);
      } catch (err) {
        next(err);
      }
    }
    async getById(req, res, next) {
      try {
        const id = req.params.id;
        const article = await articlesService.get(id);
        if (!article) {
          throw new NotFoundError();
        }
        res.json(article);
      } catch (err) {
        next(err);
      }
    }
  async create(req, res, next) {
    try {
      const article = await articlesService.create(req.body);
      article.password = undefined;
      req.io.emit("article:create", article);
      res.status(201).json(article);
    } catch (err) {
      next(err);
    }
  }
  async update(req, res, next) {
    try {
      const id = req.params.id;
      const data = req.body;
      const articleModified = await articlesService.update(id, data);
      articleModified.password = undefined;
      res.json(articleModified);
    } catch (err) {
      next(err);
    }
  }
  async delete(req, res, next) {
    try {
      const id = req.params.id;
      await articlesService.delete(id);
      req.io.emit("article:delete", { id });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ArticlesController();