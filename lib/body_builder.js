module.exports = function (options) {
    return new Builder(options);
};

const TO_CHANNEL = 1383378250;
const EVENT_TYPE_SINGLE = "138311608800106203";
const EVENT_TYPE_MULTI = "140177271400161403";

function Builder(options) {}

const makeSingleContentBody = function(args) {
    const to = Array.isArray(args.to) ? args.to : [args.to];
    return {
        toChannel: TO_CHANNEL,
        eventType: EVENT_TYPE_SINGLE,
        to: to,
        content: args.content
    };
};

const makeMultiContentBody = function(args) {
    const to = Array.isArray(args.to) ? args.to : [args.to];
    return {
        toChannel: TO_CHANNEL,
        eventType: EVENT_TYPE_MULTI,
        to: to,
        content: {
            messages: args.content,
            messageNotified: 0
        }
    };
};

Builder.prototype.makeBody = function(args) {
    var ret;
    if (Array.isArray(args.content)) {
        ret = makeMultiContentBody(args);
    } else {
        ret = makeSingleContentBody(args);
    }
    return ret;
};
