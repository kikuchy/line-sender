const assert = require("assert");

const Builder = require("../lib/content_builder")

describe("content builder", () => {
    const builder = Builder();

    it("should make text content", () => {
        assert.deepEqual({
            contentType: 1,
            toType: 1,
            text: "hogehoge"
        }, builder.makeText("hogehoge"));
    });

    it("should make image content (without preview)", () => {
        const url = "https://example.com/image.jpg";
        assert.deepEqual({
            contentType: 2,
            toType: 1,
            originalContentUrl: url,
            previewImageUrl: url
        }, builder.makeImage(url));
    });

    it("should make image content (with preview)", () => {
        const large = "https://example.com/large.jpg";
        const small = "https://example.com/small.jpg";
        assert.deepEqual({
            contentType: 2,
            toType: 1,
            originalContentUrl: large,
            previewImageUrl: small
        }, builder.makeImage(large, small));
    });

    it("should make video content", () => {
        const video = "https://example.com/video.mp4";
        const thumb = "https://example.com/small.jpg";
        assert.deepEqual({
            contentType: 3,
            toType: 1,
            originalContentUrl: video,
            previewImageUrl: thumb
        }, builder.makeVideo(video, thumb));
    });

    it("should make audio content", () => {
        const url = "https://example.com/audio.m4a";
        const length = 240000;
        assert.deepEqual({
            contentType: 4,
            toType: 1,
            originalContentUrl: url,
            contentMetadata: {
                AUDLEN: "" + length
            }
        }, builder.makeAudio(url, length));
    });

    it("should make location content", () => {
        const lat = 35.61823286112982;
        const lon = 139.72824096679688;
        const expect = {
            contentType: 7,
            toType: 1,
            text: "hogehoge",
            location: {
                title: "hogehoge",
                latitude: lat,
                longitude: lon
            }
        };
        assert.deepEqual(builder.makeLocation("hogehoge", lat, lon), expect);
        assert.deepEqual(builder.makeLocation("hogehoge", {
            latitude: lat,
            longitude: lon
        }), expect);
    });

    it("should make sticker content", () => {
        assert.deepEqual({
            contentType: 8,
            toType: 1,
            contentMetadata: {
                STKID: "3",
                STKPKGID: "332",
                STKVER: "100"
            }
        }, builder.makeSticker({
            STKID: "3",
            STKPKGID: "332",
            STKVER: "100"
        }));
    });
});
