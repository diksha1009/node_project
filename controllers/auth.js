const mysql = require('mysql')
const jwt= require('jsonwebtoken')
const bcrypt= require('bcryptjs');
const e = require('express');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    insecureAuth: true,
    database: process.env.DATABASE
});

exports.login= async(req,res)=>{
    try{
        const {email,password}=req.body;
        
        if(!email || !password){
            return res.status(400).render('login',{
                message:'Please provide an email and password'

            })
        }

        db.query('SELECT * FROM data WHERE Email=?', [email],async(error,result)=>{
            if(!result || !(await bcrypt.compare(password,result[0].Password))){
                res.status(402).render('login',{
                    message:'Email or Password is incorrect'
                })
            }else{
                const id=result[0].id;
                const token=jwt.sign({id}  , process.env.JWT_SECRET, {
                    expiresIn:process.env.JWT_EXPIRES_IN
                });
                
                const cookieOptions={
                    expires:new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 *60 * 1000
                        ),
                        httpOnly: true
                    }
                // const name = result[0].Name;
                res.cookie('jwt',token,cookieOptions);
                res.status(200).redirect('/');



            };
            })

    }catch(error){
        console.log(error)
    }
}

exports.register = (req, res) => {
    console.log(req.body);
    

    const { name, email, password, confirmpassword } = req.body;

    db.query('SELECT Email FROM data WHERE Email=?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.length > 0) {
            return res.render('register', {
                message: 'This email already exists'
            })
        } else if (password !== confirmpassword) {
            return res.render('register', {
                message: 'password do not match'
            })

        }
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword)

        

         db.query(`INSERT INTO data ( Name,Email,Password ) VALUES ('${name}', '${email}', '${hashedPassword}')`,  (error, result) =>{
             if (error) {
                 console.log(error);
             } else { 
                 console.log(result);
                res.render('register', {
                 message: 'User registered successfully'}
                )}

         });
      



    });




}