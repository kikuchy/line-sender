module.exports = function(options) {
    return new Builder(options);
};

const TO_TYPE_USER = 1;
const CONTENT_TYPE = {
    TEXT: 1,
    IMAGE: 2,
    VIDEO: 3,
    AUDIO: 4,
    LOCATION: 7,
    STICKER: 8
};

function Builder(options) {}

Builder.prototype.makeText = function(text) {
    return {
        toType: TO_TYPE_USER,
        contentType: CONTENT_TYPE.TEXT,
        text: text
    };
};

Builder.prototype.makeImage= function(originalUrl, previewUrl) {
    previewUrl = previewUrl || originalUrl;
    return {
        toType: TO_TYPE_USER,
        contentType: CONTENT_TYPE.IMAGE,
        originalContentUrl: originalUrl,
        previewImageUrl: previewUrl
    };
};

Builder.prototype.makeVideo = function(videoUrl, thumbUrl) {
    return {
        toType: TO_TYPE_USER,
        contentType: CONTENT_TYPE.VIDEO,
        originalContentUrl: videoUrl,
        previewImageUrl: thumbUrl
    };
};

Builder.prototype.makeAudio = function(audioUrl, audioLength) {
    return {
        toType: TO_TYPE_USER,
        contentType: CONTENT_TYPE.AUDIO,
        originalContentUrl: audioUrl,
        contentMetadata: {
            AUDLEN: audioLength.toString()
        }
    };
};

Builder.prototype.makeLocation = function(locationName, latitude, longitude) {
    if (typeof latitude === "object" && "longitude" in latitude && "latitude" in latitude) {
        longitude = latitude.longitude;
        latitude = latitude.latitude
    }
    return {
        toType: TO_TYPE_USER,
        contentType: CONTENT_TYPE.LOCATION,
        text: locationName,
        location: {
            title: locationName,
            latitude: latitude,
            longitude: longitude
        }
    };
};

Builder.prototype.makeSticker = function(stickerData) {
    return {
        toType: TO_TYPE_USER,
        contentType: CONTENT_TYPE.STICKER,
        contentMetadata: {
            STKID: stickerData.STKID,
            STKPKGID: stickerData.STKPKGID,
            STKVER: stickerData.STKVER
        }
    };
};
