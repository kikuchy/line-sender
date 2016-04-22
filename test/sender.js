const assert = require("assert");

const Client = require("..");
const END_POINT = "https://example.com/v1/events";
const CHANNEL_ID = "3if983hwefnmdskjfk23";
const CHANNEL_SECRET = "efuihnkrgbi3ruhbi3";
const CHANNEL_MID = "ksdbisf739ghs1hahabscbkgw5ujk78l8";

describe("send", () => {
    const c = Client({
        endPoint: END_POINT,
        channelId: CHANNEL_ID,
        channelSecret: CHANNEL_SECRET,
        channelMid: CHANNEL_MID
    });

    it("should send single text message for single target", (done) => {
        c.sendText({
            to: "123456789",
            text: "hello"
        }).then((response) => {
            done();
        });
    });

    it("should send single text message for multiple target", (done) => {
        c.sendText({
            to: ["123456789", "234567890"],
            text: "hello"
        }).then(() => {
            done();
        });
    });

    /*
    it("should send multiple message for multiple target", (done) => {
        c.send({
            to: ["123456789", "234567890"],
            content: [{
                type: "text",
                text: "hogehoge"
            }, {
                type: "image",
                originalContentUrl: "http://example.com/hoge.jpg",
                previewImageUrl: "http://example.com/hoge_thumb.jpg"
            }]
        }).then(() => {
            done();
        });
    });
    */
});
