const assert = require("assert");

const Builder = require("../lib/body_builder");

describe("body builder", () => {
    const builder = Builder();
    const targetA = "u5912407b444e54885d00111f7b0ce375";
    const targetB = "1qdwd98ybksdjf3ufuqwrf723hw712jbf";
    const textMessage = {
        contentType: 1,
        toType: 1,
        text: "hello from bot"
    };
    const imageMessage = {
        contentType: 2,
        toType: 1,
        originalContentUrl: "https://example.com/large.jpg",
        previewImageUrl: "https://example.com/small.jpg"
    };

    it("should make single text message to single target", () => {
        assert.deepEqual(builder.makeBody({
            to: targetA,
            content: textMessage
        }), {
            to: [targetA],
            toChannel: 1383378250,
            eventType: "138311608800106203",
            content: textMessage
        });
    });

    it("should make single text message to multiple target", () => {
        assert.deepEqual(builder.makeBody({
            to: [targetA, targetB],
            content: textMessage
        }), {
            to: [targetA, targetB],
            toChannel: 1383378250,
            eventType: "138311608800106203",
            content: textMessage
        });
    });

    it("should make multiple message to single target", () => {
        assert.deepEqual(builder.makeBody({
            to: targetA,
            content: [textMessage, imageMessage]
        }), {
            to: [targetA],
            toChannel: 1383378250,
            eventType: "140177271400161403",
            content: {
                messages: [textMessage, imageMessage],
                messageNotified: 0
            }
        });
    });

    it("should make multiple message to multiple target", () => {
        assert.deepEqual(builder.makeBody({
            to: [targetA, targetB],
            content: [textMessage, imageMessage]
        }), {
            to: [targetA, targetB],
            toChannel: 1383378250,
            eventType: "140177271400161403",
            content: {
                messages: [textMessage, imageMessage],
                messageNotified: 0
            }
        });
    });
});
