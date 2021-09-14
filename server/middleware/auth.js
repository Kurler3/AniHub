import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        // Verify if the user is really who he claims to be
        const token = req.headers.authorization.split(" ")[1];

        // Data that I want to get from the token
        let decodedData;

        if(token){

            // Gives the data from the token
            decodedData = jwt.verify(token, 'test');
            // Now we know which user is logged in

            req.userId = decodedData?.id;        
        } 
        // Passes the action onto the next thing
        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;