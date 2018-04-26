module.exports = {
    'Google Search Test': function(client) {
        client.url('https://www.google.com.ph');
        return client.pause(10000);
    }
}
