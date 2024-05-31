import jwt from 'jsonwebtoken';

const jwtToken = async ({user_id, user_name, user_email}) => {
    const user = { user_id, user_name, user_email }
    
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '1hr' })
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN, { expiresIn: '14d' })
    
    return {accessToken, refreshToken}
}

export default jwtToken;