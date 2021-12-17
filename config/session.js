// Set User Session
// const MongoStore = connectMongo(session);
// app.use(
//   session({
//     store: new MongoStore({ mongooseConnection: mongoose.connection }),
//     name: SESSION_NAME,
//     secret: SESSION_SECRET,
//     resave: true,
//     rolling: true,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: parseInt(SESSION_MAX_AGE, 10),
//       sameSite: true,
//       httpOnly: true,
//       secure: !NODE_ENV.trim() === 'development'
//     }
//   })
// );
