const environment = {
    port: parseInt(process.env.PORT) || 8080,
    nodeEnv: process.env.NODE_ENV || 'production',
    saltRounds: parseInt(process.env.SALT_ROUNDS) || 10,
    jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET || 'asdhgfwe3234xvc234ghj4356srdaW123TFSdfs23',
    jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET || 'hjkgpko564089jk09JK09564JLK21SDDGF213nkf',
};

export default environment;
