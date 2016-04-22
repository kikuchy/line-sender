module.exports = function(options) {
    return new Sender(options);
};

const body = require("./body_builder")();
const content = require("./content_builder")();

const ENDPOINT = "https://trialbot-api.line.me/v1/events";

function send(fetch, endpoint, tokens, req) {
    return fetch(endpoint, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "charser": "UTF-8",
            "X-Line-ChannelID": tokens.channelId,
            "X-Line-ChannelSecret": tokens.channelSecret,
            "X-Line-Trusted-User-With-ACL": tokens.channelMid
        },
        body: JSON.stringify(req)
    });
}

function Sender(options) {
    options = options || {};
    if (typeof options === "string") {
        // change endpoint
    }
    this.endpoint = options.endpoint || ENDPOINT;
    this.fetch = options.fetch || require("node-fetch");
    this.tokens = {
        channelId: options.channelId,
        channelSecret: options.channelSecret,
        channelMid: options.channelMid
    }
    return this;
}

Sender.prototype.sendText = function(obj) {
    const req = body.makeBody({
        to: obj.to,
        content: content.makeText(obj.text)
    });
    return send(this.fetch, this.endpoint, this.tokens, req);
};
