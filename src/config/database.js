const uri = 'mongodb://localhost/users';

function connect(mongoose) {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    mongoose.connection.on('open', _ => {
        console.log('new connection opened on '+uri);
    });
}

module.exports = connect;