import jwt from 'jsonwebtoken';

const jwtToken = async ({user}) => {
    
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '48hr' })
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN, { expiresIn: '14d' })
    
    return {accessToken, refreshToken}
}

export default jwtToken;