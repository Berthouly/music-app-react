import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {

  try {

    // récupère le token
    const token = req.headers.authorization;

    // si pas de token
    if (!token) {
      return res.status(401).json({
        error: "Token manquant",
      });
    }

    // vérification token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // sauvegarde user
    req.user = decoded;

    next();

  } catch (err) {

    return res.status(401).json({
      error: "Token invalide",
    });
  }
};

export default authMiddleware;