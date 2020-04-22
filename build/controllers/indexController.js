"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    index(req, res) {
        res.json({ text: "hello desde api" });
    }
}
exports.indexController = new IndexController();
