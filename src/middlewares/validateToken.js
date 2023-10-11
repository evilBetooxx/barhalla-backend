import jwt from 'jsonwebtoken';

export const authRequired = (req, res, next) => {
    const {token} = req.cookies;
    
    if(!token) return res.status(401).json({message: 'No estás autorizado'})

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if(err) return res.status(401).json({message: 'No estás autorizado'})
        req.user = user;
        console.log(user);
        next();
    })
}