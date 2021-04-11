exports.userSignupValidator =(req,res,next)=>{
    req.check('name','name is required').notEmpty();
    req.check('email','Email must be between 3 -32 chanaraters')
        .matches(/.+\@.+\..+/)
        .withMessage('Email must conatin @')
        .islength({
            min:4,
            max:32
        });
        req.check('password','Password is required').notEmpty();
        req.check('password')
        .islength({min:6})
        .withMessage('Password must contain atleast 6 charas')
        .matches(/\d/)
        .withMessage("Password must contain nmber");
        const errors = req.validationErrors();
        if(errors){
            const firstError=errors.map(error=>error.msg)[0];
            return res.status(400).json({error: firstError});
        }
        next();
}